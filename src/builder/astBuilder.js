import * as babylon from 'babylon';
import traverse from 'babel-traverse'; //TODO: remove, needed only for debug now

import { TOKEN_KEYS } from 'shared/constants';
import { setupPointer } from 'shared/utils/treeLevelsPointer';

export const parseCodeToAST = (code, config) => {
    const ast = babylon.parse(code, {
        sourceType: 'module', //TODO: move to multiple files support, make it configurable
        plugins: [
            'objectRestSpread' //TODO: plugins should be configurable
        ]
    });

    //TODO: remove when finish with defining types
    traverse(ast, {
        enter(path) {
            if (path.node.type === 'BinaryExpression') {
                //debugger;
            }
            console.log(path.node.type, path.node.name);
        }
    });

    return ast;
};

export const buildVisitor = ({ definitionsMap, globalIgnore }, treeNodesDestination) => {
    const pointer = setupPointer(treeNodesDestination),
        wrapByGlobalIgnore = visit => path => visit(path, globalIgnore);

    return definitionsMap.reduce((acc, item) => {
        if (!item.body) {
            acc[item.type] = wrapByGlobalIgnore(visitSimpleEntry(item, pointer));
        } else {
            acc[item.type] = {
                enter: wrapByGlobalIgnore(enterComplexEntry(item, pointer)),
                exit: wrapByGlobalIgnore(exitComplexEntry(item, pointer))
            };
        }

        return acc;
    }, {});
};

//TODO: refactor, looks a bit duplicated
const visitSimpleEntry = (item, pointer) => (path, globalIgnore) => {
    if (item.ignore && item.ignore(path)) return;

    const entryConfig = {
        ...getBasicEntryConfig(item, path),
        key: getStatementParentKey(path)
    };

    if (globalIgnore && globalIgnore(entryConfig)) return;

    pushEntry(pointer, entryConfig);
};

const enterComplexEntry = (item, pointer) => (path, globalIgnore) => {
    if (item.ignore && item.ignore(path)) return;

    const entryConfig = {
        ...getBasicEntryConfig(item, path),
        key: getStatementParentKey(path),
        body: []
    };

    if (!(globalIgnore && globalIgnore(entryConfig))) {
        pushEntry(pointer, entryConfig);
    }

    pointer.stepIn(entryConfig);
};

const pushEntry = (pointer, entry) => {
    const parent = pointer.getCurrent();
    entry.parent = parent;

    (parent.body || parent).push(entry);
};

const getStatementParentKey = path => {
    const statementParent =
        path.find(path => path.parentKey === TOKEN_KEYS.PROGRAM || path.isStatementOrBlock()) || {};
    return statementParent.key;
};

const exitComplexEntry = (item, pointer) => path => {
    if (item.ignore && item.ignore(path)) return;

    pointer.stepOut();
};

const getBasicEntryConfig = (item, path) => {
    const config = {
        name: item.getName(path),
        type: item.type
    };

    if (item.type !== path.node.type) {
        config.subType = path.node.type;
    }

    return config;
};

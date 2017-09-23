import * as babylon from 'babylon';
import traverse from 'babel-traverse'; //TODO: remove, needed only for debug now

import { TOKEN_KEYS } from '../shared/constants';
import { setupPointer } from '../shared/utils/treeLevelsPointer';

export const buildAST = (code, config) => {
    //TODO: remove when finish with defining types
    /*const c = babylon.parse(code, {
        sourceType: 'module',
        plugins: [
            'objectRestSpread' //TODO: plugins should be configurable
        ]

    });

    traverse(c, {
        enter(path) {
            if (path.node.type === 'CallExpression') {
                //debugger;
            }
            //console.log(path.node.type, path.node.name);
        }
    });*/

    return babylon.parse(code, {
        sourceType: 'module', //TODO: move to multiple files support, make it configurable
        plugins: [
            'objectRestSpread' //TODO: plugins should be configurable
        ]
    });
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

    pointer.getCurrent().push(entryConfig);
};

const enterComplexEntry = (item, pointer) => (path, globalIgnore) => {
    if (item.ignore && item.ignore(path)) return;

    const entryConfig = {
        ...getBasicEntryConfig(item, path),
        key: getStatementParentKey(path),
        body: []
    };

    if (!(globalIgnore && globalIgnore(entryConfig))) {
        pointer.getCurrent().push(entryConfig);
    }

    pointer.stepIn(entryConfig.body);
};

const getStatementParentKey = path => {
    const statementParent = path.find(path => path.parentKey === TOKEN_KEYS.PROGRAM || path.isStatementOrBlock()) || {};
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

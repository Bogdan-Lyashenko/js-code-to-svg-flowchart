import * as babelParser from '@babel/parser';
import { mergeObjectStructures } from 'shared/utils/composition';

import { TOKEN_KEYS } from 'shared/constants';
import { setupPointer } from 'shared/utils/treeLevelsPointer';
import { logError } from 'shared/utils/logger';
import defaultAstConfig from './astParserConfig';

export const parseCodeToAST = (code, config = {}) => {
    let ast = [];

    try {
        ast = babelParser.parse(code, mergeObjectStructures(defaultAstConfig, config));
    } catch (e) {
        logError('Error at parseCodeToAST: ' + e.message, e.loc, e.stack);
        throw e;
    }

    return ast;
};

export const buildVisitor = ({ definitionsMap, globalIgnore }, treeNodesDestination) => {
    const pointer = setupPointer(treeNodesDestination),
        wrapByGlobalIgnore = visit => path => visit(path, globalIgnore);

    return definitionsMap.reduce((acc, item) => {
        if (!item.body) {
            acc[item.type] = item.reversed
                ? { exit: wrapByGlobalIgnore(visitSimpleEntry(item, pointer)) }
                : wrapByGlobalIgnore(visitSimpleEntry(item, pointer));
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
        ...getBasicEntryConfig(item, path)
    };

    if (globalIgnore && globalIgnore(entryConfig)) return;

    pushEntry(pointer, entryConfig);
};

const enterComplexEntry = (item, pointer) => (path, globalIgnore) => {
    if (item.ignore && item.ignore(path)) return;

    const entryConfig = pushComplexEntry(item, pointer, path, globalIgnore);

    pointer.stepIn(entryConfig);
};

const pushComplexEntry = (item, pointer, path, globalIgnore) => {
    const entryConfig = {
        ...getBasicEntryConfig(item, path),
        body: []
    };

    if (!(globalIgnore && globalIgnore(entryConfig))) {
        pushEntry(pointer, entryConfig);
    }

    return entryConfig;
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
    const name = item.getName(path),
        nameOptions = typeof name === 'string' ? { name } : name;

    const config = {
        ...nameOptions,
        type: item.type,
        key: getStatementParentKey(path),
        isBodyEntry: path.key === TOKEN_KEYS.BODY
    };

    if (!config.name) {
        config.name = '';
    }

    if (item.type !== path.node.type) {
        config.subType = path.node.type;
    }

    return config;
};

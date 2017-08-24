import {TOKEN_KEYS} from '../shared/constants';

export const buildVisitor = (definitionsMap, pointer) => {
    return definitionsMap.reduce((acc, item) => {
        if (!item.body) {
            acc[item.type] = visitSimpleEntry(item, pointer);
        } else {
            acc[item.type] = {
                enter: enterComplexEntry(item, pointer),
                exit: exitComplexEntry(item, pointer)
            };
        }

        return acc;
    }, {});
};

const visitSimpleEntry = (item, pointer) => (path) => {
    if (item.ignore && item.ignore(path)) {
        return;
    }

    const entryConfig = {
        ...getBasicEntryConfig(item, path),
        key: getStatementParentKey(path)
    };

    pointer.getCurrent().push(entryConfig);
};

const enterComplexEntry = (item, pointer) => (path) => {
    if (item.ignore && item.ignore(path)) {
        return;
    }

    const entryConfig = {
        ...getBasicEntryConfig(item, path),
        key: getStatementParentKey(path),
        body: []
    };

    pointer.getCurrent().push(entryConfig);
    pointer.stepIn(entryConfig.body);
};

const getStatementParentKey = (path) => {
    const statementParent = path.find((path) => path.parentKey === TOKEN_KEYS.PROGRAM || path.isStatementOrBlock()) || {};
    return statementParent.key;
};

const exitComplexEntry = (item, pointer) => (path) => {
    if (item.ignore && item.ignore(path)) {
        return;
    }

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

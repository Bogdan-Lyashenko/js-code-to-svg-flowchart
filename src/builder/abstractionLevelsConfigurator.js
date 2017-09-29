import { TOKEN_TYPES } from 'shared/constants';
import { DefinitionsMap } from './entryDefinitionsMap';

export const ABSTRACTION_LEVELS = {
    FUNCTION: [TOKEN_TYPES.FUNCTION],
    FUNCTION_DEPENDENCIES: [TOKEN_TYPES.FUNCTION, TOKEN_TYPES.CALL_EXPRESSION],
    CLASS: [TOKEN_TYPES.CLASS_DECLARATION],
    IMPORT: [
        TOKEN_TYPES.IMPORT_DECLARATION,
        TOKEN_TYPES.IMPORT_SPECIFIER,
        TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER
    ],
    EXPORT: [TOKEN_TYPES.EXPORT_NAMED_DECLARATION, TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION]
};

export const rebuildConfigForAbstractionLevel = level => {
    const levelList = [].concat(level).reduce((list, item) => {
        if (typeof item === 'string') {
            list.push(item);
        } else {
            list = list.concat([...item]);
        }

        return list;
    }, []);

    return DefinitionsMap.filter(item => levelList.indexOf(item.type) !== -1);
};

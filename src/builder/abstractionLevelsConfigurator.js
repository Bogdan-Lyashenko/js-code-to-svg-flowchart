import { TOKEN_TYPES } from 'shared/constants';
import { DefinitionsList } from './entryDefinitionsMap';
import { getFunctionDependenciesLevel } from './abstraction-levels/functionDependencies';
import { getFunctionsLevel } from './abstraction-levels/functions';

export const ABSTRACTION_LEVELS = {
    FUNCTION: getFunctionsLevel(),
    FUNCTION_DEPENDENCIES: getFunctionDependenciesLevel(),
    CLASS: [TOKEN_TYPES.CLASS_DECLARATION],
    IMPORT: [
        TOKEN_TYPES.IMPORT_DECLARATION,
        TOKEN_TYPES.IMPORT_SPECIFIER,
        TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER
    ],
    EXPORT: [TOKEN_TYPES.EXPORT_NAMED_DECLARATION, TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION]
};

export const rebuildConfigForAbstractionLevel = level => {
    let definedLevels = [TOKEN_TYPES.PROGRAM],
        customLevels = [];

    [].concat(level).forEach(item => {
        if (typeof item === 'string') {
            return definedLevels.push(item);
        }

        if (Array.isArray(item)) {
            return (definedLevels = definedLevels.concat([...item]));
        }

        if (typeof item === 'object') {
            definedLevels = definedLevels.concat([...(item.defined || [])]);
            customLevels = customLevels.concat([...(item.custom || [])]);
        }
    });

    return DefinitionsList.filter(item => definedLevels.indexOf(item.type) !== -1).concat(
        customLevels
    );
};

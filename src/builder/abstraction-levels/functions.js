import { TOKEN_TYPES } from 'shared/constants';
import { DefinitionsMap } from 'builder/entryDefinitionsMap';

export const getCustomFunctionDeclaration = () => {
    const functionDeclaration = DefinitionsMap[TOKEN_TYPES.FUNCTION];

    return {
        ...functionDeclaration,
        ignore: path =>
            (functionDeclaration.ignore && functionDeclaration.ignore(path)) ||
            path.parent.type === TOKEN_TYPES.CALL_EXPRESSION
    };
};

export const getFunctionsLevel = () => {
    return {
        defined: [],
        custom: [getCustomFunctionDeclaration()]
    };
};

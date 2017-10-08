import { TOKEN_TYPES } from 'shared/constants';
import { callExpressionConverter } from 'builder/converters/core';
import { DefinitionsMap } from 'builder/entryDefinitionsMap';
import { getCustomFunctionDeclaration } from 'builder/abstraction-levels/functions';

const isNodeContainsFunctionCall = node => {
    return node && node.type === TOKEN_TYPES.CALL_EXPRESSION;
};

const getCustomAssignmentExpression = () => {
    const assignmentExpression = DefinitionsMap[TOKEN_TYPES.ASSIGNMENT_EXPRESSION];

    return {
        ...assignmentExpression,
        getName: ({ node }) => callExpressionConverter({ node: node.right }),
        ignore: path =>
            assignmentExpression.ignore(path) || !isNodeContainsFunctionCall(path.node.right)
    };
};

const getCustomVariableDeclarator = () => {
    const variableDeclarator = DefinitionsMap[TOKEN_TYPES.VARIABLE_DECLARATOR];

    return {
        ...variableDeclarator,
        getName: ({ node }) => callExpressionConverter({ node: node.init }),
        ignore: path =>
            variableDeclarator.ignore(path) || !isNodeContainsFunctionCall(path.node.init)
    };
};

export const getFunctionDependenciesLevel = () => ({
    defined: [TOKEN_TYPES.CALL_EXPRESSION],
    custom: [
        getCustomFunctionDeclaration(),
        getCustomAssignmentExpression(),
        getCustomVariableDeclarator()
    ]
});

import { TOKEN_TYPES } from 'shared/constants';
import { callExpressionConverter } from 'builder/converters/core';
import { DefinitionsMap } from 'builder/entryDefinitionsMap';

const isNodeContainsFunctionCall = ({ node }) => {
    return node.right && node.right.type === TOKEN_TYPES.CALL_EXPRESSION;
};

const getCustomAssignmentExpression = () => {
    const assignmentExpression = DefinitionsMap[TOKEN_TYPES.ASSIGNMENT_EXPRESSION];

    return {
        ...assignmentExpression,
        getName: ({ node }) => callExpressionConverter({ node: node.right }),
        ignore: path => assignmentExpression.ignore(path) || !isNodeContainsFunctionCall(path)
    };
};

export const getFunctionDependenciesLevel = () => {
    return {
        defined: [TOKEN_TYPES.FUNCTION, TOKEN_TYPES.CALL_EXPRESSION],
        custom: [getCustomAssignmentExpression()]
    };
};

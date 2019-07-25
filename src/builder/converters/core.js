import generate from '@babel/generator';
import { TOKEN_TYPES, CLASS_FUNCTION_KINDS } from 'shared/constants';

export const idleConverter = path => {
    return generate(path.node).code;
};

export const identifierConverter = path => {
    if (path.parent.type === TOKEN_TYPES.SPREAD_PROPERTY) {
        return '...' + idleConverter(path);
    }

    return idleConverter(path);
};

/* function */
export const functionConverter = path => {
    const node = path.node,
        paramsCode = getFunctionParametersCode(node.params);

    let name = '';

    if (node.id) {
        name = getAnonymousFunctionName(path) + 'function ' + node.id.name + paramsCode;
    } else if (node.type === TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION) {
        name = getAnonymousFunctionName(path) + paramsCode + ' =>';
    } else if (node.type === TOKEN_TYPES.CLASS_METHOD || node.type === TOKEN_TYPES.OBJECT_METHOD) {
        name =
            node.kind === CLASS_FUNCTION_KINDS.CONSTRUCTOR
                ? 'constructor' + paramsCode
                : node.key.name + paramsCode;
    } else {
        name = getAnonymousFunctionName(path) + 'function' + paramsCode;
    }

    return { name, pathParentType: path.parent.type };
};

export const getAnonymousFunctionName = path => {
    const parent = path.parent;

    if (
        !parent ||
        (parent.type !== TOKEN_TYPES.VARIABLE_DECLARATOR &&
            parent.type !== TOKEN_TYPES.ASSIGNMENT_EXPRESSION &&
            parent.type !== TOKEN_TYPES.OBJECT_PROPERTY)
    ) {
        return '';
    }

    if (parent.left) {
        return generate(parent.left).code + ' = ';
    }

    const parentId = parent.id;
    return parentId ? parentId.name + ' = ' : '';
};

export const getFunctionParametersCode = params => {
    return `(${params
        .map(p => {
            if (p.name) {
                return p.name;
            }

            return generate(p).code;
        })
        .join(', ')})`;
};

export const returnConverter = path => {
    const node = path.node;
    if (
        node.argument &&
        ([TOKEN_TYPES.CONDITIONAL_EXPRESSION, TOKEN_TYPES.OBJECT_EXPRESSION].includes(
            node.argument.type
        ) ||
            isFunctionType(node.argument.type))
    ) {
        return 'return';
    }

    return path.node.argument ? `return ${generate(path.node.argument).code}` : 'return';
};
/* end function */

/* loop */
export const loopConverter = ({ node }) => {
    if (node.test) {
        return generate(node.test).code;
    }

    if (node.left && node.right) {
        const innerPart = node.type === TOKEN_TYPES.FOR_OF_STATEMENT ? 'of' : 'in';
        const leftPart =
            node.left.type === TOKEN_TYPES.VARIABLE_DECLARATION
                ? getVariableDeclarations(node.left.declarations)
                : generate(node.left).code;

        return `${leftPart} ${innerPart} ${generate(node.right).code}`;
    }
};

export const continueConverter = path => {
    return path.node.label ? `continue ${generate(path.node.label).code}` : 'continue';
};
/* end loop */

export const conditionalConverter = path => {
    return `(${generate(path.node.test).code})`;
};

/* try-catch */
export const tryConverter = path => {
    return `try`;
};

export const catchConverter = path => {
    return path.node.param ? `catch (${generate(path.node.param).code})` : '*catchConverter*';
};

export const finallyConverter = path => {
    //TODO: fix `finally`, not implemented yet because it presents only as a part of parent,
    //there is no `finally` visitor as it exist for `catch`
    //seems like to do that each try-catch block should be handled in a different way

    return '*finallyConverter*';
};
/* end try-catch */

/* switch-case */
export const switchStatementConverter = path => {
    return `switch (${generate(path.node.discriminant).code})`;
};

export const caseConverter = path => {
    return path.node.test ? `case ${generate(path.node.test).code}:` : 'default:';
};

export const breakConverter = path => {
    return path.node.label ? `break ${generate(path.node.label).code}:` : 'break';
};
/* end switch - case */

export const withStatementConverter = path => {
    return `with (${generate(path.node.object).code})`;
};

export const programConverter = path => {
    return `${path.node.type}: source ${path.node.sourceType}`;
};

export const throwStatementConverter = path => {
    return `throw ${generate(path.node.argument).code}`;
};

export const debuggerConverter = path => {
    return `debugger`;
};

export const getVariableDeclarations = variables =>
    variables.map(v => variableDeclaratorConverter({ node: v })).join(', ');

export const variableDeclaratorConverter = path => {
    const node = path.node,
        parentKind = (path.parent && path.parent.kind) || '';

    if (
        node.init &&
        (isNodeContainsFunc(node.init) || node.init.type === TOKEN_TYPES.CONDITIONAL_EXPRESSION)
    ) {
        return `${parentKind} ${node.id.name} = `;
    }

    let variableName = '';
    if (node.id.type === TOKEN_TYPES.OBJECT_PATTERN) {
        variableName = '{...}';
    } else if (node.id.type === TOKEN_TYPES.ARRAY_PATTERN) {
        variableName = '[...]';
    } else {
        variableName = node.id.name;
    }

    if (
        node.init &&
        [TOKEN_TYPES.CALL_EXPRESSION, TOKEN_TYPES.NEW_EXPRESSION].includes(node.init.type)
    ) {
        return `${parentKind} ${variableName} = ` + callExpressionConverter({ node: node.init });
    }

    if (node.init && node.init.type === TOKEN_TYPES.OBJECT_EXPRESSION) {
        return `${parentKind} ${variableName} = ${objectExpressionConverter()}`;
    }

    if (node.id && node.id.type === TOKEN_TYPES.OBJECT_PATTERN) {
        return `${parentKind} {...} = ${node.init.name}`;
    }

    if (node.id && node.id.type === TOKEN_TYPES.ARRAY_PATTERN) {
        return `${parentKind} [...] = ${node.init.name}`;
    }

    return parentKind + ' ' + generate(node).code;
};

export const assignmentExpressionConverter = ({ node }) => {
    if (isNodeContainsFunc(node.right) || node.right.type === TOKEN_TYPES.CONDITIONAL_EXPRESSION) {
        return `${getLeftAssignmentName(node.left)} ${node.operator} `;
    }

    if (node.right.type === TOKEN_TYPES.OBJECT_EXPRESSION) {
        return `${getLeftAssignmentName(node.left)} ${
            node.operator
        } ${objectExpressionConverter()}`;
    }

    if ([TOKEN_TYPES.CALL_EXPRESSION, TOKEN_TYPES.NEW_EXPRESSION].includes(node.right.type)) {
        return `${getLeftAssignmentName(node.left)} ${node.operator} ${callExpressionConverter({
            node: node.right
        })}`;
    }

    return generate(node).code;
};

const getLeftAssignmentName = node => {
    if (node.name) {
        return node.name;
    }

    return generate(node).code;
};

export const callExpressionConverter = ({ node }) => {
    let argumentsCode = '';

    if (node.arguments && node.arguments.length) {
        argumentsCode = node.arguments.map(getArgumentName).join(', ');
    }

    const callee = node.callee;
    if (
        callee.type === TOKEN_TYPES.MEMBER_EXPRESSION &&
        callee.object.type === TOKEN_TYPES.CALL_EXPRESSION
    ) {
        return { name: `.${callee.property.name}(${argumentsCode})`, chain: true };
    } else if (argumentsCode) {
        return `${generate(node.callee).code}(${argumentsCode})`;
    }

    return generate(node).code;
};

const getArgumentName = argument => {
    if (isNodeContainsFunc(argument)) return '*()';
    if (argument.type === TOKEN_TYPES.OBJECT_EXPRESSION) return objectExpressionConverter();

    if (argument.name) return argument.name;
    if (argument.value)
        return argument.type === TOKEN_TYPES.STRING_LITERAL
            ? `'${argument.value}'`
            : argument.value;

    return generate(argument).code;
};

export const objectExpressionConverter = path => {
    const name = '{*}';
    if (path) return { name, pathParentType: path.parent.type };

    return name;
};

export const objectPropertyConverter = path => {
    const node = path.node;

    if (node.value && isFunctionType(node.value.type)) {
        return node.key.name + ': ';
    }

    if (node.value && node.value.type === TOKEN_TYPES.OBJECT_EXPRESSION) {
        return node.key.name + ': ' + objectExpressionConverter();
    }

    return generate(node).code;
};

const getFirstCallee = callee => {
    if (!callee) return callee;
    if (
        callee.type === TOKEN_TYPES.MEMBER_EXPRESSION &&
        callee.object.type === TOKEN_TYPES.CALL_EXPRESSION
    ) {
        return getFirstCallee(callee.object);
    }

    return callee;
};

export const isFunctionType = type => {
    return [
        TOKEN_TYPES.FUNCTION_EXPRESSION,
        TOKEN_TYPES.FUNCTION,
        TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION,
        TOKEN_TYPES.FUNCTION_DECLARATION
    ].includes(type);
};

export const isNodeContainsFunc = node => {
    const functions = [TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION, TOKEN_TYPES.FUNCTION_EXPRESSION];

    return node && functions.indexOf(node.type) !== -1;
};

import generate from 'babel-generator';
import { TOKEN_TYPES, CLASS_FUNCTION_KINDS } from 'shared/constants';

export const idleConverter = path => {
    return generate(path.node).code;
};

/* function */
export const functionConverter = path => {
    const node = path.node;
    const paramsCode = getFunctionParametersCode(node.params);

    if (node.id) {
        return getAnonymousFunctionName(path) + 'function ' + node.id.name + paramsCode;
    }

    if (node.type === TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION) {
        return getAnonymousFunctionName(path) + paramsCode + ' =>';
    }

    if (node.type === TOKEN_TYPES.CLASS_METHOD) {
        return node.kind === CLASS_FUNCTION_KINDS.CONSTRUCTOR
            ? 'constructor' + paramsCode
            : node.key.name + paramsCode;
    }

    return getAnonymousFunctionName(path) + 'function' + paramsCode;
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

    const parentId = parent.id || parent.left || parent.key;
    return parentId ? parentId.name + ' = ' : '';
};

export const getFunctionParametersCode = params => {
    return `(${params.map(p => p.name).join(', ')})`;
};

export const returnConverter = path => {
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

export const variableDeclaratorConverter = ({ node }) => {
    if (isNodeContainsFunc(node.init)) {
        return `${node.id.name} = `;
    }

    if (node.init && node.init.type === TOKEN_TYPES.CALL_EXPRESSION) {
        return `${node.id.name} = ` + callExpressionConverter({ node: node.init });
    }

    if (node.init && node.init.type === TOKEN_TYPES.OBJECT_EXPRESSION) {
        return `${node.id.name} = { * }`;
    }

    return generate(node).code;
};

export const assignmentExpressionConverter = ({ node }) => {
    if (isNodeContainsFunc(node.right)) {
        return `${node.left.name} ${node.operator} `;
    }

    return generate(node).code;
};

export const callExpressionConverter = ({ node }) => {
    if (!!(node.arguments || []).find(isNodeContainsFunc)) {
        const argumentsCode = node.arguments
            .map(argument => (isNodeContainsFunc(argument) ? '*' : argument.name || argument.value))
            .join(', ');

        return `${generate(node.callee).code}(${argumentsCode})`;
    }

    //TODO: fix chain: leave only one method call per node,   $('#id').show().addClass('name').hide();
    //run traversal after build and with modifier reverse order of chains
    const callee = node.callee;
    if (
        callee.type === TOKEN_TYPES.MEMBER_EXPRESSION &&
        callee.object.type === TOKEN_TYPES.CALL_EXPRESSION
    ) {
        //console.log(getFirstCallee(callee));
        //console.log(generate(node).code)
        //return callee.property.name;
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

//TODO: node.properties, case when function is property.value of object
/* c = {
    a: function (b) {
        list.push(b.id);
    }
};*/
export const isNodeContainsFunc = node => {
    const functions = [TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION, TOKEN_TYPES.FUNCTION_EXPRESSION];

    return node && functions.indexOf(node.type) !== -1;
};
//TODO: render arrow function/anonymous function on the same Y position shifted to the right.
//const func = (c,d)=> {c++; d++;}
//|func| |(c,d)=>|
//       |c++|
//       |d++|

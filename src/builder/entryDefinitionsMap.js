import { TOKEN_TYPES, TOKEN_KEYS } from 'shared/constants';
import {
    idleConverter,
    identifierConverter,
    functionConverter,
    isNodeContainsFunc,
    returnConverter,
    variableDeclaratorConverter,
    assignmentExpressionConverter,
    callExpressionConverter,
    loopConverter,
    continueConverter,
    conditionalConverter,
    catchConverter,
    tryConverter,
    switchStatementConverter,
    caseConverter,
    breakConverter,
    withStatementConverter,
    programConverter,
    throwStatementConverter,
    debuggerConverter,
    objectExpressionConverter,
    objectPropertyConverter
} from './converters/core';

import {
    importDeclarationConverter,
    exportNamedDeclarationConverter,
    exportDefaultDeclarationConverter,
    classDeclarationConverter,
    objectPatternConverter,
    arrayPatternConverter
} from './converters/Harmony';

const singleTypeFilter = path => {
    const statementParent = path.getStatementParent(),
        parent = path.parent || {};

    if ([TOKEN_KEYS.CONSEQUENT, TOKEN_KEYS.ALTERNATE].includes(path.key)) {
        return false;
    }

    return (
        ['params'].includes(path.listKey) ||
        (statementParent.isReturnStatement() && path.key !== 'body') ||
        ((statementParent.isLoop() ||
            statementParent.isConditional() ||
            parent.type === TOKEN_TYPES.CONDITIONAL_EXPRESSION) &&
            ['test', 'left', 'right'].includes(path.parentKey)) ||
        ([
            TOKEN_TYPES.RETURN,
            TOKEN_TYPES.CALL_EXPRESSION,
            TOKEN_TYPES.BINARY_EXPRESSION,
            TOKEN_TYPES.UPDATE_EXPRESSION,
            TOKEN_TYPES.ASSIGNMENT_EXPRESSION,
            TOKEN_TYPES.LOGICAL_EXPRESSION,
            TOKEN_TYPES.VARIABLE_DECLARATOR,
            TOKEN_TYPES.MEMBER_EXPRESSION,
            TOKEN_TYPES.NEW_EXPRESSION,
            TOKEN_TYPES.FUNCTION_DECLARATION,
            TOKEN_TYPES.FUNCTION_EXPRESSION,
            TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION,
            TOKEN_TYPES.FUNCTION,
            TOKEN_TYPES.OBJECT_PROPERTY,
            TOKEN_TYPES.ASSIGNMENT_PATTERN,
            TOKEN_TYPES.REST_PROPERTY,
            TOKEN_TYPES.SPREAD_ELEMENT,
            TOKEN_TYPES.ARRAY_EXPRESSION,
            TOKEN_TYPES.UNARY_EXPRESSION,
            TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER,
            TOKEN_TYPES.IMPORT_SPECIFIER,
            TOKEN_TYPES.IMPORT_DECLARATION,
            TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION,
            TOKEN_TYPES.EXPORT_NAMED_DECLARATION,
            TOKEN_TYPES.CLASS_DECLARATION,
            TOKEN_TYPES.CLASS_METHOD,
            TOKEN_TYPES.SWITCH_STATEMENT,
            TOKEN_TYPES.SWITCH_CASE
        ].includes(parent.type) &&
            (!parent.body || parent.body.type !== path.node.type))
    );
};

export const DefinitionsMap = {
    [TOKEN_TYPES.FUNCTION]: {
        type: TOKEN_TYPES.FUNCTION,
        getName: functionConverter,
        body: true
    },
    [TOKEN_TYPES.RETURN]: {
        type: TOKEN_TYPES.RETURN,
        getName: returnConverter,

        body: true
    },
    [TOKEN_TYPES.VARIABLE_DECLARATOR]: {
        type: TOKEN_TYPES.VARIABLE_DECLARATOR,
        body: true,
        getName: variableDeclaratorConverter,
        ignore: path => {
            const statementParent = path.getStatementParent();
            return (
                !path.node.init || isNodeContainsFunc(path.node.init) || statementParent.isLoop()
            );
        }
    },
    [TOKEN_TYPES.ASSIGNMENT_EXPRESSION]: {
        type: TOKEN_TYPES.ASSIGNMENT_EXPRESSION,
        body: true,
        getName: assignmentExpressionConverter,
        ignore: path => {
            const statementParent = path.getStatementParent();

            return (
                statementParent.isVariableDeclaration() ||
                path.parent.type === TOKEN_TYPES.LOGICAL_EXPRESSION ||
                (statementParent.isConditional() && path.key === TOKEN_KEYS.TEST) ||
                isNodeContainsFunc(path.node.right)
            );
        }
    },
    [TOKEN_TYPES.CALL_EXPRESSION]: {
        type: TOKEN_TYPES.CALL_EXPRESSION,
        body: false,
        reversed: true,
        getName: callExpressionConverter,
        ignore: path => {
            const statementParent = path.getStatementParent(),
                parent = path.parent || {};

            if (parent.type === TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION) return false;

            return (
                statementParent.isVariableDeclaration() ||
                [
                    TOKEN_TYPES.RETURN,
                    TOKEN_TYPES.CALL_EXPRESSION,
                    TOKEN_TYPES.NEW_EXPRESSION,
                    TOKEN_TYPES.UNARY_EXPRESSION,
                    TOKEN_TYPES.BINARY_EXPRESSION
                ].includes(parent.type) ||
                (statementParent.isConditional() &&
                    parent.test &&
                    parent.test.type === TOKEN_TYPES.CALL_EXPRESSION) ||
                path.parent.type === TOKEN_TYPES.ASSIGNMENT_EXPRESSION //TODO: BUG, fix line: list = list.filter(i => i % 2)
            );
        }
    },
    [TOKEN_TYPES.UPDATE_EXPRESSION]: {
        type: TOKEN_TYPES.UPDATE_EXPRESSION,
        getName: idleConverter,
        ignore: path => path.getStatementParent().isVariableDeclaration()
    },
    [TOKEN_TYPES.NEW_EXPRESSION]: {
        type: TOKEN_TYPES.NEW_EXPRESSION,
        getName: idleConverter,
        ignore: path =>
            path.getStatementParent().isVariableDeclaration() ||
            path.parent.type === TOKEN_TYPES.ASSIGNMENT_EXPRESSION ||
            path.parent.type === TOKEN_TYPES.THROW_STATEMENT
    },
    [TOKEN_TYPES.LOOP]: {
        type: TOKEN_TYPES.LOOP,
        getName: loopConverter,
        body: true
    },
    [TOKEN_TYPES.CONTINUE]: {
        type: TOKEN_TYPES.CONTINUE,
        getName: continueConverter,
        body: true
    },
    [TOKEN_TYPES.CONDITIONAL]: {
        type: TOKEN_TYPES.CONDITIONAL,
        getName: conditionalConverter,
        body: true
    },
    [TOKEN_TYPES.SWITCH_STATEMENT]: {
        type: TOKEN_TYPES.SWITCH_STATEMENT,
        getName: switchStatementConverter,
        body: true
    },
    [TOKEN_TYPES.SWITCH_CASE]: {
        type: TOKEN_TYPES.SWITCH_CASE,
        getName: caseConverter,
        body: true
    },
    [TOKEN_TYPES.BREAK]: {
        type: TOKEN_TYPES.BREAK,
        getName: breakConverter,
        body: true
    },
    [TOKEN_TYPES.TRY_STATEMENT]: {
        type: TOKEN_TYPES.TRY_STATEMENT,
        getName: tryConverter,
        body: true
    },
    [TOKEN_TYPES.CATCH_CLAUSE]: {
        type: TOKEN_TYPES.CATCH_CLAUSE,
        getName: catchConverter,
        body: true
    },
    [TOKEN_TYPES.WITH_STATEMENT]: {
        type: TOKEN_TYPES.WITH_STATEMENT, //TODO: visual
        getName: withStatementConverter,
        body: true
    },
    [TOKEN_TYPES.PROGRAM]: {
        type: TOKEN_TYPES.PROGRAM, //TODO: visual
        getName: programConverter,
        body: true
    },
    [TOKEN_TYPES.THROW_STATEMENT]: {
        type: TOKEN_TYPES.THROW_STATEMENT,
        getName: throwStatementConverter,
        body: true
    },
    [TOKEN_TYPES.DEBUGGER_STATEMENT]: {
        type: TOKEN_TYPES.DEBUGGER_STATEMENT,
        getName: debuggerConverter,
        body: true
    },
    [TOKEN_TYPES.BINARY_EXPRESSION]: {
        type: TOKEN_TYPES.BINARY_EXPRESSION,
        getName: idleConverter,
        ignore: singleTypeFilter
    },
    [TOKEN_TYPES.IDENTIFIER]: {
        type: TOKEN_TYPES.IDENTIFIER,
        getName: identifierConverter,
        ignore: singleTypeFilter
    },
    [TOKEN_TYPES.STRING_LITERAL]: {
        type: TOKEN_TYPES.STRING_LITERAL,
        getName: idleConverter,
        ignore: singleTypeFilter
    },
    [TOKEN_TYPES.NUMERIC_LITERAL]: {
        type: TOKEN_TYPES.NUMERIC_LITERAL,
        getName: idleConverter,
        ignore: singleTypeFilter
    },
    [TOKEN_TYPES.OBJECT_EXPRESSION]: {
        type: TOKEN_TYPES.OBJECT_EXPRESSION,
        getName: objectExpressionConverter,
        ignore: path => {
            const node = path.node;
            if (node.properties && !node.properties.length) {
                return true;
            }

            return [
                TOKEN_TYPES.OBJECT_PROPERTY,
                TOKEN_TYPES.ASSIGNMENT_EXPRESSION,
                TOKEN_TYPES.VARIABLE_DECLARATOR
            ].includes(path.parent.type);
        },
        body: true
    },
    [TOKEN_TYPES.OBJECT_PROPERTY]: {
        type: TOKEN_TYPES.OBJECT_PROPERTY,
        getName: objectPropertyConverter,
        ignore: path => {
            const parentPath = path.parentPath;
            return ['params', 'left'].includes(parentPath.parentKey);
        },
        body: true
    },

    //ES Harmony features
    [TOKEN_TYPES.IMPORT_DECLARATION]: {
        type: TOKEN_TYPES.IMPORT_DECLARATION,
        getName: importDeclarationConverter,
        body: true
    },
    [TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER]: {
        type: TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER,
        getName: idleConverter
    },
    [TOKEN_TYPES.IMPORT_SPECIFIER]: {
        type: TOKEN_TYPES.IMPORT_SPECIFIER,
        getName: idleConverter
    },
    [TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION]: {
        type: TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION,
        getName: exportDefaultDeclarationConverter,
        body: true
    },
    [TOKEN_TYPES.EXPORT_NAMED_DECLARATION]: {
        type: TOKEN_TYPES.EXPORT_NAMED_DECLARATION,
        getName: exportNamedDeclarationConverter,
        body: true
    },
    [TOKEN_TYPES.CLASS_DECLARATION]: {
        type: TOKEN_TYPES.CLASS_DECLARATION,
        getName: classDeclarationConverter,
        body: true
    },
    [TOKEN_TYPES.OBJECT_PATTERN]: {
        type: TOKEN_TYPES.OBJECT_PATTERN,
        getName: objectPatternConverter,
        ignore: path => {
            return (
                path.listKey === 'params' ||
                [TOKEN_TYPES.VARIABLE_DECLARATOR, TOKEN_TYPES.ASSIGNMENT_PATTERN].includes(
                    path.parent.type
                )
            );
        },
        body: true
    },
    [TOKEN_TYPES.ARRAY_PATTERN]: {
        type: TOKEN_TYPES.ARRAY_PATTERN,
        getName: arrayPatternConverter,
        ignore: path => {
            return (
                path.listKey === 'params' ||
                [TOKEN_TYPES.VARIABLE_DECLARATOR, TOKEN_TYPES.ASSIGNMENT_PATTERN].includes(
                    path.parent.type
                )
            );
        },
        body: true
    }
};

export const DefinitionsList = Object.keys(DefinitionsMap).map(key => DefinitionsMap[key]);

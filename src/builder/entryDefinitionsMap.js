import { TOKEN_TYPES } from 'shared/constants';
import {
    idleConverter,
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
    debuggerConverter
} from './converters/core';

import {
    importDeclarationConverter,
    exportNamedDeclarationConverter,
    exportDefaultDeclarationConverter,
    classDeclarationConverter
} from './converters/Harmony';

export const DefinitionsMap = {
    [TOKEN_TYPES.FUNCTION]: {
        type: TOKEN_TYPES.FUNCTION,
        getName: functionConverter,
        body: true
    },
    [TOKEN_TYPES.RETURN]: {
        type: TOKEN_TYPES.RETURN, //TODO: visual
        getName: returnConverter, //TODO: fix return function, duplicates 'return log(list);'

        body: true
    },
    [TOKEN_TYPES.VARIABLE_DECLARATOR]: {
        type: TOKEN_TYPES.VARIABLE_DECLARATOR,
        body: true,
        getName: variableDeclaratorConverter,
        ignore: path => isNodeContainsFunc(path.node.init)
    },
    [TOKEN_TYPES.ASSIGNMENT_EXPRESSION]: {
        type: TOKEN_TYPES.ASSIGNMENT_EXPRESSION,
        body: true,
        getName: assignmentExpressionConverter,
        ignore: path =>
            path.getStatementParent().isVariableDeclaration() || isNodeContainsFunc(path.node.right)
    },
    [TOKEN_TYPES.CALL_EXPRESSION]: {
        type: TOKEN_TYPES.CALL_EXPRESSION,
        body: true,
        getName: callExpressionConverter,
        ignore: path => {
            const statementParent = path.getStatementParent(),
                parent = path.parent || {};

            return (
                statementParent.isVariableDeclaration() ||
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
        type: TOKEN_TYPES.CONTINUE, //TODO: visual (breaks flow because of iteration skip)
        getName: continueConverter,
        body: true
    },
    [TOKEN_TYPES.CONDITIONAL]: {
        type: TOKEN_TYPES.CONDITIONAL,
        getName: conditionalConverter,
        body: true
    },
    [TOKEN_TYPES.SWITCH_STATEMENT]: {
        type: TOKEN_TYPES.SWITCH_STATEMENT, //TODO: visual
        getName: switchStatementConverter,
        body: true
    },
    [TOKEN_TYPES.SWITCH_CASE]: {
        type: TOKEN_TYPES.SWITCH_CASE, //TODO: visual
        getName: caseConverter,
        body: true
    },
    [TOKEN_TYPES.BREAK]: {
        type: TOKEN_TYPES.BREAK, //TODO: visual
        getName: breakConverter,
        body: true
    },
    [TOKEN_TYPES.TRY_STATEMENT]: {
        type: TOKEN_TYPES.TRY_STATEMENT, //TODO: visual
        getName: tryConverter,
        body: true
    },
    [TOKEN_TYPES.CATCH_CLAUSE]: {
        type: TOKEN_TYPES.CATCH_CLAUSE, //TODO: visual
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
        getName: idleConverter
    },

    //ES Harmony features
    [TOKEN_TYPES.IMPORT_DECLARATION]: {
        type: TOKEN_TYPES.IMPORT_DECLARATION, //TODO: visual display in separate way libs (npm modules) and local dependencies
        getName: importDeclarationConverter,
        body: true
    },
    [TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER]: {
        type: TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER, //TODO: visual display it as dependencies to another module?
        getName: idleConverter
    },
    [TOKEN_TYPES.IMPORT_SPECIFIER]: {
        type: TOKEN_TYPES.IMPORT_SPECIFIER,
        getName: idleConverter
    },
    [TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION]: {
        type: TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION, //TODO: visual display as main result of module, => |a = 12| can be as big arrow shape at left side of main body
        getName: exportDefaultDeclarationConverter,
        body: true
    },
    [TOKEN_TYPES.EXPORT_NAMED_DECLARATION]: {
        type: TOKEN_TYPES.EXPORT_NAMED_DECLARATION, //TODO: visual ' => |a = 12| ' can be as big arrow shape at left side of main body
        getName: exportNamedDeclarationConverter,
        body: true
    },
    [TOKEN_TYPES.CLASS_DECLARATION]: {
        type: TOKEN_TYPES.CLASS_DECLARATION, //TODO: visual something like function declaration but more visible (class is bigger than function)
        getName: classDeclarationConverter, //if it has superClass -> render it with highlighting
        body: true
    }
};

export const DefinitionsList = Object.values(DefinitionsMap);

/*
*
*
* TODO: start with visual for each new token
*
* TODO: fix visual displaying of recurrence function call (should be looped as a for-loop, but fromPoint of arrow is in the bottom of shape)
*
* TODO: finish declarations (add jsx and flow)
* */

import { TOKEN_TYPES } from '../shared/constants';
import {
    idleConverter,
    functionConverter,
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

export const DefinitionsMap = [
    {
        type: TOKEN_TYPES.FUNCTION,
        getName: functionConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.RETURN, //TODO: visual
        getName: returnConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.VARIABLE_DECLARATOR,
        getName: variableDeclaratorConverter
    },
    {
        type: TOKEN_TYPES.ASSIGNMENT_EXPRESSION,
        getName: assignmentExpressionConverter,
        ignore: path => path.getStatementParent().isVariableDeclaration()
    },
    {
        type: TOKEN_TYPES.CALL_EXPRESSION,
        getName: callExpressionConverter,
        ignore: path => {
            const statementParent = path.getStatementParent();

            return (
                statementParent.isVariableDeclaration() ||
                statementParent.isConditional() ||
                path.parent.type === TOKEN_TYPES.ASSIGNMENT_EXPRESSION
            );
        }
    },
    {
        type: TOKEN_TYPES.UPDATE_EXPRESSION,
        getName: idleConverter,
        ignore: path => path.getStatementParent().isVariableDeclaration()
    },
    {
        type: TOKEN_TYPES.NEW_EXPRESSION,
        getName: idleConverter,
        ignore: path =>
            path.getStatementParent().isVariableDeclaration() ||
            path.parent.type === TOKEN_TYPES.ASSIGNMENT_EXPRESSION
    },
    {
        type: TOKEN_TYPES.LOOP,
        getName: loopConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.CONTINUE, //TODO: visual (breaks flow because of iteration skip)
        getName: continueConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.CONDITIONAL,
        getName: conditionalConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.SWITCH_STATEMENT, //TODO: visual
        getName: switchStatementConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.SWITCH_CASE, //TODO: visual
        getName: caseConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.BREAK, //TODO: visual
        getName: breakConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.TRY_STATEMENT, //TODO: visual
        getName: tryConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.CATCH_CLAUSE, //TODO: visual
        getName: catchConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.WITH_STATEMENT, //TODO: visual
        getName: withStatementConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.PROGRAM, //TODO: visual
        getName: programConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.THROW_STATEMENT, //TODO: visual (breaks flow because of error)
        getName: throwStatementConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.DEBUGGER_STATEMENT, //TODO: visual (makes it RED!)
        getName: debuggerConverter,
        body: true
    },

    //ES Harmony features
    {
        type: TOKEN_TYPES.IMPORT_DECLARATION, //TODO: visual display in separate way libs (npm modules) and local dependencies
        getName: importDeclarationConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER, //TODO: visual display it as dependencies to another module?
        getName: idleConverter
    },
    {
        type: TOKEN_TYPES.IMPORT_SPECIFIER,
        getName: idleConverter
    },
    {
        type: TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION, //TODO: visual display as main result of module, => |a = 12| can be as big arrow shape at left side of main body
        getName: exportDefaultDeclarationConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.EXPORT_NAMED_DECLARATION, //TODO: visual ' => |a = 12| ' can be as big arrow shape at left side of main body
        getName: exportNamedDeclarationConverter,
        body: true
    },
    {
        type: TOKEN_TYPES.CLASS_DECLARATION, //TODO: visual something like function declaration but more visible (class is bigger than function)
        getName: classDeclarationConverter, //if it has superClass -> render it with highlighting
        body: true
    }
];

/*
*
*
* TODO: start with visual for each new token
*
* TODO: fix visual displaying of recurrence function call (should be looped as a for-loop, but fromPoint of arrow is in the bottom of shape)
*
* TODO: finish declarations (add jsx and flow)
* */

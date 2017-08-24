import {TOKEN_TYPES} from '../shared/constants'
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

export const DefinitionsMap = [{
    type: TOKEN_TYPES.FUNCTION,
    getName: functionConverter,
    body: true
},{
    type: TOKEN_TYPES.RETURN, //TODO: visual
    getName: returnConverter,
    body: true
},{
    type: TOKEN_TYPES.VARIABLE_DECLARATOR,
    getName: variableDeclaratorConverter
},{
    type: TOKEN_TYPES.ASSIGNMENT_EXPRESSION,
    getName: assignmentExpressionConverter,
    ignore: path => path.getStatementParent().isVariableDeclaration()
},{
    type: TOKEN_TYPES.CALL_EXPRESSION,
    getName: callExpressionConverter,
    ignore: path => path.getStatementParent().isVariableDeclaration() ||
            path.parent.type === TOKEN_TYPES.ASSIGNMENT_EXPRESSION

},{
    type: TOKEN_TYPES.UPDATE_EXPRESSION,
    getName: idleConverter,
    ignore: path => path.getStatementParent().isVariableDeclaration()
},{
    type: TOKEN_TYPES.NEW_EXPRESSION,
    getName: idleConverter,
    ignore: path => path.getStatementParent().isVariableDeclaration() ||
        path.parent.type === TOKEN_TYPES.ASSIGNMENT_EXPRESSION
},{
    type: TOKEN_TYPES.LOOP,
    getName: loopConverter,
    body: true
},{
    type: TOKEN_TYPES.CONTINUE, //TODO: visual (breaks flow because of iteration skip)
    getName: continueConverter,
    body: true
},{
    type: TOKEN_TYPES.CONDITIONAL,
    getName: conditionalConverter,
    body: true
},{
    type: TOKEN_TYPES.SWITCH_STATEMENT,//TODO: visual
    getName: switchStatementConverter,
    body: true
},{
    type: TOKEN_TYPES.SWITCH_CASE,//TODO: visual
    getName: caseConverter,
    body: true
},{
    type: TOKEN_TYPES.BREAK,//TODO: visual
    getName: breakConverter,
    body: true
},{
    type: TOKEN_TYPES.TRY_STATEMENT,//TODO: visual
    getName: tryConverter,
    body: true
},{
    type: TOKEN_TYPES.CATCH_CLAUSE,//TODO: visual
    getName: catchConverter,
    body: true
},{
    type: TOKEN_TYPES.WITH_STATEMENT,//TODO: visual
    getName: withStatementConverter,
    body: true
},{
    type: TOKEN_TYPES.PROGRAM,//TODO: visual
    getName: programConverter,
    body: true
},{
    type: TOKEN_TYPES.THROW_STATEMENT,//TODO: visual (breaks flow because of error)
    getName: throwStatementConverter,
    body: true
},{
    type: TOKEN_TYPES.DEBUGGER_STATEMENT,//TODO: visual (makes it RED!)
    getName: debuggerConverter,
    body: true
}];

/*
*
* TODO: finish declarations
* ES5:
*
* - arrow function
* - import
* - export
* - class
* - for of
*
*
* TODO:
* start with visual for each new token
* */

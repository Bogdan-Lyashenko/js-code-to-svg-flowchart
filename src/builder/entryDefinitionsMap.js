import {ALIASES} from '../shared/constants'
import functionConverter, {returnConverter} from './converters/function';
import loopConverter from './converters/loop';
import conditionalConverter from './converters/conditional';
import idleConverter from './converters/idle';
import {switchStatementConverter, caseConverter, breakConverter} from './converters/switch';
import {catchConverter, tryConverter} from './converters/try';


export const DefinitionsMap = [{
    type: ALIASES.FUNCTION,
    getName: functionConverter,
    body: true
},{
    type: ALIASES.RETURN,
    getName: returnConverter,
    body: true
},{
    type: ALIASES.VARIABLE_DECLARATOR,
    getName: idleConverter
},{
    type: ALIASES.ASSIGNMENT_EXPRESSION,
    getName: idleConverter
},{
    type: ALIASES.CALL_EXPRESSION,
    getName: idleConverter,
    ignore: path => path.getStatementParent().isVariableDeclaration()
},{
    type: ALIASES.LOOP,
    getName: loopConverter,
    body: true
},{
    type: ALIASES.CONDITIONAL,
    getName: conditionalConverter,
    body: true
},{
    type: ALIASES.SWITCH_STATEMENT,
    getName: switchStatementConverter,
    body: true
},{
    type: ALIASES.SWITCH_CASE,
    getName: caseConverter,
    body: true
},{
    type: ALIASES.BREAK,
    getName: breakConverter,
    body: true
},{
    type: ALIASES.TRY_STATEMENT,
    getName: tryConverter,
    body: true
},{
    type: ALIASES.CATCH_CLAUSE,
    getName: catchConverter,
    body: true
}];

/*
*
* Core:
*
* SwitchStatement +
*
* TryStatement
*
* WhileStatement
*
* DoWhileStatement
*
* ForInStatement
*
* ReturnStatement
*
* WithStatement
*
* ContinueStatement
*
* Program
*
* RegExpLiteral
*
* -- core end --
*
*
*
 *
* */

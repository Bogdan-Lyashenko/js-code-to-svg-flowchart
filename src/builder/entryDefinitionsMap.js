import {ALIASES} from '../shared/constants'
import functionConverter from './converters/function';
import loopConverter from './converters/loop';
import conditionalConverter from './converters/conditional';
import idleConverter from './converters/idle';


export const DefinitionsMap = [{
    type: ALIASES.FUNCTION,
    getName: functionConverter,
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
}];

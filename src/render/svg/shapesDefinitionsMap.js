import { TOKEN_TYPES, MODIFIED_TYPES } from 'shared/constants';

import VerticalEdgedRectangle from './shapes/VerticalEdgedRectangle';
import Rectangle from './shapes/Rectangle';
import ConditionRhombus from './shapes/ConditionRhombus';
import LoopRhombus from './shapes/LoopRhombus';
import Circle from './shapes/Circle';
import ReturnStatement from './shapes/ReturnStatement';
import DestructedNode from './shapes/DestructedNode';
import ClassDeclaration from './shapes/ClassDeclaration';
import DebuggerStatement from './shapes/DebuggerStatement';

export const getShapeForNode = node => {
    switch (node.type) {
        case TOKEN_TYPES.FUNCTION:
            return VerticalEdgedRectangle;

        case TOKEN_TYPES.LOOP:
            return LoopRhombus;

        case TOKEN_TYPES.CONDITIONAL:
            return ConditionRhombus;

        case TOKEN_TYPES.RETURN:
            return ReturnStatement;

        case MODIFIED_TYPES.DESTRUCTED:
            return DestructedNode;

        case TOKEN_TYPES.CLASS_DECLARATION:
            return ClassDeclaration;

        case TOKEN_TYPES.DEBUGGER_STATEMENT:
            return DebuggerStatement;

        default:
            return Rectangle;
    }
};

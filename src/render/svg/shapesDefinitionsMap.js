import { TOKEN_TYPES } from 'shared/constants';

import VerticalEdgedRectangle from './shapes/VerticalEdgedRectangle';
import Rectangle from './shapes/Rectangle';
import ConditionRhombus from './shapes/ConditionRhombus';
import LoopRhombus from './shapes/LoopRhombus';
import Circle from './shapes/Circle';
import ReturnStatement from './shapes/ReturnStatement';

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

        default:
            return Rectangle;
    }
};

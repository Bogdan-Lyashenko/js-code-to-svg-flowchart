import {ALIASES} from '../../shared/constants';
import VerticalEdgedRectangle from './shapes/VerticalEdgedRectangle';
import Rectangle from './shapes/Rectangle';
import ConditionRhombus from './shapes/ConditionRhombus';
import LoopRhombus from './shapes/LoopRhombus';

export const getShapeForNode = (node, x, y) => {
    let shape;

    switch (node.type) {
        case ALIASES.FUNCTION:
            shape = VerticalEdgedRectangle;
            break;

        case ALIASES.LOOP:
            shape = LoopRhombus;
            break;

        case ALIASES.CONDITIONAL:
            shape = ConditionRhombus;
            break;

        default:
            shape = Rectangle;
    }

    return shape(node.name, {x, y});
};

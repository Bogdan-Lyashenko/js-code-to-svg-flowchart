import {ALIASES} from '../../shared/constants';
import VerticalEdgedRectangle from './shapes/VerticalEdgedRectangle';
import Rectangle from './shapes/Rectangle';
import Rhombus from './shapes/Rhombus';

export const getShapeForNode = (node, x, y) => {
    let shape;

    switch (node.type) {
        case ALIASES.FUNCTION:
            shape = VerticalEdgedRectangle;
            break;

        case ALIASES.LOOP:
        case ALIASES.CONDITIONAL:
            shape = Rhombus;
            break;

        default:
            shape = Rectangle;
    }

    return shape(node.name, {x, y});
};

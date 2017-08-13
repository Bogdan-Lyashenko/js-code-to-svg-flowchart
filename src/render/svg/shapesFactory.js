import {ALIASES} from '../../shared/constants';
import {getTheme} from './style/Theme';
import VerticalEdgedRectangle from './shapes/VerticalEdgedRectangle';
import Rectangle from './shapes/Rectangle';
import ConditionRhombus from './shapes/ConditionRhombus';
import LoopRhombus from './shapes/LoopRhombus';
import Circle from './shapes/Circle';
import ConnectionArrow from './ConnectionArrow';

export const getShapeForNode = (node, position, customStyleTheme = {}) => {
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

    const DefaultTheme = getTheme();
    return shape(node, position, { //XXX refactor duplication
        ...DefaultTheme[shape.getThemeFieldName()],
        ...(customStyleTheme[shape.getThemeFieldName()] || {})
    });
};

export const createRootCircle = (node, customStyleTheme = {}) => {
    const DefaultTheme = getTheme();
    const circleTheme = {
        ...DefaultTheme[Circle.getThemeFieldName()],//XXX refactor duplication
        ...(customStyleTheme[Circle.getThemeFieldName()] || {})
    };
    const { center, childOffset } = {
        ...(customStyleTheme.RootStartPoint || {}),
        ...DefaultTheme.RootStartPoint
    };

    const root = Circle(node, center, circleTheme);
    root.setChildOffsetPoint(childOffset);

    return root;
};

export const createConnectionArrow = (config, customStyleTheme = {}) => {
    const DefaultTheme = getTheme();
    return ConnectionArrow(config, {
        ...DefaultTheme.ConnectionArrow,//XXX refactor duplication
        ...(customStyleTheme.ConnectionArrow || {})
    });
};


export const buildShapesFactory = (customStyleTheme) => ({
    getShapeForNode: getShapeForNode

});

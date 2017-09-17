import {TOKEN_TYPES, ARROW_TYPE} from '../../shared/constants';
import {getTheme} from './appearance/StyleTheme';

import VerticalEdgedRectangle from './shapes/VerticalEdgedRectangle';
import Rectangle from './shapes/Rectangle';
import ConditionRhombus from './shapes/ConditionRhombus';
import LoopRhombus from './shapes/LoopRhombus';
import Circle from './shapes/Circle';
import ReturnStatement from './shapes/ReturnStatement';

import ConnectionArrow from './ConnectionArrow';

export const createShapeForNode = (node, position, customStyleTheme = {}) => {
    const shape = getShapeForNode(node),
        DefaultTheme = getTheme();

    return shape(node, position, { //TODO: refactor duplication
        ...DefaultTheme[shape.getThemeFieldName()],
        ...(customStyleTheme[shape.getThemeFieldName()] || {})
    });
};

const getShapeForNode = (node) => {
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

export const createRootCircle = (node, customStyleTheme = {}) => {
    const DefaultTheme = getTheme();
    const circleTheme = {
        ...DefaultTheme[Circle.getThemeFieldName()],//TODO: refactor duplication
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
    return ConnectionArrow(getConnectionConfig(config), {
        ...DefaultTheme.ConnectionArrow,//TODO:  refactor duplication
        ...(customStyleTheme.ConnectionArrow || {})
    });
};

export const getConnectionConfig = ({startPoint, endPoint, boundaryPoint, arrowType}) => {
    const DefaultTheme = getTheme();//TODO: refactor redundant calls for building Theme
    const theme = DefaultTheme.ConnectionArrow;

    const config = {
        linePoints: [],
        arrowPoint: {x: endPoint.x, y: endPoint.y},
        arrowType
    };

    switch (arrowType) {
        case ARROW_TYPE.RIGHT:
            config.linePoints = [
                {x: startPoint.x, y: startPoint.y}
            ];

            if (boundaryPoint) {
                config.linePoints = config.linePoints.concat([
                    {x: boundaryPoint.x, y: startPoint.y},
                    {x: boundaryPoint.x, y: endPoint.y},
                    {x: endPoint.x, y: endPoint.y}]);
            } else {
                config.linePoints = config.linePoints.concat([
                    {x: startPoint.x, y: endPoint.y},
                    {x: endPoint.x, y: endPoint.y}]);
            }
            break;

        case ARROW_TYPE.LEFT:
            config.linePoints = [
                {x: startPoint.x, y: startPoint.y},
                {x: boundaryPoint.x + theme.lineTurnOffset, y: startPoint.y},
                {x: boundaryPoint.x + theme.lineTurnOffset, y: endPoint.y},
                {x: endPoint.x - theme.lineTurnOffset, y: endPoint.y}
            ];
            break;

        case ARROW_TYPE.DOWN:
            config.linePoints = [
                {x: startPoint.x, y: startPoint.y},
                {x: boundaryPoint.x + theme.lineTurnOffset, y: startPoint.y},
                {x: boundaryPoint.x + theme.lineTurnOffset, y: endPoint.y - theme.lineTurnOffset},
                {x: endPoint.x, y: endPoint.y - theme.lineTurnOffset},
                {x: endPoint.x, y: endPoint.y},
            ];
            break;

    }

    return config;
};

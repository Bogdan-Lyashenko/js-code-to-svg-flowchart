import { ARROW_TYPE } from '../../shared/constants';
import { getShapeForNode } from './shapesDefinitionsMap';
import Circle from './shapes/Circle';
import ConnectionArrow, { getFieldName as getConnectionArrowFieldName } from './ConnectionArrow';

export const createShapeForNode = (node, position, styleTheme) => {
    const shape = getShapeForNode(node),
        shapeStyle = styleTheme[shape.getThemeFieldName()];

    return shape(node, position, shapeStyle);
};

export const createRootCircle = (node, styleTheme) => {
    const circleTheme = styleTheme[Circle.getThemeFieldName()];
    const { center, childOffset } = { ...styleTheme.RootStartPoint };

    const root = Circle(node, center, circleTheme);
    root.setChildOffsetPoint(childOffset);

    return root;
};

export const createConnectionArrow = (config, styleTheme) => {
    const connectionArrowStyle = styleTheme[getConnectionArrowFieldName()],
        arrowConfig = getConnectionConfig(config, connectionArrowStyle);

    return ConnectionArrow(arrowConfig, connectionArrowStyle);
};

export const getConnectionConfig = ({ startPoint, endPoint, boundaryPoint, arrowType }, theme) => {
    const config = {
        linePoints: [],
        arrowPoint: { x: endPoint.x, y: endPoint.y },
        arrowType
    };

    switch (arrowType) {
        case ARROW_TYPE.RIGHT:
            config.linePoints = [{ x: startPoint.x, y: startPoint.y }];

            if (boundaryPoint) {
                config.linePoints = config.linePoints.concat([
                    { x: boundaryPoint.x, y: startPoint.y },
                    { x: boundaryPoint.x, y: endPoint.y },
                    { x: endPoint.x, y: endPoint.y }
                ]);
            } else {
                config.linePoints = config.linePoints.concat([
                    { x: startPoint.x, y: endPoint.y },
                    { x: endPoint.x, y: endPoint.y }
                ]);
            }
            break;

        case ARROW_TYPE.LEFT:
            config.linePoints = [
                { x: startPoint.x, y: startPoint.y },
                { x: boundaryPoint.x + theme.lineTurnOffset, y: startPoint.y },
                { x: boundaryPoint.x + theme.lineTurnOffset, y: endPoint.y },
                { x: endPoint.x - theme.lineTurnOffset, y: endPoint.y }
            ];
            break;

        case ARROW_TYPE.DOWN:
            config.linePoints = [
                { x: startPoint.x, y: startPoint.y },
                { x: boundaryPoint.x + theme.lineTurnOffset, y: startPoint.y },
                {
                    x: boundaryPoint.x + theme.lineTurnOffset,
                    y: endPoint.y - theme.lineTurnOffset
                },
                { x: endPoint.x, y: endPoint.y - theme.lineTurnOffset },
                { x: endPoint.x, y: endPoint.y }
            ];
            break;
    }

    return config;
};

import { complexTraversal } from '../../shared/utils/traversalWithTreeLevelsPointer';
import { SVGBase } from './SVGBase';
import { createShapeForNode, createRootCircle, createConnectionArrow } from './shapesFactory';
import { TOKEN_TYPES, TOKEN_KEYS, ARROW_TYPE } from '../../shared/constants';

export const buildSVGObjectsTree = (flowTree, styleTheme) => {
    const svg = SVGBase();

    const shapeStructures = buildShapeStructures(flowTree, styleTheme);
    const connections = buildConnections(shapeStructures.root, styleTheme);

    svg.addShapes(shapeStructures.list).addShapes(shapeStructures.root);
    svg.addArrowConnections(connections);

    return svg;
};

export const buildShapeStructures = (flowTree, styleTheme) => {
    const root = createRootCircle(flowTree, styleTheme),
        position = { ...root.getChildOffsetPoint() },
        shapesList = [];

    complexTraversal(
        flowTree,
        root,
        (parentNode, parentShape) => {
            position.x += parentShape.getChildOffsetPoint().x;
        },
        (node, parentShape) => {
            //TODO: refactor, move cases out of func, it will to many of them soon
            if (parentShape.getNodeType() === TOKEN_TYPES.CONDITIONAL && node.key === TOKEN_KEYS.ALTERNATE && !parentShape.checkIfChildExist(TOKEN_KEYS.ALTERNATE)) {
                const alternatePoint = parentShape.getAlternativeBranchChildOffsetPoint();
                position.x = alternatePoint.x + parentShape.getMargin();
                position.y = alternatePoint.y;
            }

            const shape = createShapeForNode(node, { x: position.x, y: position.y }, styleTheme);

            position.x = shape.getPosition().x;
            position.y = shape.getPosition().y;

            shapesList.push(shape);
            parentShape.connectChild(shape);
            position.y += shape.getChildOffsetPoint().y;

            return shape;
        },
        (parentNode, parentShape) => {
            if (parentNode.type === TOKEN_TYPES.CONDITIONAL) {
                position.y = parentShape.getChildBoundaries().max.y + parentShape.getMargin();
            }

            position.x = parentShape.getPosition().x;
        }
    );

    return {
        list: shapesList,
        root: root
    };
};

export const buildConnections = (shapesTree, styleTheme) => {
    const connections = [],
        pushArrow = config => {
            const connection = createConnectionArrow(config, styleTheme);
            connections.push(connection);

            return connection;
        };

    let latestShape = null,
        startShape = null,
        latestParentShape = null;

    complexTraversal(
        shapesTree,
        shapesTree,
        parentShape => {},
        (shape, parentShape) => {
            startShape = parentShape;
            latestShape = shape;

            //TODO: add const startShape = ; because it's not always parent (like `continue` in loop actually change flow)

            const config = {
                endPoint: shape.getToPoint(),
                arrowType: ARROW_TYPE.RIGHT
            };

            if (shape.getNodeKey() === TOKEN_KEYS.ALTERNATE) {
                const boundaryPoint = parentShape.getAlternativeBranchChildOffsetPoint();

                config.startPoint = parentShape.getAlternateFromPoint();
                config.boundaryPoint = { x: boundaryPoint.x };
            } else {
                config.startPoint = startShape.getFromPoint();
            }

            shape.assignConnectionArrow(pushArrow(config));

            return shape;
        },
        parentShape => {
            if (parentShape.getNodeType() !== TOKEN_TYPES.LOOP) return;

            const { max } = parentShape.getChildBoundaries();

            parentShape.assignLoopedConnectionArrow(
                pushArrow({
                    startPoint: latestShape.getBackPoint(),
                    endPoint: parentShape.getMidPoint(),
                    boundaryPoint: { x: max.x },
                    arrowType: ARROW_TYPE.DOWN
                })
            );
        },
        {
            getBody: node => node.getBody()
        }
    );

    return connections;
};

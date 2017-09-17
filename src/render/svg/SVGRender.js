import {complexTraversal} from '../../shared/utils/traversalWithTreeLevelsPointer';
import {SVGBase} from './SVGBase';
import {createShapeForNode, createRootCircle, createConnectionArrow} from './shapesFactory';

import {TOKEN_TYPES, TOKEN_KEYS, ARROW_TYPE} from '../../shared/constants';

export const buildSVGObjectsTree = (flowTree, customStyleTheme) => {
    const svg = SVGBase();

    const shapeStructures = buildShapeStructures(flowTree, customStyleTheme);
    const connections = buildConnections(shapeStructures.root, customStyleTheme);

    svg.add(shapeStructures.list).add(shapeStructures.root);
    svg.add(connections);

    return svg;
};

export const buildShapeStructures = (flowTree, customStyleTheme) => {
    const root = createRootCircle(flowTree, customStyleTheme),
        position = {...root.getChildOffsetPoint()},
        shapesList = [];

    complexTraversal(flowTree, root, (parentNode, parentShape) => {
        position.x += parentShape.getChildOffsetPoint().x;
    }, (node, parentShape) => {

        if (parentShape.getNodeType() === TOKEN_TYPES.CONDITIONAL &&
            node.key === TOKEN_KEYS.ALTERNATE &&
            !parentShape.checkIfChildExist(TOKEN_KEYS.ALTERNATE)) {

            const alternatePoint = parentShape.getAlternativeBranchChildOffsetPoint();
            position.x = alternatePoint.x + parentShape.getMargin();
            position.y = alternatePoint.y;
        }

        const shape = createShapeForNode(node, {x: position.x, y: position.y}, customStyleTheme);

        position.x = shape.getPosition().x;
        position.y = shape.getPosition().y;

        shapesList.push(shape);
        parentShape.connectChild(shape);
        position.y += shape.getChildOffsetPoint().y;

        return shape;
    }, (parentNode, parentShape) => {
        if (parentNode.type === TOKEN_TYPES.CONDITIONAL) {
            position.y = parentShape.getChildBoundaries().max.y + parentShape.getMargin();
        }

        position.x = parentShape.getPosition().x;
    });

    return {
        list: shapesList,
        root: root
    };
};

export const buildConnections = (shapesTree, customStyleTheme) => {
    const connections = [],
        pushArrow = (config) => { connections.push(createConnectionArrow(config, customStyleTheme)); };

    let latestShape = null,
        startShape = null,
        latestParentShape = null;

    complexTraversal(shapesTree, shapesTree, (parentShape) => {

    }, (shape, parentShape) => {
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
            config.boundaryPoint = {x: boundaryPoint.x};
        } else {
            config.startPoint = startShape.getFromPoint();
        }

        pushArrow(config);

        return shape;
    }, (parentShape) => {
        if (parentShape.getNodeType() !== TOKEN_TYPES.LOOP) return;

        const {max} = parentShape.getChildBoundaries();

        pushArrow({
            startPoint: latestShape.getBackPoint(),
            endPoint: parentShape.getMidPoint(),
            boundaryPoint: {x: max.x},
            arrowType: ARROW_TYPE.DOWN
        });
    }, {
        getBody: node => node.getBody()
    });

    return connections;
};

export const render = (tree) => {
    let svgString = ``;

    [].concat(tree).forEach((node)=> {
        if (node.children && node.children.length) {
            svgString += node.print(render(node.children));
        } else {
            svgString += node.print();
        }
    });

    return svgString;
};

export const createSVGRender = (customStyleTheme = {}) => {
    let svgObjectsTree = [],
        theme = {...customStyleTheme};

    return {
        buildShapesTree: (flowTree) => {
            svgObjectsTree = buildSVGObjectsTree(flowTree, theme);
        },

        setStyles: () => {},

        focus: () => {},

        blur: () => {},

        render: () => render(svgObjectsTree)
    }
};

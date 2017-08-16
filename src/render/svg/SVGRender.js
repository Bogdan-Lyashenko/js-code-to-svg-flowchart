import {complexTraversal} from '../../shared/utils/traversalWithTreeLevelsPointer';
import {SVGBase} from './SVGBase';
import {createShapeForNode, createRootCircle, createConnectionArrow} from './shapesFactory';

import {ALIASES, CONDITIONAL_KEYS, ARROW_TYPE} from '../../shared/constants';

export const buildSVGObjectsTree = (flowTree, customStyleTheme) => {
    const svg = SVGBase();

    const shapeStructures = buildShapeStructures(flowTree, customStyleTheme);
    const connections = buildConnections(shapeStructures.root, customStyleTheme);


    //1) fix positioning for condition block
    //2) fix arrows

    svg.add(shapeStructures.list).add(shapeStructures.root);

    svg.add(connections);

    return svg;
};

export const buildShapeStructures = (flowTree, customStyleTheme) => {
    const root = createRootCircle(flowTree, customStyleTheme);

    const position = {...root.getChildOffsetPoint()};
    const shapesList = [];

    complexTraversal(flowTree, root, (parentNode, parentShape) => {
        position.x += parentShape.getChildOffsetPoint().x;
    }, (node, parentShape) => {

        if (parentShape.node.type === ALIASES.CONDITIONAL &&
            node.key === CONDITIONAL_KEYS.ALTERNATE &&
            parentShape.isFirstChildByKey(CONDITIONAL_KEYS.ALTERNATE)) {

            const alternatePoint = parentShape.getAlternativeBranchChildOffsetPoint();
            position.x = alternatePoint.x;
            position.y = alternatePoint.y;
        }

        const shape = createShapeForNode(node, {x: position.x, y: position.y}, customStyleTheme);

        position.x = shape.position.x;
        position.y = shape.position.y;

        shapesList.push(shape);
        parentShape.body.push(shape);
        position.y += shape.getChildOffsetPoint().y;

        return shape;
    }, (parentNode, parentShape) => {
        if (parentNode.type === ALIASES.CONDITIONAL) {
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

    let latestShape = null;

    complexTraversal(shapesTree, shapesTree, (parentShape) => {

    }, (shape, parentShape) => {
        latestShape = shape;

        const config = {
            endPoint: shape.getToPoint(),
            arrowType: ARROW_TYPE.RIGHT
        };

        //TODO: fix else if, counts as a body
        if (shape.node.key === CONDITIONAL_KEYS.ALTERNATE) {
            const boundaryPoint = parentShape.getAlternativeBranchChildOffsetPoint();

            config.startPoint = parentShape.getAlternateFromPoint();
            config.boundaryPoint = {x: boundaryPoint.x - parentShape.getMargin()};
        } else {
            config.startPoint = parentShape.getFromPoint();
        }

        pushArrow(config);

        return shape;
    }, (parentShape) => {
        if (parentShape.node.type !== ALIASES.LOOP) return;

        const {max} = parentShape.getChildBoundaries();

        pushArrow({
            startPoint: latestShape.getBackPoint(),
            endPoint: parentShape.getRhombusMidPoint(),
            boundaryPoint: {x: max.x},
            arrowType: ARROW_TYPE.DOWN
        });
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

export const createSVGRender = (tree, customStyleTheme = {}) => {
    const svgObjectsTree = buildSVGObjectsTree(tree, customStyleTheme);

    return {
        getSVGObjectsTree: () => svgObjectsTree,
        render: () => render(svgObjectsTree)
    }
};

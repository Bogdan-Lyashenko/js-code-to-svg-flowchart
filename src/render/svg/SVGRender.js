import {complexTraversal} from '../../shared/utils/traversalWithTreeLevelsPointer';
import {SVGBase} from './SVGBase';
import {getShapeForNode, createRootCircle, createConnectionArrow} from './shapesFactory';

import {ALIASES} from '../../shared/constants';

export const buildSVGObjectsTree = (flowTree, customStyleTheme) => {
    const svg = SVGBase();

    const shapeStructures = buildShapeStructures(flowTree, customStyleTheme),
        connections = buildConnections(shapeStructures.root, customStyleTheme);

    svg.add(connections).add(shapeStructures.list).add(shapeStructures.root);

    return svg;
};

export const buildShapeStructures = (flowTree, customStyleTheme) => {
    const root = createRootCircle(flowTree, customStyleTheme);

    const position = {...root.getChildOffsetPoint()};
    const shapesList = [];

    complexTraversal(flowTree, root, (parentNode, parentShape) => {
        position.x += parentShape.getChildOffsetPoint().x;
    }, (node, parentShape) => {
        const shape = getShapeForNode(node, {x: position.x, y: position.y}, customStyleTheme);

        shapesList.push(shape);
        parentShape.body.push(shape);
        position.y += shape.getChildOffsetPoint().y;

        return shape;
    }, (parentNode, parentShape) => {
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

        pushArrow({ startPoint: parentShape.getFromPoint(), endPoint: shape.getToPoint() });

        return shape;
    }, (parentShape) => {
        if (parentShape.node.type !== ALIASES.LOOP) return;

        const {max} = parentShape.getChildBoundaries();

        pushArrow({
            startPoint: latestShape.getBackPoint(),
            endPoint: parentShape.getBackPoint(),
            boundaryPoint: {x: max.x}
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

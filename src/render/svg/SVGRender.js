import {complexTraversal} from '../../shared/utils/traversalWithTreeLevelsPointer';
import {SVGBase} from './SVGBase';
import {getShapeForNode} from './shapesFactory';
import ConnectionArrow, {getConnectionConfig} from './shapes/ConnectionArrow';
import Circle from './shapes/Circle';
import {ALIASES} from '../../shared/constants';


export const buildSVGObjectsTree = (flowTree) => {
    const svg = SVGBase();

    const shapeStructures = buildShapeStructures(flowTree),
        connections = buildConnections(shapeStructures.root);

    svg.add(connections).add(shapeStructures.list).add(shapeStructures.root);

    return svg;
};

export const buildShapeStructures = (flowTree) => {
    const root = Circle(flowTree, {x: 15, y: 15});
    root.setChildOffsetPoint({x: 20, y: 50});

    const position = {...root.getChildOffsetPoint()};
    const shapesList = [];


    complexTraversal(flowTree, root, (parentNode, parentShape) => {
        position.x += parentShape.getChildOffsetPoint().x;
    }, (node, parentShape) => {
        const shape = getShapeForNode(node, position.x, position.y);

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

export const buildConnections = (shapesTree) => {
    const connections = [];
    let latestShape = null;

    complexTraversal(shapesTree, shapesTree, (parentShape) => {

    }, (shape, parentShape) => {
        latestShape = shape;

        connections.push(ConnectionArrow(
            getConnectionConfig(parentShape.getFromPoint(), shape.getToPoint())
        ));

        return shape;
    }, (parentShape) => {
        if (parentShape.node.type !== ALIASES.LOOP) return;

        const {max} = parentShape.getChildBoundaries();

        connections.push(ConnectionArrow(
            getConnectionConfig(latestShape.getBackPoint(), parentShape.getBackPoint(), {x: max.x})
        ));
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

export const createSVGRender = (tree) => {
    const svgObjectsTree = buildSVGObjectsTree(tree);

    return {
        getSVGObjectsTree: () => svgObjectsTree,
        render: () => render(svgObjectsTree)
    }
};

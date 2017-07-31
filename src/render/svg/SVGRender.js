import {complexTraversal} from '../../shared/utils/traversalWithTreeLevelsPointer';
import {SVGBase} from './SVGBase';
import {getShapeForNode} from './shapesFactory';
import ConnectionArrow, {getConnectionConfig} from './shapes/ConnectionArrow';
import Circle from './shapes/Circle';
import {ALIASES} from '../../shared/constants';


export const buildSVGObjectsTree = (flowTree) => {
    const svg = SVGBase(),
        root = Circle('', {x: 15, y: 15});

    root.setChildOffsetPoint({x: 20, y: 50});

    const blocks = buildBlocks(root, flowTree),
        connections = buildConnections(root, flowTree, blocks);

    svg.add(connections).add(blocks).add(root);

    return svg;
};

export const buildBlocks = (root, flowTree) => {
    const position = {...root.getChildOffsetPoint()};
    const blocks = [];

    complexTraversal(flowTree, root, (parentNode, parentShape) => {
        position.x += parentShape.getChildOffsetPoint().x;
    }, (node) => {
        const shape = getShapeForNode(node, position.x, position.y);
        blocks.push(shape);
        position.y += shape.getChildOffsetPoint().y;

        return shape;
    }, (parentNode, parentShape) => {
        position.x = parentShape.getPosition().x;
    });

    return blocks;
};

export const buildConnections = (root, flowTree, blocks) => {
    const connections = [];
    let blocksIndex = 0;

    complexTraversal(flowTree, root, (parentNode, parentShape) => {

    }, (node, parentShape) => {
        const block = blocks[blocksIndex];
        connections.push(ConnectionArrow(
            getConnectionConfig(parentShape.getFromPoint(), block.getToPoint())
        ));

        blocksIndex++;
        return block;
    }, (parentNode, parentShape) => {
        if (parentNode.type !== ALIASES.LOOP) return;

        const block = blocks[blocksIndex - 1];
        connections.push(ConnectionArrow(
            getConnectionConfig(block.getBackPoint(), parentShape.getBackPoint())
        ));
    });

    return connections;
};

export const render = (tree) => {
    let svgString = ``;

    [].concat(tree).forEach((node)=> {
        if (node.body && node.body.length) {
            svgString += node.print(render(node.body));
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

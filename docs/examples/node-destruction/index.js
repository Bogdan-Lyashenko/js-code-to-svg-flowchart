const {
    createFlowTreeBuilder,
    createFlowTreeModifier,
    convertFlowTreeToSvg
} = window.js2flowchart;

const flowTreeBuilder = createFlowTreeBuilder();
const flowTree = flowTreeBuilder.build(code);
const flowTreeModifier = createFlowTreeModifier();

flowTreeModifier.destructNodeTree((node) => node.name.indexOf('.forEach') !== -1, 'and print list...');
flowTreeModifier.applyToFlowTree(flowTree);

document.getElementById('svgImage').innerHTML = convertFlowTreeToSvg(flowTree);

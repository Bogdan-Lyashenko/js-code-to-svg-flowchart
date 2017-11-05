const JS2FlowChart = window['js2flowchart'];

const flowTreeBuilder = JS2FlowChart.createFlowTreeBuilder();
const flowTree = flowTreeBuilder.build(code);
const flowTreeModifier = JS2FlowChart.createFlowTreeModifier();

flowTreeModifier.registerNewModifier((node)=> node.name.includes('(i) =>'), {
    body: [{
        name: '...only log i when it is bigger than 2..',
        type: JS2FlowChart.MODIFIED_TYPES.CUSTOM
    }]
});
flowTreeModifier.applyToFlowTree(flowTree);

const svgRender = JS2FlowChart.createSVGRender();
const shapesTree = svgRender.buildShapesTree(flowTree);

document.getElementById('svgImage').innerHTML = shapesTree.print();

const {
    createFlowTreeBuilder,
    createFlowTreeModifier,
    convertFlowTreeToSvg,
    MODIFIER_PRESETS
} = window.js2flowchart;

const flowTreeBuilder = createFlowTreeBuilder(),
    flowTree = flowTreeBuilder.build(code);

const flowTreeModifier = createFlowTreeModifier();

flowTreeModifier.setModifier(MODIFIER_PRESETS.es5ArrayIterators);
flowTreeModifier.applyToFlowTree(flowTree);

const svg = convertFlowTreeToSvg(flowTree);

document.getElementById('svgImage').innerHTML = svg;

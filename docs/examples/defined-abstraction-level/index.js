const {
    ABSTRACTION_LEVELS,
    createFlowTreeBuilder,
    convertFlowTreeToSvg
} = window.js2flowchart;

const flowTreeBuilder = createFlowTreeBuilder();

//you can pass one level or multiple levels in [] as well
flowTreeBuilder.setAbstractionLevel([
    ABSTRACTION_LEVELS.IMPORT,
    ABSTRACTION_LEVELS.EXPORT
]);

const flowTree = flowTreeBuilder.build(code),
    svg = convertFlowTreeToSvg(flowTree);

document.getElementById('svgImage').innerHTML = svg;

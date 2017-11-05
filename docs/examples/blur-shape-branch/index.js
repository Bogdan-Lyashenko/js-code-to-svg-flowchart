const {
    convertCodeToFlowTree,
    createSVGRender,
    createShapesTreeEditor
} = window.js2flowchart;

const flowTree = convertCodeToFlowTree(code),
    svgRender = createSVGRender();
shapesTree = svgRender.buildShapesTree(flowTree);

const shapesTreeEditor = createShapesTreeEditor(shapesTree);

shapesTreeEditor.blurShapeBranch(
    (shape) => shape.getName() === '(devFlag)'
);

const svg = shapesTreeEditor.print();

document.getElementById('svgImage').innerHTML = svg;

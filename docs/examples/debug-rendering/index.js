const {convertCodeToFlowTree, createSVGRender, createShapesTreeEditor} = window.js2flowchart;

const svgRender = createSVGRender();

const shapesTree = svgRender.buildShapesTree(convertCodeToFlowTree(code));
const shapesTreeEditor = createShapesTreeEditor(shapesTree);

shapesTreeEditor.applyShapeStyles(
    shape => shape.getNodePathId() === 'NODE-ID:|THIS.NAME=N|TCCP-', {
        fillColor: '#90caf9'
    });

const svg = shapesTreeEditor.print({debug: true});

document.getElementById('svgImage').innerHTML = svg;

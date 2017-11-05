const {createSVGRender, convertCodeToFlowTree} = window.js2flowchart;

const flowTree = convertCodeToFlowTree(code),
    svgRender = createSVGRender();

//applying another theme for render
svgRender.applyLightTheme();

const svg = svgRender.buildShapesTree(flowTree).print();

document.getElementById('svgImage').innerHTML = svg;

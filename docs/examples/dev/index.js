const { createSVGRender, convertCodeToFlowTree } = window.js2flowchart;

const flowTree = convertCodeToFlowTree(`const longNamelongNamelongNamelongNamelongName = 1`),
    svgRender = createSVGRender();

//applying another theme for render
svgRender.applyTheme({
    common: {
        maxNameLength: 10
    }
});

const svg = svgRender.buildShapesTree(flowTree).print();

document.getElementById('svgImage').innerHTML = svg

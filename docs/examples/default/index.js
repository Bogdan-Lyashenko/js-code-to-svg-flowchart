const {
    convertCodeToSvg
} = window['js2flowchart'];

document.getElementById('svgImage').innerHTML = convertCodeToSvg(code);

(function () {
    const worker = new Worker('./worker.js'),
        svgImage = document.getElementById('svgImage'),
        codeEditor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
            lineNumbers: true,
            mode:  'javascript',
            theme: 'elegant'
        });

    codeEditor.on('change', _.debounce(() => {
        worker.postMessage({ code: codeEditor.getValue() });
    }), 500);

    worker.onmessage = function(message) {
        svgImage.innerHTML = message.data.svg;
    };

    worker.postMessage({ code: codeEditor.getValue() });
})();

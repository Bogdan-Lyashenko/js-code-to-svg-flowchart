(function () {
    const worker = new Worker('./worker.js'),
        svgImage = document.getElementById('svgImage'),
        downloadFile = document.getElementById('downloadFile'),
        codeEditor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
            lineNumbers: true,
            mode:  'javascript',
            theme: 'elegant'
        });

    codeEditor.on('change', _.debounce(() => {
        worker.postMessage({ code: codeEditor.getValue() });
    }), 500);

    downloadFile.addEventListener('click', ()=> {
        const fileName = `flowchart_${(new Date().toString()).replace(/ /g,'_')}.svg`,
            file = new File([svgImage.innerHTML], fileName, {type: 'image/svg+xml;charset=utf-8'});

        window.saveAs(file, fileName);
    });

    worker.onmessage = function({data}) {
        if (data.svg) {
            svgImage.innerHTML = data.svg;
            document.body.style.borderTop = 'none';
        } else if (data.error) {
            document.body.style.borderTop = '5px solid #F44336';
        }
    };

    worker.postMessage({ code: codeEditor.getValue() });
})();

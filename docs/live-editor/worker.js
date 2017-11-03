importScripts('../../dist/js2flowchart.js');

self.onmessage = function(message) {
    const code = message.data.code;
    let svg = '',
        shouldUpdate = true;
    try {
        shouldUpdate = true;
        svg = js2flowchart.convertCodeToSvg(code);
    } catch (e) {
        shouldUpdate = false;
        console.log(e);
    } finally {
        shouldUpdate && self.postMessage({
            svg
        });
    }

};



# js2flowchart

js2flowchart is a tool for creating SVG flowcharts from JavaScript code.

## [Demo](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor/index.html)
Check out live [<b>code editor</b>](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor/index.html), paste your code and <b>download SVG file</b> of flowchart! 

### What does js2flowchart do?
js2flowchart takes your JS code and returns SVG flowchart. 
For example, here is simple code function for classic case Binary search

```javascript
function indexSearch(list, element) {
    let currentIndex,
        currentElement,
        minIndex = 0,
        maxIndex = list.length - 1;

    while (minIndex <= maxIndex) {
        currentIndex = Math.floor(maxIndex + maxIndex) / 2;
        currentElement = list[currentIndex];

        if (currentElement === element) {
            return currentIndex;
        }

        if (currentElement < element) {
            minIndex = currentIndex + 1;
        }

        if (currentElement > element) {
            maxIndex = currentIndex - 1;
        }
    }

    return -1;
}
```
pass it to ```js2flowchart.convertCodeToSvg``` method. Here what we get.

<img src="/docs/examples/default/flowchart.png" width="600"/>

### How to get started? 
> yarn add js2flowchart

### API


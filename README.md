> Why? While I've been working on [Under-the-hood-ReactJS](https://github.com/Bogdan-Lyashenko/Under-the-hood-ReactJS) I spent enormous amount of time on creating of scheme. Each change in code or flowchart affects all entire scheme, just redundant, repeated manual work. It took almost a month just to create [that](https://bogdan-lyashenko.github.io/Under-the-hood-ReactJS/stack/images/intro/all-page-stack-reconciler.svg).

How we can automate *flowchart drawing from JS code*? Imagine a library which takes any JS code and returns you SVG flowchart, works on client and server. Allows you easily adjust styles scheme for your context. Demonstrate your code logic from different depth without manual code change by usage of different abstractions levels. Highlighting, blurring, hiding scheme nodes, destructing whole blocks, custom modifiers for your needs etc.            

# js2flowchart.js

js2flowchart is a tool for creating SVG flowcharts from JavaScript code. To get started install 
> yarn add js2flowchart

or have a look at online editor below.

## [Demo](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor/index.html)
Check out live [<b>code editor</b>](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor/index.html), paste your code and <b>download SVG file</b> of flowchart!

[<img src="/docs/live-editor/demo.gif" width="700">](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor/index.html) 

### What does js2flowchart do?
js2flowchart takes your JS code and returns SVG flowchart, works on client/server, support ES6.

Main features:
- <b>defined abstractions levels</b> to render only import/exports, classes/function names, function dependencies to learn/explain the code step by step.
- <b>custom abstractions levels support</b> create your own one
- <b>presentation generator</b> to generate list of SVGs in order to different abstractions levels
- <b>defined flow tree modifiers</b> to map well-known APIs like i.e. [].map, [].forEach, [].filter to Loop structure on scheme etc.
- <b>destruction modifier</b> to replace block of code with one shape on scheme
- <b>custom flow tree modifiers support</b> create your own one
- <b>flow tree ignore filter</b> to omit some code nodes completely i.e. log lines
- <b>focus node or entire code logic branch</b> to highlight important section on scheme
- <b>blur node or entire code logic branch</b> to hide less-important stuff 
- <b>defined styles themes supports</b> choose one you like
- <b>custom themes support</b> create your own one which fits your context colors better
- <b>custom colors and styles support</b> provides handy API to change specific styles without boilerplate    
 
### API and examples

#### Default

Here is a code function for classic case Binary search

```javascript
const code = `function indexSearch(list, element) {
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
}`;
```
let's convert it to SVG. 
```javascript
const svg = js2flowchart.convertCodeToSvg(code);
```
Here what we get, easy enought.

<img src="/docs/examples/default/flowchart.png" width="600"/>

### Under the hood
Main stages:
- get AST from code, [Babylon](https://github.com/babel/babylon) parser is used (develops by Babel team)
- convert AST to FlowTree, remove and combing nodes ([FlowTreeBuilder](src/builder/FlowTreeBuilder.js))
  - apply modifiers ([FlowTreeModifier](src/builder/FlowTreeModifier.js))
- create SVG objects based on FlowTree ([SVGRender](src/render/svg/SVGRender.js))
  - apply ShapesTreeEditor
  - apply theme ([see themes](src/render/svg/appearance/themes))
- print SVG objects to XML string


### Things planned TODO
- Full CLI support
- JSX support
- Flow support
- TypeScript support
- Multi files support
- Webstorm plugin
- Chrome extension for dev-tools 

### Contributing
Feel free to file an issue if it doesn't work for your code sample (please add 'breaking' lines of code if it's possible to identify) or for any other things you think can be improved. 
Highly appreciated if you can join and help with any TODOs above. Thanks. 
 
### License 
MIT license 

### Version 
First alpha shoot! Take it easy.


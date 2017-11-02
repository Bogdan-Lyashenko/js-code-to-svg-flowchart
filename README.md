> Why? While I've been working on [Under-the-hood-ReactJS](https://github.com/Bogdan-Lyashenko/Under-the-hood-ReactJS) I spent enormous amount of time on creating schemes. Each change in code or flowchart affects all entire scheme instantly, just redundant, repeated manual work. It took almost a month just to create [that big flowchart](https://bogdan-lyashenko.github.io/Under-the-hood-ReactJS/stack/images/intro/all-page-stack-reconciler.svg).

How we can automate *flowchart drawing from JS code*? Imagine a library which takes any JS code and returns you SVG flowchart, works on client and server. Allows you easily adjust styles scheme for your context. Demonstrate your code logic from different depth without manual code change by usage of different abstractions levels. Highlighting, blurring, hiding scheme nodes, destructing whole blocks, custom modifiers for your needs etc.            

# js2flowchart.js

js2flowchart is a tool for creating SVG flowcharts from JavaScript code. To get started install package from NPM
> yarn add js2flowchart

or try it right away at [codepen sample](https://codepen.io/Bogdan-Lyashenko/pen/XzmzNv), or play with the demo below.

## [Demo](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor/index.html)
Check out live [**code editor**](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor/index.html), paste your code and **download SVG file** of flowchart!

[<img src="/docs/live-editor/demo.gif" width="700">](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor/index.html) 

### What does js2flowchart do?
js2flowchart takes your JS code and returns SVG flowchart, works on client/server, support ES6.

Main features:
- **defined abstractions levels** to render only import/exports, classes/function names, function dependencies to learn/explain the code step by step.
- **custom abstractions levels support** create your own one
- **presentation generator** to generate list of SVGs in order to different abstractions levels
- **defined flow tree modifiers** to map well-known APIs like i.e. [].map, [].forEach, [].filter to Loop structure on scheme etc.
- **destruction modifier** to replace block of code with one shape on scheme
- **custom flow tree modifiers support** create your own one
- **flow tree ignore filter** to omit some code nodes completely i.e. log lines
- **focus node or entire code logic branch** to highlight important section on scheme
- **blur node or entire code logic branch** to hide less-important stuff 
- **defined styles themes supports** choose one you like
- **custom themes support** create your own one which fits your context colors better
- **custom colors and styles support** provides handy API to change specific styles without boilerplate    

Use cases:
- **explain/document** your code by flowcharts
- **learn** other's code by visual understanding 
- **create** flowcharts for any process simply described by valid JS syntax
 
### API and examples
You can find sources for examples explained below in [docs directory](/docs).

**In examples only** js2flowchart library included explicitly, by ```<script>``` tag and accessed by global variable from ```window``` **to make it simpler to run for you without boilerplate**. But feel free to use it through ES6 modules as well, when you have Babel&Webpack local server configured.    
```javascript
/**
* Access APIs when js2flowchart injected into HTML page
*/
const {convertFlowTreeToSvg, convertCodeToFlowTree} = window.js2flowchart;

/**
* or import from node_modules 
*/ 
import {convertFlowTreeToSvg, convertCodeToFlowTree} from 'js2flowchart';//way 1
import * as js2flowchart from 'js2flowchart';//way 2
```

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
let's convert it to SVG(the simplest way): 
```javascript
const svg = js2flowchart.convertCodeToSvg(code);
```
Result:

<img src="/docs/examples/default/flowchart.png" width="500"/>

If you need to modify default behavior you can split ```js2flowchart.convertCodeToSvg``` into two building block: 
- flow tree building
- shapes printing

```javascript
const {convertFlowTreeToSvg, convertCodeToFlowTree} = js2flowchart;

const flowTree = convertCodeToFlowTree(code);

const svg = convertFlowTreeToSvg(flowTree);//XML string
```

or when you need full control create main instances manually:
```javascript
const {createFlowTreeBuilder, createSVGRender} = js2flowchart;

const flowTreeBuilder = createFlowTreeBuilder(),
    svgRender = createSVGRender();

const flowTree = flowTreeBuilder.build(code),
    shapesTree = svgRender.buildShapesTree(flowTree);

const svg = shapesTree.print();//XML string
```  

See the example running [here](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/examples/default/index.html) or check out complete source code [of it](/docs/examples/default/index.html).  

#### Defined abstraction level

What is called 'abstraction level'? Let's say you would like to omit some details, like, e.g. for given module you are interested only in what the module ```exports```, or, what classes it contains.
There is a list of defined levels you can do that with. Accessible by ```ABSTRACTION_LEVELS``` interface. 
- ```FUNCTION```
- ```FUNCTION_DEPENDENCIES```
- ```CLASS```
- ```IMPORT```
- ```EXPORT```

Let's take example with module imports&exports. Below is not real code of some ```print-util.js```.
```javascript
const code = `
    import {format, trim} from 'formattier';
    import {log} from 'logger';

    const data = [];

    export default print = (list) => {
        list.forEach(i => {
            console.log(i);
        });
    }

    export const formatString = (str) => formatter(str);
    export const MAX_STR_LENGTH = 15;
`;
```
we need to instantiate ```flowTreeBuilder``` and assign abstraction level on it.
 
```javascript
    const {
        ABSTRACTION_LEVELS,  createFlowTreeBuilder, convertFlowTreeToSvg
    } = js2flowchart;

    const flowTreeBuilder = createFlowTreeBuilder();

    //you can pass one level or multiple levels
    flowTreeBuilder.setAbstractionLevel([
        ABSTRACTION_LEVELS.IMPORT,
        ABSTRACTION_LEVELS.EXPORT
    ]);

    const flowTree = flowTreeBuilder.build(code);
    const svg = convertFlowTreeToSvg(flowTree);
```
 
Result:

<img src="/docs/examples/defined-abstraction-level/flowchart.png" width="400"/>

See the example running [here](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/examples/defined-abstraction-level/index.html) or check out complete source code [of it](/docs/examples/defined-abstraction-level/index.html).

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


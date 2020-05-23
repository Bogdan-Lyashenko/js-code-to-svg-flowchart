> Why? While I've been working on [Under-the-hood-ReactJS](https://github.com/Bogdan-Lyashenko/Under-the-hood-ReactJS) I spent enormous amount of time on creating schemes. Each change in code or flowchart affects all entire scheme instantly, forcing you to move and align 'broken pieces'. Just repeated manual work...

> If you like this project, follow me on Twitter [@bliashenko](https://twitter.com/bliashenko) to hear about things I am building.

### For multi-files support checkout [codecrumbs project](https://github.com/Bogdan-Lyashenko/codecrumbs) I am building right now.

Imagine a library which takes any JS code and generate SVG flowchart from it, works on client and server. Allows you easily adjust styles scheme for your context or demonstrate your code logic from different abstractions levels. Highlighting, destructing whole blocks, custom modifiers for your needs etc.

# js2flowchart.js [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Generate%20beautiful%20flowcharts%20from%20JavaScript&url=https://github.com/Bogdan-Lyashenko/js-code-to-svg-flowchart&via=bliashenko&hashtags=javascript,flowchart,svg)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) [![npm version](https://badge.fury.io/js/js2flowchart.svg)](https://badge.fury.io/js/js2flowchart)

js2flowchart is a tool for generating beautiful SVG flowcharts&trade; from JavaScript code.

To get started install package from NPM
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

### CLI
You can simply generate SVG files from your local JS files using CLI tool.
Install js2flowchart globally by running:
> yarn global add js2flowchart

Or in a project by running:
> yarn add js2flowchart --dev

Open terminal and navigate to needed directory with JS file you want to visualize (e.g. './my-project/main.js').
Run the command (if you installed it globally)
```cli
js2flowchart main.js
```
Or add this to your _package.json_ file:
```json
{
  "scripts": {
    "js2flowchart": "js2flowchart"
  }
}
```
And run (with either npm or yarn):
```cli
yarn run js2flowchart main.js
```

After script is executed observe log ```SVG file was created: ./js2flowchart/main.js.svg```. SVG file will be placed in new directory '/js2flowchart' near your JS file.

### API and examples
You can find sources for examples explained below in [docs directory](/docs).

**In examples only** js2flowchart library included explicitly, by ```<script>``` tag and accessed by global variable from ```window``` **to make it simpler to run for you without boilerplate**. But feel free to use it through ES6 modules as well, when you have Babel&Webpack local server configured.
```javascript
/**
* Access APIs when js2flowchart injected into HTML page
*/
const {convertCodeToFlowTree, convertFlowTreeToSvg} = window.js2flowchart;

/**
* or import from node_modules 
*/ 
import {convertCodeToFlowTree, convertFlowTreeToSvg} from 'js2flowchart';//way 1
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
        currentIndex = Math.floor(minIndex + maxIndex) / 2;
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

![](/docs/examples/default/flowchart-image.png)

If you need to modify default behavior you can split ```js2flowchart.convertCodeToSvg``` into two building block:
- flow tree building
- shapes printing

```javascript
const {convertCodeToFlowTree, convertFlowTreeToSvg} = js2flowchart;

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

Let's take example with module imports&exports. Below is the code of some ```print-util.js```.
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

![](/docs/examples/defined-abstraction-level/flowchart-image.png)

See the example running [here](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/examples/defined-abstraction-level/index.html) or check out complete source code [of it](/docs/examples/defined-abstraction-level/index.html).

**Custom abstraction level (label:advanced)**

What if you want your 'own' level? To the same API endpoint ```flowTreeBuilder.setAbstractionLevel``` you can provide configuration object.
For example, have a look at the code of [function dependencies](/src/builder/abstraction-levels/functionDependencies.js) abstraction level.
Check out the export of it
```javascript
export const getFunctionDependenciesLevel = () => ({
    defined: [TOKEN_TYPES.CALL_EXPRESSION],
    custom: [
        getCustomFunctionDeclaration(),
        getCustomAssignmentExpression(),
        getCustomVariableDeclarator()
    ]
});
```
It's a format of data you need to pass:

```javascript
flowTreeBuilder.setAbstractionLevel({
    defined: [TOKEN_TYPES.CALL_EXPRESSION],
    custom: [
        getCustomFunctionDeclaration(),
        getCustomAssignmentExpression(),
        getCustomVariableDeclarator()
    ]
})

````
And what is behind of ```getCustomAssignmentExpression``` for example?
There is a token parsing config.
```javascript
{
    type: 'TokenType', /*see types in TOKEN_TYPES map*/
    getName: (path) => {/*extract name from token*/},
    ignore: (path) => {/*return true if want to omit entry*/}
    body: true /* should it contain nested blocks? */
}
```
Check out more token parsing configs from [source code (entryDefinitionsMap.js)](/src/builder/entryDefinitionsMap.js)


#### Presentation generator

When you learn other's code it's good to go through it by different abstractions levels.
Take a look what module exports, which function and classes contains etc.
There is a sub-module ```createPresentationGenerator``` to generate list of SVGs in order to different abstractions levels.

Let's take the next code for example:
```javascript
const code = `
    import {format} from './util/string';

    function formatName(name) {
        if (!name) return 'no-name';

        return format(name);
    }

    class Animal {
        constructor(breed) {
            this.breed = breed;
        }

        getBreed() {
            return this.breed;
        }

        setName(name) {
            if (this.nameExist()) {
                return;
            }

            this.name = name;
        }
    }

    class Man extends Animal {
       sayName() {
            console.log('name', this.name);
       }
    }

    export default Man;
`;
```
pass it to
```javascript
const { createPresentationGenerator } = js2flowchart;

const presentationGenerator = createPresentationGenerator(code);
const slides = presentationGenerator.buildSlides();//array of SVGs
```

Result (one of slides):

![](/docs/examples/one-module-presentation/flowchart-image.png)

You can switch slides by prev-next buttons.

[<img src="/docs/examples/one-module-presentation/slides.gif" width="500">](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/examples/one-module-presentation/index.html)

See the example running [here](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/examples/one-module-presentation/index.html) or check out complete source code [of it](/docs/examples/one-module-presentation/index.html).


#### Defined colors theme

You can apply different themes to your ```svgRender``` instance. Simply calling e.g. ```svgRender.applyLightTheme()``` to apply light scheme.

There are next predefined color schemes:
- DEFAULT: ```applyDefaultTheme```
- BLACK_AND_WHITE: ```applyBlackAndWhiteTheme```
- BLURRED: ```applyBlurredTheme```
- LIGHT: ```applyLightTheme```

Let's simple code sample of ```switch``` statement from Mozzila Web Docs.
```javascript
const code = `
    function switchSampleFromMDN() {
        const foo = 0;

        switch (foo) {
          case -1:
            console.log('negative 1');
            break;
          case 0:
            console.log(0);
          case 1:
            console.log(1);
            return 1;
          default:
            console.log('default');
        }
    }
`;
```
and apply scheme to render.

```javascript
const {createSVGRender, convertCodeToFlowTree} = js2flowchart;

const flowTree = convertCodeToFlowTree(code),
    svgRender = createSVGRender();

//applying another theme for render
svgRender.applyLightTheme();

const svg = svgRender.buildShapesTree(flowTree).print();
```

Result:

![](/docs/examples/defined-color-theme/flowchart-image.png)

See the example running [here](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/examples/defined-color-theme/index.html) or check out complete source code [of it](/docs/examples/defined-color-theme/index.html).

#### Custom colors theme

Well, but what if you would like to have different colors? Sure, below is an example of Light theme colors but created manually.
```javascript
svgRender.applyColorBasedTheme({
   strokeColor: '#555',
   defaultFillColor: '#fff',
   textColor: '#333',
   arrowFillColor: '#444',
   rectangleFillColor: '#bbdefb',
   rectangleDotFillColor: '#ede7f6',
   functionFillColor: '#c8e6c9',
   rootCircleFillColor: '#fff9c4',
   loopFillColor: '#d1c4e9',
   conditionFillColor: '#e1bee7',
   destructedNodeFillColor: '#ffecb3',
   classFillColor: '#b2dfdb',
   debuggerFillColor: '#ffcdd2',
   exportFillColor: '#b3e5fc',
   throwFillColor: '#ffccbc',
   tryFillColor: '#FFE082',
   objectFillColor: '#d1c4e9',
   callFillColor: '#dcedc8',
   debugModeFillColor: '#666'
});
```

#### Custom styles

What if you need different styles, not only colors? Here it's ```svgRender.applyTheme({})```. You can apply styles above of current theme, overriding only that behaviour you need.
Let's take an example with Return statement.
```javascript
svgRender.applyTheme({
    ReturnStatement: {
        fillColor: 'red',
        roundBorder: 10
    }
});
```

Please check definition of [```DefaultBaseTheme```](/src/render/svg/appearance/themes/DefaultBaseTheme.js) to see all possible shapes names and properties.


#### Shapes tree editor

There is sub-module for modifying shapes tree called 'ShapesTreeEditor'.
It provides next interfaces:
- ```findShape```
- ```applyShapeStyles```
- ```blur```
- ```focus```
- ```blurShapeBranch```
- ```focusShapeBranch```
- ```print```

Let's learn its usage on an example as well. Below is the code with some 'devMode hooks'.
```javascript
const code = `
const doStuff = (stuff) => {
    if (stuff) {
        if (devFlag) {
            log('perf start');
            doRecursion();
            log('perf end');

            return;
        }

        doRecursion();
        end();
    } else {
        throw new Error('No stuff!');
    }

    return null;
};
`;
```

what we want here is 'blur' that dev-branch condition, because it interferes code readability.

```javascript
const {
    convertCodeToFlowTree,
    createSVGRender,
    createShapesTreeEditor
} = js2flowchart;

const flowTree = convertCodeToFlowTree(code),
    svgRender = createSVGRender();
    shapesTree = svgRender.buildShapesTree(flowTree);

const shapesTreeEditor = createShapesTreeEditor(shapesTree);

shapesTreeEditor.blurShapeBranch(
    (shape) => shape.getName() === '(devFlag)'
);

const svg = shapesTreeEditor.print();
```

Result:

![](/docs/examples/blur-shape-branch/flowchart-image.png)

See the example running [here](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/examples/blur-shape-branch/index.html) or check out complete source code [of it](/docs/examples/blur-shape-branch/index.html).


#### Flow tree modifier

There is sub-module for modifying flow tree called 'FlowTreeModifier' which allows you to apply modifiers defined separately to your existing flow tree.
Let's take simple use-case: you want to change 'names'(titles) on tree-nodes, here it is, just define modifier for that. But, actually, there are some behaviours where we already know we need to modify flow tree.

Let's have a look at ES5 Array iterators, like ```forEach```, ```map``` and so on. We all know they behave like a loop, right? Let's treat them as a 'loop' then.  

```javascript
const code = `
function print(list) {
    const newList = list.map(i => {
        return i + 1;
    });

    newList.forEach(i => {
        console.debug('iteration start');
        console.log(i);
        console.debug('iteration end');
    });
}
`;
```


```javascript
const {
    createFlowTreeBuilder,
    createFlowTreeModifier,
    convertFlowTreeToSvg,
    MODIFIER_PRESETS
} = js2flowchart;

const flowTreeBuilder = createFlowTreeBuilder(),
    flowTree = flowTreeBuilder.build(code);

const flowTreeModifier = createFlowTreeModifier();

flowTreeModifier.setModifier(MODIFIER_PRESETS.es5ArrayIterators);
flowTreeModifier.applyToFlowTree(flowTree);

const svg = convertFlowTreeToSvg(flowTree);
```

Result:

As you can see, both iterators handled as a loop. And ```forEach``` omit function-callback as well.

![](/docs/examples/defined-modifier/flowchart-image.png)

See the example running [here](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/examples/defined-modifier/index.html) or check out complete source code [of it](/docs/examples/defined-modifier/index.html).


There is one more defined modifier for node destruction. It takes a block you specified and destruct it to on block.
```javascript
flowTreeModifier.destructNodeTree((node) => node.name.indexOf('.forEach') !== -1, 'and print list...');
```
What if you want **custom modifier**?
```javascript
flowTreeModifier.registerNewModifier((node)=> node.name.includes('hello'), {
    name: 'world'
});
```

#### Debug rendering
What if you want to select a shape for applying special styles and want some unique id selector? Just pass ```debug``` flag to ```print```;

```javascript
    const {
        convertCodeToFlowTree,
        createSVGRender,
        createShapesTreeEditor
    } = js2flowchart;

    const svgRender = createSVGRender();

    const shapesTree = svgRender.buildShapesTree(convertCodeToFlowTree(code));
    const shapesTreeEditor = createShapesTreeEditor(shapesTree);

    shapesTreeEditor.applyShapeStyles(
        shape => shape.getNodePathId() === 'NODE-ID:|THIS.NAME=N|TCCP-', {
        fillColor: '#90caf9'
    });

    const svg = shapesTreeEditor.print({debug: true});
```

Result:

![](/docs/examples/debug-rendering/flowchart-image.png)

See the example running [here](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/examples/debug-rendering/index.html) or check out complete source code [of it](/docs/examples/debug-rendering/index.html).

### Tools
Thanks to @LucasBadico we got Visual Studio extension. Check [it out](https://marketplace.visualstudio.com/items?itemName=lucasbadico.code-flowchart).
![](https://user-images.githubusercontent.com/16516889/32584821-824634c8-c4e1-11e7-9e83-4c97561f01e0.png)

### Under the hood
Main stages:
- get AST from code, [Babylon](https://github.com/babel/babel/tree/master/packages/babylon) parser is used (develops by Babel team)
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
First shoot! Take it easy (check version number above in NPM badge)


#!/usr/bin/env node
/**
 * @todo Add features from the Non-CLI side of this module such as:
 * 1. Defined abstraction level (function, function dependencies, class, import, export)
 * 2. Custom abstraction level
 * 3. Presentation mode
 * 4. Defined colour schemes (default, B&W, blurred, light)
 * 5. Custom colour scheme
 * 6. Custom style
 * 7. Flow tree modifications (iterative methods treated as loops, ...)
 * 8. Custom modifier
 * 9. Debugging
 */

const js2flowchart = require('../dist/js2flowchart.js');
const program = require('commander');

const fs = require('fs'),
    path = require('path');


const readJsFile = function(file, onComplete, ...callbackArgs) {
    fs.readFile(path.relative(process.cwd(), file), 'utf8', function (err, code) {
        if (err) {
            return console.error(err);
        }

        onComplete(file, code, ...callbackArgs);
    });
};

const createSvgFile = function(file, code) {
    const svg = js2flowchart.convertCodeToSvg(code),
        filePath = `${file}.svg`;

    fs.writeFile(filePath, svg, function(err) {
        if (err) {
            return console.error(err);
        }

        console.log(`SVG file was created: ${filePath}`);
    });
};


/**
 * @description Create an SVG file with the provided abstraction level
 * @param {string} file Name of the JS script
 * @param {string} code JS code of the JS script
 * @param {...string} abstractionLevel Abstraction levels (function, function dependencies, class, import, export)
 * @return undefined
 */
const createAbstractedSvgFile = function (file, code, ...abstractionLevel) {
    const flowTreeBuilder = js2flowchart.createFlowTreeBuilder();
    //Check if the abstraction level(s) are valid and process them
    let abstractions = abstractionLevel.map(al => {
        try {
            return ABSTRACTION_LEVELS[al.toUpperCase()];
        } catch (err) {
            throw new Error(`The following abstraction level isn't valid: ${al}\n
            Please use (case insensitive, without the quotes): "function", "function_dependencies", "class", "import or export"`);
        }
    });

    flowTreeBuilder.setAbstractionLevel(abstractions);

    const flowTree = flowTreeBuilder.build(code);

    const svg = js2flowchart.convertFlowTreeToSvg(flowTree),
        filePath = `${file}.svg`;

    fs.writeFile(filePath, svg, function(err) {
        if (err) {
            return console.error(err);
        }

        console.log(`SVG file was created: ${filePath}`);
    });
};

program
    .arguments('<file>')
    .option('-a, --abstraction', 'Set the level of details you want to have')
    .action(function(file) {
        if (program.abstractions) readJsFile(file, createAbstractedSvgFile, program.abstractions);
        else readJsFile(file, createSvgFile);
    })
    .parse(process.argv);


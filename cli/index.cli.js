#!/usr/bin/env node
/**
 * @todo Add features from the Non-CLI side of this module such as:
 * 2. Custom abstraction level
 * 3. Presentation mode
 * 4. Defined colour schemes (default, B&W, blurred, light)
 * 5. Custom colour scheme
 * 6. Custom style
 * 7. Flow tree modifications (iterative methods treated as loops, ...)
 * 8. Custom modifier
 * 9. Debugging
 * @todo Continue 3.
 */

const js2flowchart = require('../dist/js2flowchart.js');
const program = require('commander');

const fs = require('fs'),
    path = require('path');

const readJsFile = function(file, onComplete, ...callbackArgs) {
    fs.readFile(path.relative(process.cwd(), file), 'utf8', function(err, code) {
        if (err) {
            return console.error(err);
        }

        onComplete(file, code, ...callbackArgs);
    });
};

/**
 * @description Write data to the specified file path.
 * @param {string} filePath Path of the destination file
 * @param {*} data Data to write to the destination
 */
const writeToFile = function(filePath, data) {
    fs.writeFile(filePath, data, function(err) {
        if (err) {
            return console.error(err);
        }

        console.log(`SVG file was created: ${filePath}`);
    });
};

const createSvgFile = function(file, code) {
    const svg = js2flowchart.convertCodeToSvg(code),
        filePath = `${file}.svg`;

    writeToFile(filePath, svg);
};

/**
 * @description Create an SVG file with the provided abstraction level
 * @param {string} file Name of the JS script
 * @param {string} code JS code of the JS script
 * @param {...string} abstractionLevel Abstraction levels (function, function dependencies, class, import, export)
 * @return undefined
 */
const createAbstractedSvgFile = function(file, code, abstractionLevel) {
    const errMsg =
        'Please use (case insensitive, without the quotes): "function", "function_dependencies", "class", "import" or "export"';
    if (!abstractionLevel) return console.error(`No abstraction level specified`);
    const flowTreeBuilder = js2flowchart.createFlowTreeBuilder();
    //Check if the abstraction level(s) are valid and process them
    let abstractions = abstractionLevel.map(al => {
        try {
            return js2flowchart.ABSTRACTION_LEVELS[al.toUpperCase()];
        } catch (err) {
            throw new Error(`The following abstraction level isn't valid: ${al}\n${errMsg}`);
        }
    });

    flowTreeBuilder.setAbstractionLevel(abstractions);

    const flowTree = flowTreeBuilder.build(code);

    const svg = js2flowchart.convertFlowTreeToSvg(flowTree),
        filePath = `${file}.svg`;

    writeToFile(filePath, svg);
};

/**
 * @description Convert argument lists to arrays.
 * @param {string} val Argument lists
 * @return {string[]} Array of arguments
 */
const list = val => val.split(',');

program
    .arguments('<file>')
    .option(
        '-a, --abstraction [list]',
        'Set the level of details you want to have (e.g: "function,import")',
        list
    )
    .option('-p, --presentation', 'Separating the different abstraction levels')
    .action(function(file) {
        if (program.abstraction) readJsFile(file, createAbstractedSvgFile, program.abstraction);
        else if (program.presentation) console.log('Feature not implemented yet');
        else readJsFile(file, createSvgFile);
    })
    .parse(process.argv);

import {createFlowTreeBuilder, ABSTRACTION_LEVELS} from './builder/FlowTreeBuilder';
import {createSVGRender} from './render/svg/SVGRender';

var code = `
    console.log('test 0');
    
    function traverseDoc(doc, onEnter, onExit, shouldTraverseConditionalGroups) {
      function traverseDocRec(doc) {
        let shouldRecurse = true;
        console.log('test 1')
        if (onEnter) {
          if (onEnter(doc) === false) {
            shouldRecurse = false;
          }
        }
    
        if (shouldRecurse) {
          if (doc.type === "concat" || doc.type === "fill") {
            for (let i = 0; i < doc.parts.length; i++) {
              traverseDocRec(doc.parts[i]);
            }
          } else if (doc.type === "if-break") {
            if (doc.breakContents) {
              traverseDocRec(doc.breakContents);
            }
            if (doc.flatContents) {
              traverseDocRec(doc.flatContents);
              console.log('test 2')
            }
          } else if (doc.type === "group" && doc.expandedStates) {
            if (shouldTraverseConditionalGroups) {
              doc.expandedStates.forEach(traverseDocRec);
            } else {
              traverseDocRec(doc.contents);
            }
          } else if (doc.contents) {
            traverseDocRec(doc.contents);
            
            console.log('test 3')
          }
        }
    
        if (onExit) {
          onExit(doc);
        }
      }
    
      traverseDocRec(doc);
}

function doLogging() {
    const test = 'ignore';
}

function logout() {
    const test = 'ignore';
}
`;


const simpleStrSwitch = `
    function Test(a) {
        var b;
        
        switch (a) {
            case 1:
                b = 0;
                break;
            case 2:
                b = 2;
                return;
            default:
                b = 3;
                break;
        }
        
        return a + 2;
    }
`;

const simpleStrTry = `function Test() {
    try {
        abcdMethod();
    } catch(e) {
        console.log('error ' + e.message);
    } finally {
        b = 1234567;
    }
}`;

const simpleStrContinue = `
function Test() {
    for (; i < obj.length; i++) {
        c = 12;
        if (c == 2) {
            continue;
        }
        
        b = 12;
    } 
}
`;

const simpleStrModules = `
import a, {b,c} from 'lib-bob';
import d from './libbob/file';

function o(i, p) {};

export default o;

function ll(b) {
   let clickFn = 12;
   b = 12;
   c = 12;
}

export const BOB = 12;
`;


const simpleStrClass = `
class Animal extends Zero {
    constructor(b) {
        this.s = 12;
    }
    
    getA(){
        return this.a;
    }
    
    setName(name) {
        this.name = name;
    }
}

class Man {
    constructor(n) {
        this.name = n;
    }
    
    sayName() {
        return this.name
    }
}
`;

const simpleStrReturn = `
  function test(b) {
    var a = 12;
    
    if (b > 11) {
        return 11;
    }
    
    return a -1;
  }
`;

const simpleStr = `
function test(b) {
    var a = 12;
    
  }
`;

var t0 = performance.now();

const flowTreeBuilder = createFlowTreeBuilder();
//flowTreeBuilder.setAbstractionLevel(ABSTRACTION_LEVELS.FUNCTION);
//flowTreeBuilder.setAbstractionLevel([ABSTRACTION_LEVELS.CLASS, ABSTRACTION_LEVELS.FUNCTION]);
//flowTreeBuilder.setAbstractionLevel([ABSTRACTION_LEVELS.IMPORT, ABSTRACTION_LEVELS.EXPORT]);

//flowTreeBuilder.setIgnoreFilter((entry) => entry.name.startsWith('console.log'));

const flowTree = flowTreeBuilder.build(code);

const svgRender = createSVGRender({Circle: {strokeColor: 'red'}});

svgRender.buildShapesTree(flowTree);

svgRender.blur((shape)=> shape.getName().indexOf('traverseDocRec(')!==-1 && shape.getNodeType() !== 'Function');

document.getElementById('svgImage').innerHTML = svgRender.render();

var t1 = performance.now();
console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

export default (code) => {
    //return rendered tree
}

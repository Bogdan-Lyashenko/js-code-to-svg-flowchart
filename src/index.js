import {createSVGRender} from './render/svg/SVGRender';
import {getFlowTree} from './builder/FlowTreeBuilder';



var code = `
    function traverseDoc(doc, onEnter, onExit, shouldTraverseConditionalGroups) {
      function traverseDocRec(doc) {
        let shouldRecurse = true;
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
            }
          } else if (doc.type === "group" && doc.expandedStates) {
            if (shouldTraverseConditionalGroups) {
              doc.expandedStates.forEach(traverseDocRec);
            } else {
              traverseDocRec(doc.contents);
            }
          } else if (doc.contents) {
            traverseDocRec(doc.contents);
          }
        }
    
        if (onExit) {
          onExit(doc);
        }
      }
    
      traverseDocRec(doc);
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

var o = 123;

export default function myMethod(b) {
   let clickFn = 12;
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
`;

const simpleStr = `
  
`;

const flowTree = getFlowTree(code),
    svgRender = createSVGRender(flowTree, {Circle: {strokeColor: 'black'}});

document.getElementById('svgImage').innerHTML = svgRender.render();

export default (code) => {
    const flowTree = getFlowTree(code),
        svgRender = createSVGRender(flowTree);

    return svgRender.render();
}

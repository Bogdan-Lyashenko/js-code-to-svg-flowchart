import {createSVGRender} from './render/svg/SVGRender';
import {getFlowTree} from './builder/FlowTreeBuilder';


var code = `
    function myMethod(test) {
        let list = app2.getInitList(d, e),
            varcns = 12,
            empty = 0;
            
        const res = 1 + 2 + 3 + 4;
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === test) {
                res = list[i];
                c = 0;
                
                for ( k; b < 8; ++b) a += count;
                
            } else if (b === a[8] && isFlag) {
                d = 123;
                e = 456 + d;
                e = 456 + d;
                e = 456 + d;
            }
            
            const abc = 2 + 2 - childCall();
        }
        
        c = 12+b;
        
        methodCall();
        
        return res;
    }
    
    function childCall() { }
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

const simpleStr = `function myMethod(b) {
   let clickFn = 12;
}`;

const flowTree = getFlowTree(simpleStr),
    svgRender = createSVGRender(flowTree, {Circle: {strokeColor: 'black'}});

document.getElementById('svgImage').innerHTML = svgRender.render();

export default (code) => {
    const flowTree = getFlowTree(code),
        svgRender = createSVGRender(flowTree);

    return svgRender.render();
}

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


const simpleStr = `
    function Test() {
        if (list[i].id === test) {
            a = 12;
            res = list[i];
        } else if (a ==2 ) {
            res = 1;
        } else if (b === 5) {
            c = 2;
        } else {
            d = b + k;
        }
    }
`;

const flowTree = getFlowTree(code),
    svgRender = createSVGRender(flowTree, {Circle: {strokeColor: 'black'}});

document.getElementById('svgImage').innerHTML = svgRender.render();

export default (code) => {
    const flowTree = getFlowTree(code),
        svgRender = createSVGRender(flowTree);

    return svgRender.render();
}

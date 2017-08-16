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
            } else {
            //TODO: fix else if, counts as a body
                d = 123;
                d = 123;
                d = 123;
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
            res = list[i];
            a=9;
        } else {
            res = 1;
        }
        
        a = 56;
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

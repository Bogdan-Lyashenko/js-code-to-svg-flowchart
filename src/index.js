import {createSVGRender} from './render/svg/SVGRender';
import {getFlowTree} from './builder/FlowTreeBuilder';


var code = `
    function myMethod(test) {
        const list = app2.getInitList(d, e),
            varcns = 12;
        let res;
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === test) {
                res = list[i];
                c = 0;
            } else {
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
        } else {
            res = 1;
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

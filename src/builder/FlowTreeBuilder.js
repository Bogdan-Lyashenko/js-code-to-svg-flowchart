import * as babylon from 'babylon';
import traverse from 'babel-traverse';
import {DefinitionsMap} from './entryDefinitionsMap';
import {buildVisitor} from './astVisitor';
import {setupPointer} from '../shared/utils/treeLevelsPointer';

export const getFlowTree = (code, config) => {
    const treeNodes = [],
        visitor = buildVisitor(DefinitionsMap, setupPointer(treeNodes)),
        AST = getAST(code, config);

    traverse(AST, visitor);

    return {name: '', body: treeNodes};
};

export const getAST = (code, config) => {
    //TODO: remove when finish with defining types
    /*const c = babylon.parse(code);

    traverse(c, {
        enter(path) {
            if (path.node.type === '') {
               debugger;
            }
            console.log(path.node.type, path.node.name);
        }
    });*/

    return babylon.parse(code, {
        plugins: [
            'objectRestSpread'
        ]
    });
};

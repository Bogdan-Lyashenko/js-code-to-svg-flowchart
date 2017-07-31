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

    return {name: 'root', body: treeNodes};
};

export const getAST = (code, config) => {
    return babylon.parse(code, {
        plugins: [
            'objectRestSpread'
        ]
    });
};

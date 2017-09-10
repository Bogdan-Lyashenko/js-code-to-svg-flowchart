import traverse from 'babel-traverse';
import {DefinitionsMap} from './entryDefinitionsMap';
import {buildAST, buildVisitor} from './ASTBuilder';

const buildFlowTree = (code, {astParserConfig, astVisitorConfig}) => {
    const treeNodes = [];

    traverse(
        buildAST(code, astParserConfig),
        buildVisitor(astVisitorConfig, treeNodes)
    );

    return {name: '', body: treeNodes};
};

export const createFlowTreeBuilder = ({astParserConfig = {}, astVisitorConfig = {}} = {}) => {
    const options = {
        astParserConfig: {
            ...astParserConfig
        },

        astVisitorConfig: {
            definitionsMap: [...DefinitionsMap],
            ...astVisitorConfig
        }
    };

    return {
        build: code => buildFlowTree(code, options)
    };
};

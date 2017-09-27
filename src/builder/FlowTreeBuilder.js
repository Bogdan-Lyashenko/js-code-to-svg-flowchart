import traverse from 'babel-traverse';

import { DefinitionsMap } from './entryDefinitionsMap';
import { parseCodeToAST, buildVisitor } from './astBuilder';
import {
    ABSTRACTION_LEVELS,
    rebuildConfigForAbstractionLevel
} from './abstractionLevelsConfigurator';
import createFlowTreeModifier from './FlowTreeModifier';
import {
    DEFINED_MODIFIERS,
    MODIFIER_PRESETS,
    destructionModifier
} from './modifiers/modifiersFactory';

const buildFlowTree = (astTree, astVisitorConfig) => {
    const treeNodes = [];

    traverse(astTree, buildVisitor(astVisitorConfig, treeNodes));

    return { name: '', body: treeNodes };
};

export default ({ astParser = {}, astVisitor = {} } = {}) => {
    const astParserConfig = {
        ...astParser
    };

    const astVisitorConfig = {
        definitionsMap: [...DefinitionsMap],
        globalIgnore: null,
        ...astVisitor
    };

    const modifiers = createFlowTreeModifier();

    return {
        setAbstractionLevel(level) {
            astVisitorConfig.definitionsMap = rebuildConfigForAbstractionLevel(level);
        },

        setIgnoreFilter(fn) {
            astVisitorConfig.globalIgnore = fn;
        },

        setModifier(modifier) {
            modifiers.addModifier(modifier);
        },

        registerNewModifier(test, updates) {
            modifiers.create(test, updates);
        },

        destructNodeTree(test, newNameFn) {
            this.setModifier(destructionModifier(test, newNameFn));
        },

        build(code) {
            const ast = this.buildAst(code);
            return this.buildFlowTreeFromAst(ast);
        },

        //advanced
        buildAst(code) {
            return parseCodeToAST(code, astParserConfig);
        },

        buildFlowTreeFromAst(ast) {
            const flowTree = buildFlowTree(ast, astVisitorConfig);

            modifiers.applyTo(flowTree);

            return flowTree;
        }
    };
};

export { DEFINED_MODIFIERS, MODIFIER_PRESETS, ABSTRACTION_LEVELS };

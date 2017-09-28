import traverse from 'babel-traverse';

import { DefinitionsMap } from './entryDefinitionsMap';
import { parseCodeToAST, buildVisitor } from './astBuilder';
import {
    ABSTRACTION_LEVELS,
    rebuildConfigForAbstractionLevel
} from './abstractionLevelsConfigurator';
import FlowTreeModifier from './FlowTreeModifier';
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

export const createFlowTreeModifier = () => {
    const modifiers = FlowTreeModifier();

    return {
        setModifier(modifier) {
            modifiers.addModifier(modifier);
        },

        registerNewModifier(test, updates) {
            modifiers.create(test, updates);
        },

        destructNodeTree(test, newNameFn) {
            this.setModifier(destructionModifier(test, newNameFn));
        },

        applyToFlowTree(flowTree) {
            modifiers.applyTo(flowTree);
            return flowTree;
        }
    };
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

    return {
        setAbstractionLevel(level) {
            astVisitorConfig.definitionsMap = rebuildConfigForAbstractionLevel(level);
        },

        resetAbstractionLevelToNormal() {
            astVisitorConfig.definitionsMap = [...DefinitionsMap];
        },

        setIgnoreFilter(fn) {
            astVisitorConfig.globalIgnore = fn;
        },

        build(code) {
            const ast = this.buildAst(code);
            return this.buildFlowTreeFromAst(ast);
        },

        buildAst(code) {
            return parseCodeToAST(code, astParserConfig);
        },

        buildFlowTreeFromAst(ast) {
            return buildFlowTree(ast, astVisitorConfig);
        }
    };
};

export { DEFINED_MODIFIERS, MODIFIER_PRESETS, ABSTRACTION_LEVELS };

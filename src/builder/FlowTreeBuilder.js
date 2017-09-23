import traverse from 'babel-traverse';

import { DefinitionsMap } from './entryDefinitionsMap';
import { buildAST, buildVisitor } from './astBuilder';
import {
    ABSTRACTION_LEVELS,
    rebuildConfigForAbstractionLevel
} from './abstractionLevelsConfigurator';
import createFlowTreeModifier, { destructTree } from './FlowTreeModifier';
import { DEFINED_MODIFIERS } from './modifiers/modifiersFactory';

const buildFlowTree = (code, { astParserConfig, astVisitorConfig }) => {
    const treeNodes = [];

    traverse(buildAST(code, astParserConfig), buildVisitor(astVisitorConfig, treeNodes));

    return { name: '', body: treeNodes };
};

export default ({ astParserConfig = {}, astVisitorConfig = {} } = {}) => {
    const options = {
        astParserConfig: {
            ...astParserConfig
        },

        astVisitorConfig: {
            definitionsMap: [...DefinitionsMap],
            globalIgnore: null,
            ...astVisitorConfig
        }
    };

    const modifiers = createFlowTreeModifier();

    return {
        setAbstractionLevel(level) {
            options.astVisitorConfig.definitionsMap = rebuildConfigForAbstractionLevel(level);
        },

        setIgnoreFilter(fn) {
            options.astVisitorConfig.globalIgnore = fn;
        },

        setModifier(modifier) {
            modifiers.addModifier(modifier);
        },

        registerNewModifier(test, updates) {
            modifiers.create(test, updates);
        },

        build(code) {
            const tree = buildFlowTree(code, options);

            modifiers.applyTo(tree);

            return tree;
        }
    };
};

export { DEFINED_MODIFIERS, ABSTRACTION_LEVELS };

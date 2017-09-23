import traverse from 'babel-traverse';
import { DefinitionsMap } from './entryDefinitionsMap';
import { buildAST, buildVisitor } from './ASTBuilder';
import { TOKEN_TYPES } from '../shared/constants';

export const ABSTRACTION_LEVELS = {
    FUNCTION: [TOKEN_TYPES.FUNCTION],
    CLASS: [TOKEN_TYPES.CLASS_DECLARATION],
    IMPORT: [
        TOKEN_TYPES.IMPORT_DECLARATION,
        TOKEN_TYPES.IMPORT_SPECIFIER,
        TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER
    ],
    EXPORT: [TOKEN_TYPES.EXPORT_NAMED_DECLARATION, TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION]
};

const buildFlowTree = (code, { astParserConfig, astVisitorConfig }) => {
    const treeNodes = [];

    traverse(buildAST(code, astParserConfig), buildVisitor(astVisitorConfig, treeNodes));

    return { name: '', body: treeNodes };
};

const rebuildConfigForAbstractionLevel = level => {
    const levelList = [].concat(level).reduce((list, item) => {
        if (typeof item === 'string') {
            list.push(item);
        } else {
            list = list.concat([...item]);
        }

        return list;
    }, []);

    return DefinitionsMap.filter(item => levelList.indexOf(item.type) !== -1);
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

    return {
        setAbstractionLevel(level) {
            options.astVisitorConfig.definitionsMap = rebuildConfigForAbstractionLevel(level);
        },

        setIgnoreFilter(fn) {
            options.astVisitorConfig.globalIgnore = fn;
        },

        build(code) {
            return buildFlowTree(code, options);
        }
    };
};

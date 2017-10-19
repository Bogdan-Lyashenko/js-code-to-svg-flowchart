import { parseCodeToAST } from 'builder/astBuilder';

import FlowTreeBuilder, {
    ABSTRACTION_LEVELS,
    MODIFIER_PRESETS,
    DEFINED_MODIFIERS
} from 'builder/FlowTreeBuilder';
import SVGRender from 'render/svg/SVGRender';
import { TOKEN_TYPES, MODIFIED_TYPES } from 'shared/constants';

const buildTreeByAbstractionLevels = levels => {
    const flowTreeBuilder = FlowTreeBuilder();
    flowTreeBuilder.setAbstractionLevel(levels);

    return astTree => flowTreeBuilder.buildFlowTreeFromAst(astTree);
};

export const generateExportSlideTree = buildTreeByAbstractionLevels(ABSTRACTION_LEVELS.EXPORT);

export const generateImportExportSlideTree = buildTreeByAbstractionLevels([
    ABSTRACTION_LEVELS.EXPORT,
    ABSTRACTION_LEVELS.IMPORT
]);

export const generateClassFunctionSlideTree = buildTreeByAbstractionLevels([
    ABSTRACTION_LEVELS.EXPORT,
    ABSTRACTION_LEVELS.IMPORT,
    ABSTRACTION_LEVELS.CLASS,
    ABSTRACTION_LEVELS.FUNCTION
]);

export const generateClassFunctionDependenciesSlideTree = buildTreeByAbstractionLevels([
    ABSTRACTION_LEVELS.EXPORT,
    ABSTRACTION_LEVELS.IMPORT,
    ABSTRACTION_LEVELS.CLASS,
    ABSTRACTION_LEVELS.FUNCTION,
    ABSTRACTION_LEVELS.FUNCTION_DEPENDENCIES
]);

export const generateRegularSlideTree = astTree => {
    const flowTreeBuilder = FlowTreeBuilder();
    return flowTreeBuilder.buildFlowTreeFromAst(astTree);
};

export default code => ({
    buildSlides: () => {
        const svgRender = SVGRender(),
            astTree = parseCodeToAST(code);

        const slides = [
            generateExportSlideTree(astTree),
            generateImportExportSlideTree(astTree),
            generateClassFunctionSlideTree(astTree),
            generateClassFunctionDependenciesSlideTree(astTree),
            generateRegularSlideTree(astTree)
        ];

        return slides
            .filter(slide => slide.body.length)
            .map(svgRender.buildShapesTree)
            .map(shapesTree => shapesTree.print());
    }
});

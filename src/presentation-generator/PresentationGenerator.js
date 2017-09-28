import { parseCodeToAST } from 'builder/astBuilder';

import FlowTreeBuilder, {
    ABSTRACTION_LEVELS,
    MODIFIER_PRESETS,
    DEFINED_MODIFIERS
} from 'builder/FlowTreeBuilder';
import SVGRender from 'render/svg/SVGRender';
import { TOKEN_TYPES, MODIFIED_TYPES } from 'shared/constants';

export const generateExportSlideTree = astTree => {
    const flowTreeBuilder = FlowTreeBuilder();
    flowTreeBuilder.setAbstractionLevel(ABSTRACTION_LEVELS.EXPORT);

    return flowTreeBuilder.buildFlowTreeFromAst(astTree);
};

export const generateImportExportSlideTree = astTree => {
    const flowTreeBuilder = FlowTreeBuilder();
    flowTreeBuilder.setAbstractionLevel([ABSTRACTION_LEVELS.EXPORT, ABSTRACTION_LEVELS.IMPORT]);

    return flowTreeBuilder.buildFlowTreeFromAst(astTree);
};

export const generateClassFunctionSlideTree = astTree => {
    const flowTreeBuilder = FlowTreeBuilder();
    flowTreeBuilder.setAbstractionLevel([ABSTRACTION_LEVELS.CLASS, ABSTRACTION_LEVELS.FUNCTION]);

    return flowTreeBuilder.buildFlowTreeFromAst(astTree);
};

export const generateRegularSlideTree = astTree => {
    const flowTreeBuilder = FlowTreeBuilder();
    return flowTreeBuilder.buildFlowTreeFromAst(astTree);
};

export default code => ({
    getSlides: () => {
        const svgRender = SVGRender(),
            astTree = parseCodeToAST(code);

        const slides = [
            generateExportSlideTree(astTree),
            generateImportExportSlideTree(astTree),
            generateClassFunctionSlideTree(astTree),
            generateRegularSlideTree(astTree)
        ];

        return slides.map(svgRender.buildShapesTree).map(shapesTree => shapesTree.print());
    }
});

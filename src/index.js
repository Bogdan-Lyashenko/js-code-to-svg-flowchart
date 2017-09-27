import FlowTreeBuilder, {
    ABSTRACTION_LEVELS,
    MODIFIER_PRESETS,
    DEFINED_MODIFIERS
} from 'builder/FlowTreeBuilder';
import SVGRender, { ShapesTreeEditor } from 'render/svg/SVGRender';
import LearningPath from 'learning-path/LearningPathGenerator';
import { TOKEN_TYPES, MODIFIED_TYPES } from 'shared/constants';

export const createFlowTreeBuilder = FlowTreeBuilder;
export const createSVGRender = SVGRender;
export const createShapesTreeEditor = ShapesTreeEditor;
export const generateLearningPath = LearningPath;

export { ABSTRACTION_LEVELS, DEFINED_MODIFIERS, MODIFIER_PRESETS, TOKEN_TYPES, MODIFIED_TYPES };

export const convertCodeToSvg = (code, config) => {
    const flowTreeBuilder = createFlowTreeBuilder(),
        svgRender = createSVGRender();

    const flowTree = flowTreeBuilder.build(code),
        shapesTree = svgRender.buildShapesTree(flowTree);

    return shapesTree.print(config);
};

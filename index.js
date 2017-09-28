import FlowTreeBuilder, {
    createFlowTreeModifier as createFlowTreeModifierFromBuilder,

    ABSTRACTION_LEVELS,
    MODIFIER_PRESETS,
    DEFINED_MODIFIERS
} from 'builder/FlowTreeBuilder';
import SVGRender, { ShapesTreeEditor } from 'render/svg/SVGRender';
import PresentationGenerator from 'presentation-generator/PresentationGenerator';
import { TOKEN_TYPES, MODIFIED_TYPES } from 'shared/constants';

export const createFlowTreeBuilder = FlowTreeBuilder;
export const createFlowTreeModifier = createFlowTreeModifierFromBuilder;

export const createSVGRender = SVGRender;
export const createShapesTreeEditor = ShapesTreeEditor;

export const createPresentationGenerator = PresentationGenerator;

export { ABSTRACTION_LEVELS, DEFINED_MODIFIERS, MODIFIER_PRESETS, TOKEN_TYPES, MODIFIED_TYPES };

export const convertCodeToSvg = (code, config) => {
    const flowTreeBuilder = createFlowTreeBuilder(),
        svgRender = createSVGRender();

    const flowTree = flowTreeBuilder.build(code),
        shapesTree = svgRender.buildShapesTree(flowTree);

    return shapesTree.print(config);
};

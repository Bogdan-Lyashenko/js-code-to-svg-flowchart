import FlowTreeBuilder, {
    ABSTRACTION_LEVELS,
    MODIFIER_PRESETS,
    DEFINED_MODIFIERS
} from 'builder/FlowTreeBuilder';
import SVGRender from 'render/svg/SVGRender';
import { TOKEN_TYPES, MODIFIED_TYPES } from 'shared/constants';

export const createFlowTreeBuilder = FlowTreeBuilder;
export const createSVGRender = SVGRender;

export { ABSTRACTION_LEVELS, DEFINED_MODIFIERS, MODIFIER_PRESETS, TOKEN_TYPES, MODIFIED_TYPES };

export const convertCodeToSvg = code => {
    const flowTreeBuilder = createFlowTreeBuilder(),
        svgRender = createSVGRender();

    svgRender.buildShapesTree(flowTreeBuilder.build(code));

    return svgRender.render();
};

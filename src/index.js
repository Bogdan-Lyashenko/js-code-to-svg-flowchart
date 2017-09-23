import FlowTreeBuilder, { ABSTRACTION_LEVELS, DEFINED_MODIFIERS } from 'builder/FlowTreeBuilder';
import SVGRender from 'render/svg/SVGRender';
import { TOKEN_TYPES } from 'shared/constants';

export const createFlowTreeBuilder = FlowTreeBuilder;
export const createSVGRender = SVGRender;

export const map = {
    ABSTRACTION_LEVELS,
    DEFINED_MODIFIERS,
    TOKEN_TYPES
};

export const convertCodeToSvg = code => {
    const flowTreeBuilder = createFlowTreeBuilder(),
        svgRender = createSVGRender();

    svgRender.buildShapesTree(flowTreeBuilder.build(code));

    return svgRender.render();
};

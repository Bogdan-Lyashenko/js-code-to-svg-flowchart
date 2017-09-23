import FlowTreeBuilder, { ABSTRACTION_LEVELS } from './builder/FlowTreeBuilder';
import SVGRender from './render/svg/SVGRender';

export const createFlowTreeBuilder = FlowTreeBuilder;
export const createSVGRender = SVGRender;

export const convertCodeToSvg = code => {
    const flowTreeBuilder = createFlowTreeBuilder(),
        svgRender = createSVGRender();

    svgRender.buildShapesTree(flowTreeBuilder.build(code));

    return svgRender.render();
};

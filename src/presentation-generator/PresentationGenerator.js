import FlowTreeBuilder, {
    ABSTRACTION_LEVELS,
    MODIFIER_PRESETS,
    DEFINED_MODIFIERS
} from 'builder/FlowTreeBuilder';
import SVGRender from 'render/svg/SVGRender';
import { TOKEN_TYPES, MODIFIED_TYPES } from 'shared/constants';

export const generate = code => {
    const flowTreeBuilder = FlowTreeBuilder(),
        svgRender = SVGRender();

    const astTree = flowTreeBuilder.buildAst(code);
    const flowTree = flowTreeBuilder.buildFlowTreeFromAst(astTree);
};

export default code => {};

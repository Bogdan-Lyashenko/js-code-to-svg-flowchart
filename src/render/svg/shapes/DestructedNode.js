import { getRoundedRectangle, getLine, getClosedPath } from 'shared/utils/svgPrimitives';
import { assignState } from 'shared/utils/composition';
import { addOffsetToPoints } from 'shared/utils/geometry';

import {
    setupBasicBehaviour,
    setupInitialProperties,
    setupInitialSelectors,
    calculateHeight,
    calculateNameBasedWidth,
    calculatePosition,
    delegateInit
} from './BaseShape';

const ENTITY_FIELD_NAME = 'DestructedNode';

const setupDestructedNodeBehaviour = state => ({
    print(config) {
        const theme = state.theme,
            suffixTheme = theme.suffix;

        const { x, y } = state.position,
            h = state.dimensions.h,
            w = state.dimensions.w - 2 * (suffixTheme.width + suffixTheme.space),
            namePosition = { x, y };

        const suffix1 = getRoundedRectangle(
            x + w + suffixTheme.space,
            y,
            suffixTheme.width,
            h,
            suffixTheme
        );
        const suffix2 = getRoundedRectangle(
            x + w + 2 * suffixTheme.space + suffixTheme.width,
            y,
            suffixTheme.width,
            h,
            suffixTheme
        );

        return `
            <g>
                ${getRoundedRectangle(x, y, w, h, theme)}
                
                ${suffix1}
                ${suffix2}
                             
                ${this.printName(namePosition)}
                ${this.printDebugInfo(config)}
            </g>`;
    }
});

const calculateWidth = state => {
    const theme = state.theme,
        suffix = theme.suffix;

    return (
        2 * theme.horizontalPadding +
        2 * (suffix.width + +suffix.space) +
        calculateNameBasedWidth(state)
    );
};

const calculateDimensions = state => ({
    w: calculateWidth(state),
    h: calculateHeight(state)
});

const extractBasicState = state => ({
    ...state,
    position: calculatePosition(state),
    dimensions: calculateDimensions(state)
});

export const DestructedNode = initialState => {
    let state = extractBasicState(initialState);

    state = { ...state, ...setupInitialProperties(state) };

    return assignState(state, [
        setupInitialSelectors,
        setupBasicBehaviour,
        setupDestructedNodeBehaviour
    ]);
};

export default delegateInit(DestructedNode, ENTITY_FIELD_NAME);

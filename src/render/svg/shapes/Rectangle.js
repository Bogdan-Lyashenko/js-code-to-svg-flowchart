import { getRoundedRectangle } from 'shared/utils/svgPrimitives';
import { assignState } from 'shared/utils/composition';

import {
    setupCompleteState,
    setupBasicBehaviour,
    setupInitialSelectors,
    delegateInit
} from './BaseShape';

const ENTITY_FIELD_NAME = 'Rectangle';

const setupRectangleBehavior = state => ({
    print(config = {}) {
        const theme = state.theme;
        const { x, y } = state.position,
            { w, h } = state.dimensions;

        return `
                <g>
                   ${getRoundedRectangle(x, y, w, h, theme)}
                   ${this.printName()}
                   ${this.printDebugInfo(config)}
                </g>`;
    }
});

export const Rectangle = initialState => {
    const state = setupCompleteState(initialState);

    return assignState(state, [setupInitialSelectors, setupBasicBehaviour, setupRectangleBehavior]);
};

export default delegateInit(Rectangle, ENTITY_FIELD_NAME);

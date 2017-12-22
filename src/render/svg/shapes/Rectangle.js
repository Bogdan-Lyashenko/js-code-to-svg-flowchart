import { getRoundedRectangle, getCircle } from 'shared/utils/svgPrimitives';
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
        const theme = state.theme,
            dotTheme = theme.dot;
        const { x, y } = state.position,
            { w, h } = state.dimensions,
            node = state.node;

        return `
                <g>
                   ${getRoundedRectangle(x, y, w, h, theme)}
                   ${this.printName()}
                   ${
                       node.chain
                           ? getCircle(
                                 x + dotTheme.offset,
                                 y + h - dotTheme.offset,
                                 dotTheme.radius,
                                 dotTheme
                             )
                           : ''
                   }
                   ${this.printDebugInfo(config)}
                </g>`;
    }
});

export const Rectangle = initialState => {
    const state = setupCompleteState(initialState);

    return assignState(state, [setupInitialSelectors, setupBasicBehaviour, setupRectangleBehavior]);
};

export default delegateInit(Rectangle, ENTITY_FIELD_NAME);

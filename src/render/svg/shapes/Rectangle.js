import {getRoundedRectangle} from '../../../shared/utils/svgPrimitives';

import {
    setupCompleteState,
    setupBasicBehaviour,
    setupInitialSelectors,

    delegateInit
} from './BaseShape';

const ENTITY_FIELD_NAME = 'Rectangle';

const setupRectangleBehavior = (state) => ({
    print() {
        const theme = state.theme;
        const {x, y} = state.position,
            {w, h} = state.dimensions;

        return `
                <g>
                   ${getRoundedRectangle(x, y, w, h, theme)}
                   ${this.printName()}
                </g>`;
    }
});

export const Rectangle = (initialState) => {
    const state = setupCompleteState(initialState);

    return Object.assign(
        {state},
        setupInitialSelectors(state),

        setupBasicBehaviour(state),

        setupRectangleBehavior(state)
    );
};

export default delegateInit(Rectangle, ENTITY_FIELD_NAME);

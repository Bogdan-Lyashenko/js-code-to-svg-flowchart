import {
    setupCompleteState,
    setupBasicBehaviour,
    setupInitialSelectors,

    delegateInit
} from './Shape';

const ENTITY_FIELD_NAME = 'Rectangle';

const setupRectangleBehavior = (state) => ({
    print() {
        const theme = state.theme;
        const {x, y} = state.position,
            {w, h} = state.dimensions;

        return `
                <g>
                    <rect x="${x}" y="${y}"
                        width="${w}" height=${h}
                        rx="${theme.roundBorder}" ry="${theme.roundBorder}"
                        style="fill:${theme.fillColor}; stroke-width:${theme.strokeWidth}; stroke:${theme.strokeColor}" />
                   ${this.printName()}
                </g>`;
    }
});

export const Rectangle = (initialState) => {
    const state = setupCompleteState(initialState);

    return Object.assign(
        {state, type: ENTITY_FIELD_NAME},
        setupInitialSelectors(state),

        setupBasicBehaviour(state),

        setupRectangleBehavior(state)
    );
};

export default delegateInit(Rectangle, ENTITY_FIELD_NAME);

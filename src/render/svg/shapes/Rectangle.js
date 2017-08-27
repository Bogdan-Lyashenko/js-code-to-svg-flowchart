import {
    setupBasicBehaviour,
    setupInitialProperties,
    setupInitialSelectors,
    extractBasicState,

    delegateInit
} from './Shape';

const ENTITY_FIELD_NAME = 'Rectangle';

export const setupRectangleBehavior = (state) => ({
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
    let state = extractBasicState(initialState);

    state = {...state, ...setupInitialProperties(state)}; //move two lines to shape

    return Object.assign(
        {state},
        setupInitialSelectors(state),

        setupBasicBehaviour(state),

        setupRectangleBehavior(state)
    );
};

export default delegateInit(Rectangle, ENTITY_FIELD_NAME);

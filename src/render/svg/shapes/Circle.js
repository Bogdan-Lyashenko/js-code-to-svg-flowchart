import {
    extractBasicState,
    setupBasicBehaviour,
    setupInitialSelectors,

    calculateBoundaries,

    delegateInit
} from './Shape';

const ENTITY_FIELD_NAME = 'Circle';

const calculateFromPoint = ({position, dimensions}) => {
    const r = dimensions.w / 2;
    return {x: position.x, y: position.y + r};
};

const setupInitialProperties = (state) => ({
    fromPoint: calculateFromPoint(state),
    boundaries: calculateBoundaries(state)
});

const setupCircleBehavior = (state) => ({
    print() {
        const theme = state.theme;
        const {x, y} = state.position,
            r = state.dimensions.w / 2;

        return `
            <g>
               <circle cx="${x }" cy="${y}" r="${r}"
                style="fill:${theme.fillColor};stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />
               ${this.printName()}
            </g>`
    },

    setChildOffsetPoint(point) {
        state.childOffsetPoint = point;
    }
});

export const Circle = (initialState) => {
    let state = extractBasicState(initialState);

    state =  {...state, ...setupInitialProperties(state)};

    return Object.assign(
        {state, type: ENTITY_FIELD_NAME},
        setupInitialSelectors(state),

        setupBasicBehaviour(state),

        setupCircleBehavior(state)
    );
};

export default delegateInit(Circle, ENTITY_FIELD_NAME);

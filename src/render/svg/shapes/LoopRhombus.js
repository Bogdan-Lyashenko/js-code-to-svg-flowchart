import {
    setupBasicBehaviour,
    setupInitialSelectors,

    calculateToPoint,
    calculateBackPoint,
    calculateBoundaries,

    delegateInit
} from './Shape';

import {
    calculateDimensions,
    calculateFromPoint,
    calculateChildOffsetPoint
} from './Rhombus';

const ENTITY_FIELD_NAME = 'LoopRhombus';

const calculateMidPoint = ({position, dimensions}) => ({
    x: position.x + dimensions.w / 2,
    y: position.y
});

const setupInitialProperties = (state) => ({
    fromPoint: calculateFromPoint(state),
    childOffsetPoint: calculateChildOffsetPoint(state),
    toPoint: calculateToPoint(state),
    backPoint: calculateBackPoint(state),
    boundaries: calculateBoundaries(state),

    midPoint: calculateMidPoint(state)
});

const setupAdditionalSelectors = (state) => ({
    getMidPoint() {
        return state.midPoint;
    }
});

const setupLoopRhombusBehavior = (state) => ({
    print() {
        const theme = state.theme;
        const {x, y} = state.position,
            {w, h} = state.dimensions,
            namePosition = {x: x + theme.thinPartOffset, y: y + theme.thinPartOffset},
            {doubleLayerOffset, fillColor, strokeColor, strokeWidth} = theme;

        return `<g>
            <polygon points="
                    ${x + doubleLayerOffset/2},${y + h/2 - doubleLayerOffset} 
                    ${x + w / 2 + doubleLayerOffset/2},${y - doubleLayerOffset} 
                    ${x + w + theme.doubleLayerOffset/2},${y + h/2 - doubleLayerOffset} 
                    ${x + w/2 + theme.doubleLayerOffset/2},${y + h - doubleLayerOffset}"
                style="fill:${fillColor};stroke:${strokeColor};stroke-width:${strokeWidth}" />
                
            <polygon points="${x},${y + h/2} ${x + w / 2},${y} ${x + w},${y + h/2} ${x + w/2},${y + h}"
                style="fill:${fillColor};stroke:${strokeColor};stroke-width:${strokeWidth}" />
                
            ${this.printName(namePosition)}
        </g>`
    }
});

const calculatePosition = ({initialPosition, theme}) => ({
    x: initialPosition.x,
    y: initialPosition.y + theme.positionTopShift
});

const extractBasicState = (state) => ({
    ...state,
    position: calculatePosition(state),
    dimensions: calculateDimensions(state)
});

export const LoopRhombus = (initialState) => {
    let state = extractBasicState(initialState);

    state =  {...state, ...setupInitialProperties(state)};

    return Object.assign(
        {state, type: ENTITY_FIELD_NAME},
        setupInitialSelectors(state),
        setupAdditionalSelectors(state),

        setupBasicBehaviour(state),

        setupLoopRhombusBehavior(state)
    );
};

export default delegateInit(LoopRhombus, ENTITY_FIELD_NAME);

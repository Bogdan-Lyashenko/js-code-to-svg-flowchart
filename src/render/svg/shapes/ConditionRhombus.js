import {TOKEN_KEYS} from '../../../shared/constants';

import {
    setupBasicBehaviour,
    setupInitialSelectors,

    calculateBackPoint,
    calculateBoundaries,
    calculatePosition,

    delegateInit
} from './Shape';

import {
    calculateDimensions,
    calculateFromPoint,
    calculateChildOffsetPoint
} from './Rhombus';

const ENTITY_FIELD_NAME = 'ConditionRhombus';

const calculateAlternateFromPoint = ({position, dimensions}) => ({
    x: position.x + dimensions.w,
    y: position.y + dimensions.h/2
});

const calculateToPoint = ({position, dimensions}) => ({
    x: position.x,
    y: position.y + dimensions.h/2
});

const setupInitialProperties = (state) => ({
    fromPoint: calculateFromPoint(state),
    childOffsetPoint: calculateChildOffsetPoint(state),
    toPoint: calculateToPoint(state),
    backPoint: calculateBackPoint(state),
    boundaries: calculateBoundaries(state),

    alternateFromPoint: calculateAlternateFromPoint(state)
});

const setupAdditionalSelectors = (state) => ({
    getAlternateFromPoint() {
        return state.alternateFromPoint;
    }
});

export const setupConditionRhombusBehavior = (state) => ({
    getConsequentBranchChildBoundary() {
        return this.getChildBoundaries(child => child.state.node.key === TOKEN_KEYS.CONSEQUENT);
    },

    getAlternativeBranchChildOffsetPoint() {
        const theme = state.theme,
            position = {};

        position.y = state.position.y + state.childOffsetPoint.y;

        position.x = this.getConsequentBranchChildBoundary().max.x;
        position.x += theme.alternateBranchOffset;

        const rightLimit = state.position.x + state.dimensions.w + theme.childOffset;
        if (position.x <= rightLimit) {
            position.x = rightLimit;
        }

        return position;
    },

    isFirstChildByKey(key) {
        return !state.body.filter(shape => shape.state.node.key === key).length;
    },

    printConditionMarks() {
        const theme = state.theme;
        const {x, y} = state.position,
            {w, h} = state.dimensions;

        return `<text x="${x + w - theme.markOffset.x}" y="${y + h/2 - theme.markOffset.y}"
            font-family="${theme.fontFamily}" font-size="${theme.fontSize}" fill="${theme.textColor}"> - </text>
            
            <text x="${x + w/2 - 2*theme.markOffset.x}" y="${y + h + 2*theme.markOffset.y}"
            font-family="${theme.fontFamily}" font-size="${theme.fontSize}" fill="${theme.textColor}"> + </text>`
    },

    print() {
        const theme = state.theme;
        const {x, y} = state.position,
            {w, h} = state.dimensions,
            namePosition = {x: x + theme.thinPartOffset, y: y + theme.thinPartOffset};

        return `<g>
            <polygon points="${x},${y + h/2} ${x + w / 2},${y} ${x + w},${y + h/2} ${x + w/2},${y + h}"
                style="fill:${theme.fillColor};stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />
                
            ${this.printName(namePosition)}
            ${this.printConditionMarks()}
        </g>`
    }
});

const extractBasicState = (state) => ({
    ...state,
    position: calculatePosition(state),
    dimensions: calculateDimensions(state)
});


export const ConditionRhombus = (initialState) => {
    let state = extractBasicState(initialState);

    state =  {...state, ...setupInitialProperties(state)};

    return Object.assign(
        {state, type: ENTITY_FIELD_NAME},
        setupInitialSelectors(state),
        setupAdditionalSelectors(state),

        setupBasicBehaviour(state),

        setupConditionRhombusBehavior(state)
    );
};

export default delegateInit(ConditionRhombus, ENTITY_FIELD_NAME);

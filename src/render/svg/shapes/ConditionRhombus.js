import {TOKEN_KEYS} from '../../../shared/constants';
import {getRhombus, getRoundedRectangle, getText} from '../../../shared/utils/svgPrimitives';

import {
    setupBasicBehaviour,
    setupInitialSelectors,

    calculateBackPoint,
    calculateBoundaries,
    calculatePosition,

    delegateInit
} from './BaseShape';

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

    checkIfChildExist(key) {
        return state.body.filter(shape => shape.getNodeKey() === key).length;
    },

    printConditionMarks() {
        const theme = state.theme;
        const {x, y} = state.position,
            R = state.dimensions.h,
            w = state.dimensions.w;

        const text = 'if',
            positive = '+',
            alternative = '-';

        //TODO: render - mark only if parent has alternative branch
        //TODO: move to variables for marks
        return `
            ${getText(x + R/2 - text.length*theme.symbolWidth/2, y + R/2 + theme.symbolHeight/2, theme, text)}
            
            ${getText(x + R/2 + theme.symbolWidth, y + R + theme.symbolWidth/4, theme, positive)}
            
            ${this.checkIfChildExist(TOKEN_KEYS.ALTERNATE) ? 
                getText(x + w + theme.symbolWidth/2, y + R/2 - theme.symbolWidth/4, theme, alternative) : ''}
        `;
    },

    print() {
        const theme = state.theme,
            {x, y} = state.position,
            {w, h} = state.dimensions;

        const R = h,
            rH = h - 2*theme.thinPartOffset;

        const namePosition = {
            x: x + R,
            y: y + rH/2
        };

        return `<g>
            ${getRoundedRectangle(x + h/2, y + h/4, w - R/2, rH, theme)}                
            ${getRhombus(x, y, R, R, theme)}
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
        {state},
        setupInitialSelectors(state),
        setupAdditionalSelectors(state),

        setupBasicBehaviour(state),

        setupConditionRhombusBehavior(state)
    );
};

export default delegateInit(ConditionRhombus, ENTITY_FIELD_NAME);

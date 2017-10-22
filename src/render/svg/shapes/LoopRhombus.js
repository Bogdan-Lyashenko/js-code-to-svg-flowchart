import { getRhombus, getRoundedRectangle, getText } from 'shared/utils/svgPrimitives';
import { assignState } from 'shared/utils/composition';
import { TOKEN_TYPES } from 'shared/constants';

import {
    setupBasicBehaviour,
    setupInitialSelectors,
    calculateToPoint,
    calculateBackPoint,
    calculateBoundaries,
    delegateInit
} from './BaseShape';

import { calculateDimensions, calculateFromPoint, calculateChildOffsetPoint } from './Rhombus';

const ENTITY_FIELD_NAME = 'LoopRhombus';

const LoopMarksMap = {
    [TOKEN_TYPES.FOR_OF_STATEMENT]: 'for',
    [TOKEN_TYPES.FOR_IN_STATEMENT]: 'for',
    [TOKEN_TYPES.FOR_STATEMENT]: 'for',
    [TOKEN_TYPES.WHILE_STATEMENT]: 'while',
    [TOKEN_TYPES.DO_WHILE_STATEMENT]: 'while'
};

const calculateMidPoint = ({ position, dimensions }) => ({
    x: position.x + dimensions.h / 2,
    y: position.y
});

const setupInitialProperties = state => ({
    fromPoint: calculateFromPoint(state),
    childOffsetPoint: calculateChildOffsetPoint(state),
    toPoint: calculateToPoint(state),
    backPoint: calculateBackPoint(state),
    boundaries: calculateBoundaries(state),

    midPoint: calculateMidPoint(state)
});

const setupAdditionalSelectors = state => ({
    getMidPoint() {
        return state.midPoint;
    },

    getLoopedConnectionArrow() {
        return state.loopedConnectionArrow;
    }
});

const setupLoopRhombusBehavior = state => ({
    assignLoopedConnectionArrow(loopedConnectionArrow) {
        state.loopedConnectionArrow = loopedConnectionArrow;
    },

    printConditionMarks() {
        const theme = state.theme;
        const { x, y } = state.position,
            R = state.dimensions.h,
            text = state.prefixName || LoopMarksMap[state.node.subType] || 'for';

        return getText(
            x + R / 2 - text.length * theme.symbolWidth / 2,
            y + R / 2 + theme.symbolHeight / 2,
            theme,
            text
        );
    },

    print(config) {
        const theme = state.theme;
        const { x, y } = state.position,
            { w, h } = state.dimensions;

        const R = h,
            rH = h - 2 * theme.thinPartOffset;

        const namePosition = {
            x: x + R,
            y: y + rH / 2
        };

        return `<g>

            ${getRoundedRectangle(x + h / 2, y + h / 4, w - R / 2, rH, theme)}
            ${getRhombus(x, y, R, R, theme)}
                
            ${this.printName(namePosition)}
            ${this.printDebugInfo(config)}
            ${this.printConditionMarks()}
        </g>`;
    }
});

const calculatePosition = ({ initialPosition, theme }) => ({
    x: initialPosition.x,
    y: initialPosition.y + theme.positionTopShift
});

const extractBasicState = state => ({
    ...state,
    position: calculatePosition(state),
    dimensions: calculateDimensions(state)
});

export const LoopRhombus = initialState => {
    let state = extractBasicState(initialState);

    state = { ...state, ...setupInitialProperties(state) };

    return assignState(state, [
        setupInitialSelectors,
        setupAdditionalSelectors,
        setupBasicBehaviour,
        setupLoopRhombusBehavior
    ]);
};

export default delegateInit(LoopRhombus, ENTITY_FIELD_NAME);

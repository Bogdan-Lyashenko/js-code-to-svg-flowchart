import { getCircle, getRectangle } from 'shared/utils/svgPrimitives';
import { assignState } from 'shared/utils/composition';

import {
    extractBasicState,
    setupBasicBehaviour,
    setupInitialSelectors,
    calculateBoundaries,
    delegateInit
} from './BaseShape';

const ENTITY_FIELD_NAME = 'RootCircle';

const calculateFromPoint = ({ position, theme }) => {
    const r = theme.radius;
    return { x: position.x, y: position.y + r };
};

const setupInitialProperties = state => ({
    fromPoint: calculateFromPoint(state),
    boundaries: calculateBoundaries(state)
});

const setupCircleBehavior = state => ({
    print() {
        const theme = state.theme;
        const { x, y } = state.position,
            { w, h } = state.dimensions,
            r = theme.radius;

        const namePosition = { x: x + r, y: y - r };

        return `
            <g>
               ${getRectangle(x, y - r + r / 4, w + r, h - theme.padding * 2, theme)}
               ${getCircle(x, y, r, theme)}
               ${this.printName(namePosition)}
            </g>`;
    },

    setChildOffsetPoint(point) {
        state.childOffsetPoint = point;
    }
});

export const RootCircle = initialState => {
    let state = extractBasicState(initialState);

    state = { ...state, ...setupInitialProperties(state) };

    return assignState(state, [setupInitialSelectors, setupBasicBehaviour, setupCircleBehavior]);
};

export default delegateInit(RootCircle, ENTITY_FIELD_NAME);

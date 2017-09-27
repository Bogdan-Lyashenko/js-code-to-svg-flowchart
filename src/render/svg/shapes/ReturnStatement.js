import { getRoundedRectangle, getLine, getClosedPath } from 'shared/utils/svgPrimitives';
import { assignState } from 'shared/utils/composition';
import { addOffsetToPoints } from 'shared/utils/geometry';

import {
    setupBasicBehaviour,
    setupInitialProperties,
    setupInitialSelectors,
    calculateHeight,
    calculateNameBasedWidth,
    calculatePosition,
    delegateInit
} from './BaseShape';

const ENTITY_FIELD_NAME = 'ReturnStatement';

const setupReturnStatementBehaviour = state => ({
    print(config) {
        const theme = state.theme,
            arrowTheme = theme.arrow;

        const { x, y } = state.position,
            h = state.dimensions.h,
            w = state.dimensions.w - arrowTheme.handlerLength - arrowTheme.sizeX,
            namePosition = { x: x, y };

        //TODO: refactor
        const arrowSize = { x: arrowTheme.sizeX, y: arrowTheme.sizeY };

        const arrow = getClosedPath(
            addOffsetToPoints(
                [{ x: 0, y: 0 }, { x: arrowSize.x, y: arrowSize.y / 2 }, { x: 0, y: arrowSize.y }],
                {
                    x: x + w + arrowTheme.handlerLength,
                    y: y + h / 2 - arrowSize.y / 2
                }
            ),
            arrowTheme
        );

        return `
            <g>
                ${getRoundedRectangle(x, y, w, h, theme)}
                
                ${getLine(
                    x + w,
                    y + h / 2 - arrowTheme.handlerLength,
                    x + w + arrowTheme.handlerLength,
                    y + h / 2 - arrowTheme.handlerLength,
                    arrowTheme
                )}
                
                ${getLine(
                    x + w,
                    y + h / 2 + arrowTheme.handlerLength,
                    x + w + arrowTheme.handlerLength,
                    y + h / 2 + arrowTheme.handlerLength,
                    arrowTheme
                )}

                ${arrow}
                             
                ${this.printName(namePosition)}
                ${this.printDebugInfo(config)}
            </g>`;
    }
});

const calculateWidth = state => {
    const theme = state.theme,
        arrowTheme = theme.arrow;

    return (
        2 * theme.horizontalPadding +
        arrowTheme.handlerLength +
        arrowTheme.sizeX +
        calculateNameBasedWidth(state)
    );
};

const calculateDimensions = state => ({
    w: calculateWidth(state),
    h: calculateHeight(state)
});

const extractBasicState = state => ({
    ...state,
    position: calculatePosition(state),
    dimensions: calculateDimensions(state)
});

export const ReturnStatement = initialState => {
    let state = extractBasicState(initialState);

    state = { ...state, ...setupInitialProperties(state) };

    return assignState(state, [
        setupInitialSelectors,
        setupBasicBehaviour,
        setupReturnStatementBehaviour
    ]);
};

export default delegateInit(ReturnStatement, ENTITY_FIELD_NAME);

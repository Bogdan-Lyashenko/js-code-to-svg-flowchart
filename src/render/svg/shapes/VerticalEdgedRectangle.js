import {
    setupBasicBehaviour,
    setupInitialProperties,
    setupInitialSelectors,

    calculateHeight,
    calculatePosition,

    delegateInit
} from './Shape';

const ENTITY_FIELD_NAME = 'VerticalEdgedRectangle';

export const setupVerticalEdgedRectangleBehavior = (state) => ({
    print() {
        const theme = state.theme;
        const {x, y} = state.position,
            {w, h} = state.dimensions,
            namePosition = {x: x + theme.edgeOffset, y};

        return `
            <g>
             <rect x="${x}" y="${y}"
                    width="${w}" height=${h}
                    rx="${0}" ry="${0}"
                    style="fill:${theme.fillColor}; stroke-width:${theme.strokeWidth}; stroke:${theme.strokeColor}" />
                    
             <line x1="${x + theme.edgeOffset}" y1="${y}" x2="${x + theme.edgeOffset}" y2="${y + h}"
                    style="stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />
             
             <line x1="${x + w - theme.edgeOffset}" y1="${y}" x2="${x + w - theme.edgeOffset}" y2="${y + h}"
                    style="stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />
                    
                ${this.printName(namePosition)}
            </g>`
    }
});

export const calculateWidth = ({theme, name}) =>
    (2 * theme.horizontalPadding + name.length * theme.symbolWidth + 2 * theme.edgeOffset);

export const calculateVerticalEdgedRectangleDimensions = (state) => ({
    w: calculateWidth(state),
    h: calculateHeight(state)
});

export const extractBasicState = (state) => ({
    ...state,
    position: calculatePosition(state),
    dimensions: calculateVerticalEdgedRectangleDimensions(state)
});

export const VerticalEdgedRectangle = (initialState) => {
    let state = extractBasicState(initialState);

    state = {...state, ...setupInitialProperties(state)};

    return Object.assign(
        { state },
        setupInitialSelectors(state),

        setupBasicBehaviour(state),

        setupVerticalEdgedRectangleBehavior(state)
    );
};

export default delegateInit(VerticalEdgedRectangle, ENTITY_FIELD_NAME);

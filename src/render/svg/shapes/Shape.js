import {generateId} from '../../../shared/utils/string';
import {flatTree} from '../../../shared/utils/flatten';
import {calculateShapesBoundaries} from '../../../shared/utils/geometry';

export const delegateInit = (shape, themeFieldName) => {
    function init(node, position, theme) {
        return shape(getInitialState(node, position, theme));
    }

    init.getThemeFieldName = () => {
        return themeFieldName;
    };

    return init;
};

export const getInitialState = (node, {x, y}, theme) => ({
    id: generateId(),
    body: [],
    theme,
    node,
    name: node.name,
    initialPosition: {x, y}
});

export const setupInitialProperties = (state) => ({
    fromPoint: calculateFromPoint(state),
    toPoint: calculateToPoint(state),
    backPoint: calculateBackPoint(state),
    childOffsetPoint: calculateChildOffsetPoint(state),
    boundaries: calculateBoundaries(state)
});


export const extractBasicState = (state) => ({
    ...state,
    position: calculatePosition(state),
    dimensions: calculateDimensions(state)
});

export const setupInitialSelectors = (state) => ({
    getBody() {
        return state.body;
    },

    getBoundaries() {
        return state.boundaries;
    },

    getBackPoint() {
        return state.backPoint;
    },

    getChildOffsetPoint() {
        return state.childOffsetPoint;
    },

    getDimensions() {
        return state.dimensions;
    },

    getId() {
        return state.id;
    },

    getFromPoint() {
        return state.fromPoint;
    },

    getMargin() {
        return state.theme.margin;
    },

    getName() {
        return state.name;
    },

    getNode() {
        return state.node;
    },

    getNodeType() {
        return state.node.type;
    },

    getNodeKey() {
        return state.node.key;
    },

    getParent() {
        return state.parent;
    },

    getPosition() {
        return state.position;
    },

    getToPoint() {
        return state.toPoint;
    }
});


export const setupPrintName = ({position, theme, name}) => ({
    /*TODO: add multi line support
     <text x="10" y="20" style="fill:red;">Several lines:
     <tspan x="10" y="45">First line.</tspan>
     <tspan x="10" y="70">Second line.</tspan>
     </text>*/
    printName(newPosition) {
        const {x, y} = newPosition ? newPosition : position;

        return `<text x="${x + theme.horizontalPadding}" y="${y + 2*theme.verticalPadding}"
                font-family="${theme.fontFamily}" font-size="${theme.fontSize}" fill="${theme.textColor}">
                ${name}
            </text>`;
    }
});

export const setupConnectChild = (state) => ({
    addChild(child) {
        state.body.push(child);
    },

    setParent(parent) {
        state.parent = parent;
    },

    connectChild(child) {
        this.addChild(child);
        child.setParent(this);
    }
});

export const setupGetChildBoundaries = (state) => ({
    getChildBoundaries(filterFn) {
        const {body, boundaries} = state;

        if (!body.length) {
            return boundaries;
        }


        const nBody = filterFn ? body.filter(filterFn) : body;
        const tree = {
            state: {
                body: nBody,
                boundaries
            },
            getBody() {
                return nBody;
            }

        };

        return calculateShapesBoundaries(
            flatTree(tree, {getBody: node => node.getBody()})
                .map(item => item.state.boundaries)
        );
    }
});

export const setupBasicBehaviour = (state) => Object.assign(
    {},
    setupPrintName(state),
    setupConnectChild(state),
    setupGetChildBoundaries(state)
);

export const setupCompleteState = (initialState) => {
    let state = extractBasicState(initialState);
    return {...state, ...setupInitialProperties(state)};
};

export const calculateWidth = ({name, theme}) => 2 * theme.horizontalPadding + name.length * theme.symbolWidth;

export const calculateHeight = ({theme}) => 2 * theme.verticalPadding + theme.symbolHeight;

export const calculateDimensions = (state) => ({w: calculateWidth(state), h: calculateHeight(state)});

export const calculatePosition = (state) => ({...state.initialPosition});

export const calculateFromPoint = ({position, dimensions, theme}) => ({
    x: position.x + theme.childOffset / 2,
    y: position.y + dimensions.h
});

export const calculateToPoint = ({position, dimensions}) => ({
    x: position.x,
    y: position.y + dimensions.h/2
});

export const calculateBackPoint = ({position, dimensions}) => ({
    x: position.x  + dimensions.w,
    y: position.y + dimensions.h/2
});

export const calculateChildOffsetPoint = ({theme, dimensions}) => ({
    x: theme.childOffset,
    y: dimensions.h + dimensions.h/4
});

export const calculateBoundaries = ({position, dimensions}) => ({
    min: {x: position.x, y: position.y},
    max: {x: position.x + dimensions.w, y: position.y + dimensions.h}
});

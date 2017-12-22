import escape from 'xml-escape';
import { mergeObjectStructures } from 'shared/utils/composition';
import {
    generateId,
    splitNameString,
    getMaxStringLengthFromList,
    getPathId
} from 'shared/utils/string';
import { flatTree } from 'shared/utils/flatten';
import { calculateShapesBoundaries } from 'shared/utils/geometry';
import {
    MAX_NAME_STR_LENGTH,
    getNameSplitterTokensIterator
} from '../appearance/TextContentConfigurator';

export const delegateInit = (shape, themeFieldName) => {
    function init(node, position, theme) {
        return shape(getInitialState(node, position, theme, themeFieldName));
    }

    init.getThemeFieldName = () => {
        return themeFieldName;
    };

    return init;
};

export const getInitialState = (node, { x, y }, theme, type) => {
    const nameParts = splitNameString(
            node.name,
            MAX_NAME_STR_LENGTH,
            getNameSplitterTokensIterator()
        ),
        totalNamePartsNumber = nameParts.length,
        maxNamePartLength = getMaxStringLengthFromList(nameParts);

    return {
        id: generateId(),
        nodePathId: getPathId(node),
        type,
        body: [],
        theme,
        originalTheme: theme,
        node,
        name: node.name,
        prefixName: node.prefixName,
        nameParts,
        totalNamePartsNumber,
        maxNamePartLength,
        initialPosition: { x, y }
    };
};

export const setupInitialProperties = state => ({
    fromPoint: calculateFromPoint(state),
    toPoint: calculateToPoint(state),
    backPoint: calculateBackPoint(state),
    childOffsetPoint: calculateChildOffsetPoint(state),
    boundaries: calculateBoundaries(state)
});

export const extractBasicState = state => ({
    ...state,
    position: calculatePosition(state),
    dimensions: calculateDimensions(state)
});

export const setupInitialSelectors = state => ({
    getBody() {
        return state.body;
    },

    getBoundaries() {
        return state.boundaries;
    },

    getBackPoint() {
        return state.backPoint;
    },

    getAssignedConnectionArrow() {
        return state.connectionArrow;
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

    getNodePathId() {
        return state.nodePathId;
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
    },

    getShapeType() {
        return state.type;
    }
});

export const setupSharedPrint = state => ({
    //TODO: fix spacing for multi line name
    printName(newPosition) {
        const { position, theme, nameParts } = state;
        const { x, y } = newPosition ? newPosition : position;
        const name = nameParts
            .map(
                (part, i) =>
                    `<tspan x="${x + theme.horizontalPadding}" y="${y +
                        2 * theme.verticalPadding * (i + 1)}">${escape(part)}</tspan>`
            )
            .join('');

        //TODO: move to svg primitives
        // 3 because of ellipsis 3 dots
        return `${
            nameParts[0].length <= state.name.length + 3
                ? `<title>${escape(state.name)}</title>`
                : ''
        }
            <text x="${x + theme.horizontalPadding}" y="${y + 2 * theme.verticalPadding}"
                font-family="${theme.fontFamily}" font-size="${theme.fontSize}" fill="${
            theme.textColor
        }">
                ${name}
            </text>`;
    },

    printDebugInfo({ debug } = {}) {
        if (!debug) return '';

        const { position, dimensions, theme, nodePathId } = state;

        return `<text x="${position.x + 3 * theme.horizontalPadding}" y="${position.y +
            dimensions.h +
            theme.verticalPadding}"
                font-family="${theme.fontFamily}" font-size="${theme.debugFontSize}" fill="${
            theme.debugTextColor
        }">
                ${nodePathId}
            </text>`;
    }
});

export const setupGetChildBoundaries = state => ({
    getChildBoundaries(filterFn) {
        const { body, boundaries } = state;

        if (!body.length) {
            return boundaries;
        }

        const flattedTree = flatTree(
            {
                getBody: () => (filterFn ? body.filter(filterFn) : body),
                getBoundaries: () => boundaries
            },
            node => node.getBody()
        );

        return calculateShapesBoundaries(flattedTree.map(item => item.getBoundaries()));
    }
});

export const setupStateModifiers = state => ({
    addChild(child) {
        state.body.push(child);
    },

    setParent(parent) {
        state.parent = parent;
    },

    connectChild(child) {
        this.addChild(child);
        child.setParent(this);
    },

    updateTheme(newTheme) {
        state.theme = mergeObjectStructures(state.theme, newTheme);
    },
    assignConnectionArrow(connectionArrow) {
        state.connectionArrow = connectionArrow;
    }
});

export const setupBasicBehaviour = state =>
    Object.assign(
        {},
        setupSharedPrint(state),
        setupGetChildBoundaries(state),
        setupStateModifiers(state)
    );

export const setupCompleteState = initialState => {
    let state = extractBasicState(initialState);
    return { ...state, ...setupInitialProperties(state) };
};

export const calculateNameBasedWidth = ({ maxNamePartLength, theme }) =>
    maxNamePartLength * theme.symbolWidth;

export const calculateNameBasedHeight = ({ totalNamePartsNumber, theme }) =>
    totalNamePartsNumber * theme.symbolHeight + (totalNamePartsNumber - 1) * theme.lineHeight;

export const calculateWidth = state =>
    2 * state.theme.horizontalPadding + calculateNameBasedWidth(state);

export const calculateHeight = state =>
    2 * state.theme.verticalPadding + calculateNameBasedHeight(state);

export const calculateDimensions = state => ({
    w: calculateWidth(state),
    h: calculateHeight(state)
});

export const calculatePosition = state => ({ ...state.initialPosition });

export const calculateFromPoint = ({ position, dimensions, theme }) => ({
    x: position.x + theme.childOffset / 2,
    y: position.y + dimensions.h
});

export const calculateToPoint = ({ position, dimensions }) => ({
    x: position.x,
    y: position.y + dimensions.h / 2
});

export const calculateBackPoint = ({ position, dimensions }) => ({
    x: position.x + dimensions.w,
    y: position.y + dimensions.h / 2
});

export const calculateChildOffsetPoint = ({ theme, dimensions }) => ({
    x: theme.childOffset,
    y: dimensions.h + theme.childOffset / 2
});

export const calculateBoundaries = ({ position, dimensions }) => ({
    min: { x: position.x, y: position.y },
    max: { x: position.x + dimensions.w, y: position.y + dimensions.h }
});

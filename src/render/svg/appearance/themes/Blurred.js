export const BaseShape = {
    strokeOpacity: 0.1,
    fillOpacity: 0.1,
    textColor: '#ccc'
};

export default {
    ConnectionArrow: {
        arrow: {
            ...BaseShape
        },
        line: {
            ...BaseShape
        }
    },

    Shape: {
        ...BaseShape
    },

    Rectangle: {
        ...BaseShape
    },

    VerticalEdgedRectangle: {
        ...BaseShape
    },

    Circle: {
        ...BaseShape
    },

    LoopRhombus: {
        ...BaseShape
    },

    ConditionRhombus: {
        ...BaseShape
    },

    ReturnStatement: {
        ...BaseShape,
        arrow: {
            ...BaseShape
        }
    }
};

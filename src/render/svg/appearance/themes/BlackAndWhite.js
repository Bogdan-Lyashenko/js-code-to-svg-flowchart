export const BaseShape = {
    strokeColor: '#333',
    fillColor: '#A6A6A6',
    textColor: '#333'
};

export default {
    ConnectionArrow: {
        arrow: {
            ...BaseShape,
            fillColor: '#222'
        },
        line: {
            strokeColor: '#333'
        }
    },

    Shape: {
        ...BaseShape
    },

    Rectangle: {
        ...BaseShape,
        fillColor: '#A6A6A6'
    },

    VerticalEdgedRectangle: {
        ...BaseShape,
        fillColor: '#C8C8C8'
    },

    Circle: {
        ...BaseShape,
        fillColor: '#F1F1F1'
    },

    LoopRhombus: {
        ...BaseShape,
        fillColor: '#C1C1C1'
    },

    ConditionRhombus: {
        ...BaseShape,
        fillColor: '#A5A5A5'
    },

    ReturnStatement: {
        ...BaseShape,
        arrow: {
            ...BaseShape
        }
    }
};

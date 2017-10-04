export const BaseShape = {
    strokeColor: '#333',
    fillColor: '#A6A6A6',
    textColor: '#333'
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

    RootCircle: {
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
    },
    DestructedNode: {
        ...BaseShape,
        suffix: {
            ...BaseShape
        }
    },
    ClassDeclaration: {
        ...BaseShape
    },

    DebuggerStatement: {
        ...BaseShape
    },

    ExportDeclaration: {
        ...BaseShape,
        arrow: {
            ...BaseShape
        }
    },

    ImportDeclaration: {
        ...BaseShape
    },

    ImportSpecifier: {
        ...BaseShape
    },

    ThrowStatement: {
        ...BaseShape
    },

    TryStatement: {
        ...BaseShape
    },

    CatchClause: {
        ...BaseShape,
        arrow: {
            ...BaseShape
        }
    },

    SwitchStatement: {
        ...BaseShape
    },

    BreakStatement: {
        ...BaseShape,
        arrow: {
            ...BaseShape
        }
    },

    SwitchCase: {
        ...BaseShape
    },

    ContinueStatement: {
        ...BaseShape,
        arrow: {
            ...BaseShape
        }
    }
};

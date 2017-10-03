export const BaseShape = {
    textColor: '#ccc',
    strokeColor: '#ccc'
};

export default {
    ConnectionArrow: {
        arrow: {
            ...BaseShape,
            fillColor: '#ccc'
        },
        line: {
            ...BaseShape
        }
    },

    Shape: {
        ...BaseShape
    },

    Rectangle: {
        ...BaseShape,
        fillColor: '#F3E5F5'
    },

    VerticalEdgedRectangle: {
        ...BaseShape,
        fillColor: '#F1F8E9'
    },

    RootCircle: {
        ...BaseShape,
        fillColor: '#FFFDE7'
    },

    LoopRhombus: {
        ...BaseShape,
        fillColor: '#E3F2FD'
    },

    ConditionRhombus: {
        ...BaseShape,
        fillColor: '#F3E5F5'
    },

    ReturnStatement: {
        ...BaseShape,
        fillColor: '#EDE7F6',
        arrow: {
            ...BaseShape,
            fillColor: '#F1F8E9'
        }
    },
    DestructedNode: {
        ...BaseShape,
        fillColor: '#FFF8E1',
        suffix: {
            ...BaseShape,
            fillColor: '#FFF8E1'
        }
    },
    ClassDeclaration: {
        ...BaseShape,
        fillColor: '#E0F7FA'
    },

    DebuggerStatement: {
        ...BaseShape,
        fillColor: '#ffebee'
    },

    ExportDeclaration: {
        ...BaseShape,
        fillColor: '#e1f5fe',
        arrow: {
            ...BaseShape,
            fillColor: '#fff'
        }
    },

    ImportDeclaration: {
        ...BaseShape,
        fillColor: '#fff'
    },

    ImportSpecifier: {
        ...BaseShape,
        fillColor: '#e0f7fa'
    },

    ThrowStatement: {
        ...BaseShape,
        fillColor: '#ffebee'
    },

    TryStatement: {
        ...BaseShape,
        fillColor: '#FFE082'
    },

    CatchClause: {
        ...BaseShape,
        fillColor: '#FFF8E1',
        arrow: {
            ...BaseShape,
            fillColor: '#ffebee'
        }
    }
};

export const BaseShape = {
    strokeColor: '#444',
    strokeWidth: 1,
    fillColor: '#fff',
    textColor: '#222',
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 5,
    symbolHeight: 10,
    symbolWidth: 7.8,
    horizontalPadding: 10,
    verticalPadding: 10,
    childOffset: 35,
    margin: 10,
    roundBorder: 2,

    debugFontSize: 8,
    debugTextColor: '#666'
};

export default {
    ConnectionArrow: {
        arrow: {
            size: {
                x: 8,
                y: 6
            },
            fillColor: '#333'
        },
        line: {
            strokeColor: '#444',
            strokeWidth: 1,
            curveTurnRadius: 4
        },
        lineTurnOffset: 20
    },

    Shape: {
        ...BaseShape
    },

    Rectangle: {
        ...BaseShape,
        fillColor: '#b39ddb',
        roundBorder: 3
    },

    VerticalEdgedRectangle: {
        ...BaseShape,
        fillColor: '#a5d6a7',
        edgeOffset: 10
    },

    RootCircle: {
        ...BaseShape,
        radius: 15,
        padding: 3,
        fillColor: '#fff59d'
    },

    LoopRhombus: {
        ...BaseShape,
        fillColor: '#90CAF9',
        thinPartOffset: 15,
        rhombusSize: 50,
        roundBorder: 3,
        doubleLayerOffsetA: 4,
        doubleLayerOffsetB: 8,
        childOffset: 20,
        positionTopShift: 20
    },

    ConditionRhombus: {
        ...BaseShape,
        fillColor: '#ce93d8',
        thinPartOffset: 15,
        roundBorder: 3,
        childOffset: 20,
        alternateBranchOffset: 40,
        markOffset: {
            x: 15,
            y: 5
        },
        margin: 20
    },

    RootStartPoint: {
        center: {
            x: 25,
            y: 25
        },
        childOffset: {
            x: 25,
            y: 65
        }
    },

    ReturnStatement: {
        ...BaseShape,
        roundBorder: 3,
        fillColor: '#b39ddb',
        arrow: {
            ...BaseShape,
            handlerLength: 5,
            sizeX: 16,
            sizeY: 22,
            fillColor: '#a5d6a7'
        }
    },

    DestructedNode: {
        ...BaseShape,
        fillColor: '#ffcc80',
        roundBorder: 2,
        suffix: {
            ...BaseShape,
            roundBorder: 2,
            fillColor: '#ffcc80',
            width: 8,
            space: 4
        }
    },

    ClassDeclaration: {
        ...BaseShape,
        fillColor: '#80cbc4',
        edgeOffset: 10
    },

    DebuggerStatement: {
        ...BaseShape,
        fillColor: '#EF5350',
        roundBorder: 2
    },

    ExportDeclaration: {
        ...BaseShape,
        roundBorder: 3,
        fillColor: '#81d4fa',
        arrow: {
            ...BaseShape,
            handlerLength: 5,
            sizeX: 20,
            sizeY: 28,
            fillColor: '#fff'
        }
    },

    ImportDeclaration: {
        ...BaseShape,
        fillColor: '#fff',
        edgeOffset: 5
    },

    ImportSpecifier: {
        ...BaseShape,
        fillColor: '#80deea'
    },

    ThrowStatement: {
        ...BaseShape,
        fillColor: '#ef9a9a'
    },

    TryStatement: {
        ...BaseShape,
        fillColor: '#FFE082'
    },

    CatchClause: {
        ...BaseShape,
        fillColor: '#ef9a9a',
        arrow: {
            ...BaseShape,
            handlerLength: 2,
            sizeX: 16,
            sizeY: 28,
            fillColor: '#ef9a9a'
        }
    },

    SwitchStatement: {
        ...BaseShape,
        fillColor: '#ce93d8',
        thinPartOffset: 15,
        roundBorder: 3,
        childOffset: 20,
        alternateBranchOffset: 40,
        markOffset: {
            x: 15,
            y: 5
        },
        margin: 20
    },

    BreakStatement: {
        ...BaseShape,
        fillColor: '#b39ddb',
        arrow: {
            ...BaseShape,
            handlerLength: 5,
            sizeX: 16,
            sizeY: 28,
            fillColor: '#ce93d8'
        }
    },

    SwitchCase: {
        ...BaseShape,
        fillColor: '#ce93d8'
    },

    ContinueStatement: {
        ...BaseShape,
        fillColor: '#b39ddb',
        arrow: {
            ...BaseShape,
            handlerLength: 5,
            sizeX: 16,
            sizeY: 28,
            fillColor: '#90CAF9'
        }
    }
};

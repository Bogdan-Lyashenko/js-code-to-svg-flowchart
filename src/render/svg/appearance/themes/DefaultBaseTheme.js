export const DefaultColors = {
    c1: '#444', //stroke color
    c2: '#fff', //default fill color
    c3: '#222', //text color
    c4: '#333', //arrow fill color
    c5: '#b39ddb', //rectangle&other default fill color
    c6: '#ede7f6', //rectangle dot fill color
    c7: '#a5d6a7', //function fill color
    c8: '#fff59d', //root circle fill color
    c9: '#90CAF9', //loop fill color
    c10: '#ce93d8', //conditional fill color
    c11: '#ffcc80', //destructed node fill color
    c12: '#80cbc4', //class fill color
    c13: '#EF5350', //debugger fill color
    c14: '#81d4fa', //export fill color
    c15: '#ef9a9a', //throw fill color
    c16: '#FFE082', //try fill color
    c17: '#e6ee9c', //object expression color
    c18: '#666' //debug text color
};

export const buildTheme = color => {
    const BaseShape = {
        strokeColor: color.c1,
        strokeWidth: 1,
        fillColor: color.c2,
        textColor: color.c3,
        fontFamily: 'monospace',
        fontSize: 13,
        lineHeight: 5, //depends on fontSize
        symbolHeight: 10, //depends on fontSize
        symbolWidth: 7.8, //depends on fontSize
        horizontalPadding: 15,
        verticalPadding: 10,
        childOffset: 37,
        margin: 10,
        roundBorder: 2,
        complexTypeExtraSpace: 15,

        debugFontSize: 8,
        debugTextColor: color.c18
    };

    return {
        BaseShape,
        ConnectionArrow: {
            arrow: {
                size: {
                    x: 8,
                    y: 6
                },
                fillColor: color.c4
            },
            line: {
                strokeColor: color.c1,
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
            fillColor: color.c5,
            dot: {
                ...BaseShape,
                offset: 4,
                radius: 2,
                fillColor: color.c6
            },
            roundBorder: 3
        },

        VerticalEdgedRectangle: {
            ...BaseShape,
            fillColor: color.c7,
            edgeOffset: 10
        },

        RootCircle: {
            ...BaseShape,
            radius: 15,
            padding: 3,
            fillColor: color.c8
        },

        LoopRhombus: {
            ...BaseShape,
            fillColor: color.c9,
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
            fillColor: color.c10,
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
            fillColor: color.c5,
            arrow: {
                ...BaseShape,
                handlerLength: 5,
                sizeX: 16,
                sizeY: 22,
                fillColor: color.c7
            }
        },

        DestructedNode: {
            ...BaseShape,
            fillColor: color.c11,
            roundBorder: 2,
            suffix: {
                ...BaseShape,
                roundBorder: 2,
                fillColor: color.c11,
                width: 8,
                space: 4
            }
        },

        ClassDeclaration: {
            ...BaseShape,
            fillColor: color.c12,
            edgeOffset: 10
        },

        DebuggerStatement: {
            ...BaseShape,
            fillColor: color.c13,
            roundBorder: 2
        },

        ExportDeclaration: {
            ...BaseShape,
            roundBorder: 3,
            fillColor: color.c14,
            arrow: {
                ...BaseShape,
                handlerLength: 5,
                sizeX: 20,
                sizeY: 28,
                fillColor: color.c2
            }
        },

        ImportDeclaration: {
            ...BaseShape,
            fillColor: color.c2,
            edgeOffset: 5
        },

        ImportSpecifier: {
            ...BaseShape,
            fillColor: color.c14
        },

        ThrowStatement: {
            ...BaseShape,
            fillColor: color.c15
        },

        TryStatement: {
            ...BaseShape,
            fillColor: color.c16
        },

        CatchClause: {
            ...BaseShape,
            fillColor: color.c15,
            arrow: {
                ...BaseShape,
                handlerLength: 2,
                sizeX: 16,
                sizeY: 28,
                fillColor: color.c15
            }
        },

        SwitchStatement: {
            ...BaseShape,
            fillColor: color.c10,
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
            fillColor: color.c5,
            arrow: {
                ...BaseShape,
                handlerLength: 5,
                sizeX: 16,
                sizeY: 28,
                fillColor: color.c10
            }
        },

        SwitchCase: {
            ...BaseShape,
            fillColor: color.c10
        },

        ContinueStatement: {
            ...BaseShape,
            fillColor: color.c5,
            arrow: {
                ...BaseShape,
                handlerLength: 5,
                sizeX: 16,
                sizeY: 28,
                fillColor: color.c9
            }
        },

        ObjectExpression: {
            ...BaseShape,
            fillColor: color.c17,
            edgeOffset: 5
        },

        CallExpression: {
            ...BaseShape,
            fillColor: color.c7
        }
    };
};

export default buildTheme(DefaultColors);

export const getAlignedColors = (theme, defaultColor) => {
    const themeCopy = { ...theme };
    Object.keys(themeCopy).forEach(color => {
        themeCopy[color] = defaultColor;
    });

    return themeCopy;
};

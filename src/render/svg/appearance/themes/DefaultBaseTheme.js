export const DefaultColors = {
    strokeColor: '#444',
    defaultFillColor: '#fff',
    textColor: '#222',
    arrowFillColor: '#333',
    rectangleFillColor: '#90caf9',
    rectangleDotFillColor: '#ede7f6',
    functionFillColor: '#a5d6a7',
    rootCircleFillColor: '#fff59d',
    loopFillColor: '#b39ddb',
    conditionFillColor: '#ce93d8',
    destructedNodeFillColor: '#ffcc80',
    classFillColor: '#80cbc4',
    debuggerFillColor: '#EF5350',
    exportFillColor: '#81d4fa',
    throwFillColor: '#ef9a9a',
    tryFillColor: '#FFE082',
    objectFillColor: '#9fa8da',
    callFillColor: '#C5E1A5',
    debugModeFillColor: '#666'
};

export const buildTheme = config => {
    const BaseShape = {
        strokeColor: config.strokeColor,
        strokeWidth: 1,
        fillColor: config.defaultFillColor,
        textColor: config.textColor,
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
        debugTextColor: config.debugModeFillColor,
        ...config
    };

    return {
        BaseShape,
        ConnectionArrow: {
            arrow: {
                size: {
                    x: 8,
                    y: 6
                },
                fillColor: config.arrowFillColor
            },
            line: {
                strokeColor: config.strokeColor,
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
            fillColor: config.rectangleFillColor,
            dot: {
                ...BaseShape,
                offset: 4,
                radius: 2,
                fillColor: config.rectangleDotFillColor
            },
            roundBorder: 3
        },

        VerticalEdgedRectangle: {
            ...BaseShape,
            fillColor: config.functionFillColor,
            edgeOffset: 10
        },

        RootCircle: {
            ...BaseShape,
            radius: 15,
            padding: 3,
            fillColor: config.rootCircleFillColor
        },

        LoopRhombus: {
            ...BaseShape,
            fillColor: config.loopFillColor,
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
            fillColor: config.conditionFillColor,
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
            fillColor: config.rectangleFillColor,
            arrow: {
                ...BaseShape,
                handlerLength: 5,
                sizeX: 16,
                sizeY: 22,
                fillColor: config.functionFillColor
            }
        },

        DestructedNode: {
            ...BaseShape,
            fillColor: config.destructedNodeFillColor,
            roundBorder: 2,
            suffix: {
                ...BaseShape,
                roundBorder: 2,
                fillColor: config.destructedNodeFillColor,
                width: 8,
                space: 4
            }
        },

        ClassDeclaration: {
            ...BaseShape,
            fillColor: config.classFillColor,
            edgeOffset: 10
        },

        DebuggerStatement: {
            ...BaseShape,
            fillColor: config.debuggerFillColor,
            roundBorder: 2
        },

        ExportDeclaration: {
            ...BaseShape,
            roundBorder: 3,
            fillColor: config.exportFillColor,
            arrow: {
                ...BaseShape,
                handlerLength: 5,
                sizeX: 20,
                sizeY: 28,
                fillColor: config.defaultFillColor
            }
        },

        ImportDeclaration: {
            ...BaseShape,
            fillColor: config.defaultFillColor,
            edgeOffset: 5
        },

        ImportSpecifier: {
            ...BaseShape,
            fillColor: config.exportFillColor
        },

        ThrowStatement: {
            ...BaseShape,
            fillColor: config.throwFillColor
        },

        TryStatement: {
            ...BaseShape,
            fillColor: config.tryFillColor
        },

        CatchClause: {
            ...BaseShape,
            fillColor: config.throwFillColor,
            arrow: {
                ...BaseShape,
                handlerLength: 2,
                sizeX: 16,
                sizeY: 28,
                fillColor: config.throwFillColor
            }
        },

        SwitchStatement: {
            ...BaseShape,
            fillColor: config.conditionFillColor,
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
            fillColor: config.rectangleFillColor,
            arrow: {
                ...BaseShape,
                handlerLength: 5,
                sizeX: 16,
                sizeY: 28,
                fillColor: config.conditionFillColor
            }
        },

        SwitchCase: {
            ...BaseShape,
            fillColor: config.conditionFillColor
        },

        ContinueStatement: {
            ...BaseShape,
            fillColor: config.rectangleFillColor,
            arrow: {
                ...BaseShape,
                handlerLength: 5,
                sizeX: 16,
                sizeY: 28,
                fillColor: config.loopFillColor
            }
        },

        ObjectProperty: {
            ...BaseShape,
            fillColor: config.rectangleFillColor
        },

        CallExpression: {
            ...BaseShape,
            dot: {
                ...BaseShape,
                offset: 6,
                radius: 4,
                fillColor: config.rectangleDotFillColor
            },
            fillColor: config.callFillColor
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

const DefaultShape = {
    strokeColor: '#333',
    strokeWidth: 1,
    fillColor: '#fff',
    textColor: '#111',
    fontFamily: 'monospace',
    fontSize: 13,
    symbolHeight: 10,
    symbolWidth: 7.8,
    horizontalPadding: 10,
    verticalPadding: 10,
    childOffset: 40,
    margin: 10
};

export const Themes = {
    DEFAULT: {
        ConnectionArrow: {
            arrow: {
                size: {
                    x: 8,
                    y: 6
                },
                fillColor: '#222'
            },
            line: {
                strokeColor: '#333',
                strokeWidth: 1
            },
            lineTurnOffset: 20
        },

        Shape: {
            ...DefaultShape
        },

        Rectangle: {
            ...DefaultShape,
            fillColor: '#b39ddb',
            roundBorder: 3
        },

        VerticalEdgedRectangle: {
            ...DefaultShape,
            fillColor: '#a5d6a7',
            edgeOffset: 10
        },

        Circle: {
            ...DefaultShape,
            fillColor: '#fff59d'
        },

        LoopRhombus: {
            ...DefaultShape,
            fillColor: '#90CAF9',
            thinPartOffset: 15,
            doubleLayerOffset: 4,
            childOffset: 20,
            positionTopShift: 20
        },

        ConditionRhombus: {
            ...DefaultShape,
            fillColor: '#ce93d8',
            thinPartOffset: 15,
            childOffset: 20,
            alternateBranchOffset: 40,
            markOffset: {
                x: 5,
                y: 5
            },
            margin: 20
        },

        RootStartPoint: {
            center: {
                x: 15, y: 15
            },
            childOffset: {
                x: 20, y: 50
            }
        }
    }
};


export const getTheme = (currentTheme) => {
    switch (currentTheme) {
        default:
            return Themes.DEFAULT;
    }
};

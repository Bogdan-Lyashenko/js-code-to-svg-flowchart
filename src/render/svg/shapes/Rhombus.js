export const calculateDimensions = (state) => ({
    w: calculateWidth(state),
    h: calculateHeight(state)
});

export const calculateWidth = ({name, theme}) =>
    2 * theme.horizontalPadding + name.length * theme.symbolWidth + 2 * theme.thinPartOffset;

export const calculateHeight = ({theme}) =>
    2 * theme.verticalPadding + theme.symbolHeight + 2 * theme.thinPartOffset;

export const calculateFromPoint = ({position, dimensions}) => ({
    x: position.x + dimensions.w / 2,
    y: position.y + dimensions.h
});

export const calculateChildOffsetPoint = ({dimensions, theme}) => ({
    x: dimensions.w / 2 + theme.childOffset,
    y: dimensions.h + dimensions.h / 4
});

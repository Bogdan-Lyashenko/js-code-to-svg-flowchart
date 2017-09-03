import {calculateNameBasedWidth, calculateNameBasedHeight} from './BaseShape';

export const calculateDimensions = (state) => ({
    w: calculateWidth(state),
    h: calculateHeight(state)
});

export const calculateWidth = (state) =>
    2 * (state.theme.horizontalPadding + state.totalNamePartsNumber*state.theme.thinPartOffset)
    + calculateNameBasedWidth(state);

export const calculateHeight = (state) =>
    2 * (state.theme.verticalPadding + state.totalNamePartsNumber*state.theme.thinPartOffset)
    + calculateNameBasedHeight(state);

export const calculateFromPoint = ({position, dimensions}) => ({
    x: position.x + dimensions.w / 2,
    y: position.y + dimensions.h
});

export const calculateChildOffsetPoint = ({dimensions, theme}) => ({
    x: dimensions.w / 2 + theme.childOffset,
    y: dimensions.h + dimensions.h / 4
});

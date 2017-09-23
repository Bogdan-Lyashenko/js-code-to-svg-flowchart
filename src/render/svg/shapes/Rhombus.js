import {
    calculateWidth as calculateWidthBaseShape,
    calculateHeight as calculateHeightBaseHeight
} from './BaseShape';

export const calculateDimensions = state => ({
    w: calculateWidth(state),
    h: calculateHeight(state)
});

export const calculateWidth = state => calculateHeight(state) + calculateWidthBaseShape(state);
export const calculateHeight = state =>
    2 * state.theme.thinPartOffset + calculateHeightBaseHeight(state);

export const calculateFromPoint = ({ position, dimensions }) => ({
    x: position.x + dimensions.h / 2,
    y: position.y + dimensions.h
});

export const calculateChildOffsetPoint = ({ dimensions, theme }) => ({
    x: dimensions.h / 2 + theme.childOffset,
    y: dimensions.h + theme.childOffset / 2
});

import { assignState, mergeObjectStructures } from 'shared/utils/composition';
import { getCurvedPath, getClosedPath } from 'shared/utils/svgPrimitives';
import { addOffsetToPoints } from 'shared/utils/geometry';

import { ARROW_TYPE } from 'shared/constants';

const ENTITY_FIELD_NAME = 'ConnectionArrow';

export const getFieldName = () => {
    return ENTITY_FIELD_NAME;
};

const setupSelectors = state => ({
    getFieldName
});

const setupUpdateBehaviour = state => ({
    updateTheme(newTheme) {
        state.theme = mergeObjectStructures(state.theme, newTheme);
    }
});

const setupPrintBehaviour = state => ({
    printLine(points) {
        return getCurvedPath(points, state.theme.line);
    },

    printArrow(point, arrowPoints) {
        return getClosedPath(addOffsetToPoints(arrowPoints, point), state.theme.arrow);
    },

    printArrowByType(type, { x, y }) {
        const arrowSize = state.theme.arrow.size;
        let point;

        //TODO: move to svgPrimitives
        switch (type) {
            case ARROW_TYPE.RIGHT:
                point = { x: x - arrowSize.x, y: y - arrowSize.y / 2 };

                return this.printArrow(point, [
                    { x: 0, y: 0 },
                    { x: arrowSize.x, y: arrowSize.y / 2 },
                    { x: 0, y: arrowSize.y }
                ]);

            case ARROW_TYPE.LEFT:
                point = { x: x, y: y - arrowSize.y / 2 };

                return this.printArrow(point, [
                    { x: 0, y: arrowSize.y / 2 },
                    { x: arrowSize.x, y: 0 },
                    { x: arrowSize.x, y: arrowSize.y }
                ]);

            case ARROW_TYPE.DOWN:
                point = { x: x - arrowSize.y / 2, y: y - arrowSize.x };

                return this.printArrow(point, [
                    { x: 0, y: 0 },
                    { x: arrowSize.y / 2, y: arrowSize.x },
                    { x: arrowSize.y, y: 0 }
                ]);

            default:
                return '';
        }
    },

    print() {
        const { linePoints, arrowPoint, arrowType, noArrow } = state.config;

        if (noArrow) {
            linePoints[linePoints.length - 1].x += state.theme.arrow.size.x;
        }

        return `
            <g>
               ${this.printLine(linePoints)}
               ${!noArrow && this.printArrowByType(arrowType, arrowPoint)}
            </g>`;
    }
});

export const ConnectionArrow = state =>
    assignState(state, [setupUpdateBehaviour, setupPrintBehaviour, setupSelectors]);

export default (config, theme) => ConnectionArrow({ config, theme, originalTheme: theme });

import {
    getDefaultTheme,
    getBlurredTheme,
    getBlackAndWhiteTheme,
    applyStyleToTheme
} from './appearance/StyleThemeFactory';
import { buildSVGObjectsTree } from './svgObjectsBuilder';

export const ShapesTreeEditor = svgObjectsTree => {
    const updateShapeTheme = (shape, shapeStyles, connectionArrowStyles) => {
        if (shapeStyles) {
            shape.updateTheme(shapeStyles);
        }

        if (connectionArrowStyles) {
            shape.getAssignedConnectionArrow().updateTheme(connectionArrowStyles);
            shape.getLoopedConnectionArrow &&
                shape.getLoopedConnectionArrow().updateTheme(connectionArrowStyles);
        }
    };

    return {
        findShape(fnTest, fnOnFind) {
            svgObjectsTree
                .getShapes()
                .filter(fnTest)
                .forEach(fnOnFind);
        },

        applyShapeStyles(fn, shapeStyles, connectionArrowStyles) {
            this.findShape(fn, shape => {
                updateShapeTheme(shape, shapeStyles, connectionArrowStyles);
            });
        },

        focus(fn) {
            this.blur(shape => !fn(shape));
        },

        blur(fn) {
            const blurredTheme = getBlurredTheme();

            this.findShape(fn, shape => {
                const connectionArrow = shape.getAssignedConnectionArrow();

                updateShapeTheme(
                    shape,
                    blurredTheme[shape.getShapeType()],
                    connectionArrow ? blurredTheme[connectionArrow.getFieldName()] : null
                );
            });
        },

        print(config) {
            return svgObjectsTree && svgObjectsTree.print(config);
        }
    };
};

export default (customStyleTheme = {}) => {
    let theme = applyStyleToTheme(getDefaultTheme(), customStyleTheme);

    return {
        buildShapesTree(flowTree) {
            return buildSVGObjectsTree(flowTree, theme);
        },

        applyTheme(newThemeStyles) {
            theme = applyStyleToTheme(theme, newThemeStyles);
        },

        applyDefaultTheme() {
            this.applyTheme(getDefaultTheme());
        },
        applyBlackAndWhiteTheme() {
            this.applyTheme(getBlackAndWhiteTheme());
        },
        applyBlurredTheme() {
            this.applyTheme(getBlurredTheme());
        }
    };
};

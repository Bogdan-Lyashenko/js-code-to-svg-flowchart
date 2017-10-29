import {
    getDefaultTheme,
    getBlurredTheme,
    getBlackAndWhiteTheme,
    getLightTheme,
    applyStyleToTheme,
    buildColorsBasedTheme
} from './appearance/StyleThemeFactory';
import { buildSVGObjectsTree } from './svgObjectsBuilder';
import { traversal } from 'shared/utils/traversal';
import { flatTree } from 'shared/utils/flatten';
import { logError } from 'shared/utils/logger';

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
        findShape(fnTest, startIndex = 0) {
            return svgObjectsTree
                .getShapes()
                .filter((shape, index) => index >= startIndex && fnTest(shape));
        },

        applyShapeStyles(fn, shapeStyles, connectionArrowStyles) {
            this.findShape(fn).forEach(shape => {
                updateShapeTheme(shape, shapeStyles, connectionArrowStyles);
            });
        },

        blur(fn) {
            const blurredTheme = getBlurredTheme();

            this.findShape(fn).forEach(shape => {
                const connectionArrow = shape.getAssignedConnectionArrow();

                updateShapeTheme(
                    shape,
                    blurredTheme[shape.getShapeType()],
                    connectionArrow ? blurredTheme[connectionArrow.getFieldName()] : null
                );
            });
        },

        focus(fn) {
            this.blur(shape => !fn(shape));
        },

        blurShapeBranch(fn) {
            const blurredTheme = getBlurredTheme();

            this.findShape(fn).forEach(shapeBranch =>
                traversal(
                    shapeBranch,
                    shape => {
                        const connectionArrow = shape.getAssignedConnectionArrow();

                        updateShapeTheme(
                            shape,
                            blurredTheme[shape.getShapeType()],
                            connectionArrow ? blurredTheme[connectionArrow.getFieldName()] : null
                        );
                    },
                    shape => shape.state.body
                )
            );
        },

        focusShapeBranch(fns) {
            const blurredTheme = getBlurredTheme();

            [].concat(fns).forEach((fn, index) => {
                this.findShape(fn).forEach(shapeBranch => {
                    const flatShape = flatTree(shapeBranch, shape => shape.state.body);
                    let branchIndex = svgObjectsTree.getShapes().indexOf(shapeBranch);

                    this.findShape(
                        shape => !flatShape.includes(shape),
                        index > 0 ? branchIndex : 0
                    ).forEach(shape => {
                        const connectionArrow = shape.getAssignedConnectionArrow();

                        updateShapeTheme(
                            shape,
                            blurredTheme[shape.getShapeType()],
                            connectionArrow ? blurredTheme[connectionArrow.getFieldName()] : null
                        );
                    });
                });
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
            let shapes = [];

            try {
                shapes = buildSVGObjectsTree(flowTree, theme);
            } catch (e) {
                logError('Error at buildShapesTree' + e.message, e.stack);
                throw e;
            }

            return shapes;
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
        },
        applyLightTheme() {
            this.applyTheme(getLightTheme());
        },

        applyColorBasedTheme(colors) {
            this.applyTheme(buildColorsBasedTheme(colors));
        }
    };
};

import {getDefaultTheme, getBlurredTheme, getBlackAndWhiteTheme, applyStyleToTheme} from './appearance/StyleThemeFactory';
import {buildSVGObjectsTree} from './SVGObjectsBuilder';

export const createSVGRender = (customStyleTheme = {}) => {
    let svgObjectsTree = null,
        theme = applyStyleToTheme(getDefaultTheme(), customStyleTheme);

    const updateShapeTheme = (shape, shapeStyles, connectionArrowStyles) => {
        if (shapeStyles) {
            shape.updateTheme(shapeStyles);
        }

        if (connectionArrowStyles) {
            shape.getAssignedConnectionArrow().updateTheme(connectionArrowStyles)
        }
    };

    return {
        buildShapesTree(flowTree) {
            svgObjectsTree = buildSVGObjectsTree(flowTree, theme);
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

        findShape(fnTest, fnOnFind, fnOnMismatch) {
            svgObjectsTree.getShapes().forEach((shape) => {
                return fnTest(shape) ? fnOnFind(shape) : fnOnMismatch && fnOnMismatch(shape);
            });
        },

        applyShapeStyles(fn, shapeStyles, connectionArrowStyles) {
            this.findShape(fn, (shape) => {
                updateShapeTheme(shape, shapeStyles, connectionArrowStyles);
            });
        },

        focus(fn) {
            this.blur((shape)=>!fn(shape));
        },

        blur(fn) {
            const blurredTheme = getBlurredTheme();

            this.findShape(fn, (shape) => {
                const connectionArrow = shape.getAssignedConnectionArrow();

                updateShapeTheme(
                    shape,
                    blurredTheme[shape.getShapeType()],
                    connectionArrow ? blurredTheme[connectionArrow.getFieldName()] : null
                );
            });
        },

        render() {
            return svgObjectsTree && svgObjectsTree.print()
        }
    }
};

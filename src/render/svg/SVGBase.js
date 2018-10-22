import { calculateShapesBoundaries } from 'shared/utils/geometry';

export const SVGBase = () => {
    const state = {
        shapes: [],
        arrowConnections: []
    };

    return {
        getShapes() {
            return state.shapes;
        },
        addShapes(shapes) {
            state.shapes = state.shapes.concat(shapes);
            return this;
        },
        addArrowConnections(arrowConnections) {
            state.arrowConnections = state.arrowConnections.concat(arrowConnections);
            return this;
        },
        printChildren(config) {
            let svgString = ``;

            [].concat(state.shapes, state.arrowConnections).forEach(node => {
                svgString += node.print(config);
            });

            return svgString;
        },
        calculateDimensions() {
            const boundaries = calculateShapesBoundaries(
                    state.shapes.map(item => item.getBoundaries())
                ),
                padding = 25;

            return {
                w: Math.ceil(boundaries.max.x) + padding,
                h: Math.ceil(boundaries.max.y) + padding
            };
        },

        print(config) {
            const { w, h } = this.calculateDimensions();

            return `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                width="${w}" height="${h}" shape-rendering="optimizeSpeed">
                ${this.printChildren(config)}
            </svg>`;
        }
    };
};

export const SVGBase = () => {
    const state = {
        //TODO: add calculation based on children boundaries
        dimensions: {
            h: 3000,
            w: 3000
        },
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
        print(config) {
            const { w, h } = state.dimensions;

            return `<svg width="${w}" height="${h}">
                ${this.printChildren(config)}
            </svg>`;
        }
    };
};

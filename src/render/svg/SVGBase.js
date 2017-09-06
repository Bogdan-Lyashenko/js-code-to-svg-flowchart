export const SVGBase = () => {
    return {
        //TODO: add calculation based on children boundaries
        dimensions: {
            h: 3000,
            w: 3000
        },
        children: [],
        add(shape) {
            this.children = this.children.concat(shape);
            return this;
        },
        print(content) {
            const {w, h} = this.dimensions;

            return `<svg width="${w}" height="${h}">
                ${content}
            </svg>`
        }
    };
};

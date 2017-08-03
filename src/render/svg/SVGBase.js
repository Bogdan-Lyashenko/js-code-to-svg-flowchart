export const SVGBase = () => {
    return {
        dimensions: {
            h: 1000,
            w: 1000
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

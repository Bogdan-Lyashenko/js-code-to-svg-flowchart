export const SVGBase = () => {
    return {
        dimensions: {
            h: 1000,
            w: 1000
        },
        body: [],
        add(shape) {
            this.body = this.body.concat(shape);
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

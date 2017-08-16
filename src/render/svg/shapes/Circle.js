import Shape, {setupInit} from './Shape';

const THEME_FIELD_NAME = 'Circle';

class Circle extends Shape {
    constructor(node, config, theme) {
        super(node, config, theme);
    }

    calculateFromPoint() {
        const {x, y} = this.position,
            r = this.dimensions.w / 2;

        return {x: x, y: y + r};
    }

    print() {
        const theme = this.theme;
        const {x, y} = this.position,
            r = this.dimensions.w / 2;

        return `
            <g>
               <circle cx="${x }" cy="${y}" r="${r}"
                style="fill:${theme.fillColor};stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />
               ${this.printName()}
            </g>`
    }
}

export default setupInit(Circle, THEME_FIELD_NAME);

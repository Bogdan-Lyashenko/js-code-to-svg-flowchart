import Shape, {setupInit} from './Shape';

const THEME_FIELD_NAME = 'Circle';

class Circle extends Shape {
    constructor(node, config, theme) {
        super(node, config, theme);

        this.fromPoint = {x: config.x, y: config.y};
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

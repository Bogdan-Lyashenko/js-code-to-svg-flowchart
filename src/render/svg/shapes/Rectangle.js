import Shape, {setupInit} from './Shape';

const THEME_FIELD_NAME = 'Rectangle';

class Rectangle extends Shape {
    static getThemeFieldName() {
        return THEME_FIELD_NAME;
    }

    print() {
        const theme = this.theme;
        const {x, y} = this.position,
            {w, h} = this.dimensions;

        return `
            <g>
                <rect x="${x}" y="${y}"
                    width="${w}" height=${h}
                    rx="${theme.roundBorder}" ry="${theme.roundBorder}"
                    style="fill:${theme.fillColor}; stroke-width:${theme.strokeWidth}; stroke:${theme.strokeColor}" />
               ${this.printName()}
            </g>`
    }
}

export default setupInit(Rectangle, THEME_FIELD_NAME);

import Shape from './Shape';
import {getTheme} from '../style/Theme';

const theme = getTheme().Rectangle;

class Rectangle extends Shape {
    print() {
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


export default (name, config) => new Rectangle(name, config);

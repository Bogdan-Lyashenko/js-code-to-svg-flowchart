import Shape from './Shape';
import {getTheme} from '../style/Theme';

const theme = getTheme().Rhombus;

class Rhombus extends Shape {
    print() {
        const {x, y} = this.position,
            {w, h} = this.dimensions;

        return `
            <g>
                <rect x="${x}" y="${y}"
                    width="${w}" height=${h}
                    style="fill:${theme.fillColor}; stroke-width:${theme.strokeWidth}; stroke:${theme.strokeColor}" />
               ${this.printName()}
            </g>`
    }
}


export default (name, config) => new Rhombus(name, config);

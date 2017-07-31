import Shape from './Shape';
import {getTheme} from '../style/Theme';

const theme = getTheme().Circle;

class Circle extends Shape {
    constructor(name, config) {
        super(name, config);

        this.fromPoint = {x: config.x, y: config.y};
    }

    print() {
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


export default (name, config) => new Circle(name, config);

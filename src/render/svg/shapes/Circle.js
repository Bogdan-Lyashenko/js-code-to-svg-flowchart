import {delegateInit} from './Shape';

const ENTITY_FIELD_NAME = 'Circle';

class Circle {
    constructor(node, config, theme) {
    }

    calculateFromPoint() {
        const {x, y} = this.position,
            r = this.dimensions.w / 2;

        return {x: x, y: y + r};
    }

    setChildOffsetPoint(point) {
        this.childOffsetPoint = point;
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

export default delegateInit(Circle, ENTITY_FIELD_NAME);

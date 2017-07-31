import Shape from './Shape';
import {getTheme} from '../style/Theme';

const theme = getTheme().LoopRhombus;

class Rhombus extends Shape {
    calculateWidth(name) {
        return 2 * theme.horizontalPadding + name.length * theme.symbolWidth + 2 * theme.thinPartOffset;
    }

    calculateHeight() {
        return 2 * theme.verticalPadding + theme.symbolHeight + 2*theme.thinPartOffset;
    }

    calculateFromPoint(x, y, w, h) {
        return {x: x + w/2, y: y + h/2};
    }

    calculateChildOffsetPoint(x, y, w, h) {
        return {x: w/2 + theme.childOffset, y: h + h/4};
    }

    print() {
        const {x, y} = this.position,
            {w, h} = this.dimensions,
            namePosition = {x: x + theme.thinPartOffset, y: y + theme.thinPartOffset},
            {doubleLayerOffset, fillColor, strokeColor, strokeWidth} = theme;

        return `<g>
            <polygon points="
                    ${x + doubleLayerOffset/2},${y + h/2 - doubleLayerOffset} 
                    ${x + w / 2 + doubleLayerOffset/2},${y - doubleLayerOffset} 
                    ${x + w + theme.doubleLayerOffset/2},${y + h/2 - doubleLayerOffset} 
                    ${x + w/2 + theme.doubleLayerOffset/2},${y + h - doubleLayerOffset}"
                style="fill:${fillColor};stroke:${strokeColor};stroke-width:${strokeWidth}" />
                
            <polygon points="${x},${y + h/2} ${x + w / 2},${y} ${x + w},${y + h/2} ${x + w/2},${y + h}"
                style="fill:${fillColor};stroke:${strokeColor};stroke-width:${strokeWidth}" />
                
            ${this.printName(namePosition)}
        </g>`
    }
}


export default (name, config) => new Rhombus(name, config);

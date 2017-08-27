import {delegateInit} from './Shape';

const ENTITY_FIELD_NAME = 'LoopRhombus';

class LoopRhombus {
    calculateWidth(name) {
        const theme = this.theme;
        return 2 * theme.horizontalPadding + name.length * theme.symbolWidth + 2 * theme.thinPartOffset;
    }

    calculateHeight() {
        const theme = this.theme;
        return 2 * theme.verticalPadding + theme.symbolHeight + 2*theme.thinPartOffset;
    }

    calculatePositionY(y) {
        const theme = this.theme;
        return y + theme.positionTopShift;
    }

    calculateFromPoint(x, y, w, h) {
        return {x: x + w/2, y: y+h};
    }

    calculateChildOffsetPoint(x, y, w, h) {
        const theme = this.theme;
        return {x: w/2 + theme.childOffset, y: h + h/4};
    }

    getRhombusMidPoint() {
        const {w,h} = this.dimensions,
            {x,y} = this.position;

        return {x: x + w/2, y };
    }

    print() {
        const theme = this.theme;
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

export default delegateInit(LoopRhombus, ENTITY_FIELD_NAME);

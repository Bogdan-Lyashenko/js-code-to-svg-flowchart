import Shape, {setupInit} from './Shape';

const THEME_FIELD_NAME = 'ConditionRhombus';

class ConditionRhombus extends Shape {
    calculateWidth(name) {
        const theme = this.theme;
        return 2 * theme.horizontalPadding + name.length * theme.symbolWidth + 2 * theme.thinPartOffset;
    }

    calculateHeight() {
        const theme = this.theme;
        return 2 * theme.verticalPadding + theme.symbolHeight + 2*theme.thinPartOffset;
    }

    calculateFromPoint(x, y, w, h) {
        return {x: x + w/2, y: y + h/2};
    }

    calculateChildOffsetPoint(x, y, w, h) {
        const theme = this.theme;
        return {x: w/2 + theme.childOffset, y: h + h/4};
    }

    print() {
        const theme = this.theme;
        const {x, y} = this.position,
            {w, h} = this.dimensions,
            namePosition = {x: x + theme.thinPartOffset, y: y + theme.thinPartOffset};

        return `<g>
            <polygon points="${x},${y + h/2} ${x + w / 2},${y} ${x + w},${y + h/2} ${x + w/2},${y + h}"
                style="fill:${theme.fillColor};stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />
                
            ${this.printName(namePosition)}
        </g>`
    }
}

export default setupInit(ConditionRhombus, THEME_FIELD_NAME);

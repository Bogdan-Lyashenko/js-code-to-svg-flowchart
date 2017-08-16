import Shape, {setupInit} from './Shape';
import {CONDITIONAL_KEYS} from '../../../shared/constants';

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
        return {x: x + w/2, y: y + h};
    }

    calculateAlternateFromPoint(x, y, w, h) {
        return {x: x + w, y: y + h/2};
    }

    calculateToPoint(x, y, w, h) {
        return {x: x, y: y + h/2};
    }

    calculateChildOffsetPoint(x, y, w, h) {
        const theme = this.theme;
        return {x: w/2 + theme.childOffset, y: h + h/4};
    }

    getConsequentBranchChildBoundary() {
        return this.getChildBoundaries(child => child.node.key === CONDITIONAL_KEYS.CONSEQUENT);
    }

    getAlternativeBranchChildOffsetPoint() {
        const theme = this.theme,
            position = {};

        position.y = this.getPosition().y + this.getChildOffsetPoint().y;

        position.x = this.getConsequentBranchChildBoundary().max.x;
        position.x += theme.alternateBranchOffset;

        const rightLimit = this.getPosition().x + this.getDimensions().w + theme.childOffset;
        if (position.x <= rightLimit) {
            position.x = rightLimit;
        }

        return position;
    }

    isFirstChildByKey(key) {
        return !this.body.filter(shape => shape.node.key === key).length;
    }

    printConditionMarks() {
        const theme = this.theme;
        const {x, y} = this.position,
            {w, h} = this.dimensions;

        return `<text x="${x + w - theme.markOffset.x}" y="${y + h/2 - theme.markOffset.y}"
            font-family="${theme.fontFamily}" font-size="${theme.fontSize}" fill="${theme.textColor}"> - </text>
            
            <text x="${x + w/2 - 2*theme.markOffset.x}" y="${y + h + 2*theme.markOffset.y}"
            font-family="${theme.fontFamily}" font-size="${theme.fontSize}" fill="${theme.textColor}"> + </text>`
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
            ${this.printConditionMarks()}
        </g>`
    }
}

export default setupInit(ConditionRhombus, THEME_FIELD_NAME);

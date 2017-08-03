import {getTheme} from '../style/Theme';
import {generateId} from '../../../shared/utils/string';
import {flatTree} from '../../../shared/utils/flatten';
import {getBoundaries} from '../../../shared/utils/geometry';

const theme = getTheme().Shape;

export default class Shape {
    constructor(node, {x, y}) {
        this.id = generateId();
        this.body = [];

        this.setupProperties(node, x, y, this.calculateWidth(node.name), this.calculateHeight());
    }

    calculateWidth(name) {
        return 2 * theme.horizontalPadding + name.length * theme.symbolWidth;
    }

    calculateHeight() {
        return 2 * theme.verticalPadding + theme.symbolHeight;
    }

    setupProperties(node, x, y, w, h) {
        this.node = node;
        this.name = node.name;

        this.position = {x, y};
        this.dimensions = {w, h};

        this.fromPoint = this.calculateFromPoint(x, y, w, h);
        this.toPoint = {x, y: y + h/2};
        this.backPoint = {x: x  + w, y: y + h/2};
        this.childOffsetPoint = this.calculateChildOffsetPoint(x, y, w, h);
    }

    getPosition() {
        return this.position;
    }

    getFromPoint() {
        return this.fromPoint;
    }

    setFromPoint(point) {
        this.fromPoint = point;
        return this;
    }

    calculateFromPoint(x, y, w, h) {
        return {x: x + theme.childOffset / 2, y: y + h/2};
    }

    getToPoint() {
        return this.toPoint;
    }

    getBackPoint() {
        return this.backPoint;
    }

    getDimensions() {
        return this.dimensions;
    }

    getChildOffsetPoint() {
        return this.childOffsetPoint;
    }

    setChildOffsetPoint(point) {
        this.childOffsetPoint = point;
        return this;
    }

    getChildBoundaries() {
        const list = flatTree(this);

        return getBoundaries(list.map(item => item.getBoundaries()));
    }

    getBoundaries() {
        const {x, y} = this.position,
            {w, h} = this.dimensions;

        return {
            min: {x, y},
            max: {x: x + w, y: y + h}
        };
    }

    calculateChildOffsetPoint(x, y, w, h) {
        return {x: theme.childOffset, y: h + h/4};
    }

    printName(position) {
        const {x, y} = position ? position : this.position;

        return `<text x="${x + theme.horizontalPadding}" y="${y + 2*theme.verticalPadding}"
                font-family="${theme.fontFamily}" font-size="${theme.fontSize}" fill="${theme.textColor}">
                ${this.name}
            </text>`;
    }
    //multi line
    //<text x="10" y="20" style="fill:red;">Several lines:
    //<tspan x="10" y="45">First line.</tspan>
    //<tspan x="10" y="70">Second line.</tspan>
    //</text>

    print() {
        return ``;
    }
}

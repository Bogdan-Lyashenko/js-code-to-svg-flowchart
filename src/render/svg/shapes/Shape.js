import {generateId} from '../../../shared/utils/string';
import {flatTree} from '../../../shared/utils/flatten';
import {getBoundaries} from '../../../shared/utils/geometry';

export default class Shape {
    constructor(node, {x, y}, theme) {
        this.id = generateId();
        this.body = [];
        this.theme = theme;

        this.setupProperties(node, x, y, this.calculateWidth(node.name), this.calculateHeight());
    }

    overrideTheme(theme) {
        this.theme = theme;
    }

    calculateWidth(name) {
        const theme = this.theme;
        return 2 * theme.horizontalPadding + name.length * theme.symbolWidth;
    }

    calculateHeight() {
        const theme = this.theme;
        return 2 * theme.verticalPadding + theme.symbolHeight;
    }

    calculatePosition(x, y) {
        return {x, y};
    }

    setupProperties(node, initialX, initialY, w, h) {
        this.node = node;
        this.name = node.name;

        this.position = this.calculatePosition(initialX, initialY);
        this.dimensions = {w, h};

        const {x, y} = this.position;
        this.fromPoint = this.calculateFromPoint(x, y, w, h);//leave only get with cache check
        this.alternateFromPoint = this.calculateAlternateFromPoint(x, y, w, h);
        this.toPoint = this.calculateToPoint(x, y, w, h);
        this.backPoint = {x: x  + w, y: y + h/2};
        this.childOffsetPoint = this.calculateChildOffsetPoint(x, y, w, h);
    }

    getPosition() {
        return this.position;
    }

    getFromPoint() {
        return this.fromPoint;
    }

    getAlternateFromPoint() {
        return this.alternateFromPoint;
    }

    setFromPoint(point) {
        this.fromPoint = point;
        return this;
    }

    calculateFromPoint(x, y, w, h) {
        const theme = this.theme;
        return {x: x + theme.childOffset / 2, y: y + h};
    }

    calculateAlternateFromPoint(x, y, w, h) {
        const theme = this.theme;
        return {x: x + theme.childOffset / 2, y: y + h/2};
    }

    calculateToPoint(x, y, w, h) {
        return {x, y: y + h/2};
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

    getChildBoundaries(filterFn) {
        const list = filterFn ? flatTree(this).filter(filterFn) : flatTree(this);

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
        const theme = this.theme;
        return {x: theme.childOffset, y: h + h/4};
    }

    getMargin() {
        return this.theme.margin;
    }

    printName(position) {
        const theme = this.theme;
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

export const setupInit = (subShape, themeFieldName) => {
    function init(name, config, theme) {
        return new subShape(name, config, theme);
    }

    init.getThemeFieldName = () => {
        return themeFieldName;
    };

    return init;
};

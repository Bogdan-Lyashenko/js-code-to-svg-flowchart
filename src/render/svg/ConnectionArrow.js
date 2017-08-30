import {ARROW_TYPE} from '../../shared/constants';


class ConnectionArrow {
    constructor(config, theme) {
        this.theme = theme;
        //TODO: move properties to state object

        this.config = config;
    }

    printLine(points) {
        const pointStr = points.map(point => `${point.x},${point.y}`).join(' '),
            {line} = this.theme;

        return `<polyline points="${pointStr}" style="fill:none;stroke:${line.strokeColor};stroke-width:${line.strokeWidth}" />`;
    }

    printArrow(point, arrowPoints) {
        const M = arrowPoints[0],
            L1 = arrowPoints[1],
            L2 = arrowPoints[2];

        const {arrow} = this.theme;

        return `<path d=" 
            M${M.x + point.x} ${M.y + point.y} 
            L${L1.x + point.x} ${L1.y + point.y} 
            L${L2.x + point.x} ${L2.y + point.y} 
        Z" fill="${arrow.fillColor}"/>`
    }

    printArrowByType(type, {x,y}) {
        const arrowSize = this.theme.arrow.size;
        let point;

        switch (type) {
            case ARROW_TYPE.RIGHT:
                point = {x: x - arrowSize.x, y: y - arrowSize.y/2};
                return this.printArrow(point, [{x: 0, y: 0}, {x: arrowSize.x, y: arrowSize.y/2}, {x: 0, y: arrowSize.y}]);

            case ARROW_TYPE.LEFT:
                point = {x: x, y: y - arrowSize.y/2};
                return this.printArrow(point, [{x: 0, y: arrowSize.y/2}, {x: arrowSize.x, y: 0}, {x: arrowSize.x, y: arrowSize.y}]);

            case ARROW_TYPE.DOWN:
                point = {x: x - arrowSize.y/2, y: y - arrowSize.x};
                return this.printArrow(point, [{x: 0, y: 0}, {x: arrowSize.y/2, y: arrowSize.x}, {x: arrowSize.y, y: 0}]);

            default:
                return '';
        }
    }

    print() {
        const {linePoints, arrowPoint, arrowType} = this.config;

        return `
            <g>
               ${this.printLine(linePoints)}
               ${this.printArrowByType(arrowType, arrowPoint)}
            </g>`
    }
}

export default (config, theme) => new ConnectionArrow(config, theme);

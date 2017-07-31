import {getTheme} from '../style/Theme';

const theme = getTheme().ConnectionArrow,
    arrowSize = theme.arrow.size;


const ARROW_TYPE = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT'
};

const ARROW = {
    [ARROW_TYPE.RIGHT]: [{x: 0, y: 0}, {x: arrowSize.x, y: arrowSize.y/2}, {x: 0, y: arrowSize.y}],
    [ARROW_TYPE.LEFT]: [{x: 0, y: arrowSize.y/2}, {x: arrowSize.x, y: 0}, {x: arrowSize.x, y: arrowSize.y}]/*,
    TOP: [{x: 5, y: 0}, {x: 0, y: 20}, {x: 10, y: 20}],
    BOTTOM: [{x: 0, y: 0}, {x: 5, y: 20}, {x: 10, y: 0}]*/
};

class ConnectionArrow {
    constructor(config) {
        this.config = config;
    }

    printLine(points) {
        const pointStr = points.map(point => `${point.x},${point.y}`).join(' '),
            {line} = theme;

        return `<polyline points="${pointStr}" style="fill:none;stroke:${line.strokeColor};stroke-width:${line.strokeWidth}" />`;
    }

    printArrow(point, arrowPoints) {
        const M = arrowPoints[0],
            L1 = arrowPoints[1],
            L2 = arrowPoints[2];

        const {arrow} = theme;

        return `<path d=" 
            M${M.x + point.x} ${M.y + point.y} 
            L${L1.x + point.x} ${L1.y + point.y} 
            L${L2.x + point.x} ${L2.y + point.y} 
        Z" fill="${arrow.fillColor}"/>`
    }

    printRightArrow({x, y}) {
        const point = {x: x - arrowSize.x, y: y - arrowSize.y/2};
        return this.printArrow(point, ARROW.RIGHT);
    }

    printLeftArrow({x, y}) {
        const point = {x: x, y: y - arrowSize.y/2};
        return this.printArrow(point, ARROW.LEFT);
    }

    printArrowByType(type, point) {
        switch (type) {
            case ARROW_TYPE.RIGHT:
                return this.printRightArrow(point);

            case ARROW_TYPE.LEFT:
                return this.printLeftArrow(point);

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

export default (config) => new ConnectionArrow(config);


export const getConnectionConfig = (startPoint, endPoint) => {
    const config = {
        linePoints: [],
        arrowPoint: {x: endPoint.x, y: endPoint.y},
        arrowType: {x: 0, y: 0}
    };

    if (startPoint.x <= endPoint.x && startPoint.y <= endPoint.y) {
        config.linePoints = [
            {x: startPoint.x, y: startPoint.y},
            {x: startPoint.x, y: endPoint.y},
            {x: endPoint.x, y: endPoint.y}
        ];
        config.arrowType = ARROW_TYPE.RIGHT;

    } else if (startPoint.y > endPoint.y) {
        config.linePoints = [
            {x: startPoint.x, y: startPoint.y},
            {x: startPoint.x + theme.lineTurnOffset, y: startPoint.y},
            {x: startPoint.x + theme.lineTurnOffset, y: endPoint.y},
            {x: endPoint.x - theme.lineTurnOffset, y: endPoint.y}
        ];
        config.arrowType = ARROW_TYPE.LEFT;
    } else {
        debugger
    }

    return config;
};

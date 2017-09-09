export const getRhombus = (x, y, w, h, theme) => {
    return `
        <polygon points="${x},${y + h/2} ${x + w / 2},${y} ${x + w},${y + h/2} ${x + w/2},${y + h}"
            style="fill:${theme.fillColor};stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />`
};

export const getRoundedRectangle = (x, y, w, h, theme) => {
    return `
        <rect x="${x}" y="${y}"
            width="${w}" height=${h}
            rx="${theme.roundBorder}" ry="${theme.roundBorder}"
            style="fill:${theme.fillColor}; stroke-width:${theme.strokeWidth}; stroke:${theme.strokeColor}" />`;
};

export const getRectangle = (x, y, w, h, theme) => {
    return `
        <rect x="${x}" y="${y}"
            width="${w}" height=${h}
            style="fill:${theme.fillColor}; stroke-width:${theme.strokeWidth}; stroke:${theme.strokeColor}" />`;
};

export const getLine = (x1, y1, x2, y2, theme) => {
    return `
         <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                style="stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />`;
};

export const getCircle = (x, y, r, theme) => {
    return `
       <circle cx="${x}" cy="${y}" r="${r}"
        style="fill:${theme.fillColor};stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />`;
};

export const getText = (x, y, theme, text) => {
    return `
        <text x="${x}" y="${y}"
        font-family="${theme.fontFamily}" font-size="${theme.fontSize}" fill="${theme.textColor}">${text}</text>`;
};

export const getClosedPath = (points, theme) => {
    const pointStr = points.map((point, i) => {
        if (!i) return `M${point.x}, ${point.y}`;

        return `L${point.x}, ${point.y}`;
    }).join(' ');

    return `<path d="${pointStr} Z" fill="${theme.fillColor}"/>`
};

export const getCurvedPath = (points, theme) => {
    const pointStr = points.map((point, i) => {
        if (!i) return `M${point.x}, ${point.y}`;

        let previousPoint = points[i-1];

        if (i <= 1) {
            return getLinePointStr(point, previousPoint, theme.curveTurnRadius);
        }

        return `Q${previousPoint.x} ${previousPoint.y} 
                ${getArcEndPointStr(point, previousPoint, theme.curveTurnRadius)} 
                ${getLinePointStr(point, previousPoint, 2*theme.curveTurnRadius)}`;
    }).join(' ');

    return `<path d="${pointStr}"
        style="fill:none;stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />`;
};

const getLinePointStr = (point, previousPoint, radius) => {
    if (point.x === previousPoint.x) {
        return `L${point.x} ${getShiftedByArcNextPointValue(point.y, previousPoint.y, radius)}`;
    }

    if (point.y === previousPoint.y)  {
        return `L${getShiftedByArcNextPointValue(point.x, previousPoint.x, radius)} ${point.y} `;
    }
};

const getShiftedByArcNextPointValue = (pointValue, previousPointValue, radius) =>
    pointValue > previousPointValue ? pointValue - radius : pointValue + radius;

const getArcEndPointStr = (point, previousPoint, radius) => {
    if (point.x === previousPoint.x) {
        return `${previousPoint.x} ${getArcEndPointValue(point.y, previousPoint.y, radius)}`;
    }

    if (point.y === previousPoint.y) {
        return `${getArcEndPointValue(point.x, previousPoint.x, radius)} ${previousPoint.y}`;
    }
};

const getArcEndPointValue = (pointValue, previousPointValue, radius) =>
    pointValue > previousPointValue ? previousPointValue + radius : previousPointValue - radius;

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

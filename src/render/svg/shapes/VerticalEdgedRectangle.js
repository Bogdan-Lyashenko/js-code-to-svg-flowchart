import Shape, {setupInit} from './Shape';

const THEME_FIELD_NAME = 'VerticalEdgedRectangle';

class VerticalEdgedRectangle extends Shape {
    calculateWidth(name) {
        const theme = this.theme;
        return 2 * theme.horizontalPadding + name.length * theme.symbolWidth + 2 * theme.edgeOffset;
    }

    print() {
        const theme = this.theme;
        const {x, y} = this.position,
            {w, h} = this.dimensions,
            namePosition = {x: x + theme.edgeOffset, y};

        return `
            <g>
             <rect x="${x}" y="${y}"
                    width="${w}" height=${h}
                    rx="${0}" ry="${0}"
                    style="fill:${theme.fillColor}; stroke-width:${theme.strokeWidth}; stroke:${theme.strokeColor}" />
                    
             <line x1="${x + theme.edgeOffset}" y1="${y}" x2="${x + theme.edgeOffset}" y2="${y + h}"
                    style="stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />
             
             <line x1="${x + w - theme.edgeOffset}" y1="${y}" x2="${x + w - theme.edgeOffset}" y2="${y + h}"
                    style="stroke:${theme.strokeColor};stroke-width:${theme.strokeWidth}" />
                    
                ${this.printName(namePosition)}
            </g>`
    }
}

export default setupInit(VerticalEdgedRectangle, THEME_FIELD_NAME);

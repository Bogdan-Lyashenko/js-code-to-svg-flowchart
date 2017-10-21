import { buildTheme, DefaultColors, getAlignedColors } from './DefaultBaseTheme';

export const Colors = {
    ...getAlignedColors(DefaultColors, '#A6A6A6'),

    strokeColor: '#333',
    defaultFillColor: '#A6A6A6',
    textColor: '#333',
    arrowFillColor: '#333'
};

export default buildTheme(Colors);

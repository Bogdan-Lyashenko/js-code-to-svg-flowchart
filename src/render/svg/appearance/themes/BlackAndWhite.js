import { buildTheme, DefaultColors, getAlignedColors } from './DefaultBaseTheme';

export const Colors = {
    ...getAlignedColors(DefaultColors, '#A6A6A6'),

    c1: '#333',
    c2: '#A6A6A6',
    c3: '#333',
    c4: '#333'
};

export default buildTheme(Colors);

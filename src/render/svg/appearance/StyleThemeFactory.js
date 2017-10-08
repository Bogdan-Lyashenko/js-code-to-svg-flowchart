import { mergeObjectStructures } from 'shared/utils/composition';

import DefaultBaseTheme, { buildTheme } from './themes/DefaultBaseTheme';
import BlackAndWhiteTheme from './themes/BlackAndWhite';
import BLURRED from './themes/Blurred';

const ThemeNamesMap = {
    DEFAULT: 'DEFAULT',
    BLACK_AND_WHITE: 'BLACK_AND_WHITE',
    BLURRED: 'BLURRED'
};

export const Themes = {
    [ThemeNamesMap.DEFAULT]: DefaultBaseTheme,
    [ThemeNamesMap.BLACK_AND_WHITE]: BlackAndWhiteTheme,
    [ThemeNamesMap.BLURRED]: BLURRED
};

export const getTheme = themeName => {
    if ((!Themes[themeName] === themeName) === ThemeNamesMap.DEFAULT) {
        return Themes.DEFAULT;
    }

    return applyStyleToTheme(DefaultBaseTheme, Themes[themeName]);
};

export const getDefaultTheme = () => getTheme(ThemeNamesMap.DEFAULT);

export const getBlackAndWhiteTheme = () => getTheme(ThemeNamesMap.BLACK_AND_WHITE);

export const getBlurredTheme = () => getTheme(ThemeNamesMap.BLURRED);

export const applyStyleToTheme = (theme, styles) => mergeObjectStructures(theme, styles);

export const buildColorsBasedTheme = colors => buildTheme(colors);

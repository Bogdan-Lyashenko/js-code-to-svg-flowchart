import { mergeObjectStructures } from 'shared/utils/composition';

import DEFAULT, { buildTheme } from './themes/DefaultBaseTheme';
import BLACK_AND_WHITE from './themes/BlackAndWhite';
import BLURRED from './themes/Blurred';
import LIGHT from './themes/Light';

const ThemeNamesMap = {
    DEFAULT: 'DEFAULT',
    BLACK_AND_WHITE: 'BLACK_AND_WHITE',
    BLURRED: 'BLURRED',
    LIGHT: 'LIGHT'
};

export const Themes = {
    [ThemeNamesMap.DEFAULT]: DEFAULT,
    [ThemeNamesMap.BLACK_AND_WHITE]: BLACK_AND_WHITE,
    [ThemeNamesMap.BLURRED]: BLURRED,
    [ThemeNamesMap.LIGHT]: LIGHT
};

export const getTheme = themeName => {
    if ((!Themes[themeName] === themeName) === ThemeNamesMap.DEFAULT) {
        return Themes.DEFAULT;
    }

    return applyStyleToTheme(DEFAULT, Themes[themeName]);
};

export const getDefaultTheme = () => getTheme(ThemeNamesMap.DEFAULT);

export const getBlackAndWhiteTheme = () => getTheme(ThemeNamesMap.BLACK_AND_WHITE);

export const getBlurredTheme = () => getTheme(ThemeNamesMap.BLURRED);

export const getLightTheme = () => getTheme(ThemeNamesMap.LIGHT);

export const applyStyleToTheme = (theme, styles) => mergeObjectStructures(theme, styles);

export const buildColorsBasedTheme = colors => buildTheme(colors);

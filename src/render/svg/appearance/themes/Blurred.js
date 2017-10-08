import { buildTheme } from './DefaultBaseTheme';

export const Colors = {
    c1: '#ccc', //stroke color
    c2: '#fff', //default fill color
    c3: '#ccc', //text color
    c4: '#ccc', //arrow fill color
    c5: '#ede7f6', //rectangle&other default fill color
    c6: '#ede7f6', //rectangle dot fill color
    c7: '#f1f8e9', //function fill color
    c8: '#fffde7', //root circle fill color
    c9: '#e3f2fd', //loop fill color
    c10: '#f3e5f5', //conditional fill color
    c11: '#fff8e1', //destructed node fill color
    c12: '#e0f2f1', //class fill color
    c13: '#ffebee', //debugger fill color
    c14: '#e1f5fe', //export fill color
    c15: '#fce4ec', //throw fill color
    c16: '#fff8e1', //try fill color
    c17: '#666' //debug text color
};

export default buildTheme(Colors);

import {format, trim} from 'formattier';
import {log} from 'logger';
const data = [];
export default print = (list) => {
    list.forEach(i => {
        console.log(i);
    });
}
export const formatString = (str) => formatter(str);
export const MAX_STR_LENGTH = 15;
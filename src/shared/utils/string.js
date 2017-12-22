import stringWidth from 'string-width';

export const generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const getPathId = node => {
    const queue = [node];
    let id = `node-id:|${node.name}|`;

    while (queue.length) {
        let item = queue.shift();

        if (item) {
            id += item.name ? item.name[0] : '-';

            if (item.parent) {
                queue.push(item.parent);
            }
        }
    }

    return id.replace(/\s/g, '').toUpperCase();
};

export const splitNameString = (str, maxLineLength, nameSplitterTokensIterator) => {
    const strLength = str.length;

    if (strLength <= maxLineLength) return [str];

    return [str.slice(0, maxLineLength) + '...'];
    //TODO: fix

    let parts = [],
        currentPositionIndex = 0,
        splitter = nameSplitterTokensIterator.getNext();

    while (currentPositionIndex < strLength) {
        const splitterIndex = str.indexOf(splitter, currentPositionIndex);

        if (splitterIndex !== -1) {
            parts.push(str.slice(currentPositionIndex, splitterIndex + splitter.length));
            currentPositionIndex += splitterIndex + splitter.length;
        } else {
            //TODO: try other splitters then
            //splitter = nameSplitterTokensIterator.getNext(),
            parts.push(str.slice(currentPositionIndex, str.length));
            currentPositionIndex = str.length;
        }
    }

    return parts;
};

export const getMaxStringLengthFromList = list =>
    list.reduce((max, current) => {
        const currentLength = stringWidth(current);
        return currentLength >= max ? currentLength : max;
    }, 0);

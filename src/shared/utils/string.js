export const generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const splitNameString = (str, maxLineLength = 20, nameSplitterTokensIterator) => {
    const strLength = str.length;

    return [str];
    //TODO: fix
    //if (strLength <= maxLineLength) return [str];

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
        return current.length >= max ? current.length : max;
    }, 0);

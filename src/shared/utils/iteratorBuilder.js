export const buildIterator = list => ({
    index: 0,
    getNext() {
        return list[this.index++];
    },
    reset() {
        this.index = 0;
    }
});

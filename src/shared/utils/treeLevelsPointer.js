export const setupPointer = cache => ({
    list: cache ? [cache] : [],

    getCurrent() {
        if (!this.list.length) return;
        return this.list[this.list.length - 1];
    },

    stepIn(step) {
        this.list.push(step);
    },

    stepOut() {
        this.list.pop();
    }
});

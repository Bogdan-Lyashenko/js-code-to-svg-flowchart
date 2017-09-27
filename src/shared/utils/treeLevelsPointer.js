export const setupPointer = cache => ({
    list: cache ? [cache] : [],
    ref: null,

    getCurrent() {
        if (!this.list.length) return;
        return this.list[this.list.length - 1];
    },

    stepIn(step) {
        this.list.push(step);
    },

    stepOut() {
        this.list.pop();
    },

    keepRef(ref) {
        this.ref = ref;
    },

    getRef() {
        return this.ref;
    }
});

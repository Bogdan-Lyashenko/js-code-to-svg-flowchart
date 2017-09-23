export const levelsTraversal = (tree, stepIn, onNode, stepOut, options = {}) => {
    const getBody = options.getBody || (node => node.body);
    stepIn(tree);

    getBody(tree).forEach(node => {
        onNode(node);

        if (getBody(node)) {
            levelsTraversal(node, stepIn, onNode, stepOut, options);
        }
    });

    stepOut(tree);
};

export const traversalSearch = (tree, fn) => {
    let queue = [].concat(tree);

    while (queue.length) {
        let node = queue.shift();

        if (fn(node)) {
            return node;
        }

        if (node.body) {
            queue = [...queue, ...node.body];
        }
    }
};

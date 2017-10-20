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

export const traversal = (tree, fn, getBody = node => node.body) => {
    let queue = [].concat(tree);

    while (queue.length) {
        let node = queue.shift();

        fn(node);

        const nodeBody = getBody(node);
        if (nodeBody) {
            queue = [...queue, ...nodeBody];
        }
    }
};

export const traversalSearch = (tree, fn) => {
    const result = [];

    traversal(tree, node => {
        if (fn(node)) {
            result.push(node);
        }
    });

    return result;
};

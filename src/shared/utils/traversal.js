export const levelsTraversal = (tree, stepIn, onNode, stepOut, options={}) => {
    const getBody = options.getBody || (node => node.body);
    stepIn(tree);

    getBody(tree).forEach((node) => {
        onNode(node);

        if (getBody(node)) {
            levelsTraversal(node, stepIn, onNode, stepOut, options);
        }
    });

    stepOut(tree);
};

export const traversal = (tree, fn)=> {
    [].concat(tree).forEach((node)=> {
        if (node.children && node.children.length) {
            traversal(node.children, fn);
        } else {
            fn(node);
        }
    });
};

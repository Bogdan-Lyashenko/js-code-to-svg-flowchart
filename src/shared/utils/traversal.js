export const traversal = (tree, stepIn, onNode, stepOut, options={}) => {
    const getBody = options.getBody || (node => node.body);
    stepIn(tree);

    getBody(tree).forEach((node) => {
        onNode(node);

        if (getBody(node)) {
            traversal(node, stepIn, onNode, stepOut);
        }
    });

    stepOut(tree);
};

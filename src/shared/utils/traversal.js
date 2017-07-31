export const traversal = (tree, stepIn, onNode, stepOut) => {
    stepIn(tree);

    tree.body.forEach((node) => {
        onNode(node);

        if (node.body) {
            traversal(node, stepIn, onNode, stepOut);
        }
    });

    stepOut(tree);
};

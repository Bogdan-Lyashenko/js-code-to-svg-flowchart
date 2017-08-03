export const flatTree = (tree) => {
    let flatList = [];

    [].concat(tree).forEach((node) => {
        if (node.body && node.body.length) {
            flatList = flatList.concat(node, flatTree(node.body));
        } else {
            flatList.push(node);
        }
    });

    return flatList;
};

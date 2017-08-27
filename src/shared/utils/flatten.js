export const flatTree = (tree, options={}) => {
    let flatList = [];
    const getBody = options.getBody || (node => node.body);

    [].concat(tree).forEach((node) => {
        if (getBody(node) && getBody(node).length) {
            flatList = flatList.concat(node, flatTree(getBody(node)));
        } else {
            flatList.push(node);
        }
    });

    return flatList;
};

export const flatTree = (tree, options = {}) => {
    let flatList = [];
    const getBody = options.getBody || (node => node.body);

    [].concat(tree).forEach(node => {
        const body = getBody(node);

        if (body && body.length) {
            flatList = flatList.concat(node, flatTree(body, options));
        } else {
            flatList.push(node);
        }
    });

    return flatList;
};

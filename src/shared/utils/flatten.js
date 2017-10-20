export const flatTree = (tree, getBody = node => node.body) => {
    let flatList = [];

    [].concat(tree).forEach(node => {
        const body = getBody(node);

        if (body && body.length) {
            flatList = flatList.concat(node, flatTree(body, getBody));
        } else {
            flatList.push(node);
        }
    });

    return flatList;
};

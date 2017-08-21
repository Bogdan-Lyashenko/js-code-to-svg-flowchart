import generate from 'babel-generator';

export const tryConverter =  (path) => {
    return `try`;
};

export const catchConverter =  (path) => {
    return path.node.param ? `catch (${generate(path.node.param).code})` : '??? (catchConverter)';
};

//TODO: fix `finally`, not implemented yet because it presents only as a part of parent,
//TODO: there is no `finally` visitor as it exist for `catch`
//TODO: seems like to do that each try-catch block should be handled in a different way

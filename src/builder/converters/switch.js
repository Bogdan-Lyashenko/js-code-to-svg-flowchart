import generate from 'babel-generator';

export const switchStatementConverter =  (path) => {
    return `switch (${generate(path.node.discriminant).code})`;
};

export const caseConverter =  (path) => {
    return path.node.test ? `case ${generate(path.node.test).code}:` : 'default:';
};

export const breakConverter =  (path) => {
    return path.node.label ? `break ${generate(path.node.label).code}:` : 'break';
};

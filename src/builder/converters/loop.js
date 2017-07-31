import generate from 'babel-generator';

export default (path) => {
    //ForIn doesn't have test
    return path.node.test ? generate(path.node.test).code : 'for in loop';
}

import generate from 'babel-generator';

export default path => {
    return generate(path.node).code;
}

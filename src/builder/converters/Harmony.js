import generate from 'babel-generator';

export const importDeclarationConverter = ({node}) => generate(node.source).code;

export const exportDeclarationConverter = () => 'export';//TODO: translation?

export const classDeclarationConverter = ({node}) => {
    return `class ${generate(node.id).code} ${node.superClass ? ` extends ${node.superClass.name}` : ''}`;
}

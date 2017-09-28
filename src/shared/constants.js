export const TOKEN_TYPES = {
    FUNCTION: 'Function',
    FUNCTION_EXPRESSION: 'FunctionExpression',
    FUNCTION_DECLARATION: 'FunctionDeclaration',
    VARIABLE_DECLARATOR: 'VariableDeclarator',
    ASSIGNMENT_EXPRESSION: 'AssignmentExpression',
    VARIABLE_DECLARATION: 'VariableDeclaration',
    UPDATE_EXPRESSION: 'UpdateExpression',
    CALL_EXPRESSION: 'CallExpression',
    NEW_EXPRESSION: 'NewExpression',
    LOOP: 'Loop',
    CONTINUE: 'ContinueStatement',
    CONDITIONAL: 'Conditional',
    SWITCH_CASE: 'SwitchCase',
    SWITCH_STATEMENT: 'SwitchStatement',
    PROGRAM: 'Program',
    RETURN: 'ReturnStatement',
    BREAK: 'BreakStatement',
    TRY_STATEMENT: 'TryStatement',
    CATCH_CLAUSE: 'CatchClause',
    WITH_STATEMENT: 'WithStatement',
    THROW_STATEMENT: 'ThrowStatement',
    DEBUGGER_STATEMENT: 'DebuggerStatement',
    IDENTIFIER: 'Identifier',
    OBJECT_EXPRESSION: 'ObjectExpression',
    OBJECT_PROPERTY: 'ObjectProperty',

    //ES Harmony features
    ARROW_FUNCTION_EXPRESSION: 'ArrowFunctionExpression',
    IMPORT_DECLARATION: 'ImportDeclaration',
    IMPORT_DEFAULT_SPECIFIER: 'ImportDefaultSpecifier',
    IMPORT_SPECIFIER: 'ImportSpecifier',
    EXPORT_NAMED_DECLARATION: 'ExportNamedDeclaration',
    EXPORT_DEFAULT_DECLARATION: 'ExportDefaultDeclaration',
    CLASS_DECLARATION: 'ClassDeclaration',
    CLASS_METHOD: 'ClassMethod',
    FOR_OF_STATEMENT: 'ForOfStatement'
};

export const TOKEN_KEYS = {
    PROGRAM: 'program',
    CONSEQUENT: 'consequent',
    ALTERNATE: 'alternate'
};

export const ARROW_TYPE = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    UP: 'UP',
    DOWN: 'DOWN'
};

export const CLASS_FUNCTION_KINDS = {
    CONSTRUCTOR: 'constructor',
    METHOD: 'method'
};

export const MODIFIED_TYPES = {
    DESTRUCTED: 'DESTRUCTED',
    CUSTOM: 'CUSTOM'
};

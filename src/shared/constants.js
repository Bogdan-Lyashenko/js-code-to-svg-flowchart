export const TOKEN_TYPES = {
    FUNCTION: 'Function',
    FUNCTION_EXPRESSION: 'FunctionExpression',
    FUNCTION_DECLARATION: 'FunctionDeclaration',
    VARIABLE_DECLARATOR: 'VariableDeclarator',
    ASSIGNMENT_EXPRESSION: 'AssignmentExpression',
    MEMBER_EXPRESSION: 'MemberExpression',
    VARIABLE_DECLARATION: 'VariableDeclaration',
    UPDATE_EXPRESSION: 'UpdateExpression',
    CALL_EXPRESSION: 'CallExpression',
    NEW_EXPRESSION: 'NewExpression',
    LOOP: 'Loop',
    FOR_IN_STATEMENT: 'ForInStatement',
    FOR_STATEMENT: 'ForStatement',
    WHILE_STATEMENT: 'WhileStatement',
    DO_WHILE_STATEMENT: 'DoWhileStatement',
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
    ARRAY_EXPRESSION: 'ArrayExpression',
    OBJECT_EXPRESSION: 'ObjectExpression',
    OBJECT_PROPERTY: 'ObjectProperty',
    OBJECT_METHOD: 'ObjectMethod',
    BINARY_EXPRESSION: 'BinaryExpression',
    EXPRESSION_STATEMENT: 'ExpressionStatement',
    UNARY_EXPRESSION: 'UnaryExpression',
    CONDITIONAL_EXPRESSION: 'ConditionalExpression',
    STRING_LITERAL: 'StringLiteral',
    NUMERIC_LITERAL: 'NumericLiteral',
    THIS_EXPRESSION: 'ThisExpression',
    LOGICAL_EXPRESSION: 'LogicalExpression',

    //ES Harmony features
    ARROW_FUNCTION_EXPRESSION: 'ArrowFunctionExpression',
    IMPORT_DECLARATION: 'ImportDeclaration',
    IMPORT_DEFAULT_SPECIFIER: 'ImportDefaultSpecifier',
    IMPORT_SPECIFIER: 'ImportSpecifier',
    EXPORT_NAMED_DECLARATION: 'ExportNamedDeclaration',
    EXPORT_DEFAULT_DECLARATION: 'ExportDefaultDeclaration',
    CLASS_DECLARATION: 'ClassDeclaration',
    CLASS_METHOD: 'ClassMethod',
    FOR_OF_STATEMENT: 'ForOfStatement',
    SPREAD_ELEMENT: 'SpreadElement',
    SPREAD_PROPERTY: 'SpreadProperty',
    REST_PROPERTY: 'RestProperty',
    OBJECT_PATTERN: 'ObjectPattern',
    ARRAY_PATTERN: 'ArrayPattern',
    ASSIGNMENT_PATTERN: 'AssignmentPattern'
};

export const TOKEN_KEYS = {
    BODY: 'body',
    PROGRAM: 'program',
    CONSEQUENT: 'consequent',
    ALTERNATE: 'alternate',
    TEST: 'test'
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

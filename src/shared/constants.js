export const TOKEN_TYPES = {
    FUNCTION: 'Function',
    VARIABLE_DECLARATOR: 'VariableDeclarator',
    ASSIGNMENT_EXPRESSION: 'AssignmentExpression',
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
    ARROW_FUNCTION_EXPRESSION: 'ArrowFunctionExpression',
    FUNCTION_EXPRESSION: 'FunctionExpression'
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

import { TOKEN_TYPES, MODIFIED_TYPES } from 'shared/constants';

import VerticalEdgedRectangle from './shapes/VerticalEdgedRectangle';
import Rectangle from './shapes/Rectangle';
import ConditionRhombus from './shapes/ConditionRhombus';
import LoopRhombus from './shapes/LoopRhombus';
import RootCircle from './shapes/RootCircle';
import ReturnStatement from './shapes/ReturnStatement';
import DestructedNode from './shapes/DestructedNode';
import ClassDeclaration from './shapes/ClassDeclaration';
import DebuggerStatement from './shapes/DebuggerStatement';
import ExportDeclaration from './shapes/ExportDeclaration';
import ImportDeclaration from './shapes/ImportDeclaration';
import ImportSpecifier from './shapes/ImportSpecifier';
import ThrowStatement from './shapes/ThrowStatement';
import TryStatement from './shapes/TryStatement';
import CatchClause from './shapes/CatchClause';
import SwitchStatement from './shapes/SwitchStatement';
import BreakStatement from './shapes/BreakStatement';
import SwitchCase from './shapes/SwitchCase';
import ContinueStatement from './shapes/ContinueStatement';
import CallExpression from './shapes/CallExpression';
import ObjectProperty from './shapes/ObjectProperty';

export const getShapeForNode = node => {
    switch (node.type) {
        case TOKEN_TYPES.FUNCTION:
            return VerticalEdgedRectangle;

        case TOKEN_TYPES.LOOP:
            return LoopRhombus;

        case TOKEN_TYPES.CONDITIONAL:
            return ConditionRhombus;

        case TOKEN_TYPES.RETURN:
            return ReturnStatement;

        case MODIFIED_TYPES.DESTRUCTED:
            return DestructedNode;

        case TOKEN_TYPES.CLASS_DECLARATION:
            return ClassDeclaration;

        case TOKEN_TYPES.DEBUGGER_STATEMENT:
            return DebuggerStatement;

        case TOKEN_TYPES.EXPORT_DEFAULT_DECLARATION:
        case TOKEN_TYPES.EXPORT_NAMED_DECLARATION:
            return ExportDeclaration;

        case TOKEN_TYPES.IMPORT_DECLARATION:
            return ImportDeclaration;

        case TOKEN_TYPES.IMPORT_DEFAULT_SPECIFIER:
        case TOKEN_TYPES.IMPORT_SPECIFIER:
            return ImportSpecifier;

        case TOKEN_TYPES.THROW_STATEMENT:
            return ThrowStatement;

        case TOKEN_TYPES.PROGRAM:
            return RootCircle;

        case TOKEN_TYPES.TRY_STATEMENT:
            return TryStatement;

        case TOKEN_TYPES.CATCH_CLAUSE:
            return CatchClause;

        case TOKEN_TYPES.SWITCH_STATEMENT:
            return SwitchStatement;

        case TOKEN_TYPES.BREAK:
            return BreakStatement;

        case TOKEN_TYPES.SWITCH_CASE:
            return SwitchCase;

        case TOKEN_TYPES.CONTINUE:
            return ContinueStatement;

        case TOKEN_TYPES.OBJECT_PROPERTY:
            return ObjectProperty;

        case TOKEN_TYPES.CALL_EXPRESSION:
            return CallExpression;

        default:
            return Rectangle;
    }
};

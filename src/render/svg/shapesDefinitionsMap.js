import { TOKEN_TYPES, MODIFIED_TYPES } from 'shared/constants';

import VerticalEdgedRectangle from './shapes/VerticalEdgedRectangle';
import Rectangle from './shapes/Rectangle';
import ConditionRhombus from './shapes/ConditionRhombus';
import LoopRhombus from './shapes/LoopRhombus';
import Circle from './shapes/Circle';
import ReturnStatement from './shapes/ReturnStatement';
import DestructedNode from './shapes/DestructedNode';
import ClassDeclaration from './shapes/ClassDeclaration';
import DebuggerStatement from './shapes/DebuggerStatement';
import ExportDeclaration from './shapes/ExportDeclaration';
import ImportDeclaration from './shapes/ImportDeclaration';
import ImportSpecifier from './shapes/ImportSpecifier';

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

        default:
            return Rectangle;
    }
};

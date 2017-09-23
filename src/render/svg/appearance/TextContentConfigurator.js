import { buildIterator } from 'shared/utils/iteratorBuilder';

export const MAX_NAME_STR_LENGTH = 20;

export const NAME_SPLITTER_TOKENS = [
    '||',
    '&&',
    '=',
    '?',
    ':',
    '<==',
    '>==',
    '<',
    '>',
    '===',
    '==',
    ',',
    '.',
    '('
];

export const getNameSplitterTokensIterator = () => buildIterator(NAME_SPLITTER_TOKENS);

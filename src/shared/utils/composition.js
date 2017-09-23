import merge from 'deepmerge';

export const assignState = (state, extensionsList) => {
    return Object.assign.apply(null, [{ state }, ...extensionsList.map(fn => fn(state))]);
};

export const mergeObjectStructures = (destination, source) => merge(destination, source);

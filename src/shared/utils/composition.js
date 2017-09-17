export const assignState = (state, extensionsList) => {
    return Object.assign.apply(null, [{state}, ...extensionsList.map(fn => fn(state))]);
};

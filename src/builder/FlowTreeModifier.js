import { traversalSearch } from 'shared/utils/traversal';

export const destructTree = () => {};

const UpdatesMap = {
    name(node, apply) {
        node.name = apply(node);
    },

    type(node, apply) {
        node.type = apply(node);
    }
};

const applyModifierUpdates = (tree, modifier) => {
    const node = traversalSearch(tree, modifier.test);

    if (!node) return;

    Object.keys(modifier.updates).forEach(updateName => {
        UpdatesMap[updateName](node, modifier.updates[updateName]);
    });
};

export default () => {
    const modifiersList = [];

    return {
        addModifier(modifier) {
            [].concat(modifier).forEach(item => modifiersList.push(item));
        },

        create(test, updates) {
            this.addModifier({ test, updates });
        },

        runModifier(tree, modifier) {
            applyModifierUpdates(tree, modifier);
        },

        applyTo(tree) {
            modifiersList.forEach(modifier => this.runModifier(tree, modifier));
        }
    };
};

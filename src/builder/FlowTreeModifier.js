import { traversalSearch } from 'shared/utils/traversal';

const executeApplyFn = (apply, node) => (typeof apply === 'function' ? apply(node) : apply);

const UpdatesMap = {
    name(node, apply) {
        node.name = executeApplyFn(apply, node);
    },

    prefixName(node, apply) {
        node.prefixName = executeApplyFn(apply, node);
    },

    type(node, apply) {
        node.type = executeApplyFn(apply, node);
    },

    body(node, apply) {
        node.body = executeApplyFn(apply, node);
    }

    //TODO: add parent, siblings
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

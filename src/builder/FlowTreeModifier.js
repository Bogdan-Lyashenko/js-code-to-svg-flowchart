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
    },

    parent(node, apply) {
        node.parent = executeApplyFn(apply, node);
    }
};

const applyModifierUpdates = (tree, modifier) => {
    const nodes = traversalSearch(tree, modifier.test);

    if (!nodes.length) return;

    const updates = Object.keys(modifier.updates || {});

    updates.filter(i => i !== 'subTreeUpdate').forEach(updateName => {
        nodes.forEach(node => {
            UpdatesMap[updateName](node, modifier.updates[updateName]);
        });
    });

    if (updates.includes('subTreeUpdate')) {
        modifier.updates.subTreeUpdate(nodes, tree);
    }
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

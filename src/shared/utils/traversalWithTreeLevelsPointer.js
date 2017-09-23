import { levelsTraversal } from './traversal';
import { setupPointer } from './treeLevelsPointer';

export const complexTraversal = (tree, root, onStepIn, onNode, onStepOut, options) => {
    const levelsPointer = setupPointer();
    let latestShape = root;

    levelsTraversal(
        tree,
        parentNode => {
            levelsPointer.stepIn(latestShape);
            onStepIn(parentNode, levelsPointer.getCurrent());
        },
        node => {
            latestShape = onNode(node, levelsPointer.getCurrent());
        },
        parentNode => {
            levelsPointer.getCurrent() && onStepOut(parentNode, levelsPointer.getCurrent());
            levelsPointer.stepOut();
        },
        options
    );
};

interface TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
}

function countLeaves<T>(root: TreeNode<T> | null): number {
    if (!root) return 0; // Base case: empty node
    if (!root.left && !root.right) return 1; // Node is a leaf
    return countLeaves(root.left) + countLeaves(root.right); // Recurse on children
}
// Create a sample binary tree:
//       1
//      / \
//     2   3
//    /
//   4
const tree: TreeNode<number> = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: null
    },
    right: { value: 3, left: null, right: null }
};

console.log(countLeaves(tree)); // Output: 2 (nodes 4 and 3 are leaves)

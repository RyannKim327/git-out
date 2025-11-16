interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
function countLeaves(root: TreeNode | null): number {
    if (root === null) {
        return 0; // Base case: empty node
    }
    if (root.left === null && root.right === null) {
        return 1; // Node is a leaf
    }
    // Recurse on left and right subtrees
    return countLeaves(root.left) + countLeaves(root.right);
}
// Create a sample binary tree
const root: TreeNode = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null },
    },
    right: { 
        value: 3,
        left: null,
        right: { value: 6, left: null, right: null },
    },
};

console.log(countLeaves(root)); // Output: 3 (nodes: 4, 5, 6)

// First, define the TreeNode class, which is standard for binary tree problems.
// If you're working in a LeetCode-like environment, this might be provided.
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function diameterOfBinaryTree(root: TreeNode | null): number {
    let maxDiameter = 0; // This variable will store the global maximum diameter found.

    /**
     * Helper function to calculate the height of a subtree rooted at 'node'.
     * While calculating height, it also updates the 'maxDiameter' if a longer
     * path is found that passes through the current 'node'.
     *
     * @param node The current node to process.
     * @returns The height of the subtree rooted at 'node' (number of edges from 'node' to its deepest leaf).
     */
    function calculateHeightAndDiameter(node: TreeNode | null): number {
        // Base case: If the node is null, its height is -1 (no edges).
        if (!node) {
            return -1;
        }

        // Recursively calculate the height of the left and right subtrees.
        const leftHeight = calculateHeightAndDiameter(node.left);
        const rightHeight = calculateHeightAndDiameter(node.right);

        // Calculate the diameter passing through the current 'node'.
        // This is: (height of left subtree + 1 for edge to left child)
        //          + (height of right subtree + 1 for edge to right child)
        // Note: If a subtree is null, its height is -1, so (-1 + 1) effectively adds 0 to that side, which is correct.
        const currentPathThroughNode = (leftHeight + 1) + (rightHeight + 1);

        // Update the global maximum diameter found so far.
        maxDiameter = Math.max(maxDiameter, currentPathThroughNode);

        // Return the height of the current subtree for its parent node.
        // Height of current node is 1 (for the edge to its tallest child) + max height of its children.
        return 1 + Math.max(leftHeight, rightHeight);
    }

    // Start the recursive process from the root.
    // The return value of this initial call is the height of the entire tree,
    // which we don't directly need for the diameter, but the side effect
    // of updating 'maxDiameter' is what we're after.
    calculateHeightAndDiameter(root);

    // After traversing the entire tree, maxDiameter will hold the longest path.
    return maxDiameter;
}

// --- Example Usage ---

// Example 1: Basic tree
//     1
//    / \
//   2   3
//  / \
// 4   5
const root1 = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
);
console.log("Diameter of Example 1:", diameterOfBinaryTree(root1)); // Expected: 3 (Path: 4-2-1-3 or 5-2-1-3)

// Example 2: Single node
const root2 = new TreeNode(1);
console.log("Diameter of Example 2:", diameterOfBinaryTree(root2)); // Expected: 0

// Example 3: Two nodes
const root3 = new TreeNode(1, new TreeNode(2));
console.log("Diameter of Example 3:", diameterOfBinaryTree(root3)); // Expected: 1

// Example 4: Longest path does not pass through root
//      1
//     /
//    2
//   / \
//  3   4
//     / \
//    5   6
const root4 = new TreeNode(1,
    new TreeNode(2,
        new TreeNode(3),
        new TreeNode(4, new TreeNode(5), new TreeNode(6))
    )
);
console.log("Diameter of Example 4:", diameterOfBinaryTree(root4)); // Expected: 4 (Path: 3-2-4-5 or 3-2-4-6 or 5-4-2-3 or 6-4-2-3)

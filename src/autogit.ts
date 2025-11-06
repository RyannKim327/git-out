// Define the TreeNode structure
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

/**
 * Calculates the diameter of a binary tree.
 * The diameter is the length of the longest path between any two nodes in a tree.
 * This path may or may not pass through the root.
 *
 * A path length is measured by the number of edges between nodes.
 *
 * @param root The root node of the binary tree.
 * @returns The diameter of the tree.
 */
function diameterOfBinaryTree(root: TreeNode | null): number {
    // This variable will store the maximum diameter found so far across all subtrees.
    let maxDiameter = 0;

    /**
     * Recursive helper function to calculate the height of a subtree
     * and update the maxDiameter.
     *
     * @param node The current node being processed.
     * @returns The height of the subtree rooted at 'node'.
     *          Height is defined as the number of edges from 'node' to its deepest leaf.
     *          An empty tree has a height of -1. A single node (leaf) has a height of 0.
     */
    function calculateHeightAndDiameter(node: TreeNode | null): number {
        // Base case: If the node is null, its height is -1.
        if (!node) {
            return -1;
        }

        // Recursively calculate the height of the left and right subtrees
        const leftHeight = calculateHeightAndDiameter(node.left);
        const rightHeight = calculateHeightAndDiameter(node.right);

        // The path through the current node would be:
        // (height of left subtree + 1 edge to left child) + (height of right subtree + 1 edge to right child)
        // Simplified: leftHeight + rightHeight + 2
        // We update maxDiameter if this path is longer than any found before.
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight + 2);

        // The height of the current node's subtree is 1 (for the edge to the taller child)
        // plus the height of the taller child.
        return 1 + Math.max(leftHeight, rightHeight);
    }

    // Start the recursion from the root.
    // The returned value (height of the entire tree) is not directly used for the diameter,
    // as maxDiameter is updated by side effect.
    calculateHeightAndDiameter(root);

    return maxDiameter;
}

// --- Example Usage ---

// Example 1:
//      1
//     / \
//    2   3
//   / \
//  4   5
const tree1 = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
console.log("Diameter of Tree 1:", diameterOfBinaryTree(tree1)); // Expected: 3 (path 4-2-5 or 4-2-1-3 or 5-2-1-3)

// Example 2:
//   1
//  /
// 2
// /
// 3
const tree2 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
console.log("Diameter of Tree 2:", diameterOfBinaryTree(tree2)); // Expected: 2 (path 3-2-1)

// Example 3: Single node
const tree3 = new TreeNode(1);
console.log("Diameter of Tree 3:", diameterOfBinaryTree(tree3)); // Expected: 0

// Example 4: Empty tree
const tree4 = null;
console.log("Diameter of Tree 4:", diameterOfBinaryTree(tree4)); // Expected: 0

// Example 5: Skewed tree
//          1
//           \
//            2
//             \
//              3
//               \
//                4
const tree5 = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3, null, new TreeNode(4))));
console.log("Diameter of Tree 5:", diameterOfBinaryTree(tree5)); // Expected: 3 (path 1-2-3-4)

// Example 6: Balanced tree
//          1
//         / \
//        2   3
//       / \ / \
//      4  5 6  7
const tree6 = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), new TreeNode(7))
);
console.log("Diameter of Tree 6:", diameterOfBinaryTree(tree6)); // Expected: 4 (e.g., 4-2-1-3-7)

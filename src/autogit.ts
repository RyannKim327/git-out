// First, define the TreeNode structure
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
    let maxDiameter = 0; // This variable will store the maximum diameter found across the entire tree

    /**
     * Helper function to calculate the height of a subtree rooted at `node`.
     * It also updates `maxDiameter` with the longest path passing through `node`.
     *
     * Height is defined as the number of edges from the current node to the deepest leaf.
     * So:
     * - Height of a null node is -1.
     * - Height of a leaf node is 0.
     * - Height of any other node is max(height(left_child), height(right_child)) + 1.
     */
    function calculateHeight(node: TreeNode | null): number {
        // Base case: If the node is null, its height is -1 (no edges)
        if (!node) {
            return -1;
        }

        // Recursively calculate the height of the left and right subtrees
        const leftHeight = calculateHeight(node.left);
        const rightHeight = calculateHeight(node.right);

        // Calculate the diameter *passing through the current node*:
        // This is (height of left subtree + 1) + (height of right subtree + 1)
        // The +1 for each side accounts for the edge connecting the child to the current node.
        const currentPathLength = leftHeight + rightHeight + 2;

        // Update the overall maximum diameter found so far
        maxDiameter = Math.max(maxDiameter, currentPathLength);

        // Return the height of the current subtree
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Start the recursive process from the root.
    // The returned height from this call is not directly used for the diameter,
    // but the `maxDiameter` variable will have been updated.
    calculateHeight(root);

    // Return the final maximum diameter found
    return maxDiameter;
}

// --- Example Usage ---

// Example 1: Tree with diameter passing through root
//      1
//     / \
//    2   3
//   / \
//  4   5
// Diameter: 4-2-1-3 (3 edges)
const root1 = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
);
console.log("Diameter of tree 1:", diameterOfBinaryTree(root1)); // Expected: 3

// Example 2: Simple tree
//    1
//   /
//  2
// Diameter: 2-1 (1 edge)
const root2 = new TreeNode(1, new TreeNode(2));
console.log("Diameter of tree 2:", diameterOfBinaryTree(root2)); // Expected: 1

// Example 3: Single node tree
// 1
// Diameter: 0
const root3 = new TreeNode(1);
console.log("Diameter of tree 3:", diameterOfBinaryTree(root3)); // Expected: 0

// Example 4: Empty tree
// Diameter: 0
const root4 = null;
console.log("Diameter of tree 4 (null):", diameterOfBinaryTree(root4)); // Expected: 0

// Example 5: Tree with diameter not passing through the main root
//           1
//          / \
//         2   3
//        / \
//       4   5
//      /
//     6
//    /
//   7
// Diameter: 7-6-4-2-5 (4 edges)
const root5 = new TreeNode(1,
    new TreeNode(2,
        new TreeNode(4,
            new TreeNode(6, new TreeNode(7))
        ),
        new TreeNode(5)
    ),
    new TreeNode(3)
);
console.log("Diameter of tree 5:", diameterOfBinaryTree(root5)); // Expected: 4

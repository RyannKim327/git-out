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

function diameterOfBinaryTree(root: TreeNode | null): number {
    let maxDiameter = 0; // This will store the maximum diameter found so far

    /**
     * Helper function that performs a DFS traversal.
     * It returns the height of the current subtree (number of edges from current node to its deepest leaf).
     * It also updates the `maxDiameter` found globally.
     */
    function dfs(node: TreeNode | null): number {
        // Base case: If the node is null, its height is -1.
        if (!node) {
            return -1;
        }

        // Recursively calculate the height of the left and right subtrees
        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);

        // Calculate the diameter passing *through* the current node:
        // This is (height of left subtree + 1 for edge to left child)
        // + (height of right subtree + 1 for edge to right child)
        // = leftHeight + 1 + rightHeight + 1
        // = leftHeight + rightHeight + 2
        // We compare this with the current maxDiameter and update if necessary.
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight + 2);

        // Return the height of the current subtree for its parent's calculation:
        // 1 (for the edge from current node to its deepest child)
        // + the maximum height of its children's subtrees.
        return 1 + Math.max(leftHeight, rightHeight);
    }

    // Start the DFS traversal from the root.
    // The return value of dfs(root) is the height of the entire tree, which we don't directly need
    // for the diameter calculation itself, but the side effect of updating maxDiameter is what we want.
    dfs(root);

    return maxDiameter;
}

// --- Example Usage ---

// Example 1: Basic tree
//     1
//    / \
//   2   3
//  / \
// 4   5
const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);
root1.left.left = new TreeNode(4);
root1.left.right = new TreeNode(5);
// Longest path: 4-2-1-3 or 5-2-1-3 (length 3 edges)
console.log("Diameter of Example 1:", diameterOfBinaryTree(root1)); // Expected: 3

// Example 2: Skewed tree (line)
//     1
//      \
//       2
//        \
//         3
const root2 = new TreeNode(1);
root2.right = new TreeNode(2);
root2.right.right = new TreeNode(3);
// Longest path: 1-2-3 (length 2 edges)
console.log("Diameter of Example 2:", diameterOfBinaryTree(root2)); // Expected: 2

// Example 3: Single node tree
const root3 = new TreeNode(10);
console.log("Diameter of Example 3:", diameterOfBinaryTree(root3)); // Expected: 0

// Example 4: Empty tree
const root4 = null;
console.log("Diameter of Example 4:", diameterOfBinaryTree(root4)); // Expected: 0

// Example 5: Another tree
//       1
//      / \
//     2   3
//    /     \
//   4       5
//  /         \
// 6           7
// Longest path: 6-4-2-1-3-5-7 (length 6 edges)
const root5 = new TreeNode(1);
root5.left = new TreeNode(2);
root5.right = new TreeNode(3);
root5.left.left = new TreeNode(4);
root5.right.right = new TreeNode(5);
root5.left.left.left = new TreeNode(6);
root5.right.right.right = new TreeNode(7);
console.log("Diameter of Example 5:", diameterOfBinaryTree(root5)); // Expected: 6

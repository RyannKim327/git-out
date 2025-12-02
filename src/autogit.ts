// First, define the TreeNode class (common in LeetCode-style problems)
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
    let maxDiameter = 0; // This variable will store the maximum diameter found globally

    // This DFS function returns the height of the current subtree
    // and simultaneously updates `maxDiameter` if a longer path is found
    // passing through the current node.
    function dfs(node: TreeNode | null): number {
        if (node === null) {
            return 0; // Height of an empty tree is 0
        }

        // Recursively get the height of the left and right subtrees
        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);

        // Calculate the diameter *if it passes through the current 'node'*
        // This diameter is simply the sum of the heights of its left and right subtrees.
        // We update maxDiameter if this path is longer than what we've seen so far.
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

        // Return the height of the current subtree:
        // 1 (for the current node itself) + the maximum height of its children
        return 1 + Math.max(leftHeight, rightHeight);
    }

    // Start the DFS traversal from the root
    dfs(root);

    // After the DFS completes, maxDiameter will hold the longest path found
    return maxDiameter;
}

// --- Example Usage ---

// Example 1: Tree with diameter 3 (path 4-2-1-3 or 5-2-1-3)
//      1
//     / \
//    2   3
//   / \
//  4   5
const root1 = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
);
console.log("Diameter of Example 1:", diameterOfBinaryTree(root1)); // Expected: 3

// Example 2: Tree with diameter 1 (path 2-1)
//      1
//     /
//    2
const root2 = new TreeNode(1, new TreeNode(2));
console.log("Diameter of Example 2:", diameterOfBinaryTree(root2)); // Expected: 1

// Example 3: Single node tree, diameter 0
const root3 = new TreeNode(1);
console.log("Diameter of Example 3:", diameterOfBinaryTree(root3)); // Expected: 0

// Example 4: Empty tree, diameter 0
const root4 = null;
console.log("Diameter of Example 4:", diameterOfBinaryTree(root4)); // Expected: 0

// Example 5: Skewed tree, diameter 3 (path 1-2-3-4)
//      1
//       \
//        2
//         \
//          3
//           \
//            4
const root5 = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3, null, new TreeNode(4))));
console.log("Diameter of Example 5:", diameterOfBinaryTree(root5)); // Expected: 3

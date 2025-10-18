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
    let maxDiameter = 0; // This variable will store the maximum diameter found globally

    /**
     * Helper function to calculate the height of a subtree.
     * While calculating height, it also updates the global maxDiameter.
     * @param node The current node
     * @returns The height of the subtree rooted at 'node'
     */
    function dfsHeight(node: TreeNode | null): number {
        // Base case: An empty node has a height of 0
        if (!node) {
            return 0;
        }

        // Recursively calculate the height of the left and right subtrees
        const leftHeight = dfsHeight(node.left);
        const rightHeight = dfsHeight(node.right);

        // Calculate the diameter passing through the current node:
        // It's the sum of the height of its left subtree and its right subtree.
        // This represents the number of edges.
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

        // Return the height of the current subtree:
        // It's 1 (for the current node itself) plus the maximum height of its children.
        return 1 + Math.max(leftHeight, rightHeight);
    }

    // Start the DFS traversal from the root.
    // The return value of dfsHeight(root) (which is the tree's overall height)
    // is not directly used by the caller, but its side effect (updating maxDiameter) is.
    dfsHeight(root);

    return maxDiameter;
}

// --- Example Usage ---

// Example 1:
//      1
//     / \
//    2   3
//   / \
//  4   5
// Expected Diameter: 3 (path 4-2-1-3 or 5-2-1-3)
const root1 = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
);
console.log("Diameter of Example 1:", diameterOfBinaryTree(root1)); // Output: 3

// Example 2: A single node
//      1
// Expected Diameter: 0
const root2 = new TreeNode(1);
console.log("Diameter of Example 2:", diameterOfBinaryTree(root2)); // Output: 0

// Example 3: Skewed tree
//      1
//       \
//        2
//         \
//          3
//           \
//            4
// Expected Diameter: 3 (path 1-2-3-4)
const root3 = new TreeNode(1, null,
    new TreeNode(2, null,
        new TreeNode(3, null,
            new TreeNode(4)
        )
    )
);
console.log("Diameter of Example 3:", diameterOfBinaryTree(root3)); // Output: 3

// Example 4: Empty tree
const root4 = null;
console.log("Diameter of Example 4:", diameterOfBinaryTree(root4)); // Output: 0

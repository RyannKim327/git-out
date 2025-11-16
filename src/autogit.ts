// Define the structure of a TreeNode
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
 * Calculates the maximum depth of a binary tree using a recursive DFS approach.
 *
 * @param root The root node of the binary tree.
 * @returns The maximum depth of the tree.
 */
function maxDepthRecursive(root: TreeNode | null): number {
    // Base case: An empty tree has a depth of 0
    if (root === null) {
        return 0;
    }

    // Recursively find the maximum depth of the left and right subtrees
    const leftDepth = maxDepthRecursive(root.left);
    const rightDepth = maxDepthRecursive(root.right);

    // The depth of the current node is 1 (for itself) plus the maximum depth of its children
    return 1 + Math.max(leftDepth, rightDepth);
}
/**
 * Calculates the maximum depth of a binary tree using an iterative BFS (level-order traversal) approach.
 *
 * @param root The root node of the binary tree.
 * @returns The maximum depth of the tree.
 */
function maxDepthIterative(root: TreeNode | null): number {
    // Base case: An empty tree has a depth of 0
    if (root === null) {
        return 0;
    }

    let depth = 0;
    // Use an array as a queue. TypeScript's Array.shift() is O(N) but for small N or typical JS engine optimizations,
    // it's often acceptable. For very large N, a more performant Queue class might be preferred.
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        depth++; // Increment depth for each new level

        const levelSize = queue.length; // Number of nodes at the current level
        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!; // Dequeue the first node (TypeScript non-null assertion)

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    return depth;
}
// Sample Tree:
//       3
//      / \
//     9  20
//       /  \
//      15   7
// Depth should be 3 (path: 3 -> 20 -> 15 or 3 -> 20 -> 7)

const tree = new TreeNode(
    3,
    new TreeNode(9),
    new TreeNode(
        20,
        new TreeNode(15),
        new TreeNode(7)
    )
);

console.log("--- Recursive Approach ---");
const recursiveDepth = maxDepthRecursive(tree);
console.log(`Max depth of the tree (recursive): ${recursiveDepth}`); // Output: 3

const emptyTree = null;
console.log(`Max depth of an empty tree (recursive): ${maxDepthRecursive(emptyTree)}`); // Output: 0

const singleNodeTree = new TreeNode(1);
console.log(`Max depth of a single-node tree (recursive): ${maxDepthRecursive(singleNodeTree)}`); // Output: 1


console.log("\n--- Iterative Approach ---");
const iterativeDepth = maxDepthIterative(tree);
console.log(`Max depth of the tree (iterative): ${iterativeDepth}`); // Output: 3

console.log(`Max depth of an empty tree (iterative): ${maxDepthIterative(emptyTree)}`); // Output: 0

console.log(`Max depth of a single-node tree (iterative): ${maxDepthIterative(singleNodeTree)}`); // Output: 1

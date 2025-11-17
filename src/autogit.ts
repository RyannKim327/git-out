class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
/**
 * Counts the number of leaf nodes in a binary tree using a recursive approach.
 * A leaf node is defined as a node with no children (both left and right are null).
 *
 * @param root The root of the binary tree.
 * @returns The total number of leaf nodes.
 */
function countLeafNodesRecursive<T>(root: TreeNode<T> | null): number {
    // Base Case 1: If the tree is empty or current node is null, no leaves.
    if (root === null) {
        return 0;
    }

    // Base Case 2: If current node has no left and no right child, it's a leaf.
    if (root.left === null && root.right === null) {
        return 1;
    }

    // Recursive Step: Sum the leaf counts from left and right subtrees.
    return countLeafNodesRecursive(root.left) + countLeafNodesRecursive(root.right);
}
/**
 * Counts the number of leaf nodes in a binary tree using an iterative (BFS) approach.
 * A leaf node is defined as a node with no children (both left and right are null).
 *
 * @param root The root of the binary tree.
 * @returns The total number of leaf nodes.
 */
function countLeafNodesIterative<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }

    let leafCount = 0;
    const queue: TreeNode<T>[] = [root]; // Use a queue for BFS

    while (queue.length > 0) {
        const currentNode = queue.shift()!; // Dequeue the front node (TypeScript's '!' asserts non-null/undefined)

        // Check if the current node is a leaf
        if (currentNode.left === null && currentNode.right === null) {
            leafCount++;
        }

        // Enqueue left child if it exists
        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }

        // Enqueue right child if it exists
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
        }
    }

    return leafCount;
}
// Example Tree Structure:
//        1
//       / \
//      2   3
//     / \   \
//    4   5   6
//       /
//      7

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);
root.left.right.left = new TreeNode(7);

// Leaf nodes in this tree are: 4, 7, 6. Expected count: 3

console.log("--- Recursive Approach ---");
console.log("Number of leaf nodes:", countLeafNodesRecursive(root)); // Expected: 3

const emptyTree = null;
console.log("Number of leaf nodes (empty tree):", countLeafNodesRecursive(emptyTree)); // Expected: 0

const singleNodeTree = new TreeNode(100);
console.log("Number of leaf nodes (single node tree):", countLeafNodesRecursive(singleNodeTree)); // Expected: 1

console.log("\n--- Iterative Approach ---");
console.log("Number of leaf nodes:", countLeafNodesIterative(root)); // Expected: 3
console.log("Number of leaf nodes (empty tree):", countLeafNodesIterative(emptyTree)); // Expected: 0
console.log("Number of leaf nodes (single node tree):", countLeafNodesIterative(singleNodeTree)); // Expected: 1

// Another example:
//        A
//       /
//      B
//     /
//    C
const skewedTree = new TreeNode('A');
skewedTree.left = new TreeNode('B');
skewedTree.left.left = new TreeNode('C');
console.log("\n--- Skewed Tree ---");
console.log("Number of leaf nodes (recursive):", countLeafNodesRecursive(skewedTree)); // Expected: 1 (C is the leaf)
console.log("Number of leaf nodes (iterative):", countLeafNodesIterative(skewedTree)); // Expected: 1

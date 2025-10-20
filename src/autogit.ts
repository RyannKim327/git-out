class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
/**
 * Calculates the sum of all node values in a binary tree using a recursive DFS approach.
 * @param root The root of the binary tree.
 * @returns The total sum of all node values.
 */
function sumNodesRecursive(root: TreeNode | null): number {
    // Base case: If the node is null, it contributes 0 to the sum.
    if (root === null) {
        return 0;
    }

    // Recursive step: Sum current node's value + sum of left subtree + sum of right subtree.
    return root.val + sumNodesRecursive(root.left) + sumNodesRecursive(root.right);
}
/**
 * Calculates the sum of all node values in a binary tree using an iterative BFS approach.
 * @param root The root of the binary tree.
 * @returns The total sum of all node values.
 */
function sumNodesIterativeBFS(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    let totalSum = 0;
    const queue: TreeNode[] = [root]; // Use an array as a queue

    while (queue.length > 0) {
        const currentNode = queue.shift()!; // Dequeue the first element (BFS)
        // The '!' is a non-null assertion operator, telling TypeScript that currentNode will not be null here
        // because we check queue.length > 0 and only push non-null nodes.

        totalSum += currentNode.val;

        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
        }
    }

    return totalSum;
}
/**
 * Calculates the sum of all node values in a binary tree using an iterative DFS approach with a stack.
 * @param root The root of the binary tree.
 * @returns The total sum of all node values.
 */
function sumNodesIterativeDFS(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    let totalSum = 0;
    const stack: TreeNode[] = [root]; // Use an array as a stack (LIFO)

    while (stack.length > 0) {
        const currentNode = stack.pop()!; // Pop the last element (DFS)

        totalSum += currentNode.val;

        // Push right child first, then left child, so left is processed before right
        // (Mimics recursive DFS order of left, then right)
        if (currentNode.right !== null) {
            stack.push(currentNode.right);
        }
        if (currentNode.left !== null) {
            stack.push(currentNode.left);
        }
    }

    return totalSum;
}
// Create a sample binary tree:
//        10
//       /  \
//      5    15
//     / \    \
//    3   7    18
//       /
//      6

const tree = new TreeNode(10,
    new TreeNode(5,
        new TreeNode(3),
        new TreeNode(7,
            new TreeNode(6)
        )
    ),
    new TreeNode(15,
        null,
        new TreeNode(18)
    )
);

console.log("Recursive Sum:", sumNodesRecursive(tree));       // Expected: 10 + 5 + 3 + 7 + 6 + 15 + 18 = 64
console.log("Iterative BFS Sum:", sumNodesIterativeBFS(tree)); // Expected: 64
console.log("Iterative DFS Sum:", sumNodesIterativeDFS(tree)); // Expected: 64

// Test with an empty tree
const emptyTree = null;
console.log("Recursive Sum (empty tree):", sumNodesRecursive(emptyTree));       // Expected: 0
console.log("Iterative BFS Sum (empty tree):", sumNodesIterativeBFS(emptyTree)); // Expected: 0
console.log("Iterative DFS Sum (empty tree):", sumNodesIterativeDFS(emptyTree)); // Expected: 0

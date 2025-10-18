class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
/**
 * Calculates the sum of all node values in a binary tree recursively.
 * @param root The root node of the binary tree.
 * @returns The total sum of all node values.
 */
function sumTreeNodesRecursive(root: TreeNode | null): number {
    // Base case: If the node is null, it contributes 0 to the sum.
    if (root === null) {
        return 0;
    }

    // Recursive step: Sum current node's value with sums of its left and right subtrees.
    return root.value + sumTreeNodesRecursive(root.left) + sumTreeNodesRecursive(root.right);
}
/**
 * Calculates the sum of all node values in a binary tree iteratively using a stack (DFS).
 * @param root The root node of the binary tree.
 * @returns The total sum of all node values.
 */
function sumTreeNodesIterativeDFS(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    let totalSum = 0;
    const stack: TreeNode[] = [];
    stack.push(root); // Start with the root node

    while (stack.length > 0) {
        // Pop a node from the stack
        const currentNode = stack.pop()!; // '!' asserts that pop() will not return undefined

        // Add its value to the total sum
        totalSum += currentNode.value;

        // Push its children onto the stack (right first, then left, so left is processed first)
        if (currentNode.right !== null) {
            stack.push(currentNode.right);
        }
        if (currentNode.left !== null) {
            stack.push(currentNode.left);
        }
    }

    return totalSum;
}
/**
 * Calculates the sum of all node values in a binary tree iteratively using a queue (BFS).
 * @param root The root node of the binary tree.
 * @returns The total sum of all node values.
 */
function sumTreeNodesIterativeBFS(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    let totalSum = 0;
    const queue: TreeNode[] = [];
    queue.push(root); // Start with the root node

    while (queue.length > 0) {
        // Dequeue a node from the front of the queue
        const currentNode = queue.shift()!; // '!' asserts that shift() will not return undefined

        // Add its value to the total sum
        totalSum += currentNode.value;

        // Enqueue its children
        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
        }
    }

    return totalSum;
}
// Example Tree:
//        10
//       /  \
//      5   15
//     / \    \
//    2   7    20
//
// Expected sum: 10 + 5 + 15 + 2 + 7 + 20 = 59

const tree = new TreeNode(10);
tree.left = new TreeNode(5);
tree.right = new TreeNode(15);
tree.left.left = new TreeNode(2);
tree.left.right = new TreeNode(7);
tree.right.right = new TreeNode(20);

console.log("--- Tree Sums ---");

// Recursive
const recursiveSum = sumTreeNodesRecursive(tree);
console.log(`Recursive Sum: ${recursiveSum}`); // Expected: 59

// Iterative DFS
const iterativeDFSSum = sumTreeNodesIterativeDFS(tree);
console.log(`Iterative DFS Sum: ${iterativeDFSSum}`); // Expected: 59

// Iterative BFS
const iterativeBFSSum = sumTreeNodesIterativeBFS(tree);
console.log(`Iterative BFS Sum: ${iterativeBFSSum}`); // Expected: 59

// Test with an empty tree
console.log("\n--- Empty Tree Sums ---");
const emptyTreeSumRecursive = sumTreeNodesRecursive(null);
console.log(`Recursive Sum (empty tree): ${emptyTreeSumRecursive}`); // Expected: 0

const emptyTreeSumIterativeDFS = sumTreeNodesIterativeDFS(null);
console.log(`Iterative DFS Sum (empty tree): ${emptyTreeSumIterativeDFS}`); // Expected: 0

const emptyTreeSumIterativeBFS = sumTreeNodesIterativeBFS(null);
console.log(`Iterative BFS Sum (empty tree): ${emptyTreeSumIterativeBFS}`); // Expected: 0

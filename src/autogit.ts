// Define the TreeNode class
class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
/**
 * Calculates the sum of all node values in a binary tree using recursion (DFS).
 *
 * @param root The root node of the binary tree.
 * @returns The total sum of all node values.
 */
function sumNodesRecursive(root: TreeNode | null): number {
    // Base case: If the node is null, its sum is 0.
    if (root === null) {
        return 0;
    }

    // Recursive step: Sum the current node's value and the sums of its children.
    return root.value + sumNodesRecursive(root.left) + sumNodesRecursive(root.right);
}
/**
 * Calculates the sum of all node values in a binary tree iteratively using BFS (level-order traversal).
 *
 * @param root The root node of the binary tree.
 * @returns The total sum of all node values.
 */
function sumNodesBFS(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    let totalSum = 0;
    const queue: TreeNode[] = [root]; // Initialize queue with the root node

    while (queue.length > 0) {
        // Dequeue the first node
        const currentNode = queue.shift()!; // '!' asserts that currentNode is not undefined

        // Add its value to the total sum
        totalSum += currentNode.value;

        // Enqueue its left child if it exists
        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }

        // Enqueue its right child if it exists
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
        }
    }

    return totalSum;
}
/**
 * Calculates the sum of all node values in a binary tree iteratively using DFS (pre-order traversal).
 *
 * @param root The root node of the binary tree.
 * @returns The total sum of all node values.
 */
function sumNodesDFS(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    let totalSum = 0;
    const stack: TreeNode[] = [root]; // Initialize stack with the root node

    while (stack.length > 0) {
        // Pop the top node from the stack
        const currentNode = stack.pop()!; // '!' asserts that currentNode is not undefined

        // Add its value to the total sum
        totalSum += currentNode.value;

        // Push right child first, so left child is processed before it (LIFO)
        if (currentNode.right !== null) {
            stack.push(currentNode.right);
        }
        // Push left child
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
//    2   7    20

const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(20);

// Expected sum: 10 + 5 + 15 + 2 + 7 + 20 = 59

console.log("--- Summing all nodes in the tree ---");
console.log("Recursive Sum (DFS):", sumNodesRecursive(root));
console.log("Iterative Sum (BFS):", sumNodesBFS(root));
console.log("Iterative Sum (DFS):", sumNodesDFS(root));

// Test with an empty tree
const emptyTree = null;
console.log("\nEmpty Tree:");
console.log("Recursive Sum (DFS):", sumNodesRecursive(emptyTree));
console.log("Iterative Sum (BFS):", sumNodesBFS(emptyTree));

// Test with a single node tree
const singleNodeTree = new TreeNode(42);
console.log("\nSingle Node Tree:");
console.log("Recursive Sum (DFS):", sumNodesRecursive(singleNodeTree));
console.log("Iterative Sum (BFS):", sumNodesBFS(singleNodeTree));

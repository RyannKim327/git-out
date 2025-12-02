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
    // Base case: If the node is null (empty tree or a child of a leaf), it contributes 0 to the sum.
    if (!root) {
        return 0;
    }

    // Recursive step: Sum the current node's value with the sum of its left and right subtrees.
    return root.val + sumNodesRecursive(root.left) + sumNodesRecursive(root.right);
}
/**
 * Calculates the sum of all node values in a binary tree using an iterative BFS approach.
 * @param root The root of the binary tree.
 * @returns The total sum of all node values.
 */
function sumNodesBFS(root: TreeNode | null): number {
    if (!root) {
        return 0; // Empty tree has a sum of 0
    }

    let totalSum = 0;
    // Use an array as a queue. TypeScript needs to know it holds TreeNodes.
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        // Dequeue the first node. The '!' asserts that it won't be undefined.
        const currentNode = queue.shift()!;
        totalSum += currentNode.val;

        // Enqueue left child if it exists
        if (currentNode.left) {
            queue.push(currentNode.left);
        }
        // Enqueue right child if it exists
        if (currentNode.right) {
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
function sumNodesDFS_Iterative(root: TreeNode | null): number {
    if (!root) {
        return 0; // Empty tree has a sum of 0
    }

    let totalSum = 0;
    // Use an array as a stack. TypeScript needs to know it holds TreeNodes.
    const stack: TreeNode[] = [root];

    while (stack.length > 0) {
        // Pop the top node. The '!' asserts that it won't be undefined.
        const currentNode = stack.pop()!;
        totalSum += currentNode.val;

        // Push right child first, then left. This ensures that when popped,
        // the left child is processed before the right (mimicking recursive DFS behavior).
        if (currentNode.right) {
            stack.push(currentNode.right);
        }
        if (currentNode.left) {
            stack.push(currentNode.left);
        }
    }

    return totalSum;
}
// Example Tree:
//        10
//       /  \
//      5    15
//     / \    \
//    2   7    20
// Total sum should be: 10 + 5 + 15 + 2 + 7 + 20 = 59

const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(20);

console.log("--- Summing All Nodes ---");
console.log("Recursive DFS Sum:", sumNodesRecursive(root));          // Expected: 59
console.log("BFS Sum:", sumNodesBFS(root));                          // Expected: 59
console.log("Iterative DFS (Stack) Sum:", sumNodesDFS_Iterative(root)); // Expected: 59

// Test with an empty tree
console.log("Sum of an empty tree (recursive):", sumNodesRecursive(null)); // Expected: 0
console.log("Sum of an empty tree (BFS):", sumNodesBFS(null));             // Expected: 0

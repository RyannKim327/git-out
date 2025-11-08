interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
function sumNodesRecursive(root: TreeNode | null): number {
    if (!root) return 0; // Base case: empty node
    return root.value + sumNodesRecursive(root.left) + sumNodesRecursive(root.right);
}
function sumNodesIterative(root: TreeNode | null): number {
    if (!root) return 0;
    let sum = 0;
    const stack: TreeNode[] = [root]; // Initialize stack with root

    while (stack.length > 0) {
        const node = stack.pop()!; // Non-null assertion (we check push conditions)
        sum += node.value;
        // Push children (right first, then left to process left first)
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return sum;
}
// Example tree:
//       1
//      / \
//     2   3
//    / \
//   4   5

const root: TreeNode = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null },
    },
    right: {
        value: 3,
        left: null,
        right: null,
    },
};

console.log(sumNodesRecursive(root)); // Output: 15 (1 + 2 + 3 + 4 + 5)
console.log(sumNodesIterative(root)); // Output: 15

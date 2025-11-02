interface TreeNode {
    value: number;        // Node value
    left: TreeNode | null; // Left child (or null)
    right: TreeNode | null; // Right child (or null)
}
function sumNodes(root: TreeNode | null): number {
    if (!root) {
        return 0; // Base case: empty tree/subtree
    }
    // Recursive case: current value + left subtree sum + right subtree sum
    return root.value + sumNodes(root.left) + sumNodes(root.right);
}
// Create leaf nodes
const leaf1 = { value: 4, left: null, right: null };
const leaf2 = { value: 5, left: null, right: null };
const leaf3 = { value: 6, left: null, right: null };

// Build the tree
const tree: TreeNode = {
    value: 1,
    left: {
        value: 2,
        left: leaf1,
        right: leaf2
    },
    right: {
        value: 3,
        left: leaf3,
        right: null
    }
};

console.log(sumNodes(tree)); // Output: 21 (1 + 2 + 3 + 4 + 5 + 6)
function sumNodesIterative(root: TreeNode | null): number {
    if (!root) return 0;
    let sum = 0;
    const stack: TreeNode[] = [root];

    while (stack.length > 0) {
        const node = stack.pop()!;
        sum += node.value;
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }

    return sum;
}

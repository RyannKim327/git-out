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

// Recursive approach
function sumOfNodesRecursive(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    return root.value + sumOfNodesRecursive(root.left) + sumOfNodesRecursive(root.right);
}

// Iterative approach using DFS (stack)
function sumOfNodesIterative(root: TreeNode | null): number {
    let sum = 0;
    if (root === null) return sum;

    const stack: TreeNode[] = [root];
    while (stack.length > 0) {
        const node = stack.pop()!;
        sum += node.value;
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return sum;
}

// Example usage:
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(18);

console.log(sumOfNodesRecursive(root)); // Output: 58
console.log(sumOfNodesIterative(root)); // Output: 58

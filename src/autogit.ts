interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
function countLeavesRecursive(root: TreeNode | null): number {
    if (root === null) return 0;
    // Check if current node is a leaf
    if (root.left === null && root.right === null) return 1;
    // Recurse on left and right subtrees
    return countLeavesRecursive(root.left) + countLeavesRecursive(root.right);
}
function countLeavesIterative(root: TreeNode | null): number {
    if (root === null) return 0;
    let count = 0;
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const node = queue.shift()!;
        // Check if node is a leaf
        if (node.left === null && node.right === null) {
            count++;
        } else {
            // Add children to the queue
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return count;
}
// Construct a sample tree:
//       1
//      / \
//     2   3
//    / \
//   4   5
const tree: TreeNode = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null }
    },
    right: { value: 3, left: null, right: null }
};

console.log(countLeavesRecursive(tree)); // Output: 3
console.log(countLeavesIterative(tree)); // Output: 3

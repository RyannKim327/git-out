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
function sumNodesRecursive(root: TreeNode | null): number {
    if (!root) return 0;
    return root.val + sumNodesRecursive(root.left) + sumNodesRecursive(root.right);
}
function sumNodesIterativeDFS(root: TreeNode | null): number {
    if (!root) return 0;
    let sum = 0;
    const stack: TreeNode[] = [root];

    while (stack.length > 0) {
        const node = stack.pop()!;
        sum += node.val;

        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }

    return sum;
}
function sumNodesIterativeBFS(root: TreeNode | null): number {
    if (!root) return 0;
    let sum = 0;
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const node = queue.shift()!;
        sum += node.val;

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return sum;
}
// Create a sample tree:
//       1
//      / \
//     2   3
//    / \
//   4   5
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(sumNodesRecursive(root));   // 15 (1+2+3+4+5)
console.log(sumNodesIterativeDFS(root));// 15
console.log(sumNodesIterativeBFS(root));// 15

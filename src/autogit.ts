class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    return Math.max(leftDepth, rightDepth) + 1;
}
const root = new TreeNode(1,
    new TreeNode(2,
        new TreeNode(4),
        null
    ),
    new TreeNode(3)
);

console.log(maxDepth(root)); // Outputs: 3

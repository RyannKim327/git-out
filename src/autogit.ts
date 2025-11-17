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
function countLeafNodes(root: TreeNode | null): number {
    if (root === null) return 0;
    if (root.left === null && root.right === null) return 1;
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
// Build a sample tree:       1
//                         /   \
//                        2     3
//                       /     / \
//                      4     5   6

const root = new TreeNode(1,
    new TreeNode(2, new TreeNode(4)),
    new TreeNode(3, new TreeNode(5), new TreeNode(6))
);

console.log(countLeafNodes(root)); // Output: 3 (nodes 4, 5, 6)

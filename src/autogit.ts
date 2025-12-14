class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}
function countLeafNodes(root: TreeNode | null): number {
  if (root === null) return 0;

  // If both left and right are null, it's a leaf
  if (root.left === null && root.right === null) return 1;

  // Recursively count in left and right subtrees
  return countLeafNodes(root.left) + countLeafNodes(root.right);
}
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(countLeafNodes(root)); // Output: 3 (nodes 4, 5, and 3 are leaves)

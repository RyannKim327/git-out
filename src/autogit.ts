class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
function sumTree(root: TreeNode | null): number {
  if (root === null) return 0;
  return root.val + sumTree(root.left) + sumTree(root.right);
}
// Build a simple tree:
//       10
//      /  \
//     5    20
//    / \
//   2   7

const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(20);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);

console.log("Sum of all nodes:", sumTree(root)); // Output: 44

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
function countLeafNodes(root: TreeNode | null): number {
  if (root === null) return 0;

  // If it's a leaf node
  if (root.left === null && root.right === null) return 1;

  // Recurse on left and right subtrees
  return countLeafNodes(root.left) + countLeafNodes(root.right);
}
// Create a simple tree:
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

console.log(countLeafNodes(root)); // Output: 3

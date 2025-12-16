// Define the structure of a tree node
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

// Function to compute maximum depth
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

// Example usage:
// const tree = new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4)));
// console.log(maxDepth(tree)); // Output: 3

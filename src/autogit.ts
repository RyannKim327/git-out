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

// Function to count leaf nodes
function countLeafNodes(root: TreeNode | null): number {
  if (root === null) return 0;

  // If it's a leaf node
  if (root.left === null && root.right === null) return 1;

  // Recursively count leaves in left and right subtrees
  return countLeafNodes(root.left) + countLeafNodes(root.right);
}

// Example usage
const tree = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

console.log("Number of leaf nodes:", countLeafNodes(tree)); // Output: 3
      1
     / \
    2   3
   / \
  4   5

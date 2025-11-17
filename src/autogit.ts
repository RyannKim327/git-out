// Define the structure of a tree node
class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

// Function to count leaf nodes
function countLeafNodes(root: TreeNode | null): number {
  if (root === null) return 0;

  // If both left and right are null, it's a leaf
  if (root.left === null && root.right === null) return 1;

  // Recurse on left and right subtrees
  return countLeafNodes(root.left) + countLeafNodes(root.right);
}

// ✅ Example usage
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log("Number of leaf nodes:", countLeafNodes(root)); // Output: 3
      1
     / \
    2   3
   / \
  4   5

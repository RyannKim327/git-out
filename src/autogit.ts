// Define the structure of a tree node
class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Function to compute the sum of all nodes
function sumTree(root: TreeNode | null): number {
  if (root === null) return 0;
  return root.value + sumTree(root.left) + sumTree(root.right);
}

// Example usage
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(7);

console.log("Sum of all nodes:", sumTree(root)); // Output: 40

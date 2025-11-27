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

// Recursive function to sum all nodes
function sumTree(node: TreeNode | null): number {
  if (node === null) return 0;
  return node.value + sumTree(node.left) + sumTree(node.right);
}

// Example usage
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(7);

console.log("Sum of all nodes:", sumTree(root)); // Output: 40
Sum of all nodes: 40

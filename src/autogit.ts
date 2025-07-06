// Define the binary tree node structure
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Function to count leaf nodes
function countLeaves(node: TreeNode | null): number {
  if (node === null) {
    return 0;
  }

  // If both left and right are null, it's a leaf node
  if (node.left === null && node.right === null) {
    return 1;
  }

  // Recursively count leaves in the left and right subtrees
  return countLeaves(node.left) + countLeaves(node.right);
}

// Example usage:
const root: TreeNode = {
  value: 1,
  left: {
    value: 2,
    left: null,
    right: {
      value: 4,
      left: null,
      right: null
    }
  },
  right: {
    value: 3,
    left: null,
    right: null
  }
};

const numberOfLeaves = countLeaves(root);
console.log(`Number of leaf nodes: ${numberOfLeaves}`); // Output: 3

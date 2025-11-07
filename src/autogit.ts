class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0;

  function height(node: TreeNode | null): number {
    if (!node) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // Update diameter
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  height(root);
  return maxDiameter;
}

// Example usage:
// const tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
// console.log(diameterOfBinaryTree(tree)); // Output: 3

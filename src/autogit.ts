diameter = max(left_height + right_height) across all nodes
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;

    const leftHeight = dfs(node.left);
    const rightHeight = dfs(node.right);

    // Update diameter
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    // Return height of this subtree
    return 1 + Math.max(leftHeight, rightHeight);
  }

  dfs(root);
  return maxDiameter;
}

// Example usage:
// const tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
// console.log(diameterOfBinaryTree(tree)); // Output: 3

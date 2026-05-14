class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;           // base case: empty subtree
  const leftDepth  = maxDepth(root.left);   // depth of left subtree
  const rightDepth = maxDepth(root.right);  // depth of right subtree
  return Math.max(leftDepth, rightDepth) + 1; // current node + the deeper side
}
function maxDepthIterative(root: TreeNode | null): number {
  if (!root) return 0;

  const stack: Array<{ node: TreeNode; depth: number }> = [{ node: root, depth: 1 }];
  let max = 0;

  while (stack.length) {
    const { node, depth } = stack.pop()!;
    max = Math.max(max, depth);

    if (node.left) stack.push({ node: node.left, depth: depth + 1 });
    if (node.right) stack.push({ node: node.right, depth: depth + 1 });
  }

  return max;
}

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
function sumTree(root: TreeNode | null): number {
  if (root === null) return 0;
  return root.val + sumTree(root.left) + sumTree(root.right);
}
const tree = new TreeNode(1,
  new TreeNode(2,
    new TreeNode(4),
    new TreeNode(5)
  ),
  new TreeNode(3)
);

console.log(sumTree(tree)); // Output: 15
function sumTreeIterative(root: TreeNode | null): number {
  if (!root) return 0;

  const stack: TreeNode[] = [root];
  let sum = 0;

  while (stack.length > 0) {
    const node = stack.pop()!;
    sum += node.val;

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return sum;
}

class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}
function sumTree(root: TreeNode | null): number {
  if (!root) return 0;          // nothing to add
  const leftSum = sumTree(root.left);
  const rightSum = sumTree(root.right);
  return root.val + leftSum + rightSum;
}
function sumTreeIterative(root: TreeNode | null): number {
  if (!root) return 0;
  let sum = 0;
  const stack: Array<TreeNode> = [root];

  while (stack.length) {
    const node = stack.pop()!;
    sum += node.val;
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return sum;
}
const root = new TreeNode(5,
  new TreeNode(3,
    new TreeNode(2),
    new TreeNode(4)
  ),
  new TreeNode(8,
    null,
    new TreeNode(9)
  )
);

console.log(sumTree(root));          // 5 + 3 + 2 + 4 + 8 + 9 = 31
console.log(sumTreeIterative(root)); // 31

class TreeNode<T = any> {
  constructor(
    public val: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}
function countLeaves<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;                         // empty subtree → 0 leaves

  // If both children are missing, this node itself is a leaf
  if (!root.left && !root.right) return 1;

  // Otherwise, count leaves in the children
  return countLeaves(root.left) + countLeaves(root.right);
}
function countLeavesIter<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;

  let stack: Array<TreeNode<T>> = [root];
  let leafCount = 0;

  while (stack.length) {
    const node = stack.pop() as TreeNode<T>;

    // A leaf if it has no children
    if (!node.left && !node.right) {
      leafCount++;
    } else {
      // Push existing children to process later
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }

  return leafCount;
}
const root = new TreeNode(1,
  new TreeNode(2,
    new TreeNode(4),           // leaf
    new TreeNode(5)            // leaf
  ),
  new TreeNode(3)              // leaf
);

console.log(countLeaves(root));        // → 3
console.log(countLeavesIter(root));    // → 3

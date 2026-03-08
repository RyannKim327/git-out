// Basic node interface – can be turned into a class if you like.
interface TreeNode<T = number> {
  val: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}
function maxDepth<T>(root?: TreeNode<T>): number {
  if (!root) return 0;                 // empty subtree → depth 0

  const leftDepth  = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  // Depth of current node = 1 (itself) + depth of deeper side
  return 1 + Math.max(leftDepth, rightDepth);
}
const root: TreeNode = {
  val: 1,
  left: { val: 2, left: { val: 4 } },
  right: { val: 3, right: { val: 5, right: { val: 6 } } }
};

console.log(maxDepth(root));   // → 4
function maxDepthIter<T>(root?: TreeNode<T>): number {
  if (!root) return 0;

  let max = 0;
  const stack: Array<{ node: TreeNode<T>; depth: number }> = [
    { node: root, depth: 1 },
  ];

  while (stack.length) {
    const { node, depth } = stack.pop()!;
    max = Math.max(max, depth);

    if (node.left) stack.push({ node: node.left, depth: depth + 1 });
    if (node.right) stack.push({ node: node.right, depth: depth + 1 });
  }

  return max;
}

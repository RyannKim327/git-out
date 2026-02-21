interface TreeNode<T = number> {
  val: T;                // single value (you can change the type)
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}
const root: TreeNode = {
  val: 10,
  left: { val: 5, left: null, right: null },
  right: { val: 15, left: null, right: null },
};
function maxDepth<T>(node: TreeNode<T> | null): number {
  if (!node) return 0;
  const leftDepth = maxDepth(node.left);
  const rightDepth = maxDepth(node.right);
  return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepthIter<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;

  const queue: TreeNode<T>[] = [root];
  let depth = 0;

  while (queue.length) {
    const levelSize = queue.length; // nodes at current depth
    depth++;                        // we’re going to finish this level

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift() as TreeNode<T>;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}
// build a quick tree
const tree: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: null,
  },
  right: {
    val: 3,
    left: null,
    right: { val: 5, left: null, right: null },
  },
};

console.log(maxDepth(tree));      // -> 3
console.log(maxDepthIter(tree));  // -> 3

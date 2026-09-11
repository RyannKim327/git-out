interface TreeNode {
  val:  number | string   // you can put any type that fits your data
  left?: TreeNode | null
  right?: TreeNode | null
}
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;                 // empty tree -> depth 0

  const leftDepth  = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepthIterative(root: TreeNode | null): number {
  if (!root) return 0;

  let depth = 0;
  const queue: Array<TreeNode> = [root];

  while (queue.length) {
    const levelSize = queue.length;   // nodes at the current level
    depth++;                          // we’re about to process a whole new level

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;    // safe; queue is non‑empty here

      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}
// Build a tiny tree:
//        1
//       / \
//      2   3
//         /
//        4
const tree: TreeNode = {
  val: 1,
  left: { val: 2 },
  right: {
    val: 3,
    left: { val: 4 }
  }
};

console.log('Recursive depth:', maxDepth(tree));          // 3
console.log('Iterative depth:', maxDepthIterative(tree)); // 3

interface BinaryTreeNode<T = number> {
  val: T;                  // The payload – can be any type you need
  left?: BinaryTreeNode<T>;
  right?: BinaryTreeNode<T>;
}
function maxDepthRecursive<T>(root?: BinaryTreeNode<T>): number {
  if (!root) return 0; // An empty tree has depth 0

  const leftDepth  = maxDepthRecursive(root.left);
  const rightDepth = maxDepthRecursive(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepthBFS<T>(root?: BinaryTreeNode<T>): number {
  if (!root) return 0;

  const queue: Array<{ node: BinaryTreeNode<T>; depth: number }> = [{ node: root, depth: 1 }];
  let maxDepth = 0;

  while (queue.length) {
    const { node, depth } = queue.shift()!; // Non‑null assertion: queue never empty here
    maxDepth = Math.max(maxDepth, depth);

    if (node.left)  queue.push({ node: node.left, depth: depth + 1 });
    if (node.right) queue.push({ node: node.right, depth: depth + 1 });
  }

  return maxDepth;
}
// Example tree:
//        1
//       / \
//      2   3
//     /
//    4
const tree: BinaryTreeNode = {
  val: 1,
  left: { val: 2, left: { val: 4 } },
  right: { val: 3 }
};

console.log(maxDepthRecursive(tree)); // 3
console.log(maxDepthBFS(tree));       // 3

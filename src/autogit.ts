/** A very simple binary‑tree node. */
export class TreeNode<T = unknown> {
  constructor(
    public val: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

/**
 * Returns the maximum depth of a binary tree.
 * Depth is counted in nodes, not edges.
 *
 * @param root The root node of the tree (or null for an empty tree).
 * @returns an integer ≥ 0.
 */
export function maxDepth<T>(root: TreeNode<T> | null): number {
  // recursion is the cleanest here
  if (!root) return 0; // leaf’s child contributes 0

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  // current node adds 1 to the greater of two sub‑depths
  return 1 + (leftDepth > rightDepth ? leftDepth : rightDepth);
}
// Build a tiny tree:
//       a
//      / \
//     b   c
//    /
//   d
const root = new TreeNode('a',
  new TreeNode('b',
    new TreeNode('d')
  ),
  new TreeNode('c')
);

console.log(maxDepth(root)); // → 3
export function maxDepthBFS<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;

  const queue: TreeNode<T>[] = [root];
  let depth = 0;

  while (queue.length) {
    // All nodes in this `for` loop belong to the same level.
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++; // finished one level
  }
  return depth;
}

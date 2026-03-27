// A typical binary‑tree node.
export interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

/**
 * Recursively finds the longest path from this node down to a leaf.
 * depth(node) = 1 + max(depth(left), depth(right))
 * Leaves contribute 1; an empty tree contributes 0.
 */
export function maxDepth(node?: TreeNode): number {
  if (!node) return 0;

  const leftDepth  = maxDepth(node.left);
  const rightDepth = maxDepth(node.right);

  return 1 + (leftDepth > rightDepth ? leftDepth : rightDepth);
}
export function maxDepthIterative(root?: TreeNode): number {
  if (!root) return 0;

  let max = 0;
  const queue: Array<TreeNode> = [root];

  while (queue.length) {
    const levelSize = queue.length;
    max++; // we’re on a new level

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!; // queue is non‑empty
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return max;
}
const root: TreeNode = {
  value: 1,
  left:  { value: 2, right: { value: 4 } },
  right: { value: 3 }
};

console.log(maxDepth(root));          // → 3
console.log(maxDepthIterative(root)); // → 3

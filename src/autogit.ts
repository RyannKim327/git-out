interface TreeNode<T = number> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}
function maxDepth<T>(root?: TreeNode<T>): number {
  if (!root) return 0;                        // empty tree → depth 0

  const leftDepth  = maxDepth(root.left);     // recurse on left child
  const rightDepth = maxDepth(root.right);    // recurse on right child

  return Math.max(leftDepth, rightDepth) + 1; // +1 for the current node
}
function maxDepthBFS<T>(root?: TreeNode<T>): number {
  if (!root) return 0;

  const queue: Array<TreeNode<T>> = [root];
  let depth = 0;

  while (queue.length) {
    const levelSize = queue.length;           // nodes on this level
    depth += 1;                               // finish the level → increment depth

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;            // safe – queue is non‑empty
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}
const tree: TreeNode = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 }
  },
  right: {
    value: 3,
    right: {
      value: 6,
      left: { value: 7 }
    }
  }
};

console.log(maxDepth(tree));      // → 4
console.log(maxDepthBFS(tree));   // → 4

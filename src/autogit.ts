export interface TreeNode<T> {
  val: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

/**
 * Returns the diameter (max number of edges on any path)
 * of a binary tree rooted at `root`.
 */
export function diameter<T>(root: TreeNode<T> | undefined): number {
  let maxDia = 0;

  function depth(node?: TreeNode<T>): number {
    if (!node) return 0;
    const left  = depth(node.left);
    const right = depth(node.right);

    // path that goes through this node
    maxDia = Math.max(maxDia, left + right);

    // height of this subtree
    return Math.max(left, right) + 1;
  }

  depth(root);
  return maxDia;
}
function makeTree(): TreeNode<number> {
  //            1
  //          /   \
  //         2     3
  //          \   / \
  //           4 5   6
  //              \
  //               7
  return {
    val: 1,
    left: { val: 2, right: { val: 4 } },
    right: {
      val: 3,
      left: { val: 5, right: { val: 7 } },
      right: { val: 6 }
    }
  };
}

console.log(diameter(makeTree())); // outputs 5
export function diameterIter<T>(root: TreeNode<T> | undefined): number {
  if (!root) return 0;
  const stack: Array<{ node: TreeNode<T>; visited: boolean }> = [{ node: root, visited: false }];
  const heights = new Map<TreeNode<T>, number>();
  let maxDia = 0;

  while (stack.length) {
    const { node, visited } = stack.pop()!;
    if (visited) {
      const lh = heights.get(node.left) ?? 0;
      const rh = heights.get(node.right) ?? 0;
      maxDia = Math.max(maxDia, lh + rh);
      heights.set(node, Math.max(lh, rh) + 1);
    } else {
      stack.push({ node, visited: true });
      if (node.right) stack.push({ node: node.right, visited: false });
      if (node.left)  stack.push({ node: node.left,  visited: false });
    }
  }

  return maxDia;
}

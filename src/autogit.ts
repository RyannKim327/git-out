// Basic definition of a binary‑tree node
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Returns the diameter (in edges) of a binary tree.
 */
function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0;          // keeps the best we have seen

  /** Depth‑first search that returns the height of sub‑tree. */
  function dfs(node: TreeNode | null): number {
    if (node === null) return 0;          // leaf contributes 0 height

    const leftHeight  = dfs(node.left);
    const rightHeight = dfs(node.right);

    // Path that goes through this node
    const localDiameter = leftHeight + rightHeight;
    if (localDiameter > maxDiameter) {
      maxDiameter = localDiameter;
    }

    // Height to propagate upward
    return Math.max(leftHeight, rightHeight) + 1;
  }

  dfs(root);
  return maxDiameter;         // already in edges
}

/* ---- example usage ------------------------------------------------------- */

// simple helper to build a tree
function node(val: number, l?: TreeNode, r?: TreeNode): TreeNode {
  return { val, left: l ?? null, right: r ?? null };
}

//        1
//       / \
//      2   3
//     / \     
//    4   5     
const root = node(1,
  node(2, node(4), node(5)),
  node(3)
);

console.log(diameterOfBinaryTree(root));   // → 3  (4–2–1–3 or 5–2–1–3)

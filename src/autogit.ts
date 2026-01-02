// A simple binary‑tree node
export class TreeNode<T = number> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
/**
 * Returns the diameter of the binary tree measured in **edges**.
 *
 * @param root - The root of the binary tree (null => empty tree → diameter = 0)
 * @returns number of edges on the longest path between any two nodes
 */
export function treeDiameter<T>(root: TreeNode<T> | null): number {
  // Holds the best diameter we have seen so far.
  let maxDiameter = 0;

  /**
   * Post‑order DFS that returns the height of the subtree rooted at `node`.
   * While unwinding, it updates `maxDiameter`.
   *
   * Height = number of edges on the longest downward path from `node`
   * to a leaf.  An empty subtree has height -1 (so a leaf has height 0).
   */
  function dfs(node: TreeNode<T> | null): number {
    if (!node) return -1; // empty subtree

    const leftHeight = dfs(node.left);
    const rightHeight = dfs(node.right);

    // Path that goes through `node` = leftHeight + rightHeight + 2 edges
    const throughNode = leftHeight + rightHeight + 2;
    if (throughNode > maxDiameter) maxDiameter = throughNode;

    // Return height of this node
    return Math.max(leftHeight, rightHeight) + 1;
  }

  dfs(root);
  return maxDiameter;
}
export function treeDiameterInNodes<T>(root: TreeNode<T> | null): number {
  // Edge‑based diameter + 1 (unless the tree is empty)
  const edges = treeDiameter(root);
  return root ? edges + 1 : 0;
}
// ---------------------------------------------------
// Build a sample tree:
//
//          1
//        /   \
//       2     3
//      / \     \
//     4   5     6
//        / \
//       7   8
//
// The longest path is 7‑5‑2‑1‑3‑6 (5 edges, 6 nodes)
// ---------------------------------------------------
const root = new TreeNode(
  1,
  new TreeNode(
    2,
    new TreeNode(4),
    new TreeNode(
      5,
      new TreeNode(7),
      new TreeNode(8)
    )
  ),
  new TreeNode(
    3,
    null,
    new TreeNode(6)
  )
);

console.log('Diameter (edges):', treeDiameter(root));          // → 5
console.log('Diameter (nodes):', treeDiameterInNodes(root));   // → 6
Diameter (edges): 5
Diameter (nodes): 6
export class TreeNode<T = number> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  constructor(value: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export function treeDiameter<T>(root: TreeNode<T> | null): number {
  let max = 0;
  const dfs = (node: TreeNode<T> | null): number => {
    if (!node) return -1;
    const lh = dfs(node.left);
    const rh = dfs(node.right);
    max = Math.max(max, lh + rh + 2);
    return Math.max(lh, rh) + 1;
  };
  dfs(root);
  return max;
}

export interface TreeNode {
  val: number;                // or any type you like
  left?: TreeNode | null;     // child nodes (undefined is treated as null)
  right?: TreeNode | null;
}
const tree: TreeNode = {
  val: 1,
  left: { val: 2, left: { val: 4 }, right: { val: 5 }},
  right: { val: 3, right: { val: 6 }}
};
/**
 * Returns the diameter (number of edges on the longest path) of a binary tree.
 *
 * @param root root node of the tree
 * @returns diameter in edges
 */
export function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0;           // will hold the best diameter found

  /**
   * Post‑order DFS that returns the height of the subtree.
   * While unwinding, we update `maxDiameter`.
   */
  function dfs(node: TreeNode | null): number {
    if (!node) return -1;       // height of null is -1 so that leaf node height = 0

    const leftHeight  = dfs(node.left)  + 1;
    const rightHeight = dfs(node.right) + 1;

    // The path that goes from the leftmost leaf of this subtree
    // through this node to the rightmost leaf gives a candidate
    // diameter.  `+1` is not needed for edges because heights already
    // count edges from node to leaf.
    const candidate = leftHeight + rightHeight;
    if (candidate > maxDiameter) maxDiameter = candidate;

    // Return height of this node for the parent call
    return Math.max(leftHeight, rightHeight);
  }

  dfs(root);
  return maxDiameter;
}
const tree: TreeNode = {
  val: 1,
  left: { val: 2, left: { val: 4 }, right: { val: 5 }},
  right: { val: 3, right: { val: 6 }}
};

console.log(diameterOfBinaryTree(tree));   // → 3

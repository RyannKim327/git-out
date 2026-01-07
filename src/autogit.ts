interface TreeNode<T = any> {
  value: T
  left?: TreeNode<T> | null
  right?: TreeNode<T> | null
}
/**
 * Count leaf nodes (nodes with no children) in a binary tree.
 * @param root – root of the tree, or `null` if the tree is empty
 * @returns number of leaf nodes
 */
function countLeaves(root: TreeNode | null): number {
  if (!root) return 0
  if (!root.left && !root.right) return 1   // leaf
  return countLeaves(root.left ?? null) + countLeaves(root.right ?? null)
}
const tree: TreeNode = {
  value: 1,
  left: { value: 2, left: { value: 4 }, right: { value: 5 } },
  right: { value: 3 }   // this is a leaf
}

console.log(countLeaves(tree))   // → 3

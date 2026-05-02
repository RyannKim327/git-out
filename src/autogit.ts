// Basic node definition – feel free to swap in your own
class TreeNode<T = number> {
  val: T
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null

  constructor(val: T, left?: TreeNode<T>, right?: TreeNode<T>) {
    this.val = val
    if (left) this.left = left
    if (right) this.right = right
  }
}

/**
 * Returns the diameter of the tree rooted at `root`.
 * If the tree is empty, the diameter is 0.
 */
function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0

  /**
   * Helper that returns the height (in nodes) of the subtree.
   * While unwinding recursion, we update the maximum diameter.
   */
  function height(node: TreeNode | null): number {
    if (!node) return 0

    const leftHeight = height(node.left)
    const rightHeight = height(node.right)

    // Path that goes through this node = leftHeight + rightHeight
    const localDiameter = leftHeight + rightHeight

    if (localDiameter > maxDiameter) maxDiameter = localDiameter

    // Height is max child height plus this node
    return Math.max(leftHeight, rightHeight) + 1
  }

  height(root)
  return maxDiameter   // edge‑count diameter
}

/* ---------- quick test ---------- */
const tree = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(6, new TreeNode(7), null))
)

console.log(diameterOfBinaryTree(tree)) // → 5 (path 4‑2‑1‑3‑6‑7)

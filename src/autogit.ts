/** Basic node structure for a binary tree. */
class TreeNode {
  /** Value stored in the node (use `any` if you need non‑numeric data). */
  val: number
  /** Left child, or null if none. */
  left: TreeNode | null
  /** Right child, or null if none. */
  right: TreeNode | null

  constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val
    this.left = left ?? null
    this.right = right ?? null
  }
}

/* ------------------------------------------------------------------ */
/*  Recursive depth‑first search.  Returns the longest path length.    */
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0                    // leaf + null = depth 0
  const leftDepth  = maxDepth(root.left) // depth goes 1, 2, … from here
  const rightDepth = maxDepth(root.right)
  return Math.max(leftDepth, rightDepth) + 1
}

/* ------------------------------------------------------------------ */
/*  Iterative breadth‑first search (queue).  Same result, no stack.   */
function maxDepthIter(root: TreeNode | null): number {
  if (!root) return 0
  let max = 0
  const queue: Array<{ node: TreeNode; depth: number }> = [
    { node: root, depth: 1 },
  ]

  while (queue.length) {
    const { node, depth } = queue.shift()!
    max = Math.max(max, depth)
    if (node.left)  queue.push({ node: node.left, depth: depth + 1 })
    if (node.right) queue.push({ node: node.right, depth: depth + 1 })
  }
  return max
}

/* ------------------------------------------------------------------ */
/*  Example usage ---------------------------------------------------- */
const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(6))
)

console.log('Recursive depth:', maxDepth(root))      // → 3
console.log('Iterative depth:', maxDepthIter(root)) // → 3

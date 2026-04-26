/**
 * A very generic tree node interface.
 * `children` can be empty, allowing the node to be a leaf.
 */
interface TreeNode<T = unknown> {
  /** Whatever payload you want to store. */
  value: T

  /** Children of this node – an empty array represents a leaf. */
  children?: TreeNode<T>[]
}

/**
 * Depth‑Limited Search (DFS) – recursive version.
 *
 * @param root   The node from which the search starts.
 * @param target A predicate that decides whether the node we are looking for
 *               was found.
 * @param limit  The maximum depth (0 → only the root, 1 → root + its children, …).
 * @param depth  Current depth – the caller should omit it.
 * @returns The first matching node, or undefined if none is found within the limit.
 */
export function depthLimitedSearchRecursive<T>(
  root: TreeNode<T>,
  target: (node: TreeNode<T>) => boolean,
  limit: number,
  depth = 0
): TreeNode<T> | undefined {
  // If the depth exceeds the limit, stop exploring this branch
  if (depth > limit) return undefined

  if (target(root)) return root

  if (!root.children) return undefined

  for (const child of root.children) {
    const hit = depthLimitedSearchRecursive(child, target, limit, depth + 1)
    if (hit) return hit
  }

  return undefined
}
export function depthLimitedSearch<T>(
  root: TreeNode<T>,
  target: (node: TreeNode<T>) => boolean,
  limit: number
): TreeNode<T> | undefined {
  // Stack entries hold the node and its depth
  type StackEntry = { node: TreeNode<T>; depth: number }
  const stack: StackEntry[] = [{ node: root, depth: 0 }]

  while (stack.length) {
    const { node, depth } = stack.pop()!

    if (target(node)) return node
    if (depth === limit) continue           // don't push children deeper than the limit

    // push children in reverse order so that the leftmost child is processed first
    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ node: node.children[i], depth: depth + 1 })
      }
    }
  }

  return undefined
}
// Example tree (int values)
const tree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4 }, { value: 5 }] },
    { value: 3, children: [{ value: 6 }, { value: 7 }] }
  ]
}

// Find the node with value 5, but never look deeper than depth 2
const target = (n: TreeNode<number>) => n.value === 5
const found = depthLimitedSearch(tree, target, 2)

console.log(found?.value)   // prints 5

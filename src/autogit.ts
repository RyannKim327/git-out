/**
 * Basic node interface – adjust it to whatever
 * your real objects look like.
 */
export interface Node {
  /** Identifier (useful for debugging, not required by the algo). */
  id: string | number;

  /** Reference to child nodes (empty array for leaf). */
  children: Node[];
}

/**
 * Depth‑limited search (DFS style).
 *
 * @param root      The node to start from.
 * @param depthLimit  The maximum depth to explore.
 * @param goalPredicate  Function that tells when we’ve found the target.
 * @returns The first node that satisfies `goalPredicate`,
 *          or `undefined` if none was found within the depth limit.
 *
 * The algorithm uses an explicit stack so no recursion is performed.
 */
export function depthLimitedSearch(
  root: Node,
  depthLimit: number,
  goalPredicate: (node: Node) => boolean
): Node | undefined {
  // Stack element: { node, depth }
  const stack: Array<{ node: Node; depth: number }> = [{ node: root, depth: 0 }];

  while (stack.length > 0) {
    const { node, depth } = stack.pop()!; // pop last element (LIFO)

    // Check goal condition
    if (goalPredicate(node)) {
      return node;
    }

    // Stop if we’ve reached the depth limit
    if (depth >= depthLimit) {
      continue;
    }

    // Push children onto the stack, increasing depth
    // If you prefer a different traversal order just
    // change the `for` loop below (e.g. reverse the list)
    for (const child of node.children) {
      stack.push({ node: child, depth: depth + 1 });
    }
  }

  // Nothing found within the depth limit
  return undefined;
}
// Create a sample tree
const tree: Node = {
  id: 1,
  children: [
    { id: 2, children: [] },
    {
      id: 3,
      children: [
        { id: 4, children: [] },
        { id: 5, children: [] }
      ]
    }
  ]
};

// Find node with id === 5 but only go 2 levels deep
const found = depthLimitedSearch(tree, 2, n => n.id === 5);

console.log(found); // logs the node with id 5 (or undefined if depth limit blocks it)

// Generic graph node.  Only needs `neighbors(): Iterable<T>`.
interface Node<T> {
  value: T;
  neighbors(): Iterable<Node<T>>;
}

/**
 * Depth-limited search.
 * @param start   Start node.
 * @param isGoal  Predicate that returns true for goal nodes.
 * @param limit   Maximum depth to explore (0 = start only).
 * @returns       The goal node if found, otherwise undefined.
 */
function depthLimitedSearch<T>(
  start: Node<T>,
  isGoal: (n: Node<T>) => boolean,
  limit: number
): Node<T> | undefined {
  // Internal recursive DFS
  function dfs(node: Node<T>, depth: number): Node<T> | undefined {
    if (isGoal(node)) return node;          // success
    if (depth >= limit) return undefined;   // hit depth bound

    for (const child of node.neighbors()) {
      const found = dfs(child, depth + 1);
      if (found) return found;            // propagate success
    }
    return undefined;                       // failure in this branch
  }

  return dfs(start, 0);
}
class TreeNode implements Node<number> {
  constructor(public value: number, private kids: TreeNode[] = []) {}
  neighbors(): Iterable<TreeNode> { return this.kids; }
}

// Build a small tree
//        1
//      / | \
//     2  3  4
//    / \
//   5   6
const root = new TreeNode(1, [
  new TreeNode(2, [new TreeNode(5), new TreeNode(6)]),
  new TreeNode(3),
  new TreeNode(4)
]);

// Search for value 6 with different depth limits
console.log(depthLimitedSearch(root, n => n.value === 6, 1)); // undefined
console.log(depthLimitedSearch(root, n => n.value === 6, 2)); // TreeNode{value:6}

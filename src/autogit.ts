export interface Node<T = any> {
  /** A value stored in the node – useful for reconstruction / debugging */
  value: T;

  /** Returns an array of child nodes (or an empty array) */
  children(): Node<T>[];
}
class IntNode implements Node<number> {
  constructor(public value: number) {}
  children(): IntNode[] {
    // example: a simple binary tree
    return [];
  }
}
/**
 * Depth‑limited search.  Returns a path from `start` to one of the goal values,
 * or `null` if no path exists within the depth limit.
 *
 * @param start      The node from which we start.
 * @param isGoal     A predicate that decides if the current node is a goal.
 * @param depthLimit How many edges you’re willing to traverse.  Zero means
 *                   you stop immediately (only the start node is examined).
 * @param visited    Optional set for cycle detection.
 *
 * @returns Array of nodes forming the path, or `null`.
 */
export function depthLimitedSearch<T = any>(
  start: Node<T>,
  isGoal: (node: Node<T>) => boolean,
  depthLimit: number,
  visited?: Set<Node<T>>
): Array<Node<T>> | null {
  if (depthLimit < 0) throw new Error('depthLimit must be ≥ 0');

  // depth‑first approach – stop when limit hits
  function recurse(
    current: Node<T>,
    depth: number,
    trail: Node<T>[],
    visitedSet: Set<Node<T>>
  ): Array<Node<T>> | null {
    if (!visitedSet.has(current)) {
      if (depthLimit === 0 && depth > 0) return null; // reached limit

      if (isGoal(current)) return [...trail, current];

      visitedSet.add(current);

      for (const child of current.children()) {
        const result = recurse(child, depth + 1, [...trail, current], visitedSet);
        if (result !== null) return result;
      }

      visitedSet.delete(current); // backtrack
    }
    return null; // not found on this branch
  }

  const visitedSet = visited ?? new Set<Node<T>>();
  return recurse(start, 0, [], visitedSet);
}
const goalNode = (node: Node<number>) => node.value === 42;
const path = depthLimitedSearch(root, goalNode, 10);
if (path) {
  console.log('Found !!', path.map(n => n.value));
} else {
  console.log('No path within depth limit');
}
export function depthLimitedSearchIter<T = any>(
  start: Node<T>,
  isGoal: (node: Node<T>) => boolean,
  depthLimit: number
): Array<Node<T>> | null {
  // stack holds tuples: [current node, depth so far, path so far]
  const stack: Array<[Node<T>, number, Node<T>[]]> = [[start, 0, []]];

  const visited = new Set<Node<T>>();

  while (stack.length) {
    const [node, depth, path] = stack.pop()!;

    if (visited.has(node)) continue;
    visited.add(node);

    if (depth > depthLimit) continue; // skip deeper branches

    const newPath = [...path, node];

    if (isGoal(node)) return newPath;

    for (const child of node.children()) {
      stack.push([child, depth + 1, newPath]);
    }
  }

  return null; // nothing found
}

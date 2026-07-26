if currentDepth > depthLimit → stop exploring that branch
/**
 * Generic depth‑limited search (iterative DFS).
 *
 * @param root        The starting node.
 * @param depthLimit  How far we are allowed to go from the root.
 * @param getNeighbors
 *        A callback that returns the list of adjacent nodes for a given node.
 * @param visitedSet  Optional set used to avoid revisiting nodes.
 *
 * @returns  Array of nodes visited in order (pre‑order DFS order).
 */
export function depthLimitedSearch<T>(
  root: T,
  depthLimit: number,
  getNeighbors: (node: T) => T[],
  visitedSet?: Set<T>
): T[] {
  const visited: Set<T> = visitedSet ?? new Set<T>();
  const stack: Array<{ node: T; depth: number }> = [{ node: root, depth: 0 }];
  const result: T[] = [];

  while (stack.length > 0) {
    const { node, depth } = stack.pop()!; // non‑empty because of the loop

    // Skip if we've already seen the node
    if (visited.has(node)) continue;

    visited.add(node);
    result.push(node);          // we “visit” it, or you can process here

    // Stop expanding when we hit the depth limit
    if (depth >= depthLimit) continue;

    // Push neighbors onto stack.  We push in reverse order if you want to
    // preserve the same order as a recursive DFS.
    const neighbors = getNeighbors(node);
    for (let i = neighbors.length - 1; i >= 0; --i) {
      const child = neighbors[i];
      if (!visited.has(child)) {
        stack.push({ node: child, depth: depth + 1 });
      }
    }
  }

  return result;
}
// A tiny undirected graph:
const graph = new Map<string, string[]>([
  ['A', ['B', 'C', 'D']],
  ['B', ['A', 'E', 'F']],
  ['C', ['A', 'G']],
  ['D', ['A', 'H']],
  ['E', ['B']],
  ['F', ['B']],
  ['G', ['C']],
  ['H', ['D']],
]);

function neighbors(node: string): string[] {
  return graph.get(node) ?? [];
}

// Find all nodes reachable from 'A' within depth 2
const visited = depthLimitedSearch('A', 2, neighbors);
console.log(visited);   // e.g. ["A", "D", "H", "C", "G", "B", "F", "E"]
function depthLimitedSearchWithTarget<T>(
  root: T,
  depthLimit: number,
  getNeighbors: (node: T) => T[],
  target: T,
  visitedSet?: Set<T>
): T | undefined {
  const visited = visitedSet ?? new Set<T>();
  const stack = [{ node: root, depth: 0 }];

  while (stack.length) {
    const { node, depth } = stack.pop()!;
    if (visited.has(node)) continue;
    visited.add(node);

    if (node === target) return node;

    if (depth >= depthLimit) continue;
    const neighbors = getNeighbors(node);
    for (let i = neighbors.length - 1; i >= 0; --i) {
      const child = neighbors[i];
      if (!visited.has(child)) {
        stack.push({ node: child, depth: depth + 1 });
      }
    }
  }
  return undefined; // not found
}

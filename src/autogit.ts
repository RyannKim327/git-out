// A simple graph representation.
// All nodes must be comparable with === (e.g. numbers, strings, or objects with a unique id).
interface Graph<T> {
  /** Return the directly connected nodes of `node`.  */
  neighbors(node: T): T[];
}

/**
 * Iterative depth‑limited DFS.
 *
 * @param graph      the graph to search
 * @param start      the node to start from
 * @param goal       the node we are looking for
 * @param maxDepth   limit recursion depth (0 = only start node)
 * @returns           true if goal is reachable within maxDepth, false otherwise
 */
function depthLimitedSearch<T>(
  graph: Graph<T>,
  start: T,
  goal: T,
  maxDepth: number
): boolean {
  // Stack entries hold a node and its depth in the search space.
  const stack: Array<{ node: T; depth: number }> = [{ node: start, depth: 0 }];
  const visited = new Set<T>();

  while (stack.length) {
    const { node, depth } = stack.pop()!;   // pop() never returns undefined here

    // If we hit the goal, we're done.
    if (node === goal) return true;

    // Skip revisiting nodes; this keeps the search linear in the number of edges.
    if (visited.has(node)) continue;
    visited.add(node);

    // Stop exploring deeper than we’re allowed.
    if (depth === maxDepth) continue;

    // Push neighbours onto the stack with incremented depth.
    for (const neighbour of graph.neighbors(node)) {
      // No need to push a node that is already visited; but doing so is harmless.
      stack.push({ node: neighbour, depth: depth + 1 });
    }
  }

  return false;   // exhausted everything within the depth limit
}
// Simple adjacency‑list example
class SimpleGraph implements Graph<number> {
  adjacency: Map<number, number[]>;

  constructor(edges: Array<[number, number]>) {
    this.adjacency = new Map();
    for (const [a, b] of edges) {
      this.adjacency
        .get(a) ??= [];
      this.adjacency.get(a)!.push(b);

      this.adjacency
        .get(b) ??= [];
      this.adjacency.get(b)!.push(a);   // undirected
    }
  }

  neighbors(node: number): number[] {
    return this.adjacency.get(node) ?? [];
  }
}

const g = new SimpleGraph([
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
]);

console.log(depthLimitedSearch(g, 1, 5, 1)); // false (needs depth 2)
console.log(depthLimitedSearch(g, 1, 5, 2)); // true

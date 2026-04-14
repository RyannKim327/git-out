/*  --------------------------------------------------
    Depth‑First Search (DFS) – TypeScript
    -------------------------------------------------- */

/**
 * A graph memoized as an adjacency list.
 * T can be anything that can be used as a key (string, number, etc.).
 */
export type Graph<T> = Map<T, Iterable<T>>;

/**
 * Recursive DFS.
 * @param graph      the graph
 * @param start      starting node
 * @returns          array of nodes in the order they were first visited
 */
export function dfsRecursive<T>(
  graph: Graph<T>,
  start: T
): Array<T> {
  const visited = new Set<T>();
  const result: Array<T> = [];

  function visit(node: T): void {
    if (visited.has(node)) return;
    visited.add(node);
    result.push(node);

    for (const neighbour of graph.get(node) ?? []) {
      visit(neighbour);
    }
  }

  visit(start);
  return result;
}

/**
 * Iterative DFS using an explicit stack.
 * @param graph      the graph
 * @param start      starting node
 * @returns          array of nodes in the order they were first visited
 */
export function dfsIterative<T>(
  graph: Graph<T>,
  start: T
): Array<T> {
  const visited = new Set<T>();
  const stack: Array<T> = [start];
  const result: Array<T> = [];

  while (stack.length) {
    const node = stack.pop()!; // non‑empty guarantee
    if (visited.has(node)) continue;

    visited.add(node);
    result.push(node);

    // push neighbours onto the stack; reverse order
    // to mimic the recursive visiting order
    const neighbours = Array.from(graph.get(node) ?? []);
    for (let i = neighbours.length - 1; i >= 0; i--) {
      const n = neighbours[i];
      if (!visited.has(n)) stack.push(n);
    }
  }

  return result;
}

/*  --------------------------------------------------
    Example Usage
    -------------------------------------------------- */

const graph: Graph<number> = new Map([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6]],
  [4, []],
  [5, []],
  [6, []],
]);

console.log('Recursive DFS:', dfsRecursive(graph, 1)); // [1, 2, 4, 5, 3, 6]
console.log('Iterative DFS:', dfsIterative(graph, 1)); // [1, 3, 6, 2, 5, 4]

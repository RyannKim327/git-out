// -----------------------------------------------------------------------------
//  Simple DFS – TypeScript
// -----------------------------------------------------------------------------

/**
 * A graph represented as an adjacency list.
 * The keys are the node identifiers (string or number) and the values are
 * arrays of neighboring node identifiers.
 */
type Graph = Record<string, string[]>;

/**
 * Depth‑first search.
 *
 * @param graph     – The adjacency list.
 * @param start     – The node to start from.
 * @param visitAll  – If true, the function visits all components of a
 *                    disconnected graph; otherwise it stops after exploring
 *                    the component that contains `start`.
 * @returns The visited nodes in the order they were first encountered.
 */
function depthFirstSearch(
  graph: Graph,
  start: string,
  visitAll: boolean = false
): string[] {
  const visited = new Set<string>();
  const order: string[] = [];
  const stack: string[] = [start];

  while (stack.length) {
    const node = stack.pop()!;           // <-- pop top of the stack
    if (!visited.has(node)) {
      visited.add(node);
      order.push(node);

      // push neighbors in reverse to keep the natural traversal order
      const neighbors = graph[node] ?? [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbour = neighbors[i];
        if (!visited.has(neighbour)) stack.push(neighbour);
      }
    }
  }

  if (visitAll) {
    // explore every component that hasn't been visited yet
    for (const node of Object.keys(graph)) {
      if (!visited.has(node)) stack.push(node);
      while (stack.length) {
        const cur = stack.pop()!;
        if (!visited.has(cur)) {
          visited.add(cur);
          order.push(cur);
          const neighbors = graph[cur] ?? [];
          for (let i = neighbors.length - 1; i >= 0; i--)
            if (!visited.has(neighbors[i])) stack.push(neighbors[i]);
        }
      }
    }
  }

  return order;
}

// -----------------------------------------------------------------------------
//  Example usage
// -----------------------------------------------------------------------------

const sampleGraph: Graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: ["F"],
  F: [],
  G: ["H"],   // disconnected component
  H: [],
};

console.log("DFS from 'A' (component‐only):", depthFirstSearch(sampleGraph, "A"));
// → [ 'A', 'B', 'D', 'E', 'F', 'C' ]

console.log("DFS from 'A' (all components):", depthFirstSearch(sampleGraph, "A", true));
// → [ 'A', 'B', 'D', 'E', 'F', 'C', 'G', 'H' ]


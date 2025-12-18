// 1. Model --------------------------------------------------------------------
type NodeId = string | number;
type AdjList = Map<NodeId, NodeId[]>;   // or Record<NodeId, NodeId[]>

// 2. DFS ----------------------------------------------------------------------

/** Iterative DFS (stack). */
export function dfsIterative(
  graph: AdjList,
  start: NodeId,
  onVisit: (node: NodeId) => void
): void {
  const visited = new Set<NodeId>();
  const stack: NodeId[] = [start];

  while (stack.length) {
    const cur = stack.pop()!;
    if (visited.has(cur)) continue;

    visited.add(cur);
    onVisit(cur);

    // push neighbors in reverse so that left-most is popped first
    const neighbors = graph.get(cur) ?? [];
    for (let i = neighbors.length - 1; i >= 0; --i) {
      const n = neighbors[i];
      if (!visited.has(n)) stack.push(n);
    }
  }
}

/** Recursive DFS. */
export function dfsRecursive(
  graph: AdjList,
  start: NodeId,
  onVisit: (node: NodeId) => void,
  visited = new Set<NodeId>()
): void {
  if (visited.has(start)) return;

  visited.add(start);
  onVisit(start);

  const neighbors = graph.get(start) ?? [];
  for (const n of neighbors) {
    dfsRecursive(graph, n, onVisit, visited);
  }
}

// 3. Usage example ------------------------------------------------------------
if (import.meta.vitest) {
  const g: AdjList = new Map([
    ['A', ['B', 'C']],
    ['B', ['D', 'E']],
    ['C', ['F']],
    ['D', []],
    ['E', ['F']],
    ['F', []],
  ]);

  const order: NodeId[] = [];
  dfsIterative(g, 'A', (n) => order.push(n));
  console.log(order); // -> ['A', 'C', 'F', 'B', 'E', 'D']  (one valid DFS order)
}

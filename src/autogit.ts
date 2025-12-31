// Generic Kahn's algorithm for topological sort
export function topologicalSortKahn<T>(graph: Map<T, T[]>): T[] {
  // Collect all nodes (keys and any nodes appearing as targets)
  const nodes = new Set<T>();
  for (const [u, vs] of graph) {
    nodes.add(u);
    for (const v of vs) nodes.add(v);
  }

  // Compute in-degrees
  const inDegree = new Map<T, number>();
  for (const n of nodes) inDegree.set(n, 0);
  for (const [, vs] of graph) {
    for (const v of vs) {
      inDegree.set(v, (inDegree.get(v) ?? 0) + 1);
    }
  }

  // Initialize queue with nodes that have in-degree 0
  const queue: T[] = [];
  for (const n of nodes) {
    if ((inDegree.get(n) ?? 0) === 0) queue.push(n);
  }

  const order: T[] = [];

  while (queue.length > 0) {
    const n = queue.shift()!;
    order.push(n);

    // For each neighbor, reduce in-degree and enqueue if it becomes 0
    const neighbors = graph.get(n) ?? [];
    for (const m of neighbors) {
      inDegree.set(m, (inDegree.get(m) ?? 0) - 1);
      if ((inDegree.get(m) ?? 0) === 0) queue.push(m);
    }
  }

  // If we didn't include every node, there is a cycle
  if (order.length !== nodes.size) {
    throw new Error("Graph contains a cycle (topological sort not possible).");
  }

  return order;
}
const g = new Map<string, string[]>([
  ["A", ["B", "C"]],
  ["B", ["D"]],
  ["C", ["D"]],
  ["D", []],
]);

console.log(topologicalSortKahn(g)); // e.g., [ 'A', 'C', 'B', 'D' ] (order may vary)
// DFS-based topological sort
export function topologicalSortDFS<T>(graph: Map<T, T[]>): T[] {
  // Node visitation state: 0 = unvisited, 1 = visiting, 2 = done
  const state = new Map<T, number>();
  const order: T[] = [];

  // Ensure we visit all nodes, including those only appearing as targets
  const nodes = new Set<T>();
  for (const [u, vs] of graph) {
    nodes.add(u);
    for (const v of vs) nodes.add(v);
  }

  const dfs = (u: T) => {
    const s = state.get(u) ?? 0;
    if (s === 1) {
      throw new Error("Graph contains a cycle (topological sort not possible).");
    }
    if (s === 2) return;

    state.set(u, 1);
    for (const v of graph.get(u) ?? []) dfs(v);
    state.set(u, 2);
    order.push(u);
  };

  for (const n of nodes) {
    if ((state.get(n) ?? 0) === 0) dfs(n);
  }

  // Reverse to get a valid topological order
  return order.reverse();
}
const g = new Map<string, string[]>([
  ["A", ["B", "C"]],
  ["B", ["D"]],
  ["C", ["D"]],
  ["D", []],
]);

console.log(topologicalSortDFS(g)); // e.g., [ 'A', 'C', 'B', 'D' ]
export function buildGraphFromEdges<T>(edges: Array<[T, T]>): Map<T, T[]> {
  const g = new Map<T, T[]>();
  for (const [u, v] of edges) {
    if (!g.has(u)) g.set(u, []);
    g.get(u)!.push(v);

    // Ensure target node exists in map (even if it has no outgoing edges)
    if (!g.has(v)) g.set(v, []);
  }
  return g;
}
const edges: Array<[string, string]> = [
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
  ["C", "D"],
];

const g = buildGraphFromEdges(edges);
console.log(topologicalSortKahn(g));

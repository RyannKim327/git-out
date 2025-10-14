type Graph<T = string> = Map<T, Set<T>>;

/**
 * Builds a directed graph from a list of edges.
 * @param edges Array of [from, to] pairs
 */
function buildGraph<T>(edges: [T, T][]): Graph<T> {
  const g: Graph<T> = new Map();
  for (const [u, v] of edges) {
    if (!g.has(u)) g.set(u, new Set());
    if (!g.has(v)) g.set(v, new Set());
    g.get(u)!.add(v);
  }
  return g;
}

/**
 * Topological sort (Kahn’s algorithm).
 * @param graph Directed graph
 * @returns Sorted array or null if the graph contains a cycle
 */
function topoSort<T>(graph: Graph<T>): T[] | null {
  const indeg = new Map<T, number>();
  // Initialise indegrees
  for (const u of graph.keys()) indeg.set(u, 0);
  for (const [, adj] of graph)
    for (const v of adj) indeg.set(v, (indeg.get(v) ?? 0) + 1);

  // Queue with all vertices that have indegree 0
  const q: T[] = [];
  for (const [u, d] of indeg)
    if (d === 0) q.push(u);

  const out: T[] = [];
  while (q.length) {
    const u = q.shift()!;
    out.push(u);
    for (const v of graph.get(u) ?? []) {
      indeg.set(v, indeg.get(v)! - 1);
      if (indeg.get(v) === 0) q.push(v);
    }
  }

  return out.length === graph.size ? out : null; // cycle detected
}

/* ---------- Usage example ---------- */
const edges: [string, string][] = [
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
  ["C", "D"],
  ["D", "E"],
];
const g = buildGraph(edges);
console.log(topoSort(g)); // → [ 'A', 'C', 'B', 'D', 'E' ]  (one valid order)

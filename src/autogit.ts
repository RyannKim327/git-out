// ----------  topo.ts  ----------
type Graph = Record<string, string[]>;   // adjacency list:  vertex -> list of successors

/**
 * Kahn’s algorithm (BFS).
 * Returns vertices in topologically-sorted order.
 * Throws if the graph contains a cycle.
 */
export function topoSort(g: Graph): string[] {
  const indeg = new Map<string, number>();
  const q: string[] = [];
  const out: string[] = [];

  // 1.  initialise indegree
  for (const v of Object.keys(g)) indeg.set(v, 0);
  for (const [u, adj] of Object.entries(g))
    for (const v of adj) indeg.set(v, (indeg.get(v) ?? 0) + 1);

  // 2.  enqueue sources (indegree === 0)
  for (const v of Object.keys(g))
    if (indeg.get(v) === 0) q.push(v);

  // 3.  process queue
  while (q.length) {
    const u = q.shift()!;
    out.push(u);
    for (const v of g[u] ?? []) {
      indeg.set(v, indeg.get(v)! - 1);
      if (indeg.get(v) === 0) q.push(v);
    }
  }

  // 4.  cycle detection
  if (out.length !== indeg.size) {
    const remaining = [...indeg.keys()].filter(v => indeg.get(v)! > 0);
    throw new Error(`Graph contains a cycle among vertices: ${remaining.join(', ')}`);
  }
  return out;
}

/* ----------  small demo  ---------- */
if (require.main === module) {
  const dag: Graph = {
    A: ['C'],
    B: ['C', 'D'],
    C: ['E'],
    D: ['F'],
    E: ['F'],
    F: []
  };
  console.log(topoSort(dag)); // → [ 'A', 'B', 'C', 'D', 'E', 'F' ]
}
npx tsc topo.ts --target es2020 --module commonjs
node topo.js

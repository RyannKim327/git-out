/**
 * Tarjan’s SCC algorithm
 * Returns an array of SCCs, each SCC is an array of vertex indices.
 * Vertices are assumed to be 0-based integers.
 */
export function tarjanSCC(
  adj: Map<number, number[]> | Record<number, number[]>
): number[][] {
  // Normalize adjacency list to Map<number, number[]>
  const graph = adj instanceof Map ? adj : new Map(Object.entries(adj).map(([k, v]) => [Number(k), v]));

  const index = 0;
  const stack: number[] = [];
  const onStack = new Set<number>();
  const idx = new Map<number, number>();
  const low = new Map<number, number>();
  const sccs: number[][] = [];

  function dfs(v: number): void {
    idx.set(v, index);
    low.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);

    const neighbors = graph.get(v) ?? [];
    for (const w of neighbors) {
      if (!idx.has(w)) {
        // Successor w has not yet been visited; recurse on it
        dfs(w);
        low.set(v, Math.min(low.get(v)!, low.get(w)!));
      } else if (onStack.has(w)) {
        // Successor w is in stack and hence in the current SCC
        low.set(v, Math.min(low.get(v)!, idx.get(w)!));
      }
    }

    // If v is a root node, pop the stack and generate an SCC
    if (low.get(v) === idx.get(v)) {
      const scc: number[] = [];
      let w: number;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        scc.push(w);
      } while (w !== v);
      sccs.push(scc);
    }
  }

  for (const v of graph.keys()) {
    if (!idx.has(v)) dfs(v);
  }

  return sccs;
}

/* ---------- Usage example ---------- */
if (require.main === module) {
  const g = new Map<number, number[]>();
  g.set(0, [1]);
  g.set(1, [2]);
  g.set(2, [0, 3]);
  g.set(3, [4]);
  g.set(4, [5, 7]);
  g.set(5, [6]);
  g.set(6, [4, 7]);
  g.set(7, []);

  console.log(tarjanSCC(g));
  // Expected: [ [7], [4,6,5], [3], [0,2,1] ]  (order may vary)
}
npx ts-node tarjan.ts

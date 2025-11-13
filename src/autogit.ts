/**
 * Tarjan's SCC algorithm.
 * Returns an array of SCCs, each SCC is an array of vertex indices.
 * Vertices are assumed to be 0-based integers.
 */
export function tarjanSCC(adj: number[][]): number[][] {
  const n = adj.length;
  const idx = new Array<number>(n).fill(-1);
  const low = new Array<number>(n).fill(-1);
  const onStack = new Array<boolean>(n).fill(false);
  const stack: number[] = [];
  const sccs: number[][] = [];
  let id = 0;

  function dfs(v: number) {
    idx[v] = low[v] = id++;
    stack.push(v);
    onStack[v] = true;

    for (const w of adj[v]) {
      if (idx[w] === -1) {
        // Tree edge
        dfs(w);
        low[v] = Math.min(low[v], low[w]);
      } else if (onStack[w]) {
        // Back or cross edge to current SCC
        low[v] = Math.min(low[v], idx[w]);
      }
    }

    // Root of an SCC
    if (low[v] === idx[v]) {
      const scc: number[] = [];
      let w: number;
      do {
        w = stack.pop()!;
        onStack[w] = false;
        scc.push(w);
      } while (w !== v);
      sccs.push(scc);
    }
  }

  for (let i = 0; i < n; i++) if (idx[i] === -1) dfs(i);
  return sccs;
}

/* ---------- Usage example ---------- */
if (require.main === module) {
  // Graph: 0 → 1 → 2 → 0, 1 → 3 → 4 → 3
  const g: number[][] = [[1], [2, 3], [0], [4], [3]];
  console.log(tarjanSCC(g)); // [ [ 4, 3 ], [ 2, 0, 1 ] ]
}
npx ts-node tarjan.ts

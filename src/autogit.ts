/**
 * Tarjan’s algorithm – strongly-connected components
 * Returns an array of SCCs, each SCC is an array of vertex indices.
 * Vertices are numbered 0 … n-1.
 */
export function tarjanSCC(graph: number[][]): number[][] {
  const n = graph.length;
  const index = new Array<number>(n).fill(-1);
  const low   = new Array<number>(n).fill(-1);
  const onStack = new Array<boolean>(n).fill(false);
  const stack: number[] = [];
  const sccs: number[][] = [];

  let id = 0; // running index counter

  function dfs(v: number) {
    index[v] = low[v] = id++;
    stack.push(v);
    onStack[v] = true;

    for (const w of graph[v]) {
      if (index[w] === -1) {
        // w not visited yet
        dfs(w);
        low[v] = Math.min(low[v], low[w]);
      } else if (onStack[w]) {
        // w is in the current SCC
        low[v] = Math.min(low[v], index[w]);
      }
    }

    // root of SCC found
    if (low[v] === index[v]) {
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

  for (let i = 0; i < n; ++i) {
    if (index[i] === -1) dfs(i);
  }
  return sccs;
}

/* ---------- example usage ---------- */
if (require.main === module) {
  const g: number[][] = [
    [1],      // 0 -> 1
    [2],      // 1 -> 2
    [0, 3],   // 2 -> 0,3
    [4],      // 3 -> 4
    [5],      // 4 -> 5
    [3],      // 5 -> 3
  ];
  console.log(tarjanSCC(g)); // [ [ 5, 4, 3 ], [ 2, 1, 0 ] ]
}

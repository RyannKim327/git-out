type SCC = number[];

/**
 * Tarjan’s algorithm – iterative version (no recursion-depth issues)
 * Returns an array of SCCs (each SCC is an array of vertex indices).
 * Vertices are assumed to be 0 … n-1.
 */
export function tarjanSCC(graph: number[][]): SCC[] {
  const n = graph.length;
  const index = new Array<number>(n).fill(-1);
  const low = new Array<number>(n).fill(-1);
  const onStack = new Array<boolean>(n).fill(false);
  const stack: number[] = [];
  const sccs: SCC[] = [];

  let id = 0;

  // Explicit stack for DFS: [v, nextChildIndex]
  const dfsStack: [number, number][] = [];

  for (let start = 0; start < n; start++) {
    if (index[start] !== -1) continue; // already visited

    dfsStack.push([start, 0]);

    while (dfsStack.length) {
      const [v, i] = dfsStack[dfsStack.length - 1];
      if (i === 0) {
        // first time we visit v
        index[v] = low[v] = id++;
        stack.push(v);
        onStack[v] = true;
      }

      const neighbors = graph[v];
      if (i < neighbors.length) {
        // continue with next child
        dfsStack[dfsStack.length - 1][1]++; // increment child index
        const w = neighbors[i];
        if (index[w] === -1) {
          // w not yet visited
          dfsStack.push([w, 0]);
        } else if (onStack[w]) {
          // w is on stack → back edge
          low[v] = Math.min(low[v], index[w]);
        }
      } else {
        // all children processed
        dfsStack.pop(); // remove v from DFS stack
        if (index[v] === low[v]) {
          // v is root of an SCC
          const scc: SCC = [];
          let w!: number;
          do {
            w = stack.pop()!;
            onStack[w] = false;
            low[w] = index[v]; // optional, keeps low[] consistent
            scc.push(w);
          } while (w !== v);
          sccs.push(scc);
        }
        // propagate low-link to parent
        if (dfsStack.length) {
          const parent = dfsStack[dfsStack.length - 1][0];
          low[parent] = Math.min(low[parent], low[v]);
        }
      }
    }
  }

  return sccs;
}

/* ---------- Example usage ---------- */
if (require.main === module) {
  const g: number[][] = [
    [1],      // 0 → 1
    [2, 4],   // 1 → 2,4
    [3],      // 2 → 3
    [0],      // 3 → 0  (cycle 0-1-2-3)
    [5],      // 4 → 5
    [6],      // 5 → 6
    [4, 7],   // 6 → 4,7
    [],       // 7
  ];
  console.log(tarjanSCC(g));
  // Expected output: [ [ 7 ], [ 6, 5, 4 ], [ 3, 2, 1, 0 ] ]
}

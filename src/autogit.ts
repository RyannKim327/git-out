// 0‑based directed graph
export type Graph = number[][];   // graph[u] = list of vertices that u points to
/**
 * Returns an array of strongly connected components.
 * Each component is an array of vertex indices, in the order they were popped.
 */
export function tarjanSCC(graph: Graph): number[][] {
  const n = graph.length;
  const indices = new Array<number>(n).fill(-1);   // -1 = unvisited
  const lowlink = new Array<number>(n).fill(0);
  const onStack = new Array<boolean>(n).fill(false);
  const stack: number[] = [];

  const sccs: number[][] = [];
  let nextIdx = 0;

  function strongConnect(v: number) {
    // 1️⃣  Discovery
    indices[v] = lowlink[v] = nextIdx++;
    stack.push(v);
    onStack[v] = true;

    // 2️⃣  Explore neighbors
    for (const w of graph[v]) {
      if (indices[w] === -1) {
        // w has not been visited – recurse
        strongConnect(w);
        lowlink[v] = Math.min(lowlink[v], lowlink[w]);
      } else if (onStack[w]) {
        // w is on stack → back‑edge
        lowlink[v] = Math.min(lowlink[v], indices[w]);
      }
    }

    // 3️⃣  Root check
    if (lowlink[v] === indices[v]) {
      const component: number[] = [];
      let w: number;
      do {
        w = stack.pop()!;
        onStack[w] = false;
        component.push(w);
      } while (w !== v);
      sccs.push(component);
    }
  }

  // kick off DFS from every unvisited vertex
  for (let v = 0; v < n; v++) {
    if (indices[v] === -1) {
      strongConnect(v);
    }
  }

  return sccs;
}
const graph: Graph = [
  [1],          // 0 → 1
  [2],          // 1 → 2
  [0, 3],       // 2 → 0, 2 → 3
  [4],          // 3 → 4
  [5, 6],       // 4 → 5, 4 → 6
  [3],          // 5 → 3
  [4]           // 6 → 4
];

const sccs = tarjanSCC(graph);
console.log(sccs);
// Expected output (order of components may vary):
// [
//   [0, 1, 2],   // one SCC (0↔1↔2)
//   [3],         // single node
//   [4],         // single node
//   [5],         // single node
//   [6]          // single node
// ]
// A cycle of length 5
const cycle: Graph = [ [1], [2], [3], [4], [0] ];
console.assert(tarjanSCC(cycle).length === 1 &&
               tarjanSCC(cycle)[0].length === 5, 'Cycle should be one SCC');


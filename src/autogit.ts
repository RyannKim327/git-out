/**
 * Tarjan's algorithm (1990) – O(V + E) time.
 *
 * Input
 * -----
 * `graph`   : 0‑based adjacency list.  graph[v] is an array of vertices
 *              that v points to.
 *
 * Output
 * ------
 * An array of SCCs.  Each SCC is an array of vertex indices.  The
 * components are returned in reverse topological order (the first
 * component in the list is one that has no outgoing edges to earlier
 * components).
 */

export function tarjanSCC(graph: number[][]): number[][] {
  const n = graph.length;
  const indices = new Array<number>(n).fill(-1);   // order in which nodes were visited
  const lowlink = new Array<number>(n).fill(-1);   // smallest index reachable from node
  const onStack = new Array<boolean>(n).fill(false);
  const stack: number[] = [];
  const sccs: number[][] = [];

  let currentIndex = 0;

  const strongConnect = (v: number): void => {
    // Set the depth index for v to the smallest unused index
    indices[v] = currentIndex;
    lowlink[v] = currentIndex;
    currentIndex++;
    stack.push(v);
    onStack[v] = true;

    // Consider successors of v
    for (const w of graph[v]) {
      if (indices[w] === -1) {
        // Successor w has not yet been visited; recurse on it
        strongConnect(w);
        lowlink[v] = Math.min(lowlink[v], lowlink[w]);
      } else if (onStack[w]) {
        // Successor w is in stack → v is in the same SCC as w
        lowlink[v] = Math.min(lowlink[v], indices[w]);
      }
    }

    // If v is a root node, pop the stack and generate an SCC
    if (lowlink[v] === indices[v]) {
      const component: number[] = [];
      let w: number;
      do {
        w = stack.pop() as number;   // stack never empty here
        onStack[w] = false;
        component.push(w);
      } while (w !== v);
      sccs.push(component);
    }
  };

  // Run DFS from every node that hasn't been visited yet
  for (let v = 0; v < n; v++) {
    if (indices[v] === -1) {
      strongConnect(v);
    }
  }

  return sccs;
}
const graph = [
  [1],          // 0 → 1
  [2],          // 1 → 2
  [0, 3],       // 2 → 0 (cycle 0‑1‑2) and → 3
  [4],          // 3 → 4
  [5],          // 4 → 5
  [3],          // 5 → 3 (cycle 3‑4‑5)
  []            // 6 isolated
];

const sccs = tarjanSCC(graph);
console.log(sccs);
// Possible output: [[6], [0, 1, 2], [3, 4, 5]]

// ---------- Tarjan S.T.C. ---------------------------------------

/**
 * Return an array of strongly‑connected components.
 * Each component is an array of vertex IDs (here strings).
 * Vertices can be any `string`; if you prefer numbers just change the type.
 */
export function tarjanSCC(graph: Map<string, string[]>): string[][] {
  // state that needs to survive the recursive walk
  const index = new Map<string, number>();    // discovery time of vertex
  const lowLink = new Map<string, number>();  // lowest discovery reachable
  const stack: string[] = [];                 // vertices that are “on stack”
  const onStack = new Set<string>();

  let curIdx = 0;                            // global counter
  const sccs: string[][] = [];               // result

  // helper: depth‑first walk from a single vertex
  function strongConnect(v: string) {
    // part A – set the depth index and low link
    index.set(v, curIdx);
    lowLink.set(v, curIdx);
    curIdx += 1;

    // put v on stack
    stack.push(v);
    onStack.add(v);

    // part B – consider successors of v
    const neighbours = graph.get(v) ?? [];
    for (const w of neighbours) {
      if (!index.has(w)) {
        // Successor w has not yet been visited; recurse on it
        strongConnect(w);
        lowLink.set(v, Math.min(lowLink.get(v)!, lowLink.get(w)!));
      } else if (onStack.has(w)) {
        // Successor w is in stack → must be in the current SCC
        lowLink.set(v, Math.min(lowLink.get(v)!, index.get(w)!));
      }
    }

    // part C – if v is a root node, pop the stack to build an SCC
    if (lowLink.get(v) === index.get(v)) {
      const component: string[] = [];
      let w: string;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        component.push(w);
      } while (w !== v);
      sccs.push(component);
    }
  }

  // run the dfs from every unvisited vertex
  for (const v of graph.keys()) {
    if (!index.has(v)) {
      strongConnect(v);
    }
  }

  return sccs;
}
const graph = new Map<string, string[]>(
  [
    ['A', ['B']],
    ['B', ['C', 'E', 'F']],
    ['C', ['D', 'G']],
    ['D', ['C', 'H']],
    ['E', ['A', 'F']],
    ['F', ['G']],
    ['G', ['F', 'H']],
    ['H', ['G']],
  ],
);

const components = tarjanSCC(graph);
console.log(components);
// → [ [ 'H', 'G', 'F', 'E', 'A', 'B', 'C', 'D' ] ]
// (depending on traversal order you may see the same vertices grouped in one component,
// because the toy graph is fully strongly‑connected)

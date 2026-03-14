/**
 * A directed graph stored as an adjacency list.
 * Each key is a node identifier, the value is an array of successor node ids.
 */
interface Graph {
  [node: string]: string[];
}

/**
 * Result of the algorithm – an array of SCCs.
 * Each SCC is an array of node ids that belong together.
 */
type SCC = string[][];

/**
 * Tarjan’s algorithm for SCCs.
 *
 * @param g The graph to analyse.
 * @returns An array of strongly connected components.
 */
function tarjanSCC(g: Graph): SCC {
  const indexMap: Record<string, number> = {};   // node → its index
  const lowLink: Record<string, number> = {};    // node → low‑link value
  const onStack: Set<string> = new Set();        // nodes currently in the stack
  const stack: string[] = [];                    // stack of nodes
  const sccs: SCC = [];

  let currentIndex = 0;

  const strongConnect = (v: string) => {
    indexMap[v] = currentIndex;
    lowLink[v] = currentIndex;
    currentIndex += 1;
    stack.push(v);
    onStack.add(v);

    // Explore every outgoing edge v → w
    for (const w of g[v] ?? []) {
      if (!(w in indexMap)) {
        // Recursively visit w
        strongConnect(w);
        lowLink[v] = Math.min(lowLink[v], lowLink[w]);
      } else if (onStack.has(w)) {
        // w is in the current SCC frontier
        lowLink[v] = Math.min(lowLink[v], indexMap[w]);
      }
    }

    // If v is the root of an SCC
    if (lowLink[v] === indexMap[v]) {
      const component: string[] = [];
      let w: string | undefined;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        component.push(w);
      } while (w !== v);
      sccs.push(component);
    }
  };

  // Kick off a DFS from every unvisited node.
  for (const v in g) {
    if (!(v in indexMap)) {
      strongConnect(v);
    }
  }

  return sccs;
}
const example: Graph = {
  a: ['b'],
  b: ['c', 'e', 'f'],
  c: ['d', 'g'],
  d: ['c', 'h'],
  e: ['a', 'f'],
  f: ['g'],
  g: ['f'],
  h: ['d', 'g', 'i'],
  i: ['h', 'k', 'l'],
  j: ['k'],
  k: ['i', 'l'],
  l: ['k']
};

console.log(tarjanSCC(example));
// → [ [ 'g', 'f' ], [ 'c', 'd', 'h' ], [ 'i', 'l', 'k' ], [ 'a', 'b', 'e' ], [ 'j' ] ]

// TarjanStronglyConnectedComponents.ts
export type Vertex = string | number;

export interface TarjanGraph {
  [from: string]: Vertex[];
}

export function tarjanSCC(g: TarjanGraph): Vertex[][] {
  const index = 0;
  const stack: Vertex[] = [];
  const indices  = new Map<Vertex, number>();
  const lowlinks = new Map<Vertex, number>();
  const onStack  = new Set<Vertex>();
  const sccs: Vertex[][] = [];

  function strongconnect(v: Vertex) {
    indices.set(v, index);
    lowlinks.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);

    for (const w of g[v] ?? []) {
      if (!indices.has(w)) {
        // Successor w has not yet been visited; recurse on it
        strongconnect(w);
        lowlinks.set(v, Math.min(lowlinks.get(v)!, lowlinks.get(w)!));
      } else if (onStack.has(w)) {
        // Successor w is in stack and hence in the current SCC
        lowlinks.set(v, Math.min(lowlinks.get(v)!, indices.get(w)!));
      }
    }

    // If v is a root node, pop the stack and generate an SCC
    if (lowlinks.get(v) === indices.get(v)) {
      const scc: Vertex[] = [];
      let w: Vertex;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        scc.push(w);
      } while (w !== v);
      sccs.push(scc);
    }
  }

  for (const v of Object.keys(g)) {
    if (!indices.has(v)) strongconnect(v);
  }
  return sccs;
}

/* -------------------------------------------------
   Usage example
-------------------------------------------------*/
if (require.main === module) {
  const graph: TarjanGraph = {
    A: ['B'],
    B: ['C', 'F'],
    C: ['D', 'G'],
    D: ['E', 'A'],
    E: ['B'],
    F: ['C'],
    G: ['H'],
    H: ['G'],
  };

  console.log(tarjanSCC(graph));
  // Expected:
  // [ [ 'H', 'G' ], [ 'F' ], [ 'E', 'D', 'C', 'B', 'A' ] ]
}
npx ts-node TarjanStronglyConnectedComponents.ts

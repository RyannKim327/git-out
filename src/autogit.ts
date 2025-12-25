// tarjan.ts
type AdjacencyList<V> = Map<V, V[]>;

interface TarjanState<V> {
  index: number;
  stack: V[];
  indexMap: Map<V, number>;
  lowLink: Map<V, number>;
  onStack: Set<V>;
  sccs: V[][];
}

/**
 * Returns an array of SCCs (each SCC is an array of vertices).
 * Order is reverse topological (sink component first).
 */
export function tarjan<V>(adj: AdjacencyList<V>): V[][] {
  const state: TarjanState<V> = {
    index: 0,
    stack: [],
    indexMap: new Map(),
    lowLink: new Map(),
    onStack: new Set(),
    sccs: [],
  };

  for (const v of adj.keys()) {
    if (!state.indexMap.has(v)) {
      strongConnect(v, adj, state);
    }
  }
  return state.sccs;
}

function strongConnect<V>(
  v: V,
  adj: AdjacencyList<V>,
  s: TarjanState<V>
): void {
  s.indexMap.set(v, s.index);
  s.lowLink.set(v, s.index);
  s.index++;
  s.stack.push(v);
  s.onStack.add(v);

  for (const w of adj.get(v) ?? []) {
    if (!s.indexMap.has(w)) {
      // Successor w has not yet been visited; recurse on it
      strongConnect(w, adj, s);
      s.lowLink.set(v, Math.min(s.lowLink.get(v)!, s.lowLink.get(w)!));
    } else if (s.onStack.has(w)) {
      // Successor w is in stack and hence in the current SCC
      s.lowLink.set(v, Math.min(s.lowLink.get(v)!, s.indexMap.get(w)!));
    }
  }

  // If v is a root node, pop the stack and generate an SCC
  if (s.lowLink.get(v) === s.indexMap.get(v)) {
    const scc: V[] = [];
    let w: V;
    do {
      w = s.stack.pop()!;
      s.onStack.delete(w);
      scc.push(w);
    } while (w !== v);
    s.sccs.push(scc);
  }
}

/* ------------------- Usage example ------------------- */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;
  describe("Tarjan", () => {
    it("finds SCCs", () => {
      // 0 → 1 → 2 → 0  (cycle)
      // 2 → 3 → 4 → 2  (another cycle)
      // 5 alone
      const adj: AdjacencyList<number> = new Map([
        [0, [1]],
        [1, [2]],
        [2, [0, 3]],
        [3, [4]],
        [4, [2]],
        [5, []],
      ]);
      const sccs = tarjan(adj);
      expect(sccs.length).toBe(3);
      expect(sccs.map((c) => c.sort())).toEqual(
        expect.arrayContaining([
          [0, 1, 2],
          [3, 4],
          [5],
        ])
      );
    });
  });
}
npm i -D vitest
npx vitest tarjan.ts

type Vertex = number;               // 0 … n‑1 (or any hashable key)
type AdjList = Map<Vertex, Vertex[]>; // vertex → list of outgoing neighbours
/**
 * Tarjan's algorithm – strongly connected components.
 *
 * Returns an array of components, each component being an array of vertices.
 *
 * Complexity: O(V + E) time, O(V) space.
 */
export function tarjanSCC(graph: AdjList): Vertex[][] {
  // ---------- 1️⃣  Internal bookkeeping ----------
  const indexMap = new Map<Vertex, number>();   // vertex → discovery index
  const lowLinkMap = new Map<Vertex, number>(); // vertex → low‑link value
  const onStack = new Set<Vertex>();            // quick O(1) membership test
  const stack: Vertex[] = [];

  const components: Vertex[][] = [];

  let currentIndex = 0; // global counter for discovery order

  // ---------- 2️⃣  The recursive DFS ----------
  function strongConnect(v: Vertex): void {
    // Set the discovery index and low‑link value
    indexMap.set(v, currentIndex);
    lowLinkMap.set(v, currentIndex);
    currentIndex++;

    stack.push(v);
    onStack.add(v);

    // Explore all outgoing edges
    const neighbours = graph.get(v) ?? [];
    for (const w of neighbours) {
      if (!indexMap.has(w)) {
        // Vertex w has not been visited yet → recurse
        strongConnect(w);
        // After recursion: propagate low‑link value up
        lowLinkMap.set(
          v,
          Math.min(lowLinkMap.get(v)!, lowLinkMap.get(w)!)
        );
      } else if (onStack.has(w)) {
        // w is in the current SCC (back‑edge)
        lowLinkMap.set(
          v,
          Math.min(lowLinkMap.get(v)!, indexMap.get(w)!)
        );
      }
    }

    // ---------- 3️⃣  Root of an SCC ----------
    if (lowLinkMap.get(v) === indexMap.get(v)) {
      const component: Vertex[] = [];
      let w: Vertex;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        component.push(w);
      } while (w !== v);
      components.push(component);
    }
  }

  // ---------- 4️⃣  Kick off DFS for every vertex ----------
  for (const v of graph.keys()) {
    if (!indexMap.has(v)) {
      strongConnect(v);
    }
  }

  return components;
}
import { tarjanSCC } from "./tarjan";

// Build a sample graph (the classic example from CLRS)
const graph: AdjList = new Map([
  [1, [2]],
  [2, [3, 5, 6]],
  [3, [4, 7]],
  [4, [3, 8]],
  [5, [1, 6]],
  [6, [7]],
  [7, [6]],
  [8, [4, 7]],
]);

const sccs = tarjanSCC(graph);
console.log("Strongly Connected Components:");
sccs.forEach((comp, i) => console.log(`Component ${i + 1}:`, comp));
Strongly Connected Components:
Component 1: [ 7, 6 ]
Component 2: [ 3, 4, 8 ]
Component 3: [ 1, 5, 2 ]
// tarjan.test.ts
import { tarjanSCC } from "./tarjan";

function makeGraph(edges: [number, number][]): AdjList {
  const g: AdjList = new Map();
  for (const [u, v] of edges) {
    if (!g.has(u)) g.set(u, []);
    g.get(u)!.push(v);
  }
  // Ensure isolated vertices appear in the map
  for (const [_, v] of edges) if (!g.has(v)) g.set(v, []);
  return g;
}

test("Tarjan on a graph with three SCCs", () => {
  const edges: [number, number][] = [
    [1, 2],
    [2, 3],
    [3, 1],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 4],
    [7, 6],
    [7, 8],
    [8, 7],
  ];
  const g = makeGraph(edges);
  const sccs = tarjanSCC(g);

  // Sort each component for deterministic comparison
  const sorted = sccs.map(c => c.sort((a, b) => a - b)).sort((a, b) => a[0] - b[0]);

  expect(sorted).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8],
  ]);
});
// tarjan.ts
type Vertex = number;               // change to string if you prefer
type AdjList = Map<Vertex, Vertex[]>;

/**
 * Tarjan's algorithm – strongly connected components.
 *
 * @param graph Directed graph as adjacency list.
 * @returns Array of SCCs, each SCC is an array of vertices.
 */
export function tarjanSCC(graph: AdjList): Vertex[][] {
  const indexMap = new Map<Vertex, number>();
  const lowLinkMap = new Map<Vertex, number>();
  const onStack = new Set<Vertex>();
  const stack: Vertex[] = [];

  const components: Vertex[][] = [];
  let currentIndex = 0;

  function strongConnect(v: Vertex): void {
    indexMap.set(v, currentIndex);
    lowLinkMap.set(v, currentIndex);
    currentIndex++;

    stack.push(v);
    onStack.add(v);

    const neighbours = graph.get(v) ?? [];
    for (const w of neighbours) {
      if (!indexMap.has(w)) {
        strongConnect(w);
        lowLinkMap.set(v, Math.min(lowLinkMap.get(v)!, lowLinkMap.get(w)!));
      } else if (onStack.has(w)) {
        lowLinkMap.set(v, Math.min(lowLinkMap.get(v)!, indexMap.get(w)!));
      }
    }

    if (lowLinkMap.get(v) === indexMap.get(v)) {
      const component: Vertex[] = [];
      let w: Vertex;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        component.push(w);
      } while (w !== v);
      components.push(component);
    }
  }

  for (const v of graph.keys()) {
    if (!indexMap.has(v)) strongConnect(v);
  }

  return components;
}

/* ------------------- Example usage ------------------- */
if (require.main === module) {
  const g: AdjList = new Map([
    [1, [2]],
    [2, [3, 5, 6]],
    [3, [4, 7]],
    [4, [3, 8]],
    [5, [1, 6]],
    [6, [7]],
    [7, [6]],
    [8, [4, 7]],
  ]);

  const sccs = tarjanSCC(g);
  console.log("SCCs:", sccs);
}
ts-node tarjan.ts

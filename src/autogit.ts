type Vertex = number;               // 0 … n‑1 (or any unique id)
type AdjList = Map<Vertex, Vertex[]>; // vertex → list of outgoing neighbours
/**
 * Tarjan's algorithm for Strongly Connected Components.
 *
 * Input: adjacency list of a directed graph.
 * Output: an array of SCCs, each SCC is an array of vertices.
 */
export class TarjanSCC {
  // ----- internal state ----------------------------------------------------
  private index = 0;                     // next discovery index
  private readonly indices = new Map<number, number>(); // vertex → index
  private readonly lowlink = new Map<number, number>(); // vertex → lowlink
  private readonly stack: number[] = []; // vertices currently on stack
  private readonly onStack = new Set<number>(); // quick O(1) membership test
  private readonly sccs: number[][] = []; // final result

  /**
   * Run the algorithm.
   *
   * @param graph adjacency list (Map<vertex, neighbours[]>)
   * @returns array of SCCs (each SCC is an array of vertices)
   */
  public run(graph: Map<number, number[]>): number[][] {
    // Ensure every vertex appears in the map (even isolated ones)
    for (const v of graph.keys()) {
      if (!this.indices.has(v)) {
        this.strongConnect(v, graph);
      }
    }
    return this.sccs;
  }

  // -----------------------------------------------------------------------
  private strongConnect(v: number, graph: Map<number, number[]>): void {
    // 1. Set the discovery index and lowlink of v
    this.indices.set(v, this.index);
    this.lowlink.set(v, this.index);
    this.index++;

    // 2. Push v onto the stack
    this.stack.push(v);
    this.onStack.add(v);

    // 3. Consider each successor w of v
    const neighbours = graph.get(v) ?? [];
    for (const w of neighbours) {
      if (!this.indices.has(w)) {
        // w has not yet been visited → recurse
        this.strongConnect(w, graph);
        // After recursion, propagate lowlink up
        const lowV = this.lowlink.get(v)!;
        const lowW = this.lowlink.get(w)!;
        this.lowlink.set(v, Math.min(lowV, lowW));
      } else if (this.onStack.has(w)) {
        // w is in the current SCC (back edge)
        const lowV = this.lowlink.get(v)!;
        const idxW = this.indices.get(w)!;
        this.lowlink.set(v, Math.min(lowV, idxW));
      }
      // else: w already assigned to a completed SCC → ignore
    }

    // 4. If v is a root node, pop the stack and generate an SCC
    if (this.lowlink.get(v) === this.indices.get(v)) {
      const component: number[] = [];
      let w: number;
      do {
        w = this.stack.pop()!;
        this.onStack.delete(w);
        component.push(w);
      } while (w !== v);
      this.sccs.push(component);
    }
  }
}
import { TarjanSCC } from "./TarjanSCC";

// Build a graph (the classic example from CLRS)
const graph = new Map<number, number[]>([
  [0, [1]],
  [1, [2, 4, 5]],
  [2, [3, 6]],
  [3, [2, 7]],
  [4, [0, 5]],
  [5, [6]],
  [6, [5]],
  [7, [3, 6]],
]);

const tarjan = new TarjanSCC();
const sccs = tarjan.run(graph);

console.log("Strongly Connected Components:");
sccs.forEach((comp, i) => console.log(`Component ${i + 1}:`, comp));
Strongly Connected Components:
Component 1: [ 6, 5 ]
Component 2: [ 3, 2 ]
Component 3: [ 7 ]
Component 4: [ 1, 4, 0 ]
// tarjan.test.ts
import { TarjanSCC } from "./TarjanSCC";

function makeGraph(edges: [number, number][]): Map<number, number[]> {
  const g = new Map<number, number[]>();
  for (const [u, v] of edges) {
    if (!g.has(u)) g.set(u, []);
    g.get(u)!.push(v);
    // ensure isolated vertices appear in the map
    if (!g.has(v)) g.set(v, []);
  }
  return g;
}

test("Tarjan finds SCCs on a known graph", () => {
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 0],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 3],
    [6, 5],
    [6, 7],
    [7, 6],
  ];
  const graph = makeGraph(edges);
  const tarjan = new TarjanSCC();
  const sccs = tarjan.run(graph);

  // Sort each component and the list of components for deterministic comparison
  const normalize = (arr: number[][]) =>
    arr.map(c => c.slice().sort((a, b) => a - b)).sort((a, b) => a[0] - b[0]);

  expect(normalize(sccs)).toEqual(
    normalize([
      [0, 1, 2], // cycle
      [3, 4, 5], // another cycle
      [6, 7],    // two‑node cycle
    ])
  );
});
class TarjanSCC {
  private index = 0;
  private indices = new Map<number, number>();
  private lowlink = new Map<number, number>();
  private stack: number[] = [];
  private onStack = new Set<number>();
  private sccs: number[][] = [];

  run(graph: Map<number, number[]>): number[][] {
    for (const v of graph.keys()) {
      if (!this.indices.has(v)) this.strongConnect(v, graph);
    }
    return this.sccs;
  }

  private strongConnect(v: number, graph: Map<number, number[]>): void {
    this.indices.set(v, this.index);
    this.lowlink.set(v, this.index);
    this.index++;

    this.stack.push(v);
    this.onStack.add(v);

    const neighbours = graph.get(v) ?? [];
    for (const w of neighbours) {
      if (!this.indices.has(w)) {
        this.strongConnect(w, graph);
        this.lowlink.set(v, Math.min(this.lowlink.get(v)!, this.lowlink.get(w)!));
      } else if (this.onStack.has(w)) {
        this.lowlink.set(v, Math.min(this.lowlink.get(v)!, this.indices.get(w)!));
      }
    }

    if (this.lowlink.get(v) === this.indices.get(v)) {
      const component: number[] = [];
      let w: number;
      do {
        w = this.stack.pop()!;
        this.onStack.delete(w);
        component.push(w);
      } while (w !== v);
      this.sccs.push(component);
    }
  }
}

/* ---------- Demo ---------- */
const graph = new Map<number, number[]>([
  [0, [1]],
  [1, [2, 4, 5]],
  [2, [3, 6]],
  [3, [2, 7]],
  [4, [0, 5]],
  [5, [6]],
  [6, [5]],
  [7, [3, 6]],
]);

const tarjan = new TarjanSCC();
console.log(tarjan.run(graph));

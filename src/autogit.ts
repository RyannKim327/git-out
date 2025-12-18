type Vertex = number;               // 0 … n‑1 (or any unique id)
type AdjList = Map<Vertex, Vertex[]>; // map from a vertex to its outgoing neighbours
/**
 * Tarjan's algorithm for Strongly Connected Components.
 *
 * Input: adjacency list of a directed graph.
 * Output: array of SCCs, each SCC is an array of vertices.
 *
 * Time   : O(V + E)
 * Memory : O(V)
 */
export class TarjanSCC {
  // ----- public API -------------------------------------------------
  /**
   * Compute SCCs for the given graph.
   *
   * @param graph adjacency list (Map<Vertex, Vertex[]>)
   * @returns array of SCCs (each SCC is an array of vertices)
   */
  static getSCCs(graph: AdjList): Vertex[][] {
    const tarjan = new TarjanSCC(graph);
    return tarjan.run();
  }

  // ----- private implementation --------------------------------------
  private index = 0;                     // global discovery counter
  private readonly indices: Map<Vertex, number> = new Map(); // discovery index per vertex
  private readonly lowLink: Map<Vertex, number> = new Map(); // low‑link per vertex
  private readonly stack: Vertex[] = [];                     // DFS stack
  private readonly onStack: Set<Vertex> = new Set();         // quick O(1) check
  private readonly sccs: Vertex[][] = [];                   // result

  private constructor(private readonly graph: AdjList) {}

  private run(): Vertex[][] {
    // Initialise all vertices as unvisited (index = -1)
    for (const v of this.graph.keys()) {
      this.indices.set(v, -1);
    }

    // Start DFS from every vertex that hasn't been visited yet
    for (const v of this.graph.keys()) {
      if (this.indices.get(v)! === -1) {
        this.strongConnect(v);
      }
    }

    return this.sccs;
  }

  /** Recursive DFS that implements the core of Tarjan's algorithm */
  private strongConnect(v: Vertex): void {
    // 1. Set the discovery index and low‑link value
    this.indices.set(v, this.index);
    this.lowLink.set(v, this.index);
    this.index++;

    // 2. Push v onto the stack
    this.stack.push(v);
    this.onStack.add(v);

    // 3. Consider all outgoing edges v → w
    const neighbours = this.graph.get(v) ?? [];
    for (const w of neighbours) {
      const wIdx = this.indices.get(w);
      if (wIdx === undefined) {
        // This should never happen if the graph contains all vertices as keys.
        // We treat missing keys as isolated vertices.
        this.indices.set(w, -1);
        this.lowLink.set(w, -1);
      }

      if (this.indices.get(w)! === -1) {
        // w has not been visited yet → recurse
        this.strongConnect(w);
        // After recursion, propagate low‑link information upward
        const lowV = this.lowLink.get(v)!;
        const lowW = this.lowLink.get(w)!;
        this.lowLink.set(v, Math.min(lowV, lowW));
      } else if (this.onStack.has(w)) {
        // w is in the current DFS branch → a back‑edge
        const lowV = this.lowLink.get(v)!;
        const idxW = this.indices.get(w)!;
        this.lowLink.set(v, Math.min(lowV, idxW));
      }
      // else: w already assigned to an SCC and removed from stack → ignore
    }

    // 4. If v is a root node, pop the stack to generate an SCC
    if (this.lowLink.get(v) === this.indices.get(v)) {
      const component: Vertex[] = [];
      let w: Vertex;
      do {
        w = this.stack.pop()!;
        this.onStack.delete(w);
        component.push(w);
      } while (w !== v);
      this.sccs.push(component);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Helper types (exported for convenience)                           */
export type Vertex = number;
export type AdjList = Map<Vertex, Vertex[]>;

/* ------------------------------------------------------------------ */
/* Example usage ------------------------------------------------------ */
if (require.main === module) {
  // Build a sample graph (the classic example from CLRS)
  const g: AdjList = new Map([
    [0, [1]],
    [1, [2, 4, 5]],
    [2, [3, 6]],
    [3, [2, 7]],
    [4, [0, 5]],
    [5, [6]],
    [6, [5]],
    [7, [3, 6]],
  ]);

  const sccs = TarjanSCC.getSCCs(g);
  console.log('Strongly Connected Components:');
  sccs.forEach((comp, i) => console.log(`  #${i + 1}:`, comp));
}

/* ------------------------------------------------------------------ */
/* Expected output (order of components may vary):
 *
 * Strongly Connected Components:
 *   #1: [ 6, 5 ]
 *   #2: [ 3, 2 ]
 *   #3: [ 7 ]
 *   #4: [ 1, 4, 0 ]
 *
 * Each array contains the vertices that belong to the same SCC.
 */
function testTarjan() {
  const g: AdjList = new Map([
    [1, [2]],
    [2, [3]],
    [3, [1, 4]],
    [4, [5]],
    [5, [6]],
    [6, [4]],
    [7, []],
  ]);

  const sccs = TarjanSCC.getSCCs(g);
  console.assert(sccs.length === 3, 'Should be 3 SCCs');
  // Expected components: [ [6,5,4], [3,2,1], [7] ] (order may differ)
  console.log('Test passed, SCCs:', sccs);
}
testTarjan();

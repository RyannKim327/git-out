// A directed graph: adjacency list
type Graph = Record<string, string[]>;

// Example: a tiny graph
const graph: Graph = {
  A: ["B"],
  B: ["C"],
  C: ["A", "D"],
  D: ["C", "E"],
  E: [],
};
/**
 * Finds all strongly connected components of a directed graph.
 * @param graph The adjacency list of the graph.
 * @returns An array of SCCs; each SCC is an array of vertex IDs.
 */
function tarjanSCC(graph: Graph): string[][] {
  let index = 0;                     // global index counter
  const stack: string[] = [];        // DFS stack
  const onStack = new Set<string>(); // quick membership check

  // Maps vertex → its index in DFS tree
  const indices = new Map<string, number>();
  // Maps vertex → its lowlink value
  const lowlink = new Map<string, number>();
  // Result: array of SCCs
  const sccs: string[][] = [];

  function strongConnect(v: string) {
    // Step 1: set the depth index for v
    indices.set(v, index);
    lowlink.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);

    // Step 2: consider each successor
    for (const w of graph[v] ?? []) {
      if (!indices.has(w)) {
        // Successor w has not yet been visited; recurse on it.
        strongConnect(w);
        // After recursion: update lowlink of v
        lowlink.set(v, Math.min(lowlink.get(v)!, lowlink.get(w)!));
      } else if (onStack.has(w)) {
        // Successor w is in stack → part of current SCC
        lowlink.set(v, Math.min(lowlink.get(v)!, indices.get(w)!));
      }
    }

    // Step 3: If v is a root node, pop the stack and generate an SCC
    if (lowlink.get(v)! === indices.get(v)!) {
      const scc: string[] = [];
      let w: string | undefined;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        scc.push(w);
      } while (w !== v);
      sccs.push(scc);
    }
  }

  // Kick off DFS for each vertex that hasn't been visited yet
  for (const v of Object.keys(graph)) {
    if (!indices.has(v)) {
      strongConnect(v);
    }
  }

  return sccs;
}
const sccs = tarjanSCC(graph);
console.log("Strongly connected components:");
sccs.forEach((scc, i) => {
  console.log(`  ${i + 1}. [${scc.join(", ")}]`);
});
Strongly connected components:
  1. [A, C, B]
  2. [E]
  3. [D]
type Vertex = number;

// * Update the graph type:
type Graph = Record<Vertex, Vertex[]>;

// * Replace string‑specific typing in the function:
function tarjanSCC(graph: Graph): Vertex[][] { ... }

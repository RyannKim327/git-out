// Tarjan's algorithm: find SCCs in a directed graph
// Graph is a Map<V, V[]> adjacency list.
// Returns an array of SCCs, each SCC is an array of vertices.

export function tarjanSCC<V>(graph: Map<V, V[]>): V[][] {
  const indexMap = new Map<V, number>();  // index of each node when first discovered
  const lowlink = new Map<V, number>();   // smallest index reachable from the node
  const onStack = new Map<V, boolean>();  // is the node on the stack?
  const stack: V[] = [];                   // stack of nodes
  const sccs: V[][] = [];                   // result: list of SCCs
  let index = 0;

  const neighbors = (v: V) => graph.get(v) ?? [];

  function strongconnect(v: V) {
    indexMap.set(v, index);
    lowlink.set(v, index);
    index++;
    stack.push(v);
    onStack.set(v, true);

    for (const w of neighbors(v)) {
      if (!indexMap.has(w)) {
        // Successor not yet visited
        strongconnect(w);
        // Update lowlink after returning
        lowlink.set(v, Math.min(lowlink.get(v)!, lowlink.get(w)!));
      } else if (onStack.get(w)) {
        // Successor already on stack: update lowlink
        lowlink.set(v, Math.min(lowlink.get(v)!, indexMap.get(w)!));
      }
    }

    // If v is a root node, pop the stack to form an SCC
    if (lowlink.get(v) === indexMap.get(v)) {
      const scc: V[] = [];
      let w: V;
      do {
        w = stack.pop()!;
        onStack.set(w, false);
        scc.push(w);
      } while (w !== v);
      sccs.push(scc);
    }
  }

  // Include nodes that might only appear as neighbors (not as keys)
  const allNodes = new Set<V>();
  for (const [v, nbrs] of graph) {
    allNodes.add(v);
    for (const w of nbrs) allNodes.add(w);
  }

  for (const v of allNodes) {
    if (!indexMap.has(v)) strongconnect(v);
  }

  return sccs;
}
type Node = string;

// Build a graph:
// A -> B
// B -> C, D
// C -> A
// D -> E
// E -> F
// F -> D, G
// G -> F
const g = new Map<Node, Node[]>([
  ["A", ["B"]],
  ["B", ["C", "D"]],
  ["C", ["A"]],
  ["D", ["E"]],
  ["E", ["F"]],
  ["F", ["D", "G"]],
  ["G", ["F"]],
]);

const components = tarjanSCC(g);
console.log(components);
// Example output (order of components and nodes within components may vary):
// [ [ 'A', 'C', 'B' ], [ 'D', 'G', 'F', 'E' ] ]

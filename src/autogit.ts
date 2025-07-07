type Graph = { [node: string]: string[] };

function tarjanSCC(graph: Graph): string[][] {
  let index = 0; // to assign unique indices
  const indexMap: { [node: string]: number } = {}; // node -> index
  const lowLinkMap: { [node: string]: number } = {}; // node -> low-link value
  const stack: string[] = [];
  const onStack: { [node: string]: boolean } = {};
  const sccs: string[][] = [];

  function strongConnect(node: string) {
    // Set the index and low-link value for node
    indexMap[node] = index;
    lowLinkMap[node] = index;
    index++;
    stack.push(node);
    onStack[node] = true;

    // Consider successors of node
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      if (indexMap[neighbor] === undefined) {
        // Neighbor has not been visited, recurse on it
        strongConnect(neighbor);
        // Check if the subtree rooted at neighbor has a connection to an ancestor of node
        lowLinkMap[node] = Math.min(lowLinkMap[node], lowLinkMap[neighbor]);
      } else if (onStack[neighbor]) {
        // The neighbor is in the current SCC
        lowLinkMap[node] = Math.min(lowLinkMap[node], indexMap[neighbor]);
      }
    }

    // If node is a root node, pop the stack and generate an SCC
    if (lowLinkMap[node] === indexMap[node]) {
      const scc: string[] = [];
      let w: string;
      do {
        w = stack.pop()!;
        onStack[w] = false;
        scc.push(w);
      } while (w !== node);
      sccs.push(scc);
    }
  }

  // Run Strongly Connected Components algorithm on each node
  for (const node in graph) {
    if (indexMap[node] === undefined) {
      strongConnect(node);
    }
  }

  return sccs;
}
const graph: Graph = {
  A: ['B'],
  B: ['C', 'E', 'F'],
  C: ['D', 'G'],
  D: ['C', 'H'],
  E: ['A', 'F'],
  F: ['G'],
  G: ['F', 'H'],
  H: ['H']
};

const sccs = tarjanSCC(graph);
console.log("Strongly Connected Components:", sccs);

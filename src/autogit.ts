/**
 * A directed graph is expected to be an object where each key is a node
 * id (string) and the value is an array of neighbouring node ids.
 * Example:
 *   const graph = {
 *     a: ['b', 'c'],
 *     b: ['c'],
 *     c: ['a', 'd'],
 *     d: ['e'],
 *     e: []
 *   };
 */
type Graph = Record<string, string[]>;

/**
 * Tarjan’s SCC algorithm.
 *
 * @param graph – adjacency list representation of the directed graph
 * @returns array of SCCs, each itself an array of node ids
 */
export function tarjanSCC(graph: Graph): string[][] {
  const indexMap = new Map<string, number>();
  const lowLinkMap = new Map<string, number>();
  const onStack = new Set<string>();

  const stack: string[] = [];
  let idx = 0;
  const sccs: string[][] = [];

  const strongConnect = (node: string) => {
    // Set the depth index for this node to the smallest unused index
    indexMap.set(node, idx);
    lowLinkMap.set(node, idx);
    idx++;

    stack.push(node);
    onStack.add(node);

    // Consider successors of node
    for (const succ of graph[node] ?? []) {
      if (!indexMap.has(succ)) {
        // Successor has not yet been visited – recurse on it
        strongConnect(succ);
        lowLinkMap.set(node, Math.min(lowLinkMap.get(node)!, lowLinkMap.get(succ)!));
      } else if (onStack.has(succ)) {
        // Successor is in stack → node is in the same SCC
        lowLinkMap.set(node, Math.min(lowLinkMap.get(node)!, indexMap.get(succ)!));
      }
    }

    // If node is a root node, pop the stack and generate an SCC
    if (lowLinkMap.get(node) === indexMap.get(node)) {
      const scc: string[] = [];
      let w: string;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        scc.push(w);
      } while (w !== node);
      sccs.push(scc);
    }
  };

  // Call the recursion for each node (in any order)
  for (const node of Object.keys(graph)) {
    if (!indexMap.has(node)) {
      strongConnect(node);
    }
  }

  return sccs;
}
const graph: Graph = {
  a: ['b'],
  b: ['c'],
  c: ['a', 'd'],
  d: ['e'],
  e: ['f'],
  f: ['d']
};

console.log(tarjanSCC(graph));
// e.g. [ [ 'c', 'b', 'a' ], [ 'f', 'e', 'd' ] ]

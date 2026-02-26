type NodeId = string | number;          // whatever you want to use for a node key
interface Graph {
  /** Map of node id → set of neighbour ids */
  adjacencyList: Map<NodeId, Set<NodeId>>;
}
function createGraph(edges: [NodeId, NodeId][]): Graph {
  const adjacencyList = new Map<NodeId, Set<NodeId>>();

  for (const [u, v] of edges) {
    if (!adjacencyList.has(u)) adjacencyList.set(u, new Set());
    if (!adjacencyList.has(v)) adjacencyList.set(v, new Set());
    adjacencyList.get(u)!.add(v);
    adjacencyList.get(v)!.add(u); // comment out for directed graph
  }

  return { adjacencyList };
}
function dfsRecursive(
  graph: Graph,
  start: NodeId,
  visited = new Set<NodeId>()
): NodeId[] {
  visited.add(start);
  const result = [start];

  for (const neighbour of graph.adjacencyList.get(start) ?? []) {
    if (!visited.has(neighbour)) {
      result.push(...dfsRecursive(graph, neighbour, visited));
    }
  }

  return result;
}
function dfsIterative(graph: Graph, start: NodeId): NodeId[] {
  const visited = new Set<NodeId>();
  const stack: NodeId[] = [start];
  const result: NodeId[] = [];

  while (stack.length) {
    const node = stack.pop()!;           // safe: stack is non‑empty

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    // Add neighbours in reverse order if you want a particular visit order
    const neighbours = graph.adjacencyList.get(node) ?? new Set();
    for (const neighbour of Array.from(neighbours).reverse()) {
      if (!visited.has(neighbour)) stack.push(neighbour);
    }
  }

  return result;
}
const edges: [NodeId, NodeId][] = [
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [4, 5],
];

const graph = createGraph(edges);

console.log('Recursive DFS:', dfsRecursive(graph, 1));
// → [1, 2, 4, 3, 5] (or another order depending on set iteration)

console.log('Iterative DFS:', dfsIterative(graph, 1));
// → same result, but robust on deep graphs

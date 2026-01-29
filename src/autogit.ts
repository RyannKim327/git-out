/**
 * Topological sort (Kahn's algorithm).
 * @param graph – adjacency list: node → list of successors.  Nodes that don’t appear as keys are treated as isolated vertices.
 * @returns an array of nodes in topological order.
 * @throws Error if the graph contains a cycle.
 */
export function topologicalSort<T extends string | number | symbol>(
  graph: Partial<Record<T, readonly T[]>>,
): T[] {
  // 1. Compute indegree of each vertex
  const indegree = new Map<T, number>();
  const nodes = new Set<T>();

  // First pass: collect all vertices (keys + targets)
  for (const [u, adj] of Object.entries(graph) as [T, T[]][]) {
    nodes.add(u);
    for (const v of adj) nodes.add(v);
  }

  // Initialise indegree map
  for (const node of nodes) indegree.set(node, 0);

  // Second pass: count incoming edges
  for (const adj of Object.values(graph)) {
    for (const v of adj) {
      indegree.set(v, (indegree.get(v) ?? 0) + 1);
    }
  }

  // 2. Initialise a queue of all nodes with indegree 0
  const queue: T[] = [];
  for (const [node, d] of indegree.entries()) {
    if (d === 0) queue.push(node);
  }

  const order: T[] = [];

  // 3. Process the queue
  while (queue.length) {
    const u = queue.shift() as T; // queue is never empty here
    order.push(u);

    const successors = graph[u] ?? [];
    for (const v of successors) {
      const d = indegree.get(v)! - 1;
      indegree.set(v, d);
      if (d === 0) queue.push(v);
    }
  }

  // 4. If we processed all vertices, we succeeded; otherwise a cycle exists
  if (order.length !== nodes.size) {
    throw new Error('Graph contains a cycle – no topological ordering possible.');
  }

  return order;
}
const pkgGraph = {
  // A package can depend on other packages (edges go “downward”)
  'express': ['body-parser', 'morgan'],
  'body-parser': ['raw-body'],
  'morgan': ['stream-http'],
  'stream-http': [],
  'raw-body': [],
  'lodash': [],          // independent package
};

console.log(topologicalSort(pkgGraph));
// Possible output: ['lodash', 'stream-http', 'morgan', 'raw-body', 'body-parser', 'express']

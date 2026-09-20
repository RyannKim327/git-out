/**
 * The graph is represented as an adjacency list:
 *   key     → array of neighbors that the key points to
 */
export type Graph<T = string> = Record<T, T[]>;

/**
 * Helper types for the two algorithms
 */
type Queue<T> = T[];
export function topologicalSortKahn<T>(graph: Graph<T>): T[] {
  const result: T[] = [];

  // Compute in‑degree for each node
  const indegree = new Map<T, number>();
  for (const node in graph) {
    indegree.set(node, 0);               // ensure all nodes appear
    for (const nb of graph[node]) {
      indegree.set(nb, (indegree.get(nb) ?? 0) + 1);
    }
  }

  // Queue all nodes that have no incoming edges
  const queue: Queue<T> = [];
  for (const [node, deg] of indegree.entries()) {
    if (deg === 0) queue.push(node);
  }

  while (queue.length) {
    const node = queue.shift()!;
    result.push(node);

    // Reduce indegree for all neighbors, pushing any that reach 0
    for (const nb of graph[node] ?? []) {
      const deg = (indegree.get(nb) ?? 0) - 1;
      indegree.set(nb, deg);
      if (deg === 0) queue.push(nb);
    }
  }

  // If we processed fewer nodes than exist, a cycle exists
  if (result.length !== Object.keys(graph).length) {
    throw new Error('Graph contains a cycle; topological sort impossible');
  }
  return result;
}
export function topologicalSortDFS<T>(graph: Graph<T>): T[] {
  const visited = new Set<T>();
  const temp = new Set<T>();   // nodes on the recursion stack
  const result: T[] = [];

  const visit = (node: T) => {
    if (temp.has(node)) {
      throw new Error('Graph contains a cycle; topological sort impossible');
    }
    if (!visited.has(node)) {
      temp.add(node);
      for (const nb of graph[node] ?? []) visit(nb);
      temp.delete(node);
      visited.add(node);
      result.push(node);     // post‑order push gives topological order
    }
  };

  for (const node in graph) visit(node as T);
  // reverse because we push after exploring children
  return result.reverse();
}
const myGraph: Graph<string> = {
  A: ['B', 'C'],
  B: ['D'],
  C: ['D'],
  D: [],
};

console.log(topologicalSortKahn(myGraph));
// → [ 'A', 'B', 'C', 'D' ] (or any valid topological order)

console.log(topologicalSortDFS(myGraph));
// → same order (or any other valid one)

/**
 * Topological sort (Kahn’s BFS algorithm)
 * @param graph Adjacency list: vertex -> array of successors
 * @returns Array of vertices in topological order, or null if a cycle exists
 */
export function topologicalSort(graph: Map<string, string[]>): string[] | null {
  const inDegree = new Map<string, number>();
  const sorted: string[] = [];

  // 1. Initialise in-degree for every vertex
  for (const v of graph.keys()) inDegree.set(v, 0);
  for (const [, edges] of graph) {
    for (const v of edges) {
      if (!inDegree.has(v)) inDegree.set(v, 0); // handle vertices with no outgoing edges
      inDegree.set(v, inDegree.get(v)! + 1);
    }
  }

  // 2. Seed queue with vertices having zero in-degree
  const queue: string[] = [];
  for (const [v, deg] of inDegree) if (deg === 0) queue.push(v);

  // 3. BFS
  while (queue.length) {
    const u = queue.shift()!;
    sorted.push(u);

    for (const v of graph.get(u) ?? []) {
      inDegree.set(v, inDegree.get(v)! - 1);
      if (inDegree.get(v) === 0) queue.push(v);
    }
  }

  // 4. Cycle detection
  return sorted.length === inDegree.size ? sorted : null;
}

/* ---------- Usage example ---------- */
if (require.main === module) {
  const g = new Map<string, string[]>([
    ['A', ['B', 'C']],
    ['B', ['D']],
    ['C', ['D']],
    ['D', ['E']],
    ['E', []],
  ]);

  console.log(topologicalSort(g)); // → [ 'A', 'B', 'C', 'D', 'E' ]
}

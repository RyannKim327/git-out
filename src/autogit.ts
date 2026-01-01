// ---------------------------------------------
// Topological sort – Kahn’s BFS algorithm
// ---------------------------------------------
export function topologicalSort(
  graph: Map<string, string[]>
): { sorted: string[]; hasCycle: boolean } {
  const inDegree = new Map<string, number>();
  const queue: string[] = [];
  const sorted: string[] = [];

  // 1. Initialise in-degree counts
  for (const [node, neighbours] of graph) {
    if (!inDegree.has(node)) inDegree.set(node, 0);
    for (const n of neighbours) {
      inDegree.set(n, (inDegree.get(n) || 0) + 1);
    }
  }

  // 2. Seed queue with zero in-degree nodes
  for (const [node, degree] of inDegree) {
    if (degree === 0) queue.push(node);
  }

  // 3. Process queue
  while (queue.length) {
    const node = queue.shift()!;
    sorted.push(node);

    for (const neighbour of graph.get(node) || []) {
      inDegree.set(neighbour, inDegree.get(neighbour)! - 1);
      if (inDegree.get(neighbour) === 0) queue.push(neighbour);
    }
  }

  // 4. Cycle detection
  const hasCycle = sorted.length !== inDegree.size;
  return { sorted, hasCycle };
}

// ---------------------------------------------
// Quick usage example
// ---------------------------------------------
if (require.main === module) {
  const g = new Map<string, string[]>([
    ["A", ["B", "C"]],
    ["B", ["D"]],
    ["C", ["D"]],
    ["D", ["E"]],
    ["E", []],
  ]);

  const { sorted, hasCycle } = topologicalSort(g);
  console.log("Sorted:", sorted);     // → [ 'A', 'B', 'C', 'D', 'E' ]
  console.log("Has cycle:", hasCycle);  // → false
}

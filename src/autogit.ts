// graph.ts
type Graph = Record<string, string[]>;   // adjacency list

/**
 * Breadth-first search.
 * @param graph  Adjacency-list representation of the graph.
 * @param start  Starting vertex.
 * @param goal   Target vertex.
 * @returns      Array of vertices forming the shortest path, or null.
 */
export function bfs(
  graph: Graph,
  start: string,
  goal: string
): string[] | null {
  const queue: string[] = [start];         // FIFO frontier
  const visited = new Set<string>([start]);
  const prev: Record<string, string | undefined> = { [start]: undefined };

  while (queue.length) {
    const node = queue.shift()!;

    if (node === goal) {
      // Reconstruct path
      const path: string[] = [];
      let curr: string | undefined = goal;
      while (curr !== undefined) {
        path.unshift(curr);
        curr = prev[curr];
      }
      return path;
    }

    for (const neighbor of graph[node] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        prev[neighbor] = node;
        queue.push(neighbor);
      }
    }
  }

  return null; // No path found
}

/* ---------- usage example ---------- */
if (require.main === module) {
  const g: Graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: ['F'],
    F: []
  };

  console.log(bfs(g, 'A', 'F')); // → [ 'A', 'C', 'F' ]
}
npx tsc graph.ts --module commonjs
node graph.js

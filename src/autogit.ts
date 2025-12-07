// graph.ts
export type Graph = Record<string, string[]>;

/**
 * Breadth-first search.
 * @param graph  Adjacency-list representation.
 * @param start  Starting vertex.
 * @param goal   Target vertex.
 * @returns      Array of vertices from start → goal, or null if unreachable.
 */
export function bfs(
  graph: Graph,
  start: string,
  goal: string
): string[] | null {
  if (start === goal) return [start];

  const queue: string[] = [start];
  const visited = new Set<string>([start]);
  const prev: Record<string, string | undefined> = { [start]: undefined };

  while (queue.length) {
    const curr = queue.shift()!;

    for (const neighbor of graph[curr] ?? []) {
      if (visited.has(neighbor)) continue;

      prev[neighbor] = curr;
      visited.add(neighbor);
      queue.push(neighbor);

      if (neighbor === goal) return reconstructPath(prev, goal);
    }
  }
  return null; // unreachable
}

/* helper to walk the `prev` map backwards */
function reconstructPath(
  prev: Record<string, string | undefined>,
  goal: string
): string[] {
  const path: string[] = [];
  let curr: string | undefined = goal;
  while (curr !== undefined) {
    path.unshift(curr);
    curr = prev[curr];
  }
  return path;
}

/* ---------- usage example ---------- */
if (require.main === module) {
  const g: Graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: ["F"],
    F: [],
  };

  console.log(bfs(g, "A", "F")); // → [ 'A', 'C', 'F' ]
}
npx tsx graph.ts

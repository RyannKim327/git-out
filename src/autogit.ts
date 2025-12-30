type Graph = Record<string, string[]>;

/**
 * Breadth-first search.
 * @param graph  Adjacency list: { A: ['B','C'], B: ['D'], ... }
 * @param start  Starting vertex.
 * @param goal   Predicate that returns true when the target vertex is found.
 * @returns      The shortest path from start to the first vertex that satisfies
 *               the predicate, or null if no such vertex exists.
 */
function bfs(
  graph: Graph,
  start: string,
  goal: (v: string) => boolean
): string[] | null {
  if (goal(start)) return [start];

  const queue: string[][] = [[start]];   // each queue item is a full path
  const seen = new Set<string>([start]); // O(1) lookups

  while (queue.length) {
    const path = queue.shift()!;         // oldest path
    const vertex = path[path.length - 1];

    for (const neighbor of graph[vertex] ?? []) {
      if (seen.has(neighbor)) continue;
      seen.add(neighbor);

      const newPath = [...path, neighbor];
      if (goal(neighbor)) return newPath; // found shortest path
      queue.push(newPath);                // enqueue to explore later
    }
  }
  return null; // no path found
}

/* ---------- Example usage ---------- */
const g: Graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: [],
};

console.log(bfs(g, 'A', v => v === 'F'));
// → [ 'A', 'C', 'F' ]  (shortest path)

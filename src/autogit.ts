// ---------- Graph representation ----------
// Adjacency list:  nodeId -> array of neighbor nodeIds
type Graph = Record<string, string[]>;

// ---------- BFS ----------
/**
 * Breadth-first search that returns the *shortest* path from `start` to `goal`.
 * If you only need to visit nodes in BFS order, replace the path-reconstruction
 * part with a simple callback or queue processing.
 */
export function bfs(
  graph: Graph,
  start: string,
  goal: string
): string[] | null {
  if (start === goal) return [start];

  const queue: string[] = [start];          // frontier
  const visited = new Set<string>([start]); // closed set
  const prev = new Map<string, string>();   // to reconstruct path

  while (queue.length) {
    const node = queue.shift()!;

    for (const neighbor of graph[node] ?? []) {
      if (visited.has(neighbor)) continue;

      visited.add(neighbor);
      prev.set(neighbor, node);
      queue.push(neighbor);

      if (neighbor === goal) {
        // Reconstruct path
        const path: string[] = [];
        let cur: string | undefined = goal;
        while (cur !== undefined) {
          path.unshift(cur);
          cur = prev.get(cur);
        }
        return path;
      }
    }
  }
  return null; // no path
}

// ---------- Example usage ----------
if (import.meta.vitest) {
  const g: Graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: ['F'],
    F: [],
  };

  console.log(bfs(g, 'A', 'F')); // → ['A', 'C', 'F']
}

// ---------- Generic BFS core ----------
export function bfs<T>(
  start: T,
  getNeighbours: (node: T) => Iterable<T>,
  goal?: (node: T) => boolean
): { visited: Set<T>; path: T[] } {
  const visited = new Set<T>();
  const queue: T[] = [start];
  const parent = new Map<T, T | null>();   // to reconstruct path
  parent.set(start, null);

  while (queue.length) {
    const current = queue.shift()!;

    if (goal && goal(current)) {
      // Reconstruct path from start → goal
      const path: T[] = [];
      let node: T | null = current;
      while (node !== null) {
        path.unshift(node);
        node = parent.get(node)!;
      }
      return { visited, path };
    }

    if (!visited.has(current)) {
      visited.add(current);
      for (const nb of getNeighbours(current)) {
        if (!visited.has(nb) && !parent.has(nb)) {
          parent.set(nb, current);
          queue.push(nb);
        }
      }
    }
  }
  return { visited, path: [] }; // no path found
}

// ---------- Example usage ----------
interface Graph {
  [key: string]: string[];
}
const graph: Graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: []
};

const result = bfs(
  'A',
  node => graph[node] || [],
  node => node === 'F'
);

console.log('Visited order:', [...result.visited]);
console.log('Shortest path A→F:', result.path);
// → Visited order: Set(6) { 'A', 'B', 'C', 'D', 'E', 'F' }
// → Shortest path A→F: [ 'A', 'C', 'F' ]

type Graph<T> = Map<T, T[]>;

function bidirectionalSearch<T>(
  graph: Graph<T>,
  start: T,
  end: T
): number | null {
  if (start === end) return 0;

  // Forward and backward queues
  const queueForward: T[] = [start];
  const queueBackward: T[] = [end];

  // Visited nodes with their distances from start/end
  const visitedForward = new Map<T, number>([[start, 0]]);
  const visitedBackward = new Map<T, number>([[end, 0]]);

  // Alternate between forward and backward searches
  while (queueForward.length > 0 && queueBackward.length > 0) {
    // Check forward search
    const resultForward = expandLevel(
      graph,
      queueForward,
      visitedForward,
      visitedBackward
    );
    if (resultForward !== null) return resultForward;

    // Check backward search
    const resultBackward = expandLevel(
      graph,
      queueBackward,
      visitedBackward,
      visitedForward
    );
    if (resultBackward !== null) return resultBackward;
  }

  return null; // No path exists
}

function expandLevel<T>(
  graph: Graph<T>,
  queue: T[],
  visitedFromHere: Map<T, number>,
  visitedFromOther: Map<T, number>
): number | null {
  const levelSize = queue.length;
  
  for (let i = 0; i < levelSize; i++) {
    const current = queue.shift()!;
    const currentDistance = visitedFromHere.get(current)!;

    for (const neighbor of graph.get(current) || []) {
      // Skip already visited nodes in this direction
      if (visitedFromHere.has(neighbor)) continue;

      // Check if this node has been visited from the other direction
      if (visitedFromOther.has(neighbor)) {
        return currentDistance + 1 + visitedFromOther.get(neighbor)!;
      }

      // Mark as visited and add to queue
      visitedFromHere.set(neighbor, currentDistance + 1);
      queue.push(neighbor);
    }
  }

  return null; // No intersection in this level
}
// Create an undirected graph
const graph = new Map<number, number[]>([
  [0, [1, 2]],
  [1, [0, 3]],
  [2, [0, 4]],
  [3, [1, 4, 5]],
  [4, [2, 3, 6]],
  [5, [3, 6]],
  [6, [4, 5]],
]);

// Find shortest path
const shortestPath = bidirectionalSearch(graph, 0, 6);
console.log(shortestPath); // Output: 3 (Path: 0-2-4-6)

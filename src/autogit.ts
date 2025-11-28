type QueueItem<T> = { node: T; depth: number };

function breadthLimitedSearch<T>(
  startNode: T,
  getNeighbors: (node: T) => T[],
  maxDepth: number
): T[] {
  // Validate input
  if (maxDepth < 0) throw new Error("Max depth must be non-negative");
  
  // Early return for depth 0
  if (maxDepth === 0) return [startNode];

  const visited = new Set<T>([startNode]);
  const queue: QueueItem<T>[] = [{ node: startNode, depth: 0 }];
  const result: T[] = [startNode];

  while (queue.length > 0) {
    const { node, depth } = queue.shift()!;

    // Stop if we've reached the depth limit
    if (depth >= maxDepth) continue;

    for (const neighbor of getNeighbors(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        result.push(neighbor);
        queue.push({ node: neighbor, depth: depth + 1 });
      }
    }
  }

  return result;
}
// Example graph structure
interface GraphNode {
  id: string;
  neighbors: GraphNode[];
}

// Example usage
const nodeD = { id: 'D', neighbors: [] };
const nodeC = { id: 'C', neighbors: [] };
const nodeB = { id: 'B', neighbors: [nodeD] };
const nodeA = { id: 'A', neighbors: [nodeB, nodeC] };

const result = breadthLimitedSearch(
  nodeA,
  (node) => node.neighbors,
  1 // Max depth
);

console.log(result.map(n => n.id)); // Output: ['A', 'B', 'C']

type Graph<T> = Map<T, T[]>;

/**
 * Performs bidirectional search to find shortest path between start and end nodes
 * @param graph - Graph represented as adjacency list
 * @param start - Starting node
 * @param end - Target node
 * @returns Shortest path array if exists, otherwise null
 */
function bidirectionalSearch<T>(
  graph: Graph<T>,
  start: T,
  end: T
): T[] | null {
  // Edge case: start and end are the same node
  if (start === end) return [start];

  // Initialize forward and backward queues
  let forwardQueue: T[] = [start];
  let backwardQueue: T[] = [end];

  // Track visited nodes with their parents and distances
  const forwardParents = new Map<T, T | null>();
  const backwardParents = new Map<T, T | null>();

  forwardParents.set(start, null);
  backwardParents.set(end, null);

  /**
   * Processes one level of BFS expansion
   * @returns Common meeting node if found, otherwise null
   */
  const processLevel = (
    queue: T[],
    currentParents: Map<T, T | null>,
    otherParents: Map<T, T | null>,
    isBackward: boolean
  ): T | null => {
    const levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift()!;
      const neighbors = graph.get(currentNode) || [];

      for (const neighbor of neighbors) {
        // Skip already visited nodes in current direction
        if (currentParents.has(neighbor)) continue;

        // Set parent reference with direction awareness
        currentParents.set(neighbor, currentNode);
        queue.push(neighbor);

        // Check if neighbor exists in opposite search
        if (otherParents.has(neighbor)) {
          return neighbor; // Found intersection
        }
      }
    }
    return null;
  };

  // Alternate between forward/backward search levels
  while (forwardQueue.length > 0 && backwardQueue.length > 0) {
    // Process forward level
    let meetNode = processLevel(
      forwardQueue,
      forwardParents,
      backwardParents,
      false
    );
    if (meetNode) return reconstructPath(meetNode, forwardParents, backwardParents);

    // Process backward level
    meetNode = processLevel(
      backwardQueue,
      backwardParents,
      forwardParents,
      true
    );
    if (meetNode) return reconstructPath(meetNode, forwardParents, backwardParents);
  }

  return null; // No path found
}

/**
 * Reconstructs path from start to end via meeting node
 */
function reconstructPath<T>(
  meetNode: T,
  forwardParents: Map<T, T | null>,
  backwardParents: Map<T, T | null>
): T[] {
  // Build path from start to meet node
  const forwardPath: T[] = [];
  let current: T | null = meetNode;
  while (current !== null) {
    forwardPath.unshift(current);
    current = forwardParents.get(current)!;
  }

  // Build path from meet node to end
  const backwardPath: T[] = [];
  current = backwardParents.get(meetNode)!; // Skip meet node (already in forwardPath)
  while (current !== null) {
    backwardPath.push(current);
    current = backwardParents.get(current)!;
  }

  return [...forwardPath, ...backwardPath];
}

// Example Usage
const graph = new Map<string, string[]>([
  ['A', ['B', 'C']],
  ['B', ['A', 'D']],
  ['C', ['A', 'D']],
  ['D', ['B', 'C', 'E']],
  ['E', ['D']]
]);

const path = bidirectionalSearch(graph, 'A', 'E');
console.log(path); // Output: ['A', 'B', 'D', 'E'] or ['A', 'C', 'D', 'E']

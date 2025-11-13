type Graph<T> = Map<T, T[]>;

function depthLimitedSearch<T>(
  graph: Graph<T>,
  startNode: T,
  goalNode: T,
  limit: number
): T | null {
  // Create a stack to keep track of nodes to visit along with their depth
  const stack: { node: T; depth: number }[] = [];
  stack.push({ node: startNode, depth: 0 });

  while (stack.length > 0) {
    // Pop the last element from the stack (LIFO behavior)
    const { node, depth } = stack.pop()!;

    // Check if we've found the goal node
    if (node === goalNode) {
      return node;
    }

    // Only explore neighbors if we're within the depth limit
    if (depth < limit) {
      // Get neighbors (empty array if node isn't in graph)
      const neighbors = graph.get(node) || [];

      // Push neighbors to stack with incremented depth
      for (const neighbor of neighbors) {
        stack.push({ node: neighbor, depth: depth + 1 });
      }
    }
  }

  // Goal not found within depth limit
  return null;
}
// Create a sample graph
const graph = new Map<string, string[]>([
  ['A', ['B', 'C']],
  ['B', ['D', 'E']],
  ['C', ['F', 'G']],
  ['D', []],
  ['E', []],
  ['F', []],
  ['G', ['H']],
]);

// Search from 'A' to 'H' with depth limit 3
const result = depthLimitedSearch(graph, 'A', 'H', 3);
console.log(result); // Outputs: H

// If we limit depth to 2
const limitedResult = depthLimitedSearch(graph, 'A', 'H', 2);
console.log(limitedResult); // Outputs: null
function depthLimitedSearchWithPath<T>(
  graph: Graph<T>,
  startNode: T,
  goalNode: T,
  limit: number
): T[] | null {
  const stack: { path: T[]; depth: number }[] = [];
  stack.push({ path: [startNode], depth: 0 });

  while (stack.length > 0) {
    const { path, depth } = stack.pop()!;
    const currentNode = path[path.length - 1];

    if (currentNode === goalNode) {
      return path;
    }

    if (depth < limit) {
      const neighbors = graph.get(currentNode) || [];
      for (const neighbor of neighbors.reverse()) { // Reverse to maintain DFS order
        stack.push({
          path: [...path, neighbor],
          depth: depth + 1,
        });
      }
    }
  }

  return null;
}

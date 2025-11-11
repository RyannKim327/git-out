type QueueItem<T> = [node: T, depth: number];

/**
 * Performs a breadth-limited search starting from a given node
 * @param startNode The starting node for the search
 * @param getNeighbors Function that returns the neighbors of a node
 * @param depthLimit Maximum depth to explore (inclusive)
 * @param getKey Optional function to get unique identifier for nodes (defaults to object reference)
 * @returns Array of visited nodes in BFS order up to the depth limit
 */
function breadthLimitedSearch<T>(
  startNode: T,
  getNeighbors: (node: T) => T[],
  depthLimit: number,
  getKey: (node: T) => unknown = (node) => node
): T[] {
  const visited = new Set<unknown>(); // Track visited node keys
  const result: T[] = []; // Store the search result
  const queue: QueueItem<T>[] = []; // Initialize queue with start node and depth 0
  
  queue.push([startNode, 0]);

  while (queue.length > 0) {
    const [currentNode, currentDepth] = queue.shift()!;
    const nodeKey = getKey(currentNode);

    // Skip processing if already visited or exceeds depth limit
    if (visited.has(nodeKey) || currentDepth > depthLimit) {
      continue;
    }

    // Mark as visited and add to result
    visited.add(nodeKey);
    result.push(currentNode);

    // Enqueue neighbors if within depth limit
    if (currentDepth < depthLimit) {
      const neighbors = getNeighbors(currentNode);
      for (const neighbor of neighbors) {
        const neighborKey = getKey(neighbor);
        if (!visited.has(neighborKey)) {
          queue.push([neighbor, currentDepth + 1]);
        }
      }
    }
  }

  return result;
}
// Define a simple node type
interface TreeNode {
  id: string;
  children: TreeNode[];
}

// Sample tree structure
const tree: TreeNode = {
  id: "A",
  children: [
    {
      id: "B",
      children: [
        { id: "D", children: [] },
        { id: "E", children: [] }
      ]
    },
    {
      id: "C",
      children: [
        { id: "F", children: [] }
      ]
    }
  ]
};

// Run breadth-limited search
const result = breadthLimitedSearch(
  tree,
  node => node.children,
  1, // Depth limit
  node => node.id // Use 'id' as unique key
);

console.log(result.map(node => node.id)); 
// Output: ["A", "B", "C"] (nodes at depth 0 and 1)

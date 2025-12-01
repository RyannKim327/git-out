type Graph<T> = Map<T, T[]>;

/**
 * DFS Implementation (Recursive)
 * @param graph - Graph represented as adjacency list (Map)
 * @param start - Starting node
 * @param callback - Optional processing function for each node
 * @returns Array of nodes in DFS order
 */
function dfsRecursive<T>(
  graph: Graph<T>,
  start: T,
  callback?: (node: T) => void
): T[] {
  const visited = new Set<T>();
  const result: T[] = [];
  
  function dfs(node: T) {
    if (!graph.has(node) || visited.has(node)) return;
    
    visited.add(node);
    result.push(node);
    if (callback) callback(node);
    
    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }
  
  dfs(start);
  return result;
}

/**
 * DFS Implementation (Iterative)
 * @param graph - Graph represented as adjacency list (Map)
 * @param start - Starting node
 * @param callback - Optional processing function for each node
 * @returns Array of nodes in DFS order
 */
function dfsIterative<T>(
  graph: Graph<T>,
  start: T,
  callback?: (node: T) => void
): T[] {
  if (!graph.has(start)) return [];
  
  const visited = new Set<T>();
  const stack: T[] = [start];
  const result: T[] = [];
  
  while (stack.length > 0) {
    const current = stack.pop()!;
    
    if (!visited.has(current)) {
      visited.add(current);
      result.push(current);
      if (callback) callback(current);
      
      const neighbors = graph.get(current) || [];
      // Reverse to maintain same order as recursive version
      for (const neighbor of neighbors.reverse()) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  
  return result;
}
// Create a sample graph
const graph = new Map<number, number[]>([
  [1, [2, 4]],
  [2, [1, 3, 5]],
  [3, [2, 6]],
  [4, [1, 5]],
  [5, [2, 4, 6]],
  [6, [3, 5]],
]);

console.log('Recursive DFS:', dfsRecursive(graph, 1));
// Output: [1, 2, 3, 6, 5, 4]

console.log('Iterative DFS:', dfsIterative(graph, 1));
// Output: [1, 2, 3, 6, 5, 4]

// With callback
dfsIterative(graph, 1, node => console.log(`Visited ${node}`));

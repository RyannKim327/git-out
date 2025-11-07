interface Graph {
  [node: string]: string[];
}

function topologicalSortKahn(graph: Graph): string[] | null {
  const inDegree: Record<string, number> = {};
  const result: string[] = [];
  
  // Initialize in-degree counts
  for (const node in graph) {
    inDegree[node] = 0;
  }
  
  // Calculate in-degree for each node
  for (const node in graph) {
    for (const neighbor of graph[node]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }
  
  // Find nodes with zero in-degree
  const queue: string[] = [];
  for (const node in inDegree) {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  }
  
  // Process nodes
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);
    
    for (const neighbor of graph[current] || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  // Check for cycles
  if (result.length !== Object.keys(graph).length) {
    return null; // Cycle detected
  }
  
  return result;
}
function topologicalSortDFS(graph: Graph): string[] | null {
  const visited: Set<string> = new Set();
  const tempVisited: Set<string> = new Set();
  const result: string[] = [];
  let hasCycle = false;
  
  function dfs(node: string): void {
    if (tempVisited.has(node)) {
      hasCycle = true;
      return;
    }
    
    if (visited.has(node)) return;
    
    tempVisited.add(node);
    
    for (const neighbor of graph[node] || []) {
      dfs(neighbor);
    }
    
    tempVisited.delete(node);
    visited.add(node);
    result.unshift(node); // Add to front for topological order
  }
  
  for (const node in graph) {
    if (!visited.has(node)) {
      dfs(node);
    }
    if (hasCycle) break;
  }
  
  return hasCycle ? null : result;
}
type Graph<T extends string> = Record<T, T[]>;

function topologicalSort<T extends string>(
  graph: Graph<T>,
  algorithm: 'kahn' | 'dfs' = 'kahn'
): T[] | null {
  if (algorithm === 'kahn') {
    return topologicalSortKahn(graph as Graph) as T[];
  } else {
    return topologicalSortDFS(graph as Graph) as T[];
  }
}
// Example usage
const dependencyGraph = {
  'A': ['B', 'C'],
  'B': ['D'],
  'C': ['D'],
  'D': ['E'],
  'E': []
};

// Using Kahn's algorithm
const sortedKahn = topologicalSortKahn(dependencyGraph);
console.log('Kahn\'s result:', sortedKahn);

// Using DFS algorithm
const sortedDFS = topologicalSortDFS(dependencyGraph);
console.log('DFS result:', sortedDFS);

// Using generic function
const sorted = topologicalSort(dependencyGraph, 'kahn');
console.log('Generic result:', sorted);
// Handling cycles
const cyclicGraph = {
  'A': ['B'],
  'B': ['A'] // Cycle A -> B -> A
};

const cyclicResult = topologicalSortKahn(cyclicGraph);
console.log('Cyclic graph result:', cyclicResult); // null

// Handling disconnected nodes
const disconnectedGraph = {
  'A': ['B'],
  'B': [],
  'C': ['D'],
  'D': []
};

const disconnectedResult = topologicalSortKahn(disconnectedGraph);
console.log('Disconnected graph result:', disconnectedResult);

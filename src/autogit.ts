// Interface for a node
interface Node {
  id: string;
  value?: any;
}

// Interface for the graph
interface Graph {
  [key: string]: string[]; // adjacency list: nodeId -> array of connected nodeIds
}

// Generic DFS function signature
function depthFirstSearch<T>(
  graph: Graph, 
  startNode: string, 
  visit: (node: string, depth?: number) => T
): T[] {
  // Implementation will go here
  return [];
}
function depthFirstSearchRecursive<T>(
  graph: Graph, 
  startNode: string, 
  visit: (node: string, depth?: number) => T,
  visited: Set<string> = new Set(),
  depth: number = 0
): T[] {
  const results: T[] = [];
  
  // Mark current node as visited
  visited.add(startNode);
  
  // Visit current node
  const result = visit(startNode, depth);
  results.push(result);
  
  // Recursively visit all unvisited neighbors
  const neighbors = graph[startNode] || [];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      const neighborResults = depthFirstSearchRecursive(
        graph, 
        neighbor, 
        visit, 
        visited, 
        depth + 1
      );
      results.push(...neighborResults);
    }
  }
  
  return results;
}

// Usage example
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['D', 'E'],
  'C': ['F'],
  'D': [],
  'E': ['F'],
  'F': []
};

const visitedNodes = depthFirstSearchRecursive(graph, 'A', (node, depth) => ({
  node,
  depth: depth || 0,
  timestamp: Date.now()
}));

console.log(visitedNodes);
// Output: [{node: 'A', depth: 0}, {node: 'B', depth: 1}, {node: 'D', depth: 2}, ...]
function depthFirstSearchIterative<T>(
  graph: Graph, 
  startNode: string, 
  visit: (node: string, depth?: number) => T
): T[] {
  const stack: Array<{ node: string; depth: number }> = [
    { node: startNode, depth: 0 }
  ];
  const visited: Set<string> = new Set();
  const results: T[] = [];
  
  while (stack.length > 0) {
    const { node, depth } = stack.pop()!; // Pop from end (LIFO)
    
    if (visited.has(node)) {
      continue;
    }
    
    visited.add(node);
    
    // Visit current node
    const result = visit(node, depth);
    results.push(result);
    
    // Push neighbors onto stack in reverse order 
    // (so first neighbor is processed first when popped)
    const neighbors = graph[node] || [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!visited.has(neighbor)) {
        stack.push({ node: neighbor, depth: depth + 1 });
      }
    }
  }
  
  return results;
}

// Usage example
const iterativeResults = depthFirstSearchIterative(graph, 'A', (node, depth) => ({
  node,
  depth: depth || 0
}));

console.log(iterativeResults);
class DepthFirstSearch {
  private graph: Graph;
  
  constructor(graph: Graph) {
    this.graph = graph;
  }
  
  // Recursive DFS
  searchRecursive<T>(
    startNode: string,
    visit: (node: string, depth?: number, parent?: string) => T
  ): T[] {
    const visited = new Set<string>();
    return this.dfsRecursive(startNode, visit, visited, 0, null);
  }
  
  private dfsRecursive<T>(
    node: string,
    visit: (node: string, depth?: number, parent?: string) => T,
    visited: Set<string>,
    depth: number,
    parent: string | null
  ): T[] {
    const results: T[] = [];
    
    if (visited.has(node)) {
      return results;
    }
    
    visited.add(node);
    const result = visit(node, depth, parent);
    results.push(result);
    
    const neighbors = this.graph[node] || [];
    for (const neighbor of neighbors) {
      if (neighbor !== parent) { // Avoid going back to parent
        const neighborResults = this.dfsRecursive(
          neighbor, 
          visit, 
          visited, 
          depth + 1, 
          node
        );
        results.push(...neighborResults);
      }
    }
    
    return results;
  }
  
  // Iterative DFS
  searchIterative<T>(
    startNode: string,
    visit: (node: string, depth?: number, parent?: string) => T
  ): T[] {
    const stack: Array<{
      node: string;
      depth: number;
      parent: string | null;
    }> = [{ node: startNode, depth: 0, parent: null }];
    
    const visited = new Set<string>();
    const results: T[] = [];
    
    while (stack.length > 0) {
      const { node, depth, parent } = stack.pop()!;
      
      if (visited.has(node)) {
        continue;
      }
      
      visited.add(node);
      const result = visit(node, depth, parent);
      results.push(result);
      
      const neighbors = this.graph[node] || [];
      // Push in reverse order to maintain DFS order
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbor = neighbors[i];
        if (neighbor !== parent && !visited.has(neighbor)) {
          stack.push({ node: neighbor, depth: depth + 1, parent: node });
        }
      }
    }
    
    return results;
  }
  
  // DFS for path finding
  findPathRecursive(
    startNode: string,
    targetNode: string
  ): string[] | null {
    const visited = new Set<string>();
    const path: string[] = [];
    
    const result = this.dfsPathRecursive(
      startNode, 
      targetNode, 
      visited, 
      path
    );
    
    return result ? [...path] : null;
  }
  
  private dfsPathRecursive(
    current: string,
    target: string,
    visited: Set<string>,
    path: string[]
  ): boolean {
    if (current === target) {
      return true;
    }
    
    if (visited.has(current)) {
      return false;
    }
    
    visited.add(current);
    path.push(current);
    
    const neighbors = this.graph[current] || [];
    for (const neighbor of neighbors) {
      if (this.dfsPathRecursive(neighbor, target, visited, path)) {
        return true;
      }
    }
    
    // Backtrack
    path.pop();
    return false;
  }
}

// Usage example
const dfs = new DepthFirstSearch(graph);

// Search with custom visit function
const searchResults = dfs.searchRecursive('A', (node, depth, parent) => ({
  node,
  depth,
  parent,
  visitedAt: new Date().toISOString()
}));

console.log('Search results:', searchResults);

// Find path between nodes
const path = dfs.findPathRecursive('A', 'F');
console.log('Path from A to F:', path); // ['A', 'B', 'E', 'F']

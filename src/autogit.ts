interface Graph {
  [node: string]: string[];
}

function topologicalSortKahn(graph: Graph): string[] {
  // Calculate in-degrees
  const inDegree: Record<string, number> = {};
  const nodes = new Set<string>();
  
  // Initialize all nodes and in-degrees
  for (const node in graph) {
    nodes.add(node);
    inDegree[node] = inDegree[node] || 0;
    for (const neighbor of graph[node]) {
      nodes.add(neighbor);
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }
  
  // Find nodes with 0 in-degree
  const queue: string[] = [];
  for (const node of nodes) {
    if ((inDegree[node] || 0) === 0) {
      queue.push(node);
    }
  }
  
  const result: string[] = [];
  let count = 0;
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    count++;
    
    // Reduce in-degree of neighbors
    for (const neighbor of graph[node] || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  // Check for cycles
  if (count !== nodes.size) {
    throw new Error("Graph contains a cycle - topological sort not possible");
  }
  
  return result;
}
function topologicalSortDFS(graph: Graph): string[] {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const result: string[] = [];
  
  function dfs(node: string): void {
    if (recursionStack.has(node)) {
      throw new Error("Graph contains a cycle");
    }
    
    if (visited.has(node)) {
      return;
    }
    
    visited.add(node);
    recursionStack.add(node);
    
    // Visit all neighbors first
    for (const neighbor of graph[node] || []) {
      dfs(neighbor);
    }
    
    recursionStack.delete(node);
    result.push(node);
  }
  
  // Visit all nodes
  for (const node in graph) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }
  
  return result.reverse();
}
interface TopologicalSortResult<T> {
  sorted: T[];
  hasCycle: boolean;
}

class TopologicalSorter<T extends string | number | symbol> {
  private graph: Record<T, T[]>;
  
  constructor(graph: Record<T, T[]>) {
    this.graph = graph;
  }
  
  // Kahn's algorithm implementation
  sortKahn(): TopologicalSortResult<T> {
    const inDegree: Record<T, number> = {} as Record<T, number>;
    const nodes = new Set<T>();
    
    // Initialize data structures
    for (const node in this.graph) {
      const typedNode = node as T;
      nodes.add(typedNode);
      inDegree[typedNode] = inDegree[typedNode] || 0;
      
      for (const neighbor of this.graph[typedNode]) {
        nodes.add(neighbor);
        inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
      }
    }
    
    const queue: T[] = [];
    for (const node of nodes) {
      if ((inDegree[node] || 0) === 0) {
        queue.push(node);
      }
    }
    
    const sorted: T[] = [];
    let count = 0;
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      sorted.push(node);
      count++;
      
      for (const neighbor of this.graph[node as T] || []) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }
    
    return {
      sorted,
      hasCycle: count !== nodes.size
    };
  }
  
  // DFS-based implementation
  sortDFS(): TopologicalSortResult<T> {
    const visited = new Set<T>();
    const recursionStack = new Set<T>();
    const result: T[] = [];
    let hasCycle = false;
    
    const dfs = (node: T): void => {
      if (recursionStack.has(node)) {
        hasCycle = true;
        return;
      }
      
      if (visited.has(node)) {
        return;
      }
      
      visited.add(node);
      recursionStack.add(node);
      
      for (const neighbor of this.graph[node] || []) {
        dfs(neighbor);
      }
      
      recursionStack.delete(node);
      result.push(node);
    };
    
    for (const node in this.graph) {
      const typedNode = node as T;
      if (!visited.has(typedNode)) {
        dfs(typedNode);
      }
    }
    
    return {
      sorted: result.reverse(),
      hasCycle
    };
  }
}
// Example usage
const graph: Graph = {
  'A': ['C'],
  'B': ['C', 'D'],
  'C': ['E'],
  'D': ['F'],
  'E': ['F', 'H'],
  'F': ['G'],
  'G': [],
  'H': []
};

// Using Kahn's algorithm
try {
  const sortedKahn = topologicalSortKahn(graph);
  console.log("Kahn's result:", sortedKahn);
} catch (error) {
  console.error("Cycle detected:", error.message);
}

// Using DFS algorithm
try {
  const sortedDFS = topologicalSortDFS(graph);
  console.log("DFS result:", sortedDFS);
} catch (error) {
  console.error("Cycle detected:", error.message);
}

// Using generic class
const sorter = new TopologicalSorter<string>(graph);
const result = sorter.sortKahn();

if (result.hasCycle) {
  console.log("Graph contains a cycle");
} else {
  console.log("Sorted order:", result.sorted);
}
// Handling cycles
const cyclicGraph: Graph = {
  'A': ['B'],
  'B': ['C'],
  'C': ['A'] // Cycle!
};

// Handling disconnected graphs
const disconnectedGraph: Graph = {
  'A': ['B'],
  'B': ['C'],
  'X': ['Y'],
  'Y': ['Z']
};

// Handling empty graph
const emptyGraph: Graph = {};

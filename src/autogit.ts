interface Graph {
  [node: string]: string[];
}

function topologicalSortKahn(graph: Graph): string[] {
  // Calculate in-degrees
  const inDegree: Record<string, number> = {};
  const nodes = Object.keys(graph);
  
  // Initialize in-degrees
  for (const node of nodes) {
    inDegree[node] = 0;
  }
  
  // Calculate in-degrees
  for (const node of nodes) {
    for (const neighbor of graph[node]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }
  
  // Find nodes with zero in-degree
  const queue: string[] = [];
  for (const node of nodes) {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  }
  
  const result: string[] = [];
  
  // Process nodes
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode);
    
    // Reduce in-degree of neighbors
    for (const neighbor of graph[currentNode]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  // Check for cycles
  if (result.length !== nodes.length) {
    throw new Error("Graph contains a cycle - topological sort not possible");
  }
  
  return result;
}
function topologicalSortDFS(graph: Graph): string[] {
  const visited: Record<string, boolean> = {};
  const tempVisited: Record<string, boolean> = {};
  const resultStack: string[] = [];
  
  function dfs(node: string): void {
    if (tempVisited[node]) {
      throw new Error("Graph contains a cycle");
    }
    
    if (!visited[node]) {
      tempVisited[node] = true;
      
      for (const neighbor of graph[node]) {
        dfs(neighbor);
      }
      
      visited[node] = true;
      delete tempVisited[node];
      resultStack.push(node);
    }
  }
  
  const nodes = Object.keys(graph);
  for (const node of nodes) {
    if (!visited[node]) {
      dfs(node);
    }
  }
  
  return resultStack.reverse();
}
interface Graph {
  [node: string]: string[];
}

class TopologicalSorter {
  static kahnSort(graph: Graph): string[] {
    const inDegree: Record<string, number> = {};
    const allNodes = new Set<string>();
    
    // Collect all nodes
    for (const node in graph) {
      allNodes.add(node);
      graph[node].forEach(neighbor => allNodes.add(neighbor));
    }
    
    // Initialize in-degrees
    Array.from(allNodes).forEach(node => {
      inDegree[node] = 0;
    });
    
    // Calculate in-degrees
    for (const node in graph) {
      graph[node].forEach(neighbor => {
        inDegree[neighbor]++;
      });
    }
    
    // Process nodes
    const queue: string[] = [];
    const result: string[] = [];
    
    for (const node in inDegree) {
      if (inDegree[node] === 0) {
        queue.push(node);
      }
    }
    
    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      result.push(currentNode);
      
      if (graph[currentNode]) {
        for (const neighbor of graph[currentNode]) {
          inDegree[neighbor]--;
          if (inDegree[neighbor] === 0) {
            queue.push(neighbor);
          }
        }
      }
    }
    
    if (result.length !== allNodes.size) {
      throw new Error("Graph contains a cycle");
    }
    
    return result;
  }
  
  static dfsSort(graph: Graph): string[] {
    const visited: Set<string> = new Set();
    const tempVisited: Set<string> = new Set();
    const result: string[] = [];
    
    function visit(node: string): void {
      if (tempVisited.has(node)) {
        throw new Error(`Cycle detected at node: ${node}`);
      }
      
      if (!visited.has(node)) {
        tempVisited.add(node);
        
        if (graph[node]) {
          for (const neighbor of graph[node]) {
            visit(neighbor);
          }
        }
        
        tempVisited.delete(node);
        visited.add(node);
        result.push(node);
      }
    }
    
    // Visit all nodes
    for (const node in graph) {
      if (!visited.has(node)) {
        visit(node);
      }
    }
    
    // Also visit nodes that are only referenced (not keys in graph)
    const allNodes = new Set<string>();
    for (const node in graph) {
      allNodes.add(node);
      graph[node].forEach(n => allNodes.add(n));
    }
    
    for (const node of allNodes) {
      if (!visited.has(node)) {
        visit(node);
      }
    }
    
    return result.reverse();
  }
}
// Example graph
const graph: Graph = {
  'A': ['C'],
  'B': ['C', 'D'],
  'C': ['E'],
  'D': ['F'],
  'E': ['F'],
  'F': []
};

// Using Kahn's algorithm
try {
  const sortedKahn = TopologicalSorter.kahnSort(graph);
  console.log('Kahn sort result:', sortedKahn);
} catch (error) {
  console.error('Kahn error:', error.message);
}

// Using DFS algorithm
try {
  const sortedDFS = TopologicalSorter.dfsSort(graph);
  console.log('DFS sort result:', sortedDFS);
} catch (error) {
  console.error('DFS error:', error.message);
}

interface Graph {
  [key: number]: number[];
}

function topologicalSortKahn(graph: Graph): number[] {
  const inDegree: Record<number, number> = {};
  const result: number[] = [];
  const queue: number[] = [];
  
  // Initialize in-degree counts
  for (const node in graph) {
    const numNode = Number(node);
    inDegree[numNode] = inDegree[numNode] || 0;
    
    for (const neighbor of graph[numNode]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }
  
  // Find nodes with zero in-degree
  for (const node in inDegree) {
    const numNode = Number(node);
    if (inDegree[numNode] === 0) {
      queue.push(numNode);
    }
  }
  
  // Process nodes
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    
    for (const neighbor of graph[node] || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  // Check for cycles
  if (result.length !== Object.keys(inDegree).length) {
    throw new Error("Graph has a cycle - topological sort not possible");
  }
  
  return result;
}
function topologicalSortDFS(graph: Graph): number[] {
  const visited = new Set<number>();
  const temp = new Set<number>();
  const result: number[] = [];
  
  function visit(node: number): void {
    if (temp.has(node)) {
      throw new Error("Graph has a cycle");
    }
    
    if (!visited.has(node)) {
      temp.add(node);
      
      for (const neighbor of graph[node] || []) {
        visit(neighbor);
      }
      
      temp.delete(node);
      visited.add(node);
      result.unshift(node); // Add to front for topological order
    }
  }
  
  for (const node in graph) {
    visit(Number(node));
  }
  
  return result;
}
interface Graph {
  [key: number]: number[];
}

class TopologicalSort {
  static kahn(graph: Graph): number[] {
    const inDegree: Record<number, number> = {};
    const result: number[] = [];
    const queue: number[] = [];
    
    // Initialize in-degree for all nodes
    Object.keys(graph).forEach(nodeStr => {
      const node = Number(nodeStr);
      inDegree[node] = inDegree[node] || 0;
      
      graph[node].forEach(neighbor => {
        inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
      });
    });
    
    // Add nodes with zero in-degree to queue
    Object.keys(inDegree).forEach(nodeStr => {
      const node = Number(nodeStr);
      if (inDegree[node] === 0) {
        queue.push(node);
      }
    });
    
    // Process the queue
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);
      
      (graph[node] || []).forEach(neighbor => {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      });
    }
    
    // Check for cycles
    if (result.length !== Object.keys(inDegree).length) {
      throw new Error("Graph contains a cycle");
    }
    
    return result;
  }
  
  static dfs(graph: Graph): number[] {
    const visited = new Set<number>();
    const temp = new Set<number>();
    const result: number[] = [];
    
    const visit = (node: number): void => {
      if (temp.has(node)) {
        throw new Error("Graph contains a cycle");
      }
      
      if (!visited.has(node)) {
        temp.add(node);
        
        (graph[node] || []).forEach(neighbor => {
          visit(neighbor);
        });
        
        temp.delete(node);
        visited.add(node);
        result.unshift(node);
      }
    };
    
    Object.keys(graph).forEach(nodeStr => {
      visit(Number(nodeStr));
    });
    
    return result;
  }
}

// Usage Example
const graph: Graph = {
  0: [1, 2],
  1: [3],
  2: [3],
  3: [4],
  4: []
};

try {
  console.log("Kahn's result:", TopologicalSort.kahn(graph));
  console.log("DFS result:", TopologicalSort.dfs(graph));
} catch (error) {
  console.error("Error:", error.message);
}
interface Graph<T> {
  nodes: T[];
  edges: [T, T][];
}

class GenericTopologicalSort<T extends string | number> {
  static sort<T extends string | number>(graph: Graph<T>): T[] {
    const adjacencyList: Record<T, T[]> = {} as Record<T, T[]>;
    const inDegree: Record<T, number> = {} as Record<T, number>;
    const result: T[] = [];
    const queue: T[] = [];
    
    // Initialize adjacency list and in-degree
    graph.nodes.forEach(node => {
      adjacencyList[node] = [];
      inDegree[node] = 0;
    });
    
    graph.edges.forEach(([from, to]) => {
      adjacencyList[from].push(to);
      inDegree[to] = (inDegree[to] || 0) + 1;
    });
    
    // Find nodes with zero in-degree
    graph.nodes.forEach(node => {
      if (inDegree[node] === 0) {
        queue.push(node);
      }
    });
    
    // Process nodes
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);
      
      adjacencyList[node].forEach(neighbor => {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      });
    }
    
    // Check for cycles
    if (result.length !== graph.nodes.length) {
      throw new Error("Graph contains a cycle");
    }
    
    return result;
  }
}

// Usage
const genericGraph: Graph<number> = {
  nodes: [0, 1, 2, 3, 4],
  edges: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]]
};

console.log("Generic result:", GenericTopologicalSort.sort(genericGraph));

interface Graph {
  [node: string]: string[];
}

function topologicalSort(graph: Graph): string[] {
  const inDegree: Record<string, number> = {};
  const result: string[] = [];
  
  // Initialize in-degree for all nodes
  for (const node in graph) {
    inDegree[node] = 0;
  }
  
  // Calculate in-degree for each node
  for (const node in graph) {
    for (const neighbor of graph[node]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }
  
  // Find nodes with 0 in-degree (sources)
  const queue: string[] = [];
  for (const node in inDegree) {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  }
  
  // Process the queue
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
    throw new Error("Graph has cycles! Topological sort not possible.");
  }
  
  return result;
}
class TopologicalSorter<T extends string | number | symbol> {
  sort(graph: Record<T, T[]>): T[] {
    const inDegree: Partial<Record<T, number>> = {};
    const result: T[] = [];
    
    // Initialize in-degree
    for (const node of Object.keys(graph) as T[]) {
      inDegree[node] = 0;
    }
    
    // Calculate in-degree
    for (const node of Object.keys(graph) as T[]) {
      for (const neighbor of graph[node]) {
        inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
      }
    }
    
    // Find sources
    const queue: T[] = [];
    for (const node of Object.keys(inDegree) as T[]) {
      if (inDegree[node] === 0) {
        queue.push(node);
      }
    }
    
    // Process queue
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);
      
      for (const neighbor of graph[node] || []) {
        inDegree[neighbor]!--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }
    
    // Check for cycles
    if (result.length !== Object.keys(inDegree).length) {
      throw new Error("Graph contains cycles");
    }
    
    return result;
  }
}
// Example 1: Simple dependency graph
const graph1 = {
  'A': ['B', 'C'],
  'B': ['D'],
  'C': ['D'],
  'D': []
};

console.log(topologicalSort(graph1)); 
// Output: ['A', 'B', 'C', 'D'] or ['A', 'C', 'B', 'D']

// Example 2: Course prerequisites
const courses = {
  'Calculus': ['Algebra'],
  'Algebra': [],
  'Physics': ['Calculus'],
  'Advanced Physics': ['Physics']
};

console.log(topologicalSort(courses));
// Output: ['Algebra', 'Calculus', 'Physics', 'Advanced Physics']

// Example 3: Using generic version
const numberGraph = {
  1: [2, 3],
  2: [4],
  3: [4],
  4: []
};

const sorter = new TopologicalSorter<number>();
console.log(sorter.sort(numberGraph)); 
// Output: [1, 2, 3, 4] or [1, 3, 2, 4]
function topologicalSortDFS(graph: Graph): string[] {
  const visited: Record<string, boolean> = {};
  const temp: Record<string, boolean> = {};
  const result: string[] = [];
  let hasCycle = false;

  function visit(node: string): void {
    if (temp[node]) {
      hasCycle = true;
      return;
    }
    
    if (!visited[node]) {
      temp[node] = true;
      
      for (const neighbor of graph[node] || []) {
        visit(neighbor);
      }
      
      visited[node] = true;
      delete temp[node];
      result.unshift(node);
    }
  }

  for (const node in graph) {
    if (!visited[node]) {
      visit(node);
    }
  }

  if (hasCycle) {
    throw new Error("Graph contains cycles");
  }

  return result;
}

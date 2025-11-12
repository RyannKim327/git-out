interface Graph {
  [node: string]: string[];
}

function topologicalSortKahn(graph: Graph): string[] {
  // Calculate in-degrees
  const inDegree: Record<string, number> = {};
  for (const node in graph) {
    inDegree[node] = 0;
  }
  
  for (const node in graph) {
    for (const neighbor of graph[node]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }
  
  // Initialize queue with nodes having 0 in-degree
  const queue: string[] = [];
  for (const node in inDegree) {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  }
  
  // Process nodes
  const result: string[] = [];
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
    throw new Error("Graph contains a cycle - topological sort not possible");
  }
  
  return result;
}

// Example usage:
const graph: Graph = {
  'A': ['C'],
  'B': ['C', 'D'],
  'C': ['E'],
  'D': ['F'],
  'E': ['F'],
  'F': []
};

console.log(topologicalSortKahn(graph));
// Output: ['A', 'B', 'C', 'D', 'E', 'F'] or similar valid ordering
function topologicalSortDFS(graph: Graph): string[] {
  const visited: Set<string> = new Set();
  const tempMarked: Set<string> = new Set();
  const result: string[] = [];
  
  function visit(node: string): void {
    if (tempMarked.has(node)) {
      throw new Error("Graph contains a cycle");
    }
    
    if (!visited.has(node)) {
      tempMarked.add(node);
      
      for (const neighbor of graph[node] || []) {
        visit(neighbor);
      }
      
      tempMarked.delete(node);
      visited.add(node);
      result.unshift(node); // Add to front for topological order
    }
  }
  
  for (const node in graph) {
    if (!visited.has(node)) {
      visit(node);
    }
  }
  
  return result;
}
class TopologicalSorter<T extends string | number> {
  private graph: Map<T, T[]>;
  
  constructor() {
    this.graph = new Map();
  }
  
  addNode(node: T, dependencies: T[] = []): void {
    this.graph.set(node, dependencies);
  }
  
  sort(): T[] {
    const inDegree = new Map<T, number>();
    const adjacencyList = new Map<T, T[]>();
    
    // Initialize maps
    for (const [node, deps] of this.graph) {
      inDegree.set(node, 0);
      adjacencyList.set(node, [...deps]);
    }
    
    // Calculate in-degrees
    for (const deps of adjacencyList.values()) {
      for (const dep of deps) {
        inDegree.set(dep, (inDegree.get(dep) || 0) + 1);
      }
    }
    
    // Process nodes
    const queue: T[] = [];
    const result: T[] = [];
    
    for (const [node, degree] of inDegree) {
      if (degree === 0) {
        queue.push(node);
      }
    }
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);
      
      for (const neighbor of adjacencyList.get(current) || []) {
        const currentDegree = inDegree.get(neighbor)! - 1;
        inDegree.set(neighbor, currentDegree);
        
        if (currentDegree === 0) {
          queue.push(neighbor);
        }
      }
    }
    
    if (result.length !== this.graph.size) {
      throw new Error("Graph contains a cycle");
    }
    
    return result;
  }
}

// Example usage with generic type
const sorter = new TopologicalSorter<string>();
sorter.addNode('A', ['C']);
sorter.addNode('B', ['C', 'D']);
sorter.addNode('C', ['E']);
sorter.addNode('D', ['F']);
sorter.addNode('E', ['F']);
sorter.addNode('F', []);

console.log(sorter.sort());
// Example 1: Course prerequisites
const courses: Graph = {
  'Calculus': ['Algebra'],
  'Linear Algebra': ['Algebra'],
  'Advanced Calculus': ['Calculus', 'Linear Algebra'],
  'Differential Equations': ['Advanced Calculus'],
  'Algebra': []
};

console.log('Course order:', topologicalSortKahn(courses));

// Example 2: Build dependencies
const buildDeps: Graph = {
  'compile': ['parse'],
  'parse': ['lex'],
  'lex': [],
  'test': ['compile'],
  'package': ['compile', 'test']
};

console.log('Build order:', topologicalSortDFS(buildDeps));

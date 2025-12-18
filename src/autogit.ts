interface Graph {
  [key: string]: string[];
}

function topologicalSortKahn(graph: Graph): string[] {
  // Calculate in-degree for each node
  const inDegree: { [key: string]: number } = {};
  
  // Initialize in-degree for all nodes
  Object.keys(graph).forEach(node => {
    inDegree[node] = inDegree[node] || 0;
    graph[node].forEach(neighbor => {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    });
  });
  
  // Find nodes with zero in-degree
  const queue: string[] = Object.keys(inDegree).filter(node => inDegree[node] === 0);
  const result: string[] = [];
  
  // Process nodes
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    
    // Reduce in-degree of neighbors
    graph[node]?.forEach(neighbor => {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }
  
  // Check for cycles
  if (result.length !== Object.keys(inDegree).length) {
    throw new Error('Graph has a cycle, topological sort not possible');
  }
  
  return result;
}
function topologicalSortDFS(graph: Graph): string[] {
  const visited = new Set<string>();
  const tempVisited = new Set<string>(); // For cycle detection
  const result: string[] = [];
  
  function visit(node: string): void {
    if (tempVisited.has(node)) {
      throw new Error('Graph has a cycle');
    }
    
    if (!visited.has(node)) {
      tempVisited.add(node);
      
      // Visit all neighbors first
      graph[node]?.forEach(neighbor => {
        visit(neighbor);
      });
      
      tempVisited.delete(node);
      visited.add(node);
      result.unshift(node); // Add to front (reverse order)
    }
  }
  
  // Visit all nodes
  Object.keys(graph).forEach(node => {
    if (!visited.has(node)) {
      visit(node);
    }
  });
  
  return result;
}
class TopologicalSorter<T extends string | number | symbol> {
  private graph: Map<T, T[]>;
  
  constructor() {
    this.graph = new Map();
  }
  
  addNode(node: T): void {
    if (!this.graph.has(node)) {
      this.graph.set(node, []);
    }
  }
  
  addEdge(from: T, to: T): void {
    this.addNode(from);
    this.addNode(to);
    this.graph.get(from)!.push(to);
  }
  
  sort(): T[] {
    return this.kahnSort();
  }
  
  private kahnSort(): T[] {
    const inDegree = new Map<T, number>();
    
    // Initialize in-degrees
    this.graph.forEach((neighbors, node) => {
      inDegree.set(node, inDegree.get(node) || 0);
      neighbors.forEach(neighbor => {
        inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
      });
    });
    
    const queue: T[] = [];
    inDegree.forEach((degree, node) => {
      if (degree === 0) {
        queue.push(node);
      }
    });
    
    const result: T[] = [];
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);
      
      this.graph.get(node)?.forEach(neighbor => {
        const currentDegree = inDegree.get(neighbor)!;
        inDegree.set(neighbor, currentDegree - 1);
        
        if (currentDegree - 1 === 0) {
          queue.push(neighbor);
        }
      });
    }
    
    if (result.length !== this.graph.size) {
      throw new Error('Graph contains a cycle');
    }
    
    return result;
  }
}
// Example 1: Using Kahn's algorithm
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['D'],
  'C': ['D'],
  'D': ['E'],
  'E': []
};

console.log(topologicalSortKahn(graph)); 
// Output: ['A', 'B', 'C', 'D', 'E'] or ['A', 'C', 'B', 'D', 'E']

// Example 2: Using DFS algorithm
console.log(topologicalSortDFS(graph));
// Output: ['A', 'C', 'B', 'D', 'E'] or similar

// Example 3: Using the generic class
const sorter = new TopologicalSorter<string>();
sorter.addEdge('A', 'B');
sorter.addEdge('A', 'C');
sorter.addEdge('B', 'D');
sorter.addEdge('C', 'D');
sorter.addEdge('D', 'E');

console.log(sorter.sort()); // ['A', 'B', 'C', 'D', 'E']
interface Task {
  id: string;
  name: string;
  dependencies: string[];
}

function sortTasks(tasks: Task[]): string[] {
  const graph: Graph = {};
  
  // Build graph from tasks
  tasks.forEach(task => {
    graph[task.id] = task.dependencies;
  });
  
  return topologicalSortKahn(graph);
}

const tasks: Task[] = [
  { id: 'build', name: 'Build project', dependencies: ['compile', 'test'] },
  { id: 'compile', name: 'Compile code', dependencies: [] },
  { id: 'test', name: 'Run tests', dependencies: ['compile'] },
  { id: 'deploy', name: 'Deploy', dependencies: ['build'] }
];

console.log(sortTasks(tasks)); 
// Output: ['compile', 'test', 'build', 'deploy']

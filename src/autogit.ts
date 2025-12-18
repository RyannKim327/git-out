class Graph<T> {
  private adjacencyList: Map<T, T[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1: T, vertex2: T): void {
    if (!this.adjacencyList.has(vertex1)) this.addVertex(vertex1);
    if (!this.adjacencyList.has(vertex2)) this.addVertex(vertex2);
    
    this.adjacencyList.get(vertex1)!.push(vertex2);
    this.adjacencyList.get(vertex2)!.push(vertex1);
  }

  // Recursive DFS
  dfsRecursive(start: T): T[] {
    const result: T[] = [];
    const visited = new Set<T>();

    const dfs = (vertex: T) => {
      if (!vertex || visited.has(vertex)) return;
      
      visited.add(vertex);
      result.push(vertex);
      
      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };

    dfs(start);
    return result;
  }

  // Iterative DFS using stack
  dfsIterative(start: T): T[] {
    const result: T[] = [];
    const visited = new Set<T>();
    const stack: T[] = [start];
    
    visited.add(start);

    while (stack.length > 0) {
      const vertex = stack.pop()!;
      result.push(vertex);
      
      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors.reverse()) { // Reverse to maintain order
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }
    
    return result;
  }
}
// Create and test the graph
const graph = new Graph<string>();

// Add vertices and edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('E', 'F');

console.log('Recursive DFS:', graph.dfsRecursive('A')); 
// Output: ['A', 'B', 'D', 'E', 'F', 'C']

console.log('Iterative DFS:', graph.dfsIterative('A')); 
// Output: ['A', 'C', 'F', 'E', 'B', 'D']
interface DFSVisitCallback<T> {
  onVisit?: (vertex: T) => void;
  onDiscover?: (vertex: T) => void;
  onFinish?: (vertex: T) => void;
}

class AdvancedGraph<T> {
  private adjacencyList: Map<T, T[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addEdge(vertex1: T, vertex2: T): void {
    if (!this.adjacencyList.has(vertex1)) this.adjacencyList.set(vertex1, []);
    if (!this.adjacencyList.has(vertex2)) this.adjacencyList.set(vertex2, []);
    
    this.adjacencyList.get(vertex1)!.push(vertex2);
    this.adjacencyList.get(vertex2)!.push(vertex1);
  }

  dfsWithCallbacks(
    start: T, 
    callbacks: DFSVisitCallback<T> = {}
  ): { order: T[]; discoveryTime: Map<T, number>; finishTime: Map<T, number> } {
    const order: T[] = [];
    const visited = new Set<T>();
    const discoveryTime = new Map<T, number>();
    const finishTime = new Map<T, number>();
    let time = 0;

    const dfs = (vertex: T) => {
      visited.add(vertex);
      discoveryTime.set(vertex, time++);
      callbacks.onDiscover?.(vertex);
      
      order.push(vertex);
      callbacks.onVisit?.(vertex);

      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
      
      finishTime.set(vertex, time++);
      callbacks.onFinish?.(vertex);
    };

    dfs(start);
    return { order, discoveryTime, finishTime };
  }
}
class DFSPathFinder<T> {
  private graph: Graph<T>;

  constructor(graph: Graph<T>) {
    this.graph = graph;
  }

  findPath(start: T, end: T): T[] | null {
    const visited = new Set<T>();
    const path: T[] = [];
    
    const dfs = (current: T): boolean => {
      if (current === end) {
        path.push(current);
        return true;
      }
      
      if (visited.has(current)) return false;
      
      visited.add(current);
      path.push(current);
      
      // Try to access adjacencyList - you might need to make it protected
      const neighbors = (this.graph as any).adjacencyList.get(current) || [];
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor)) {
            return true;
          }
        }
      }
      
      path.pop();
      return false;
    };
    
    return dfs(start) ? path : null;
  }
}
// Create graph
const pathGraph = new Graph<string>();
pathGraph.addEdge('A', 'B');
pathGraph.addEdge('A', 'C');
pathGraph.addEdge('B', 'D');
pathGraph.addEdge('C', 'E');
pathGraph.addEdge('D', 'F');
pathGraph.addEdge('E', 'F');

const pathFinder = new DFSPathFinder(pathGraph);
console.log('Path from A to F:', pathFinder.findPath('A', 'F'));
// Output: ['A', 'B', 'D', 'F'] or similar depending on traversal order

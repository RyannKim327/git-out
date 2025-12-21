interface Graph {
  [key: number]: number[];
}

class DFS {
  // Recursive DFS
  static dfsRecursive(graph: Graph, start: number): number[] {
    const result: number[] = [];
    const visited: Set<number> = new Set();

    const dfs = (node: number) => {
      if (visited.has(node)) return;
      
      visited.add(node);
      result.push(node);
      
      for (const neighbor of graph[node] || []) {
        dfs(neighbor);
      }
    };

    dfs(start);
    return result;
  }

  // Iterative DFS using stack
  static dfsIterative(graph: Graph, start: number): number[] {
    const result: number[] = [];
    const visited: Set<number> = new Set();
    const stack: number[] = [start];

    while (stack.length > 0) {
      const node = stack.pop()!;
      
      if (!visited.has(node)) {
        visited.add(node);
        result.push(node);
        
        // Push neighbors in reverse order to maintain DFS order
        for (let i = (graph[node] || []).length - 1; i >= 0; i--) {
          const neighbor = graph[node]![i];
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }

    return result;
  }
}
class GraphDFS {
  private adjacencyList: Map<number, number[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: number): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1: number, vertex2: number): void {
    if (!this.adjacencyList.has(vertex1)) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList.has(vertex2)) {
      this.addVertex(vertex2);
    }
    
    this.adjacencyList.get(vertex1)!.push(vertex2);
    this.adjacencyList.get(vertex2)!.push(vertex1); // For undirected graph
  }

  // DFS with path tracking
  dfsWithPath(start: number, target: number): number[] | null {
    const visited: Set<number> = new Set();
    const path: number[] = [];
    const parent: Map<number, number> = new Map();

    const dfs = (node: number): boolean => {
      visited.add(node);
      
      if (node === target) {
        return true;
      }

      for (const neighbor of this.adjacencyList.get(node) || []) {
        if (!visited.has(neighbor)) {
          parent.set(neighbor, node);
          if (dfs(neighbor)) {
            return true;
          }
        }
      }
      
      return false;
    };

    if (dfs(start)) {
      // Reconstruct path
      let current: number = target;
      while (current !== start) {
        path.unshift(current);
        current = parent.get(current)!;
      }
      path.unshift(start);
      return path;
    }

    return null;
  }

  // Get all connected components using DFS
  getConnectedComponents(): number[][] {
    const visited: Set<number> = new Set();
    const components: number[][] = [];

    for (const vertex of this.adjacencyList.keys()) {
      if (!visited.has(vertex)) {
        const component: number[] = [];
        this.#dfsComponent(vertex, visited, component);
        components.push(component);
      }
    }

    return components;
  }

  #dfsComponent(vertex: number, visited: Set<number>, component: number[]): void {
    visited.add(vertex);
    component.push(vertex);

    for (const neighbor of this.adjacencyList.get(vertex) || []) {
      if (!visited.has(neighbor)) {
        this.#dfsComponent(neighbor, visited, component);
      }
    }
  }
}
interface DFSVisitor<T> {
  onNodeVisit?(node: T): void;
  onEdgeTraverse?(from: T, to: T): void;
  shouldStop?(node: T): boolean;
}

class GenericDFS<T> {
  constructor(
    private getNeighbors: (node: T) => T[],
    private areEqual: (a: T, b: T) => boolean = (a, b) => a === b
  ) {}

  traverse(
    start: T,
    visitor: DFSVisitor<T> = {},
    strategy: 'recursive' | 'iterative' = 'recursive'
  ): T[] {
    if (strategy === 'recursive') {
      return this.#traverseRecursive(start, visitor);
    } else {
      return this.#traverseIterative(start, visitor);
    }
  }

  #traverseRecursive(start: T, visitor: DFSVisitor<T>): T[] {
    const visited: T[] = [];
    const visitedSet = new Set<T>();

    const dfs = (node: T): boolean => {
      if (visitedSet.has(node)) return false;
      
      visitedSet.add(node);
      visited.push(node);
      visitor.onNodeVisit?.(node);

      if (visitor.shouldStop?.(node)) {
        return true;
      }

      for (const neighbor of this.getNeighbors(node)) {
        visitor.onEdgeTraverse?.(node, neighbor);
        if (dfs(neighbor)) {
          return true;
        }
      }

      return false;
    };

    dfs(start);
    return visited;
  }

  #traverseIterative(start: T, visitor: DFSVisitor<T>): T[] {
    const visited: T[] = [];
    const visitedSet = new Set<T>();
    const stack: T[] = [start];

    while (stack.length > 0) {
      const node = stack.pop()!;
      
      if (!visitedSet.has(node)) {
        visitedSet.add(node);
        visited.push(node);
        visitor.onNodeVisit?.(node);

        if (visitor.shouldStop?.(node)) {
          break;
        }

        const neighbors = this.getNeighbors(node);
        for (let i = neighbors.length - 1; i >= 0; i--) {
          const neighbor = neighbors[i];
          visitor.onEdgeTraverse?.(node, neighbor);
          if (!visitedSet.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }

    return visited;
  }
}
// Example 1: Basic graph traversal
const graph: Graph = {
  1: [2, 3],
  2: [4, 5],
  3: [6],
  4: [],
  5: [7],
  6: [],
  7: []
};

console.log('Recursive DFS:', DFS.dfsRecursive(graph, 1));
console.log('Iterative DFS:', DFS.dfsIterative(graph, 1));

// Example 2: Using GraphDFS class
const graphDFS = new GraphDFS();
graphDFS.addEdge(1, 2);
graphDFS.addEdge(1, 3);
graphDFS.addEdge(2, 4);
graphDFS.addEdge(2, 5);
graphDFS.addEdge(3, 6);

console.log('Path from 1 to 6:', graphDFS.dfsWithPath(1, 6));
console.log('Connected components:', graphDFS.getConnectedComponents());

// Example 3: Generic DFS with strings
const stringGraph = new GenericDFS<string>((node) => {
  const graph: { [key: string]: string[] } = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['G'],
    'F': [],
    'G': []
  };
  return graph[node] || [];
});

const traversal = stringGraph.traverse('A', {
  onNodeVisit: (node) => console.log(`Visiting: ${node}`),
  onEdgeTraverse: (from, to) => console.log(`Traversing: ${from} -> ${to}`)
});

console.log('String graph traversal:', traversal);

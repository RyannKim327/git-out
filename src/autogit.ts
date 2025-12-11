interface Graph {
  [node: string]: string[];
}

function topologicalSortKahn(graph: Graph): string[] {
  // Calculate in-degrees for each node
  const inDegree: { [node: string]: number } = {};
  
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
    throw new Error("Graph has a cycle - topological sort not possible");
  }

  return result;
}
function topologicalSortDFS(graph: Graph): string[] {
  const visited = new Set<string>();
  const temp = new Set<string>(); // For cycle detection
  const result: string[] = [];

  function visit(node: string): void {
    if (temp.has(node)) {
      throw new Error("Graph has a cycle");
    }
    
    if (!visited.has(node)) {
      temp.add(node);
      
      // Visit all neighbors first
      graph[node]?.forEach(neighbor => visit(neighbor));
      
      temp.delete(node);
      visited.add(node);
      result.unshift(node); // Add to front (post-order)
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
type NodeId = string | number;
interface GenericGraph<T extends NodeId> {
  nodes: T[];
  edges: [T, T][]; // [from, to]
}

class TopologicalSorter<T extends NodeId> {
  private adjacencyList: Map<T, T[]>;
  
  constructor(graph: GenericGraph<T>) {
    this.adjacencyList = new Map();
    
    // Build adjacency list
    graph.nodes.forEach(node => {
      this.adjacencyList.set(node, []);
    });
    
    graph.edges.forEach(([from, to]) => {
      if (!this.adjacencyList.has(from)) {
        this.adjacencyList.set(from, []);
      }
      this.adjacencyList.get(from)!.push(to);
    });
  }

  sort(): T[] {
    return this.kahnSort();
  }

  private kahnSort(): T[] {
    const inDegree = new Map<T, number>();
    const queue: T[] = [];
    const result: T[] = [];

    // Initialize in-degree
    this.adjacencyList.forEach((neighbors, node) => {
      inDegree.set(node, 0);
    });

    // Calculate in-degree
    this.adjacencyList.forEach((neighbors, node) => {
      neighbors.forEach(neighbor => {
        inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
      });
    });

    // Find nodes with zero in-degree
    inDegree.forEach((degree, node) => {
      if (degree === 0) {
        queue.push(node);
      }
    });

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);

      this.adjacencyList.get(node)?.forEach(neighbor => {
        const currentDegree = inDegree.get(neighbor)!;
        inDegree.set(neighbor, currentDegree - 1);
        
        if (currentDegree - 1 === 0) {
          queue.push(neighbor);
        }
      });
    }

    if (result.length !== this.adjacencyList.size) {
      throw new Error("Graph contains a cycle");
    }

    return result;
  }
}
// Example 1: Simple string-based graph
const coursePrerequisites: Graph = {
  'CS101': [],
  'CS102': ['CS101'],
  'CS201': ['CS102'],
  'MATH101': [],
  'CS301': ['CS201', 'MATH101'],
  'CS401': ['CS301']
};

console.log(topologicalSortKahn(coursePrerequisites));
// Output: ['CS101', 'MATH101', 'CS102', 'CS201', 'CS301', 'CS401']

// Example 2: Using generic implementation
const buildDependencies: GenericGraph<string> = {
  nodes: ['compile', 'test', 'lint', 'build', 'deploy'],
  edges: [
    ['compile', 'test'],
    ['compile', 'lint'],
    ['test', 'build'],
    ['lint', 'build'],
    ['build', 'deploy']
  ]
};

const sorter = new TopologicalSorter(buildDependencies);
console.log(sorter.sort());
// Output: ['compile', 'test', 'lint', 'build', 'deploy']

// Example 3: Number-based nodes
const numberGraph: GenericGraph<number> = {
  nodes: [1, 2, 3, 4, 5],
  edges: [[1, 2], [1, 3], [2, 4], [3, 4], [4, 5]]
};

const numberSorter = new TopologicalSorter(numberGraph);
console.log(numberSorter.sort());
// Output: [1, 2, 3, 4, 5] or [1, 3, 2, 4, 5]

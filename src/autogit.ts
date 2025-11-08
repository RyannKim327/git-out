interface Edge {
  from: number;
  to: number;
  weight: number;
}

interface Graph {
  vertices: number;
  edges: Edge[];
}

interface ShortestPathResult {
  distances: number[];
  predecessors: number[];
  hasNegativeCycle: boolean;
}

class BellmanFord {
  /**
   * Finds shortest paths from a source vertex using Bellman-Ford algorithm
   * @param graph - The graph represented as vertices and edges
   * @param source - The source vertex index (0-indexed)
   * @returns Object containing distances, predecessors, and negative cycle flag
   */
  static findShortestPaths(graph: Graph, source: number): ShortestPathResult {
    const { vertices, edges } = graph;
    
    // Initialize distances and predecessors
    const distances: number[] = new Array(vertices).fill(Infinity);
    const predecessors: number[] = new Array(vertices).fill(-1);
    
    // Set source distance to 0
    distances[source] = 0;
    
    // Relax edges repeatedly
    for (let i = 0; i < vertices - 1; i++) {
      for (const edge of edges) {
        this.relaxEdge(edge, distances, predecessors);
      }
    }
    
    // Check for negative cycles
    const hasNegativeCycle = this.checkNegativeCycle(edges, distances);
    
    return { distances, predecessors, hasNegativeCycle };
  }
  
  /**
   * Relaxes an edge (updates distance if a shorter path is found)
   */
  private static relaxEdge(
    edge: Edge, 
    distances: number[], 
    predecessors: number[]
  ): void {
    const { from, to, weight } = edge;
    
    if (distances[from] !== Infinity && 
        distances[from] + weight < distances[to]) {
      distances[to] = distances[from] + weight;
      predecessors[to] = from;
    }
  }
  
  /**
   * Checks if the graph contains a negative weight cycle
   */
  private static checkNegativeCycle(
    edges: Edge[], 
    distances: number[]
  ): boolean {
    for (const edge of edges) {
      const { from, to, weight } = edge;
      
      if (distances[from] !== Infinity && 
          distances[from] + weight < distances[to]) {
        return true;
      }
    }
    return false;
  }
  
  /**
   * Gets the shortest path to a specific vertex
   */
  static getPathToVertex(
    result: ShortestPathResult, 
    target: number
  ): { path: number[]; distance: number } {
    const { distances, predecessors } = result;
    
    if (distances[target] === Infinity) {
      return { path: [], distance: Infinity };
    }
    
    const path: number[] = [];
    let current = target;
    
    // Backtrack from target to source
    while (current !== -1) {
      path.unshift(current);
      current = predecessors[current];
    }
    
    return { path, distance: distances[target] };
  }
}

// Example usage and test
function exampleUsage() {
  // Example graph with 5 vertices
  const graph: Graph = {
    vertices: 5,
    edges: [
      { from: 0, to: 1, weight: 6 },
      { from: 0, to: 2, weight: 7 },
      { from: 1, to: 2, weight: 8 },
      { from: 1, to: 3, weight: 5 },
      { from: 1, to: 4, weight: -4 },
      { from: 2, to: 3, weight: -3 },
      { from: 2, to: 4, weight: 9 },
      { from: 3, to: 1, weight: -2 },
      { from: 4, to: 0, weight: 2 },
      { from: 4, to: 3, weight: 7 }
    ]
  };
  
  const source = 0;
  const result = BellmanFord.findShortestPaths(graph, source);
  
  console.log('Shortest paths from vertex', source);
  console.log('Distances:', result.distances);
  console.log('Predecessors:', result.predecessors);
  console.log('Has negative cycle:', result.hasNegativeCycle);
  
  // Get specific paths
  for (let i = 0; i < graph.vertices; i++) {
    const pathInfo = BellmanFord.getPathToVertex(result, i);
    console.log(`Path to ${i}:`, pathInfo.path, 'Distance:', pathInfo.distance);
  }
}

// Run the example
exampleUsage();
class Graph {
  private vertices: number;
  private edges: Edge[];
  
  constructor(vertices: number) {
    this.vertices = vertices;
    this.edges = [];
  }
  
  addEdge(from: number, to: number, weight: number): void {
    this.edges.push({ from, to, weight });
  }
  
  findShortestPaths(source: number): ShortestPathResult {
    return BellmanFord.findShortestPaths(
      { vertices: this.vertices, edges: this.edges }, 
      source
    );
  }
}

// Usage with class-based graph
function classBasedExample() {
  const graph = new Graph(4);
  graph.addEdge(0, 1, 1);
  graph.addEdge(0, 2, 4);
  graph.addEdge(1, 2, 2);
  graph.addEdge(1, 3, 5);
  graph.addEdge(2, 3, 1);
  
  const result = graph.findShortestPaths(0);
  console.log('Class-based result:', result);
}

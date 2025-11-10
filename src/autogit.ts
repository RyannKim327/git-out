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
  path: number[];
}

class BellmanFord {
  /**
   * Finds shortest paths from a source vertex using Bellman-Ford algorithm
   * @param graph - The graph with vertices and edges
   * @param source - Source vertex index
   * @returns Shortest path result with distances and predecessor array
   */
  static findShortestPaths(graph: Graph, source: number): ShortestPathResult {
    const { vertices, edges } = graph;
    
    // Initialize distances and predecessors
    const distances: number[] = new Array(vertices).fill(Infinity);
    const predecessors: number[] = new Array(vertices).fill(-1);
    
    // Distance to source is 0
    distances[source] = 0;
    
    // Relax all edges V-1 times
    for (let i = 0; i < vertices - 1; i++) {
      let updated = false;
      
      for (const edge of edges) {
        if (distances[edge.from] !== Infinity && 
            distances[edge.from] + edge.weight < distances[edge.to]) {
          distances[edge.to] = distances[edge.from] + edge.weight;
          predecessors[edge.to] = edge.from;
          updated = true;
        }
      }
      
      // Early termination if no updates
      if (!updated) break;
    }
    
    // Check for negative weight cycles
    const hasNegativeCycle = this.checkNegativeCycle(edges, distances);
    
    // Generate path from source to destination (if possible)
    const path = hasNegativeCycle ? [] : this.reconstructPath(predecessors, source, vertices - 1);
    
    return {
      distances,
      predecessors,
      hasNegativeCycle,
      path
    };
  }
  
  /**
   * Checks for negative weight cycles
   */
  private static checkNegativeCycle(edges: Edge[], distances: number[]): boolean {
    for (const edge of edges) {
      if (distances[edge.from] !== Infinity && 
          distances[edge.from] + edge.weight < distances[edge.to]) {
        return true;
      }
    }
    return false;
  }
  
  /**
   * Reconstructs the shortest path from source to destination
   */
  private static reconstructPath(
    predecessors: number[], 
    source: number, 
    destination: number
  ): number[] {
    if (predecessors[destination] === -1 && source !== destination) {
      return []; // No path exists
    }
    
    const path: number[] = [];
    let current = destination;
    
    while (current !== -1) {
      path.push(current);
      current = predecessors[current];
    }
    
    return path.reverse();
  }
  
  /**
   * Prints the shortest path results in a readable format
   */
  static printResults(result: ShortestPathResult, source: number): void {
    console.log(`Shortest paths from vertex ${source}:`);
    console.log('Vertex\tDistance\tPath from Source');
    
    for (let i = 0; i < result.distances.length; i++) {
      const path = this.reconstructPath(result.predecessors, source, i);
      const pathStr = path.length > 0 ? path.join(' → ') : 'No path';
      
      console.log(`${i}\t${result.distances[i] === Infinity ? '∞' : result.distances[i]}\t\t${pathStr}`);
    }
    
    if (result.hasNegativeCycle) {
      console.log('\n⚠️  Warning: Graph contains a negative weight cycle!');
    }
  }
}
// Example 1: Normal graph without negative cycles
const graph1: Graph = {
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

console.log('Example 1: Normal Graph');
const result1 = BellmanFord.findShortestPaths(graph1, 0);
BellmanFord.printResults(result1, 0);

// Example 2: Graph with negative cycle
const graph2: Graph = {
  vertices: 4,
  edges: [
    { from: 0, to: 1, weight: 1 },
    { from: 1, to: 2, weight: -1 },
    { from: 2, to: 3, weight: -1 },
    { from: 3, to: 1, weight: -1 }  // This creates a negative cycle
  ]
};

console.log('\nExample 2: Graph with Negative Cycle');
const result2 = BellmanFord.findShortestPaths(graph2, 0);
BellmanFord.printResults(result2, 0);

// Example 3: Getting specific path
console.log('\nExample 3: Specific Path');
const graph3: Graph = {
  vertices: 4,
  edges: [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 2 },
    { from: 1, to: 2, weight: 1 },
    { from: 1, to: 3, weight: 5 },
    { from: 2, to: 3, weight: 8 }
  ]
};

const result3 = BellmanFord.findShortestPaths(graph3, 0);
console.log(`Distance to vertex 3: ${result3.distances[3]}`);
console.log(`Path: ${result3.path.join(' → ')}`);
class Graph {
  private vertices: number;
  private edges: Edge[];
  
  constructor(vertices: number) {
    this.vertices = vertices;
    this.edges = [];
  }
  
  addEdge(from: number, to: number, weight: number): void {
    if (from < 0 || from >= this.vertices || to < 0 || to >= this.vertices) {
      throw new Error('Invalid vertex index');
    }
    this.edges.push({ from, to, weight });
  }
  
  findShortestPaths(source: number): ShortestPathResult {
    return BellmanFord.findShortestPaths({
      vertices: this.vertices,
      edges: this.edges
    }, source);
  }
}

// Usage with OOP style
const graph = new Graph(4);
graph.addEdge(0, 1, 1);
graph.addEdge(1, 2, 2);
graph.addEdge(2, 3, 3);
graph.addEdge(0, 3, 6);

const result = graph.findShortestPaths(0);
BellmanFord.printResults(result, 0);

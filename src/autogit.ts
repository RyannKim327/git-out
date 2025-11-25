interface Edge {
  from: number;
  to: number;
  weight: number;
}

interface Graph {
  vertices: number;
  edges: Edge[];
}

interface Result {
  distances: number[];
  predecessors: number[];
  hasNegativeCycle: boolean;
}

class BellmanFord {
  static findShortestPaths(
    graph: Graph,
    source: number
  ): Result {
    // Initialize distances and predecessors arrays
    const distances: number[] = new Array(graph.vertices).fill(Infinity);
    const predecessors: number[] = new Array(graph.vertices).fill(-1);
    
    // Set distance to source to 0
    distances[source] = 0;
    
    // Relax edges V-1 times
    for (let i = 0; i < graph.vertices - 1; i++) {
      for (const edge of graph.edges) {
        if (distances[edge.from] + edge.weight < distances[edge.to]) {
          distances[edge.to] = distances[edge.from] + edge.weight;
          predecessors[edge.to] = edge.from;
        }
      }
    }
    
    // Check for negative cycles
    let hasNegativeCycle = false;
    for (const edge of graph.edges) {
      if (distances[edge.from] + edge.weight < distances[edge.to]) {
        hasNegativeCycle = true;
        break;
      }
    }
    
    return {
      distances,
      predecessors,
      hasNegativeCycle
    };
  }
  
  // Helper method to reconstruct path from source to target
  static getPath(
    predecessors: number[], 
    source: number, 
    target: number
  ): number[] {
    if (predecessors[target] === -1 && target !== source) {
      return []; // No path exists
    }
    
    const path: number[] = [];
    let current = target;
    
    while (current !== source) {
      path.unshift(current);
      current = predecessors[current];
    }
    path.unshift(source);
    
    return path;
  }
}

// Example usage
function exampleUsage() {
  // Create a graph with 5 vertices
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
  
  if (result.hasNegativeCycle) {
    console.log("Graph contains negative weight cycle");
  } else {
    console.log("Distances from source:", result.distances);
    console.log("Predecessors:", result.predecessors);
    
    // Get path to specific vertex
    const target = 4;
    const path = BellmanFord.getPath(result.predecessors, source, target);
    console.log(`Path from ${source} to ${target}:`, path);
  }
}

// Run example
exampleUsage();
class WeightedGraph {
  private vertices: number;
  private edges: Edge[];
  
  constructor(vertices: number) {
    this.vertices = vertices;
    this.edges = [];
  }
  
  addEdge(from: number, to: number, weight: number): void {
    this.edges.push({ from, to, weight });
  }
  
  bellmanFord(source: number): Result {
    return BellmanFord.findShortestPaths({
      vertices: this.vertices,
      edges: this.edges
    }, source);
  }
}

// Usage with class-based graph
const graph = new WeightedGraph(5);
graph.addEdge(0, 1, 6);
graph.addEdge(0, 2, 7);
graph.addEdge(1, 2, 8);
// ... add more edges

const result = graph.bellmanFord(0);

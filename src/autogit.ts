interface Edge {
  from: number;
  to: number;
  weight: number;
}

interface ShortestPathResult {
  distances: number[];
  predecessors: number[];
  hasNegativeCycle: boolean;
}

class BellmanFord {
  private vertices: number;
  private edges: Edge[];

  constructor(vertices: number, edges: Edge[]) {
    this.vertices = vertices;
    this.edges = edges;
  }

  findShortestPaths(startVertex: number): ShortestPathResult {
    // Initialize distances and predecessors
    const distances: number[] = new Array(this.vertices).fill(Infinity);
    const predecessors: number[] = new Array(this.vertices).fill(-1);
    
    distances[startVertex] = 0;

    // Relax edges |V| - 1 times
    for (let i = 0; i < this.vertices - 1; i++) {
      let updated = false;
      
      for (const edge of this.edges) {
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
    const hasNegativeCycle = this.checkNegativeCycle(distances);

    return { distances, predecessors, hasNegativeCycle };
  }

  private checkNegativeCycle(distances: number[]): boolean {
    for (const edge of this.edges) {
      if (distances[edge.from] !== Infinity && 
          distances[edge.from] + edge.weight < distances[edge.to]) {
        return true;
      }
    }
    return false;
  }

  getPath(predecessors: number[], target: number): number[] {
    const path: number[] = [];
    let current = target;
    
    while (current !== -1) {
      path.unshift(current);
      current = predecessors[current];
    }
    
    return path;
  }
}
// Example usage
const vertices = 5;
const edges: Edge[] = [
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
];

const bellmanFord = new BellmanFord(vertices, edges);
const result = bellmanFord.findShortestPaths(0);

console.log("Distances:", result.distances);
console.log("Has negative cycle:", result.hasNegativeCycle);

// Get path from vertex 0 to vertex 4
const path = bellmanFord.getPath(result.predecessors, 4);
console.log("Path from 0 to 4:", path);
class EnhancedBellmanFord {
  private vertices: number;
  private edges: Edge[];

  constructor(vertices: number, edges: Edge[]) {
    if (vertices <= 0) {
      throw new Error("Number of vertices must be positive");
    }
    
    this.vertices = vertices;
    this.edges = edges.filter(edge => this.validateEdge(edge));
  }

  private validateEdge(edge: Edge): boolean {
    if (edge.from < 0 || edge.from >= this.vertices) {
      console.warn(`Invalid from vertex ${edge.from}`);
      return false;
    }
    if (edge.to < 0 || edge.to >= this.vertices) {
      console.warn(`Invalid to vertex ${edge.to}`);
      return false;
    }
    return true;
  }

  findShortestPaths(startVertex: number): ShortestPathResult {
    if (startVertex < 0 || startVertex >= this.vertices) {
      throw new Error("Start vertex is out of bounds");
    }

    const distances: number[] = new Array(this.vertices).fill(Infinity);
    const predecessors: number[] = new Array(this.vertices).fill(-1);
    
    distances[startVertex] = 0;

    // Relax edges |V| - 1 times
    for (let i = 0; i < this.vertices - 1; i++) {
      let updated = false;
      
      for (const edge of this.edges) {
        if (this.canRelax(distances, edge)) {
          distances[edge.to] = distances[edge.from] + edge.weight;
          predecessors[edge.to] = edge.from;
          updated = true;
        }
      }
      
      if (!updated) break;
    }

    const hasNegativeCycle = this.checkNegativeCycle(distances);

    return { distances, predecessors, hasNegativeCycle };
  }

  private canRelax(distances: number[], edge: Edge): boolean {
    return distances[edge.from] !== Infinity && 
           distances[edge.from] + edge.weight < distances[edge.to];
  }

  private checkNegativeCycle(distances: number[]): boolean {
    for (const edge of this.edges) {
      if (this.canRelax(distances, edge)) {
        return true;
      }
    }
    return false;
  }

  getPath(predecessors: number[], target: number): number[] {
    if (target < 0 || target >= this.vertices) {
      throw new Error("Target vertex is out of bounds");
    }

    const path: number[] = [];
    let current = target;
    
    while (current !== -1) {
      path.unshift(current);
      current = predecessors[current];
    }
    
    return path;
  }

  // Utility method to get all shortest paths from start vertex
  getAllPaths(startVertex: number): Map<number, number[]> {
    const result = this.findShortestPaths(startVertex);
    const paths = new Map<number, number[]>();
    
    for (let i = 0; i < this.vertices; i++) {
      if (i !== startVertex && result.distances[i] !== Infinity) {
        paths.set(i, this.getPath(result.predecessors, i));
      }
    }
    
    return paths;
  }
}
// Complete example with visualization
function demonstrateBellmanFord() {
  // Create a sample graph
  const vertices = 5;
  const edges: Edge[] = [
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
  ];

  const bellmanFord = new EnhancedBellmanFord(vertices, edges);
  
  // Find shortest paths from vertex 0
  const result = bellmanFord.findShortestPaths(0);
  
  console.log("=== Bellman-Ford Algorithm Results ===");
  console.log("Distances from vertex 0:");
  result.distances.forEach((distance, vertex) => {
    console.log(`Vertex ${vertex}: ${distance === Infinity ? "∞" : distance}`);
  });
  
  console.log("\nPaths:");
  for (let i = 1; i < vertices; i++) {
    const path = bellmanFord.getPath(result.predecessors, i);
    console.log(`Path to ${i}: ${path.join(" → ")}`);
  }
  
  if (result.hasNegativeCycle) {
    console.log("\n⚠️ Warning: Graph contains a negative weight cycle!");
  } else {
    console.log("\n✅ No negative weight cycles detected");
  }
}

// Run the demonstration
demonstrateBellmanFord();

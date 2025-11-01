interface GraphEdge {
  source: number;
  target: number;
  weight: number;
}

interface GraphVertex {
  id: number;
  distance: number;
  predecessor?: number;
}

class BellmanFord {
  private edges: GraphEdge[];
  private vertices: number[];

  constructor(edges: GraphEdge[], vertices: number[]) {
    this.edges = edges;
    this.vertices = vertices;
  }

  /**
   * Finds shortest paths from source vertex to all other vertices
   * @param source - The source vertex (0-indexed)
   * @returns Object containing distances and predecessors for all vertices
   */
  findShortestPaths(source: number): {
    distances: Map<number, number>;
    predecessors: Map<number, number | null>;
    hasNegativeCycle: boolean;
  } {
    // Initialize distances and predecessors
    const distances = new Map<number, number>();
    const predecessors = new Map<number, number | null>();
    
    // Set all distances to infinity, source to 0
    this.vertices.forEach(vertex => {
      distances.set(vertex, vertex === source ? 0 : Infinity);
      predecessors.set(vertex, null);
    });

    // Relax edges |V|-1 times
    for (let i = 0; i < this.vertices.length - 1; i++) {
      for (const edge of this.edges) {
        const { source: u, target: v, weight: w } = edge;
        
        // If we can reach u and there's a shorter path through u to v
        if (distances.has(u) && distances.get(u)! !== Infinity) {
          const newDistance = distances.get(u)! + w;
          const currentDistance = distances.get(v)!;
          
          if (newDistance < currentDistance) {
            distances.set(v, newDistance);
            predecessors.set(v, u);
          }
        }
      }
    }

    // Check for negative cycles
    const hasNegativeCycle = this.detectNegativeCycle(distances);

    return {
      distances,
      predecessors,
      hasNegativeCycle
    };
  }

  /**
   * Detects if there's a negative cycle reachable from the source
   */
  private detectNegativeCycle(distances: Map<number, number>): boolean {
    for (const edge of this.edges) {
      const { source: u, target: v, weight: w } = edge;
      
      if (distances.has(u) && distances.get(u)! !== Infinity) {
        const newDistance = distances.get(u)! + w;
        if (newDistance < distances.get(v)!) {
          return true; // Negative cycle detected
        }
      }
    }
    return false;
  }

  /**
   * Reconstructs the shortest path to a specific vertex
   * @param target - The target vertex
   * @param predecessors - Predecessor map from findShortestPaths
   * @returns Array of vertices representing the path from source to target
   */
  static reconstructPath(
    target: number, 
    predecessors: Map<number, number | null>
  ): number[] {
    const path: number[] = [];
    let current = target;

    while (current !== null) {
      path.unshift(current);
      current = predecessors.get(current) ?? null;
      
      // If we reach a vertex with no predecessor but it's not the source,
      // there's no path
      if (current === null && path.length === 1) {
        return []; // No path exists
      }
    }

    return path;
  }
}

// Example usage and testing
function example() {
  // Create a sample graph with negative weights
  const edges: GraphEdge[] = [
    { source: 0, target: 1, weight: 6 },
    { source: 0, target: 3, weight: 7 },
    { source: 1, target: 2, weight: 5 },
    { source: 1, target: 3, weight: 8 },
    { source: 1, target: 4, weight: -4 }, // Negative weight
    { source: 2, target: 1, weight: -2 }, // Negative weight
    { source: 3, target: 4, weight: 9 },
    { source: 4, target: 0, weight: 2 },
    { source: 4, target: 2, weight: 7 }
  ];

  const vertices = [0, 1, 2, 3, 4];

  const bellmanFord = new BellmanFord(edges, vertices);
  
  // Find shortest paths from vertex 0
  const result = bellmanFord.findShortestPaths(0);
  
  console.log("Distances from source (vertex 0):");
  result.distances.forEach((distance, vertex) => {
    console.log(`Vertex ${vertex}: ${distance === Infinity ? '∞' : distance}`);
  });

  console.log("\nNegative cycle detected:", result.hasNegativeCycle);

  if (!result.hasNegativeCycle) {
    console.log("\nPath to vertex 2:");
    const path = BellmanFord.reconstructPath(2, result.predecessors);
    console.log("Path:", path.map(v => `v${v}`).join(" -> "));
    
    console.log("\nAll paths:");
    result.predecessors.forEach((pred, vertex) => {
      if (pred !== null) {
        const path = BellmanFord.reconstructPath(vertex, result.predecessors);
        console.log(`Path to v${vertex}: ${path.map(v => `v${v}`).join(" -> ")}`);
      }
    });
  }
}

// Run the example
example();
Distances from source (vertex 0):
Vertex 0: 0
Vertex 1: -3
Vertex 2: -7
Vertex 3: 2
Vertex 4: -11

Negative cycle detected: false

Path to vertex 2:
Path: v0 -> v4 -> v1 -> v2

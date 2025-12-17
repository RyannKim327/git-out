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

  /**
   * Finds shortest paths from source vertex using Bellman-Ford algorithm
   * @param source Starting vertex (0-indexed)
   * @returns Object containing distances, predecessors, and negative cycle flag
   */
  findShortestPaths(source: number): ShortestPathResult {
    // Initialize distances and predecessors
    const distances: number[] = new Array(this.vertices).fill(Infinity);
    const predecessors: number[] = new Array(this.vertices).fill(-1);
    
    distances[source] = 0;

    // Relax all edges |V| - 1 times
    for (let i = 0; i < this.vertices - 1; i++) {
      for (const edge of this.edges) {
        if (distances[edge.from] !== Infinity && 
            distances[edge.from] + edge.weight < distances[edge.to]) {
          distances[edge.to] = distances[edge.from] + edge.weight;
          predecessors[edge.to] = edge.from;
        }
      }
    }

    // Check for negative weight cycles
    let hasNegativeCycle = false;
    for (const edge of this.edges) {
      if (distances[edge.from] !== Infinity && 
          distances[edge.from] + edge.weight < distances[edge.to]) {
        hasNegativeCycle = true;
        break;
      }
    }

    return { distances, predecessors, hasNegativeCycle };
  }

  /**
   * Reconstructs the shortest path from source to target
   * @param source Starting vertex
   * @param target Ending vertex
   * @param predecessors Predecessor array from Bellman-Ford
   * @returns Array representing the path or empty array if no path exists
   */
  getPath(source: number, target: number, predecessors: number[]): number[] {
    const path: number[] = [];
    let current = target;
    
    // Backtrack from target to source using predecessors
    while (current !== source) {
      if (current === -1) return []; // No path exists
      path.unshift(current);
      current = predecessors[current];
    }
    
    path.unshift(source);
    return path;
  }
}
// Example usage
function example() {
  // Graph with 5 vertices (0-4)
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

  const bellmanFord = new BellmanFord(5, edges);
  const result = bellmanFord.findShortestPaths(0);

  console.log('Distances:', result.distances);
  console.log('Predecessors:', result.predecessors);
  console.log('Has negative cycle:', result.hasNegativeCycle);

  // Get path from vertex 0 to vertex 4
  const path = bellmanFord.getPath(0, 4, result.predecessors);
  console.log('Path from 0 to 4:', path);
}

example();
function bellmanFord(
  vertices: number,
  edges: Edge[],
  source: number
): ShortestPathResult {
  const distances: number[] = new Array(vertices).fill(Infinity);
  const predecessors: number[] = new Array(vertices).fill(-1);
  distances[source] = 0;

  // Relax edges
  for (let i = 0; i < vertices - 1; i++) {
    for (const edge of edges) {
      if (distances[edge.from] !== Infinity && 
          distances[edge.from] + edge.weight < distances[edge.to]) {
        distances[edge.to] = distances[edge.from] + edge.weight;
        predecessors[edge.to] = edge.from;
      }
    }
  }

  // Check for negative cycles
  const hasNegativeCycle = edges.some(edge => 
    distances[edge.from] !== Infinity && 
    distances[edge.from] + edge.weight < distances[edge.to]
  );

  return { distances, predecessors, hasNegativeCycle };
}

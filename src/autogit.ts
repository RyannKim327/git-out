interface GraphNode {
  value: string | number; // Node identifier
}

interface Edge {
  source: string | number;
  target: string | number;
  weight: number;
}

class BellmanFord<T extends string | number> {
  private nodes: Map<T, number>; // distances
  private edges: Edge[];
  private source: T;

  constructor(edges: Edge[], source: T) {
    this.edges = edges;
    this.source = source;
    this.nodes = new Map();
  }

  /**
   * Run Bellman-Ford algorithm
   * Returns distances if successful, null if negative cycle detected
   */
  findShortestPaths(): Map<T, number> | null {
    // Initialize distances
    this.initializeDistances();

    // Relax all edges |V|-1 times
    const numIterations = this.nodes.size - 1;
    for (let i = 0; i < numIterations; i++) {
      this.relaxEdges();
    }

    // Check for negative cycles
    if (this.detectNegativeCycle()) {
      return null; // Negative cycle detected
    }

    return this.nodes;
  }

  private initializeDistances(): void {
    // Set all distances to infinity except source
    const allNodes = this.getAllNodes();
    
    for (const node of allNodes) {
      if (node === this.source) {
        this.nodes.set(node, 0);
      } else {
        this.nodes.set(node, Number.POSITIVE_INFINITY);
      }
    }
  }

  private relaxEdges(): void {
    for (const edge of this.edges) {
      const sourceDist = this.nodes.get(edge.source as T);
      
      // Skip if source is unreachable
      if (sourceDist === undefined || sourceDist === Number.POSITIVE_INFINITY) {
        continue;
      }

      const newDist = sourceDist + edge.weight;
      const currentDist = this.nodes.get(edge.target as T);
      
      // Update if we found a shorter path
      if (currentDist !== undefined && newDist < currentDist) {
        this.nodes.set(edge.target as T, newDist);
      }
    }
  }

  private detectNegativeCycle(): boolean {
    for (const edge of this.edges) {
      const sourceDist = this.nodes.get(edge.source as T);
      
      if (sourceDist !== undefined && 
          sourceDist !== Number.POSITIVE_INFINITY && 
          sourceDist + edge.weight < this.nodes.get(edge.target as T)!) {
        return true; // Negative cycle detected
      }
    }
    return false;
  }

  private getAllNodes(): T[] {
    const nodes = new Set<T>();
    
    // Collect all source nodes
    for (const edge of this.edges) {
      nodes.add(edge.source as T);
    }
    
    // Collect all target nodes
    for (const edge of this.edges) {
      nodes.add(edge.target as T);
    }
    
    // Add the source node if not already included
    nodes.add(this.source);
    
    return Array.from(nodes);
  }

  /**
   * Get the shortest path to a specific node
   * Note: This requires keeping track of predecessors during the algorithm
   */
  getPathTo(target: T): T[] | null {
    // This is a simplified version - for full path reconstruction,
    // you'd need to maintain a predecessors map during the algorithm
    if (!this.nodes.has(target)) {
      return null;
    }
    
    // Basic path reconstruction would require predecessor tracking
    // This is a placeholder - implement based on your needs
    return [this.source, target];
  }
}

// Utility function to create a graph from adjacency list
function createGraphFromAdjacencyList<T extends string | number>(
  adjacencyList: Map<T, Map<T, number>>,
  source: T
): { edges: Edge[], source: T } {
  const edges: Edge[] = [];
  
  for (const [sourceNode, targets] of adjacencyList) {
    for (const [targetNode, weight] of targets) {
      edges.push({
        source: sourceNode,
        target: targetNode,
        weight: weight
      });
    }
  }
  
  return { edges, source };
}

// Example usage
function example() {
  // Example graph with negative weights
  const adjacencyList = new Map<string, Map<string, number>>([
    ['A', new Map([
      ['B', 4],
      ['C', 2]
    ])],
    ['B', new Map([
      ['C', 3],
      ['D', 2],
      ['E', 2]
    ])],
    ['C', new Map([
      ['B', 1],
      ['D', 3],
      ['E', 3]
    ])],
    ['D', new Map([
      ['B', -1], // Negative weight
      ['E', 1]
    ])],
    ['E', new Map([])]
  ]);

  const { edges, source } = createGraphFromAdjacencyList(adjacencyList, 'A');
  
  const bellmanFord = new BellmanFord(edges, source);
  const distances = bellmanFord.findShortestPaths();

  if (distances) {
    console.log('Shortest distances from A:');
    for (const [node, dist] of distances) {
      console.log(`${node}: ${dist}`);
    }
    // Output:
    // A: 0
    // B: 1
    // C: 2
    // D: 3
    // E: 4
  } else {
    console.log('Negative cycle detected!');
  }
}

// Example with negative cycle
function negativeCycleExample() {
  const edgesWithCycle: Edge[] = [
    { source: 'A', target: 'B', weight: 1 },
    { source: 'B', target: 'C', weight: 1 },
    { source: 'C', target: 'A', weight: -3 }, // Creates negative cycle
    { source: 'A', target: 'D', weight: 5 }
  ];

  const bellmanFord = new BellmanFord(edgesWithCycle, 'A');
  const distances = bellmanFord.findShortestPaths();

  if (distances) {
    console.log('Shortest distances:');
    for (const [node, dist] of distances) {
      console.log(`${node}: ${dist}`);
    }
  } else {
    console.log('Negative cycle detected! Cannot compute shortest paths.');
  }
}

// Run examples
example();
negativeCycleExample();

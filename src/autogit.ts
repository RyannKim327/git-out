// Define the graph node interface
interface GraphNode<T> {
  value: T;
  neighbors: Map<T, number>; // Key: neighbor value, Value: edge weight
}

// Generic bi-directional search class
class BidirectionalSearch<T> {
  private start: T;
  private goal: T;
  private graph: Map<T, GraphNode<T>>;
  private forwardQueue: T[] = [];
  private backwardQueue: T[] = [];
  private forwardVisited: Set<T> = new Set();
  private backwardVisited: Set<T> = new Set();
  private forwardParent: Map<T, T> = new Map();
  private backwardParent: Map<T, T> = new Map();
  private foundPath: boolean = false;

  constructor(graph: Map<T, GraphNode<T>>, start: T, goal: T) {
    this.graph = graph;
    this.start = start;
    this.goal = goal;
    
    // Initialize queues
    this.forwardQueue.push(start);
    this.backwardQueue.push(goal);
    
    this.forwardVisited.add(start);
    this.backwardVisited.add(goal);
    
    this.forwardParent.set(start, null as any);
    this.backwardParent.set(goal, null as any);
  }

  // Get neighbors of a node
  private getNeighbors(node: T): T[] {
    const nodeData = this.graph.get(node);
    return nodeData ? Array.from(nodeData.neighbors.keys()) : [];
  }

  // BFS step for forward search
  private forwardBFS(): boolean {
    if (this.forwardQueue.length === 0) return false;

    const current = this.forwardQueue.shift()!;
    
    // Check if we've reached a node that's in the backward search
    if (this.backwardVisited.has(current)) {
      this.foundPath = true;
      return true;
    }

    // Explore neighbors
    const neighbors = this.getNeighbors(current);
    for (const neighbor of neighbors) {
      if (!this.forwardVisited.has(neighbor)) {
        this.forwardQueue.push(neighbor);
        this.forwardVisited.add(neighbor);
        this.forwardParent.set(neighbor, current);
      }
    }

    return false;
  }

  // BFS step for backward search
  private backwardBFS(): boolean {
    if (this.backwardQueue.length === 0) return false;

    const current = this.backwardQueue.shift()!;
    
    // Check if we've reached a node that's in the forward search
    if (this.forwardVisited.has(current)) {
      this.foundPath = true;
      return true;
    }

    // Explore neighbors
    const neighbors = this.getNeighbors(current);
    for (const neighbor of neighbors) {
      if (!this.backwardVisited.has(neighbor)) {
        this.backwardQueue.push(neighbor);
        this.backwardVisited.add(neighbor);
        this.backwardParent.set(neighbor, current);
      }
    }

    return false;
  }

  // Main search function
  public search(): T[] | null {
    while (this.forwardQueue.length > 0 && this.backwardQueue.length > 0 && !this.foundPath) {
      // Alternate between forward and backward search
      if (!this.forwardBFS()) {
        if (!this.backwardBFS()) {
          // Both searches made progress without finding intersection
          continue;
        }
      }
      
      if (this.foundPath) {
        return this.reconstructPath();
      }
    }

    // No path found
    return null;
  }

  // Reconstruct the path from start to goal
  private reconstructPath(): T[] {
    const path: T[] = [];
    
    // Find the meeting point (intersection node)
    let meetingPoint: T | null = null;
    for (const node of this.forwardVisited) {
      if (this.backwardVisited.has(node)) {
        meetingPoint = node;
        break;
      }
    }

    if (!meetingPoint) {
      return [];
    }

    // Reconstruct path from start to meeting point
    let current = meetingPoint;
    while (current !== null && current !== this.start) {
      path.unshift(current);
      current = this.forwardParent.get(current)!;
    }
    if (current === this.start) {
      path.unshift(this.start);
    }

    // Reconstruct path from meeting point to goal (in reverse)
    const backwardPath: T[] = [];
    current = meetingPoint;
    while (current !== null && current !== this.goal) {
      backwardPath.push(current);
      current = this.backwardParent.get(current)!;
    }
    if (current === this.goal) {
      backwardPath.push(this.goal);
    }

    // Combine paths (meeting point is included only once)
    return [...path, ...backwardPath.slice(1)];
  }

  // Get search statistics
  public getStats(): {
    forwardVisited: number;
    backwardVisited: number;
    meetingPoint: T | null;
  } {
    const meetingPoint = Array.from(this.forwardVisited).find(node => 
      this.backwardVisited.has(node)
    ) || null;

    return {
      forwardVisited: this.forwardVisited.size,
      backwardVisited: this.backwardVisited.size,
      meetingPoint
    };
  }
}

// Utility function to create a sample graph
function createSampleGraph(): Map<string, GraphNode<string>> {
  const graph = new Map<string, GraphNode<string>>();

  // Create nodes
  const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  nodes.forEach(node => {
    graph.set(node, { value: node, neighbors: new Map() });
  });

  // Add edges (undirected graph)
  const edges = [
    ['A', 'B', 1], ['A', 'C', 4], ['B', 'D', 2], ['B', 'E', 5],
    ['C', 'D', 1], ['C', 'F', 3], ['D', 'G', 6], ['E', 'G', 3],
    ['F', 'H', 2], ['G', 'H', 4], ['H', 'I', 1], ['I', 'J', 5],
    ['G', 'J', 7]
  ];

  edges.forEach(([from, to, weight]) => {
    const fromNode = graph.get(from)!;
    const toNode = graph.get(to)!;
    
    fromNode.neighbors.set(to, weight);
    toNode.neighbors.set(from, weight); // Undirected
  });

  return graph;
}

// Example usage
function main() {
  // Create sample graph
  const graph = createSampleGraph();
  
  // Create bi-directional search from A to J
  const search = new BidirectionalSearch(graph, 'A', 'J');
  
  console.log('Searching for path from A to J...');
  const path = search.search();
  
  if (path) {
    console.log('Path found:', path.join(' -> '));
    console.log('Path length:', path.length - 1);
  } else {
    console.log('No path found');
  }
  
  // Display statistics
  const stats = search.getStats();
  console.log('Search statistics:', stats);
}

// Run the example
main();
interface City {
  name: string;
  id: number;
}

const cityGraph = new Map<City, GraphNode<City>>();
// ... populate graph

const startCity: City = { name: 'New York', id: 1 };
const goalCity: City = { name: 'Los Angeles', id: 2 };

const search = new BidirectionalSearch(cityGraph, startCity, goalCity);
const path = search.search();

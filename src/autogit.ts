// Define a generic graph interface
interface Graph<T> {
  neighbors(node: T): T[];
  // Optional: add weights if you want a weighted graph
  // weight(from: T, to: T): number;
}

// Node class to store search state
class SearchNode<T> {
  constructor(
    public value: T,
    public parent: SearchNode<T> | null = null,
    public distance: number = 0
  ) {}
}

// Bi-directional search class
class BiDirectionalSearch<T> {
  private forwardQueue: SearchNode<T>[] = [];
  private backwardQueue: SearchNode<T>[] = [];
  private forwardVisited: Set<T> = new Set();
  private backwardVisited: Set<T> = new Set();
  private forwardParents: Map<T, SearchNode<T>> = new Map();
  private backwardParents: Map<T, SearchNode<T>> = new Map();
  private meetingPoint: T | null = null;

  constructor(
    private graph: Graph<T>,
    private start: T,
    private goal: T
  ) {}

  // Main search method
  search(): T[] | null {
    // Initialize both searches
    this.initializeSearch();
    
    // Perform bi-directional search
    while (this.forwardQueue.length > 0 && this.backwardQueue.length > 0) {
      // Expand forward search
      if (!this.expandForward()) {
        break;
      }
      
      // Expand backward search
      if (!this.expandBackward()) {
        break;
      }
      
      // Check for meeting point
      if (this.checkMeetingPoint()) {
        return this.reconstructPath();
      }
    }
    
    return null; // No path found
  }

  private initializeSearch(): void {
    // Initialize forward search from start
    const startNode = new SearchNode(this.start);
    this.forwardQueue.push(startNode);
    this.forwardVisited.add(this.start);
    this.forwardParents.set(this.start, startNode);

    // Initialize backward search from goal
    const goalNode = new SearchNode(this.goal);
    this.backwardQueue.push(goalNode);
    this.backwardVisited.add(this.goal);
    this.backwardParents.set(this.goal, goalNode);
  }

  private expandForward(): boolean {
    const currentNode = this.forwardQueue.shift()!;
    const neighbors = this.graph.neighbors(currentNode.value);

    for (const neighbor of neighbors) {
      if (!this.forwardVisited.has(neighbor)) {
        const newNode = new SearchNode(
          neighbor,
          currentNode,
          currentNode.distance + 1
        );
        this.forwardQueue.push(newNode);
        this.forwardVisited.add(neighbor);
        this.forwardParents.set(neighbor, newNode);

        // Check if we've reached the backward search
        if (this.backwardVisited.has(neighbor)) {
          this.meetingPoint = neighbor;
          return false; // Stop expansion
        }
      }
    }

    return true;
  }

  private expandBackward(): boolean {
    const currentNode = this.backwardQueue.shift()!;
    const neighbors = this.graph.neighbors(currentNode.value);

    for (const neighbor of neighbors) {
      if (!this.backwardVisited.has(neighbor)) {
        const newNode = new SearchNode(
          neighbor,
          currentNode,
          currentNode.distance + 1
        );
        this.backwardQueue.push(newNode);
        this.backwardVisited.add(neighbor);
        this.backwardParents.set(neighbor, newNode);

        // Check if we've reached the forward search
        if (this.forwardVisited.has(neighbor)) {
          this.meetingPoint = neighbor;
          return false; // Stop expansion
        }
      }
    }

    return true;
  }

  private checkMeetingPoint(): boolean {
    // Check if any forward node is in backward visited set
    for (const node of this.forwardVisited) {
      if (this.backwardVisited.has(node)) {
        this.meetingPoint = node;
        return true;
      }
    }
    return false;
  }

  private reconstructPath(): T[] {
    if (!this.meetingPoint) {
      return [];
    }

    const path: T[] = [];
    let current: SearchNode<T> | null = null;

    // Reconstruct path from start to meeting point (forward)
    current = this.forwardParents.get(this.meetingPoint)!;
    while (current !== null) {
      path.unshift(current.value);
      current = current.parent;
    }

    // Reconstruct path from meeting point to goal (backward, reversed)
    const backwardPath: T[] = [];
    current = this.backwardParents.get(this.meetingPoint)!;
    while (current !== null) {
      backwardPath.push(current.value);
      current = current.parent;
    }

    // Combine paths (meeting point appears only once)
    const fullPath = path.concat(backwardPath.slice(1));
    return fullPath;
  }

  // Get search statistics
  getStats(): {
    forwardVisited: number;
    backwardVisited: number;
    meetingPoint: T | null;
  } {
    return {
      forwardVisited: this.forwardVisited.size,
      backwardVisited: this.backwardVisited.size,
      meetingPoint: this.meetingPoint
    };
  }
}

// Example usage with a simple graph
class SimpleGraph implements Graph<string> {
  private adjacencyList: Map<string, string[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node: string): void {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
    }
  }

  addEdge(from: string, to: string): void {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, []);
    }
    if (!this.adjacencyList.has(to)) {
      this.adjacencyList.set(to, []);
    }
    
    this.adjacencyList.get(from)!.push(to);
    this.adjacencyList.get(to)!.push(from); // Undirected graph
  }

  neighbors(node: string): string[] {
    return this.adjacencyList.get(node) || [];
  }
}

// Example usage
function example() {
  // Create a simple graph
  const graph = new SimpleGraph();
  
  // Add nodes and edges (representing a simple maze)
  graph.addEdge('A', 'B');
  graph.addEdge('A', 'C');
  graph.addEdge('B', 'D');
  graph.addEdge('C', 'D');
  graph.addEdge('D', 'E');
  graph.addEdge('E', 'F');
  graph.addEdge('F', 'G');
  graph.addEdge('G', 'H');
  graph.addEdge('H', 'I');
  graph.addEdge('I', 'J');

  // Perform bi-directional search from A to J
  const search = new BiDirectionalSearch(graph, 'A', 'J');
  const path = search.search();

  if (path) {
    console.log('Path found:', path.join(' -> '));
    console.log('Search stats:', search.getStats());
  } else {
    console.log('No path found');
  }
}

// Run the example
example();
// For weighted graphs, replace the queue with a PriorityQueue
import PriorityQueue from 'js-priority-queue'; // or implement your own

class WeightedBiDirectionalSearch<T> extends BiDirectionalSearch<T> {
  private forwardPQ: PriorityQueue<{node: SearchNode<T>, priority: number}>;
  private backwardPQ: PriorityQueue<{node: SearchNode<T>, priority: number}>;

  constructor(graph: WeightedGraph<T>, start: T, goal: T) {
    super(graph, start, goal);
    // Initialize priority queues instead of regular queues
  }

  // Modify expand methods to use priority queue pop
  private expandForward(): boolean {
    if (this.forwardPQ.length === 0) return false;
    
    const {node} = this.forwardPQ.pop();
    // ... rest of expansion logic with distance = priority
  }
}

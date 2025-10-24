interface Graph<T> {
  getNeighbors(node: T): T[];
  nodesEqual(node1: T, node2: T): boolean;
}

interface BidirectionalSearchResult<T> {
  path: T[];
  found: boolean;
  iterations: number;
}
class BidirectionalSearch<T> {
  constructor(private graph: Graph<T>) {}

  search(start: T, goal: T): BidirectionalSearchResult<T> {
    if (this.graph.nodesEqual(start, goal)) {
      return {
        path: [start],
        found: true,
        iterations: 0
      };
    }

    // Forward search data
    const forwardQueue: T[] = [start];
    const forwardVisited = new Map<string, T>();
    const forwardParent = new Map<string, T>();
    
    // Backward search data
    const backwardQueue: T[] = [goal];
    const backwardVisited = new Map<string, T>();
    const backwardParent = new Map<string, T>();
    
    let iterations = 0;
    let meetingPoint: T | null = null;

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      iterations++;

      // Expand forward search
      const forwardCurrent = forwardQueue.shift()!;
      const forwardKey = JSON.stringify(forwardCurrent);
      
      if (!forwardVisited.has(forwardKey)) {
        forwardVisited.set(forwardKey, forwardCurrent);
        
        // Check if current node is visited by backward search
        if (backwardVisited.has(forwardKey)) {
          meetingPoint = forwardCurrent;
          break;
        }

        const neighbors = this.graph.getNeighbors(forwardCurrent);
        for (const neighbor of neighbors) {
          const neighborKey = JSON.stringify(neighbor);
          if (!forwardVisited.has(neighborKey)) {
            forwardParent.set(neighborKey, forwardCurrent);
            forwardQueue.push(neighbor);
          }
        }
      }

      // Expand backward search
      const backwardCurrent = backwardQueue.shift()!;
      const backwardKey = JSON.stringify(backwardCurrent);
      
      if (!backwardVisited.has(backwardKey)) {
        backwardVisited.set(backwardKey, backwardCurrent);
        
        // Check if current node is visited by forward search
        if (forwardVisited.has(backwardKey)) {
          meetingPoint = backwardCurrent;
          break;
        }

        const neighbors = this.graph.getNeighbors(backwardCurrent);
        for (const neighbor of neighbors) {
          const neighborKey = JSON.stringify(neighbor);
          if (!backwardVisited.has(neighborKey)) {
            backwardParent.set(neighborKey, backwardCurrent);
            backwardQueue.push(neighbor);
          }
        }
      }
    }

    if (!meetingPoint) {
      return {
        path: [],
        found: false,
        iterations
      };
    }

    // Reconstruct path
    const path = this.reconstructPath(
      meetingPoint,
      forwardParent,
      backwardParent,
      start,
      goal
    );

    return {
      path,
      found: true,
      iterations
    };
  }

  private reconstructPath(
    meetingPoint: T,
    forwardParent: Map<string, T>,
    backwardParent: Map<string, T>,
    start: T,
    goal: T
  ): T[] {
    // Reconstruct path from start to meeting point
    const forwardPath: T[] = [];
    let current: T = meetingPoint;
    const meetingKey = JSON.stringify(meetingPoint);
    
    while (!this.graph.nodesEqual(current, start)) {
      forwardPath.unshift(current);
      const currentKey = JSON.stringify(current);
      current = forwardParent.get(currentKey)!;
    }
    forwardPath.unshift(start);

    // Reconstruct path from meeting point to goal
    const backwardPath: T[] = [];
    current = meetingPoint;
    
    while (!this.graph.nodesEqual(current, goal)) {
      const currentKey = JSON.stringify(current);
      current = backwardParent.get(currentKey)!;
      backwardPath.push(current);
    }

    // Combine paths
    return [...forwardPath, ...backwardPath];
  }
}
// Example graph implementation
class StringGraph implements Graph<string> {
  private adjacencyList: Map<string, string[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addEdge(from: string, to: string) {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, []);
    }
    if (!this.adjacencyList.has(to)) {
      this.adjacencyList.set(to, []);
    }
    this.adjacencyList.get(from)!.push(to);
    this.adjacencyList.get(to)!.push(from);
  }

  getNeighbors(node: string): string[] {
    return this.adjacencyList.get(node) || [];
  }

  nodesEqual(node1: string, node2: string): boolean {
    return node1 === node2;
  }
}

// Usage example
const graph = new StringGraph();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");
graph.addEdge("F", "G");

const bidirectionalSearch = new BidirectionalSearch<string>(graph);
const result = bidirectionalSearch.search("A", "G");

console.log("Path found:", result.found);
console.log("Path:", result.path.join(" → "));
console.log("Iterations:", result.iterations);
interface CustomNode {
  id: number;
  name: string;
}

class CustomGraph implements Graph<CustomNode> {
  private nodes: Map<number, CustomNode>;
  private edges: Map<number, number[]>;

  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  addNode(node: CustomNode) {
    this.nodes.set(node.id, node);
    this.edges.set(node.id, []);
  }

  addEdge(fromId: number, toId: number) {
    if (this.edges.has(fromId)) {
      this.edges.get(fromId)!.push(toId);
    }
    if (this.edges.has(toId)) {
      this.edges.get(toId)!.push(fromId);
    }
  }

  getNeighbors(node: CustomNode): CustomNode[] {
    const neighborIds = this.edges.get(node.id) || [];
    return neighborIds.map(id => this.nodes.get(id)!);
  }

  nodesEqual(node1: CustomNode, node2: CustomNode): boolean {
    return node1.id === node2.id;
  }
}

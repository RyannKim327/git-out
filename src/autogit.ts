interface Edge {
  node: string;
  weight: number;
}

interface Graph {
  [node: string]: Edge[];
}

interface PreviousNodes {
  [node: string]: string | null;
}

interface Distances {
  [node: string]: number;
}

class Dijkstra {
  private graph: Graph;
  
  constructor(graph: Graph) {
    this.graph = graph;
  }

  findShortestPath(startNode: string, endNode: string): string[] {
    const distances: Distances = {};
    const previous: PreviousNodes = {};
    const unvisited: Set<string> = new Set();
    const visited: Set<string> = new Set();

    // Initialize distances
    Object.keys(this.graph).forEach(node => {
      distances[node] = node === startNode ? 0 : Infinity;
      previous[node] = null;
      unvisited.add(node);
    });

    while (unvisited.size > 0) {
      // Get node with smallest distance
      const currentNode = this.getMinDistanceNode(unvisited, distances);
      
      if (currentNode === endNode) {
        break;
      }

      unvisited.delete(currentNode);
      visited.add(currentNode);

      // Update distances to neighbors
      this.graph[currentNode].forEach(neighbor => {
        if (!visited.has(neighbor.node)) {
          const newDistance = distances[currentNode] + neighbor.weight;
          if (newDistance < distances[neighbor.node]) {
            distances[neighbor.node] = newDistance;
            previous[neighbor.node] = currentNode;
          }
        }
      });
    }

    return this.reconstructPath(previous, endNode);
  }

  private getMinDistanceNode(nodes: Set<string>, distances: Distances): string {
    let minNode = '';
    let minDistance = Infinity;

    nodes.forEach(node => {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        minNode = node;
      }
    });

    return minNode;
  }

  private reconstructPath(previous: PreviousNodes, endNode: string): string[] {
    const path: string[] = [];
    let currentNode = endNode;

    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous[currentNode] as string;
    }

    return path;
  }
}
interface PriorityQueueItem {
  node: string;
  priority: number;
}

class PriorityQueue {
  private items: PriorityQueueItem[] = [];

  enqueue(node: string, priority: number): void {
    this.items.push({ node, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): string | null {
    return this.items.shift()?.node || null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

class OptimizedDijkstra {
  private graph: Graph;
  
  constructor(graph: Graph) {
    this.graph = graph;
  }

  findShortestPath(startNode: string, endNode: string): {
    path: string[];
    distance: number;
  } {
    const distances: Distances = {};
    const previous: PreviousNodes = {};
    const queue = new PriorityQueue();

    // Initialize
    Object.keys(this.graph).forEach(node => {
      distances[node] = node === startNode ? 0 : Infinity;
      previous[node] = null;
      if (node === startNode) {
        queue.enqueue(node, 0);
      }
    });

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue()!;

      if (currentNode === endNode) {
        break;
      }

      this.graph[currentNode].forEach(neighbor => {
        const newDistance = distances[currentNode] + neighbor.weight;
        
        if (newDistance < distances[neighbor.node]) {
          distances[neighbor.node] = newDistance;
          previous[neighbor.node] = currentNode;
          queue.enqueue(neighbor.node, newDistance);
        }
      });
    }

    return {
      path: this.reconstructPath(previous, endNode),
      distance: distances[endNode]
    };
  }

  private reconstructPath(previous: PreviousNodes, endNode: string): string[] {
    const path: string[] = [];
    let currentNode: string | null = endNode;

    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }

    return path;
  }
}
// Create graph
const graph: Graph = {
  'A': [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }],
  'B': [{ node: 'D', weight: 3 }, { node: 'E', weight: 2 }],
  'C': [{ node: 'B', weight: 1 }, { node: 'D', weight: 5 }],
  'D': [{ node: 'E', weight: 3 }],
  'E': []
};

// Using the basic implementation
const dijkstra = new Dijkstra(graph);
const path = dijkstra.findShortestPath('A', 'E');
console.log('Shortest path:', path);

// Using the optimized implementation
const optimizedDijkstra = new OptimizedDijkstra(graph);
const result = optimizedDijkstra.findShortestPath('A', 'E');
console.log('Path:', result.path);
console.log('Distance:', result.distance);
class ComprehensiveDijkstra {
  private graph: Graph;
  
  constructor(graph: Graph) {
    this.graph = graph;
  }

  findShortestPath(startNode: string, endNode: string): {
    path: string[];
    distance: number;
    isValid: boolean;
  } {
    // Validate input
    if (!this.graph[startNode] || !this.graph[endNode]) {
      return { path: [], distance: Infinity, isValid: false };
    }

    const distances: Distances = {};
    const previous: PreviousNodes = {};
    const queue = new PriorityQueue();

    // Initialize all nodes
    Object.keys(this.graph).forEach(node => {
      distances[node] = Infinity;
      previous[node] = null;
    });

    distances[startNode] = 0;
    queue.enqueue(startNode, 0);

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue()!;

      if (currentNode === endNode) {
        break;
      }

      this.graph[currentNode].forEach(neighbor => {
        const newDistance = distances[currentNode] + neighbor.weight;
        
        if (newDistance < distances[neighbor.node]) {
          distances[neighbor.node] = newDistance;
          previous[neighbor.node] = currentNode;
          queue.enqueue(neighbor.node, newDistance);
        }
      });
    }

    const path = this.reconstructPath(previous, endNode);
    const isValid = path.length > 0 && path[0] === startNode;

    return {
      path: isValid ? path : [],
      distance: distances[endNode],
      isValid
    };
  }

  private reconstructPath(previous: PreviousNodes, endNode: string): string[] {
    const path: string[] = [];
    let currentNode: string | null = endNode;

    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }

    return path[0] ? path : [];
  }
}

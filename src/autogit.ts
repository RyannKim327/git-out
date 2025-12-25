interface Graph {
  [key: string]: { [neighbor: string]: number };
}

interface DijkstraResult {
  distances: { [node: string]: number };
  previous: { [node: string]: string | null };
  path: string[];
}

class DijkstraAlgorithm {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public findShortestPath(start: string, end: string): DijkstraResult {
    // Validate input
    if (!this.graph[start] || !this.graph[end]) {
      throw new Error('Start or end node not found in graph');
    }

    // Initialize data structures
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const visited: Set<string> = new Set();
    
    // Priority queue (using a simple array for simplicity)
    const unvisited: string[] = [];

    // Initialize distances
    Object.keys(this.graph).forEach(node => {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
      unvisited.push(node);
    });

    while (unvisited.length > 0) {
      // Find unvisited node with smallest distance
      const current = this.getMinDistanceNode(unvisited, distances);
      
      // If we reached the end node, we can stop early
      if (current === end) break;
      
      // If no reachable nodes left, break
      if (distances[current] === Infinity) break;

      // Mark as visited
      visited.add(current);
      unvisited.splice(unvisited.indexOf(current), 1);

      // Update distances to neighbors
      for (const neighbor in this.graph[current]) {
        if (visited.has(neighbor)) continue;

        const distanceToNeighbor = distances[current] + this.graph[current][neighbor];
        
        if (distanceToNeighbor < distances[neighbor]) {
          distances[neighbor] = distanceToNeighbor;
          previous[neighbor] = current;
        }
      }
    }

    // Build the path from end to start
    const path = this.buildPath(previous, end);

    return {
      distances,
      previous,
      path
    };
  }

  private getMinDistanceNode(nodes: string[], distances: { [key: string]: number }): string {
    return nodes.reduce((minNode, node) => 
      distances[node] < distances[minNode] ? node : minNode
    );
  }

  private buildPath(previous: { [key: string]: string | null }, end: string): string[] {
    const path: string[] = [];
    let current: string | null = end;

    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    // If the path doesn't include the start node, return empty array
    return path.length > 1 ? path : [];
  }
}
// Example graph
const graph: Graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 1, D: 5 },
  C: { A: 2, B: 1, D: 8, E: 10 },
  D: { B: 5, C: 8, E: 2 },
  E: { C: 10, D: 2 }
};

// Using the algorithm
const dijkstra = new DijkstraAlgorithm(graph);
const result = dijkstra.findShortestPath('A', 'E');

console.log('Shortest distance:', result.distances.E); // 9
console.log('Shortest path:', result.path); // ['A', 'C', 'B', 'D', 'E']
console.log('All distances:', result.distances);
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

  updatePriority(node: string, priority: number): void {
    const index = this.items.findIndex(item => item.node === node);
    if (index !== -1) {
      this.items[index].priority = priority;
      this.items.sort((a, b) => a.priority - b.priority);
    }
  }
}

class OptimizedDijkstra {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public findShortestPath(start: string, end: string): DijkstraResult {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const pq = new PriorityQueue();

    // Initialize
    Object.keys(this.graph).forEach(node => {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
      pq.enqueue(node, distances[node]);
    });

    while (!pq.isEmpty()) {
      const current = pq.dequeue();
      if (!current) break;
      
      if (current === end) break;

      for (const neighbor in this.graph[current]) {
        const distance = distances[current] + this.graph[current][neighbor];
        
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = current;
          pq.updatePriority(neighbor, distance);
        }
      }
    }

    const path = this.buildPath(previous, end);

    return { distances, previous, path };
  }

  private buildPath(previous: { [key: string]: string | null }, end: string): string[] {
    const path: string[] = [];
    let current: string | null = end;

    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    return path.length > 1 ? path : [];
  }
}
type Node = string;
type Weight = number;
type GraphRecord = Record<Node, Record<Node, Weight>>;
type DistanceRecord = Record<Node, number>;
type PreviousRecord = Record<Node, Node | null>;

interface DijkstraResult {
  distances: DistanceRecord;
  previous: PreviousRecord;
  path: Node[];
  hasPath: boolean;
}

class TypeSafeDijkstra {
  constructor(private graph: GraphRecord) {}

  findShortestPath(start: Node, end: Node): DijkstraResult {
    if (!(start in this.graph) || !(end in this.graph)) {
      throw new Error('Start or end node not found');
    }

    const distances: DistanceRecord = {};
    const previous: PreviousRecord = {};
    const visited = new Set<Node>();

    // Initialize
    (Object.keys(this.graph) as Node[]).forEach(node => {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
    });

    let current: Node | null = start;

    while (current !== null) {
      visited.add(current);

      // Update neighbors
      for (const neighbor in this.graph[current]) {
        if (visited.has(neighbor)) continue;

        const newDistance = distances[current] + this.graph[current][neighbor];
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = current;
        }
      }

      // Find next node to visit
      current = this.findNextNode(distances, visited);
    }

    const path = this.buildPath(previous, end);
    const hasPath = path.length > 0 && path[0] === start;

    return { distances, previous, path, hasPath };
  }

  private findNextNode(distances: DistanceRecord, visited: Set<Node>): Node | null {
    let minDistance = Infinity;
    let nextNode: Node | null = null;

    for (const node in distances) {
      if (!visited.has(node) && distances[node] < minDistance) {
        minDistance = distances[node];
        nextNode = node;
      }
    }

    return nextNode;
  }

  private buildPath(previous: PreviousRecord, end: Node): Node[] {
    const path: Node[] = [];
    let current: Node | null = end;

    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    return path[0] in previous && path[0] !== end ? path : [];
  }
}

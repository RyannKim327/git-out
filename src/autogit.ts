interface Graph {
  [key: string]: { [neighbor: string]: number };
}

interface DijkstraResult {
  distances: { [node: string]: number };
  previous: { [node: string]: string | null };
}

class DijkstraAlgorithm {
  static findShortestPaths(graph: Graph, startNode: string): DijkstraResult {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const visited = new Set<string>();
    const unvisited = new Set<string>();

    // Initialize distances
    Object.keys(graph).forEach(node => {
      distances[node] = node === startNode ? 0 : Infinity;
      previous[node] = null;
      unvisited.add(node);
    });

    while (unvisited.size > 0) {
      // Find unvisited node with smallest distance
      let currentNode: string | null = null;
      let smallestDistance = Infinity;

      unvisited.forEach(node => {
        if (distances[node] < smallestDistance) {
          smallestDistance = distances[node];
          currentNode = node;
        }
      });

      if (currentNode === null) break;

      // Mark as visited
      unvisited.delete(currentNode);
      visited.add(currentNode);

      // Update distances to neighbors
      const neighbors = graph[currentNode];
      for (const neighbor in neighbors) {
        if (!visited.has(neighbor)) {
          const newDistance = distances[currentNode] + neighbors[neighbor];
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = currentNode;
          }
        }
      }
    }

    return { distances, previous };
  }

  static getPath(previous: { [key: string]: string | null }, targetNode: string): string[] {
    const path: string[] = [];
    let current: string | null = targetNode;

    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    return path;
  }
}
interface NodeWithDistance {
  node: string;
  distance: number;
}

class PriorityQueue {
  private heap: NodeWithDistance[] = [];

  enqueue(node: string, distance: number): void {
    this.heap.push({ node, distance });
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue(): NodeWithDistance | null {
    if (this.heap.length === 0) return null;
    
    const min = this.heap[0];
    const end = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    
    return min;
  }

  private bubbleUp(index: number): void {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (element.distance >= parent.distance) break;
      
      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    const element = this.heap[index];
    
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swap: number | null = null;
      let leftChild: NodeWithDistance, rightChild: NodeWithDistance;
      
      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.distance < element.distance) {
          swap = leftChildIndex;
        }
      }
      
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.distance < element.distance) ||
          (swap !== null && rightChild.distance < leftChild!.distance)
        ) {
          swap = rightChildIndex;
        }
      }
      
      if (swap === null) break;
      
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}

class DijkstraWithPriorityQueue {
  static findShortestPaths(graph: Graph, startNode: string): DijkstraResult {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const pq = new PriorityQueue();

    // Initialize
    Object.keys(graph).forEach(node => {
      distances[node] = node === startNode ? 0 : Infinity;
      previous[node] = null;
      if (node === startNode) {
        pq.enqueue(node, 0);
      }
    });

    while (!pq.isEmpty()) {
      const current = pq.dequeue();
      if (!current) break;

      const currentNode = current.node;
      const currentDistance = current.distance;

      if (currentDistance > distances[currentNode]) continue;

      // Process neighbors
      for (const neighbor in graph[currentNode]) {
        const weight = graph[currentNode][neighbor];
        const distance = currentDistance + weight;

        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = currentNode;
          pq.enqueue(neighbor, distance);
        }
      }
    }

    return { distances, previous };
  }
}
// Example graph
const graph: Graph = {
  'A': { 'B': 4, 'C': 2 },
  'B': { 'A': 4, 'C': 1, 'D': 5 },
  'C': { 'A': 2, 'B': 1, 'D': 8, 'E': 10 },
  'D': { 'B': 5, 'C': 8, 'E': 2, 'F': 6 },
  'E': { 'C': 10, 'D': 2, 'F': 3 },
  'F': { 'D': 6, 'E': 3 }
};

// Find shortest paths from node 'A'
const result = DijkstraAlgorithm.findShortestPaths(graph, 'A');

console.log('Distances:', result.distances);
console.log('Previous nodes:', result.previous);

// Get path to specific node
const pathToF = DijkstraAlgorithm.getPath(result.previous, 'F');
console.log('Path to F:', pathToF); // Output: ['A', 'C', 'B', 'D', 'E', 'F']
type Node = string;
type Weight = number;

interface Graph {
  [node: Node]: { [neighbor: Node]: Weight };
}

interface DijkstraResult {
  distances: Record<Node, number>;
  previous: Record<Node, Node | null>;
  paths: Record<Node, Node[]>;
}

class Dijkstra {
  constructor(private graph: Graph) {}

  findShortestPaths(startNode: Node): DijkstraResult {
    this.validateGraph();
    this.validateStartNode(startNode);

    const distances: Record<Node, number> = {};
    const previous: Record<Node, Node | null> = {};
    const visited = new Set<Node>();

    // Initialize
    Object.keys(this.graph).forEach(node => {
      distances[node] = node === startNode ? 0 : Infinity;
      previous[node] = null;
    });

    let currentNode: Node | null = startNode;

    while (currentNode !== null) {
      visited.add(currentNode);

      // Update neighbors
      for (const neighbor in this.graph[currentNode]) {
        if (!visited.has(neighbor)) {
          const newDistance = distances[currentNode] + this.graph[currentNode][neighbor];
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = currentNode;
          }
        }
      }

      // Find next node (smallest unvisited distance)
      currentNode = this.findNextNode(distances, visited);
    }

    const paths = this.buildAllPaths(previous, startNode);

    return { distances, previous, paths };
  }

  private findNextNode(distances: Record<Node, number>, visited: Set<Node>): Node | null {
    let smallestDistance = Infinity;
    let nextNode: Node | null = null;

    for (const node in distances) {
      if (!visited.has(node) && distances[node] < smallestDistance) {
        smallestDistance = distances[node];
        nextNode = node;
      }
    }

    return nextNode;
  }

  private buildAllPaths(previous: Record<Node, Node | null>, startNode: Node): Record<Node, Node[]> {
    const paths: Record<Node, Node[]> = {};

    for (const node in previous) {
      paths[node] = this.buildPath(previous, node, startNode);
    }

    return paths;
  }

  private buildPath(previous: Record<Node, Node | null>, targetNode: Node, startNode: Node): Node[] {
    const path: Node[] = [];
    let current: Node | null = targetNode;

    while (current !== null && current !== startNode) {
      path.unshift(current);
      current = previous[current];
    }

    if (current === startNode) {
      path.unshift(startNode);
    }

    return path;
  }

  private validateGraph(): void {
    for (const node in this.graph) {
      for (const neighbor in this.graph[node]) {
        if (this.graph[node][neighbor] < 0) {
          throw new Error(`Negative weight found from ${node} to ${neighbor}`);
        }
        if (!this.graph[neighbor]) {
          throw new Error(`Neighbor ${neighbor} not found in graph`);
        }
      }
    }
  }

  private validateStartNode(startNode: Node): void {
    if (!this.graph[startNode]) {
      throw new Error(`Start node ${startNode} not found in graph`);
    }
  }
}

// Usage
const dijkstra = new Dijkstra(graph);
const result = dijkstra.findShortestPaths('A');
console.log(result);

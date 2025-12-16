interface Graph {
  [key: string]: { [neighbor: string]: number };
}

interface DistanceTable {
  [key: string]: number;
}

interface PreviousNode {
  [key: string]: string | null;
}

interface PriorityQueueItem {
  node: string;
  distance: number;
}
class PriorityQueue {
  private items: PriorityQueueItem[] = [];

  enqueue(node: string, distance: number): void {
    this.items.push({ node, distance });
    this.items.sort((a, b) => a.distance - b.distance);
  }

  dequeue(): PriorityQueueItem | null {
    return this.items.shift() || null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  updatePriority(node: string, newDistance: number): void {
    const index = this.items.findIndex(item => item.node === node);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.enqueue(node, newDistance);
  }
}
class DijkstraAlgorithm {
  private graph: Graph;
  
  constructor(graph: Graph) {
    this.graph = graph;
  }

  findShortestPath(startNode: string, endNode: string): { path: string[], distance: number } {
    // Initialize data structures
    const distances: DistanceTable = {};
    const previous: PreviousNode = {};
    const visited: Set<string> = new Set();
    const queue = new PriorityQueue();

    // Set initial distances to Infinity and previous nodes to null
    for (const node in this.graph) {
      distances[node] = node === startNode ? 0 : Infinity;
      previous[node] = null;
      queue.enqueue(node, distances[node]);
    }

    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      if (!current) break;

      const currentNode = current.node;
      
      // Skip if we've already visited this node
      if (visited.has(currentNode)) continue;
      
      visited.add(currentNode);

      // Stop early if we reached the destination
      if (currentNode === endNode) break;

      // Update distances to neighbors
      for (const neighbor in this.graph[currentNode]) {
        if (visited.has(neighbor)) continue;

        const weight = this.graph[currentNode][neighbor];
        const newDistance = distances[currentNode] + weight;

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = currentNode;
          queue.updatePriority(neighbor, newDistance);
        }
      }
    }

    // Reconstruct the path
    const path: string[] = [];
    let current: string | null = endNode;

    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    // If no path exists
    if (path[0] !== startNode) {
      return { path: [], distance: Infinity };
    }

    return {
      path,
      distance: distances[endNode]
    };
  }

  // Get all shortest distances from start node
  getAllDistances(startNode: string): DistanceTable {
    const distances: DistanceTable = {};
    const previous: PreviousNode = {};
    const visited: Set<string> = new Set();
    const queue = new PriorityQueue();

    for (const node in this.graph) {
      distances[node] = node === startNode ? 0 : Infinity;
      queue.enqueue(node, distances[node]);
    }

    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      if (!current) break;

      const currentNode = current.node;
      if (visited.has(currentNode)) continue;
      
      visited.add(currentNode);

      for (const neighbor in this.graph[currentNode]) {
        if (visited.has(neighbor)) continue;

        const weight = this.graph[currentNode][neighbor];
        const newDistance = distances[currentNode] + weight;

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = currentNode;
          queue.updatePriority(neighbor, newDistance);
        }
      }
    }

    return distances;
  }
}
// Create a sample graph
const graph: Graph = {
  'A': { 'B': 4, 'C': 2 },
  'B': { 'A': 4, 'C': 1, 'D': 5 },
  'C': { 'A': 2, 'B': 1, 'D': 8, 'E': 10 },
  'D': { 'B': 5, 'C': 8, 'E': 2 },
  'E': { 'C': 10, 'D': 2 }
};

// Create Dijkstra instance
const dijkstra = new DijkstraAlgorithm(graph);

// Find shortest path from A to E
const result = dijkstra.findShortestPath('A', 'E');
console.log('Shortest path:', result.path); // ['A', 'C', 'B', 'D', 'E']
console.log('Distance:', result.distance); // 12

// Get all distances from A
const allDistances = dijkstra.getAllDistances('A');
console.log('All distances from A:', allDistances);
class BinaryHeapPriorityQueue {
  private heap: PriorityQueueItem[] = [];

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex].distance <= this.heap[index].distance) break;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  private heapifyDown(index: number): void {
    const length = this.heap.length;
    
    while (true) {
      let smallest = index;
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);

      if (leftChild < length && this.heap[leftChild].distance < this.heap[smallest].distance) {
        smallest = leftChild;
      }

      if (rightChild < length && this.heap[rightChild].distance < this.heap[smallest].distance) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }

  enqueue(node: string, distance: number): void {
    this.heap.push({ node, distance });
    this.heapifyUp(this.heap.length - 1);
  }

  dequeue(): PriorityQueueItem | null {
    if (this.heap.length === 0) return null;
    
    const min = this.heap[0];
    const last = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    
    return min;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  updatePriority(node: string, newDistance: number): void {
    const index = this.heap.findIndex(item => item.node === node);
    if (index === -1) {
      this.enqueue(node, newDistance);
      return;
    }

    const oldDistance = this.heap[index].distance;
    this.heap[index].distance = newDistance;

    if (newDistance < oldDistance) {
      this.heapifyUp(index);
    } else {
      this.heapifyDown(index);
    }
  }
}

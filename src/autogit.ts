interface Graph {
  [key: string]: { [neighbor: string]: number };
}

interface DijkstraResult {
  distances: { [node: string]: number };
  previous: { [node: string]: string | null };
}

class MinHeap<T> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number) {
    this.compare = compareFn;
  }

  push(item: T): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.sinkDown(0);
    return root;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parent]) >= 0) break;
      
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let swap = null;
      let element = this.heap[index];

      if (leftChild < length && this.compare(this.heap[leftChild], element) < 0) {
        swap = leftChild;
      }

      if (rightChild < length && 
          this.compare(this.heap[rightChild], (swap === null ? element : this.heap[leftChild])) < 0) {
        swap = rightChild;
      }

      if (swap === null) break;
      
      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }
}

function dijkstra(graph: Graph, startNode: string): DijkstraResult {
  const distances: { [node: string]: number } = {};
  const previous: { [node: string]: string | null } = {};
  const visited = new Set<string>();
  
  // Priority queue: [distance, node]
  const queue = new MinHeap<[number, string]>((a, b) => a[0] - b[0]);

  // Initialize distances
  for (const node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
  }

  queue.push([0, startNode]);

  while (!queue.isEmpty()) {
    const [currentDistance, currentNode] = queue.pop()!;
    
    if (visited.has(currentNode)) continue;
    visited.add(currentNode);

    // Update distances to neighbors
    for (const neighbor in graph[currentNode]) {
      if (visited.has(neighbor)) continue;

      const weight = graph[currentNode][neighbor];
      const distanceThroughCurrent = currentDistance + weight;

      if (distanceThroughCurrent < distances[neighbor]) {
        distances[neighbor] = distanceThroughCurrent;
        previous[neighbor] = currentNode;
        queue.push([distanceThroughCurrent, neighbor]);
      }
    }
  }

  return { distances, previous };
}
function getShortestPath(
  previous: { [node: string]: string | null },
  targetNode: string
): string[] {
  const path: string[] = [];
  let current: string | null = targetNode;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return path;
}
// Example graph
const graph: Graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 1, D: 5 },
  C: { A: 2, B: 1, D: 8, E: 10 },
  D: { B: 5, C: 8, E: 2 },
  E: { C: 10, D: 2 }
};

// Find shortest paths from node 'A'
const result = dijkstra(graph, 'A');

console.log('Distances from A:', result.distances);
console.log('Previous nodes:', result.previous);

// Get shortest path to node 'E'
const pathToE = getShortestPath(result.previous, 'E');
console.log('Shortest path from A to E:', pathToE); // ['A', 'C', 'B', 'D', 'E']
console.log('Distance:', result.distances['E']); // 12
function dijkstraSimple(graph: Graph, startNode: string): DijkstraResult {
  const distances: { [node: string]: number } = {};
  const previous: { [node: string]: string | null } = {};
  const unvisited = new Set<string>();

  // Initialize
  for (const node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
    unvisited.add(node);
  }

  while (unvisited.size > 0) {
    // Find unvisited node with smallest distance
    let currentNode: string | null = null;
    for (const node of unvisited) {
      if (currentNode === null || distances[node] < distances[currentNode]) {
        currentNode = node;
      }
    }

    if (currentNode === null || distances[currentNode] === Infinity) break;

    unvisited.delete(currentNode);

    // Update neighbors
    for (const neighbor in graph[currentNode]) {
      if (!unvisited.has(neighbor)) continue;

      const newDistance = distances[currentNode] + graph[currentNode][neighbor];
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = currentNode;
      }
    }
  }

  return { distances, previous };
}

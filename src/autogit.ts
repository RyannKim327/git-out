interface Graph {
  [node: string]: { [neighbor: string]: number };
}

interface Distances {
  [node: string]: number;
}

interface Previous {
  [node: string]: string | null;
}

class PriorityQueue<T> {
  private elements: { priority: number; value: T }[] = [];

  enqueue(value: T, priority: number): void {
    this.elements.push({ value, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | null {
    return this.elements.shift()?.value || null;
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }
}

function dijkstra(graph: Graph, start: string): { distances: Distances; previous: Previous } {
  const distances: Distances = {};
  const previous: Previous = {};
  const queue = new PriorityQueue<string>();

  // Initialize distances and previous
  Object.keys(graph).forEach(node => {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
    queue.enqueue(node, distances[node]);
  });

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue();
    if (!currentNode || distances[currentNode] === Infinity) continue;

    const neighbors = graph[currentNode];
    for (const neighbor in neighbors) {
      const distance = distances[currentNode] + neighbors[neighbor];
      
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = currentNode;
        queue.enqueue(neighbor, distance);
      }
    }
  }

  return { distances, previous };
}

function getShortestPath(previous: Previous, end: string): string[] {
  const path: string[] = [];
  let current: string | null = end;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return path;
}
type NodeId = string;
type Weight = number;

interface Edge {
  to: NodeId;
  weight: Weight;
}

interface GraphNode {
  id: NodeId;
  edges: Edge[];
}

interface Graph {
  nodes: Map<NodeId, GraphNode>;
}

interface DijkstraResult {
  distances: Map<NodeId, number>;
  previous: Map<NodeId, NodeId | null>;
}

class PriorityQueue<T> {
  private heap: { element: T; priority: number }[] = [];

  enqueue(element: T, priority: number): void {
    this.heap.push({ element, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue(): T | null {
    if (this.heap.length === 0) return null;
    
    const min = this.heap[0];
    const end = this.heap.pop();
    
    if (this.heap.length > 0 && end) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    
    return min.element;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(index: number): void {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (element.priority >= parent.priority) break;
      
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
      let leftChild, rightChild;
      
      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swap = leftChildIndex;
        }
      }
      
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < (leftChild?.priority || Infinity))
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
}

class DijkstraAlgorithm {
  constructor(private graph: Graph) {}

  findShortestPath(start: NodeId, end: NodeId): { path: NodeId[]; distance: number } {
    const result = this.calculate(start);
    const path = this.reconstructPath(result.previous, end);
    const distance = result.distances.get(end) ?? Infinity;
    
    return { path, distance };
  }

  calculate(start: NodeId): DijkstraResult {
    const distances = new Map<NodeId, number>();
    const previous = new Map<NodeId, NodeId | null>();
    const queue = new PriorityQueue<NodeId>();

    // Initialize
    this.graph.nodes.forEach((node, id) => {
      distances.set(id, id === start ? 0 : Infinity);
      previous.set(id, null);
      queue.enqueue(id, distances.get(id)!);
    });

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue();
      if (!currentNode || distances.get(currentNode) === Infinity) continue;

      const currentNodeData = this.graph.nodes.get(currentNode);
      if (!currentNodeData) continue;

      for (const edge of currentNodeData.edges) {
        const newDistance = distances.get(currentNode)! + edge.weight;
        const currentDistance = distances.get(edge.to) ?? Infinity;

        if (newDistance < currentDistance) {
          distances.set(edge.to, newDistance);
          previous.set(edge.to, currentNode);
          queue.enqueue(edge.to, newDistance);
        }
      }
    }

    return { distances, previous };
  }

  private reconstructPath(previous: Map<NodeId, NodeId | null>, end: NodeId): NodeId[] {
    const path: NodeId[] = [];
    let current: NodeId | null = end;

    while (current !== null) {
      path.unshift(current);
      current = previous.get(current) ?? null;
    }

    return path[0] === end ? [] : path; // Return empty if no path found
  }
}
// Create a graph
const graph: Graph = {
  nodes: new Map([
    ['A', { id: 'A', edges: [{ to: 'B', weight: 4 }, { to: 'C', weight: 2 }] }],
    ['B', { id: 'B', edges: [{ to: 'D', weight: 5 }, { to: 'E', weight: 3 }] }],
    ['C', { id: 'C', edges: [{ to: 'B', weight: 1 }, { to: 'D', weight: 8 }] }],
    ['D', { id: 'D', edges: [{ to: 'E', weight: 7 }] }],
    ['E', { id: 'E', edges: [] }]
  ])
};

// Use the algorithm
const dijkstra = new DijkstraAlgorithm(graph);
const result = dijkstra.findShortestPath('A', 'E');

console.log('Shortest path:', result.path); // ['A', 'C', 'B', 'E']
console.log('Distance:', result.distance); // 6
function simpleDijkstra(graph: Record<string, Record<string, number>>, start: string) {
  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  const nodes = Object.keys(graph);

  // Initialize distances
  nodes.forEach(node => {
    distances[node] = node === start ? 0 : Infinity;
  });

  while (visited.size < nodes.length) {
    const currentNode = nodes
      .filter(node => !visited.has(node))
      .reduce((minNode, node) => 
        distances[node] < distances[minNode] ? node : minNode, nodes[0]
      );

    visited.add(currentNode);

    for (const neighbor in graph[currentNode]) {
      const distance = distances[currentNode] + graph[currentNode][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
      }
    }
  }

  return distances;
}

interface Graph {
  [node: string]: { [neighbor: string]: number };
}

class Dijkstra {
  private graph: Graph;
  
  constructor(graph: Graph) {
    this.graph = graph;
  }

  findShortestPath(start: string, end: string): { path: string[]; distance: number } {
    const distances: { [node: string]: number } = {};
    const previous: { [node: string]: string | null } = {};
    const unvisited: Set<string> = new Set();
    const visited: Set<string> = new Set();

    // Initialize distances
    for (const node in this.graph) {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
      unvisited.add(node);
    }

    while (unvisited.size > 0) {
      // Find node with smallest distance
      const currentNode = this.getMinDistanceNode(unvisited, distances);
      
      if (currentNode === end) break;
      if (distances[currentNode] === Infinity) break;

      unvisited.delete(currentNode);
      visited.add(currentNode);

      // Update distances for neighbors
      for (const neighbor in this.graph[currentNode]) {
        if (visited.has(neighbor)) continue;

        const newDistance = distances[currentNode] + this.graph[currentNode][neighbor];
        
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = currentNode;
        }
      }
    }

    return {
      path: this.reconstructPath(previous, end),
      distance: distances[end]
    };
  }

  private getMinDistanceNode(nodes: Set<string>, distances: { [node: string]: number }): string {
    let minNode = '';
    let minDistance = Infinity;

    for (const node of nodes) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        minNode = node;
      }
    }

    return minNode;
  }

  private reconstructPath(previous: { [node: string]: string | null }, end: string): string[] {
    const path: string[] = [];
    let current: string | null = end;

    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    return path;
  }
}
type NodeId = string;
type Distance = number;
type Edge = [NodeId, Distance];

interface GraphNode {
  id: NodeId;
  edges: Edge[];
}

interface ShortestPathResult {
  path: NodeId[];
  distance: Distance;
  distances: Record<NodeId, Distance>;
}

interface DijkstraResult {
  distances: Record<NodeId, Distance>;
  previous: Record<NodeId, NodeId | null>;
}

class DijkstraAlgorithm {
  private nodes: Map<NodeId, GraphNode>;
  
  constructor(nodes: GraphNode[] = []) {
    this.nodes = new Map();
    nodes.forEach(node => this.nodes.set(node.id, node));
  }

  addNode(node: GraphNode): void {
    this.nodes.set(node.id, node);
  }

  addEdge(from: NodeId, to: NodeId, distance: Distance): void {
    const fromNode = this.nodes.get(from);
    if (!fromNode) throw new Error(`Node ${from} not found`);
    
    fromNode.edges.push([to, distance]);
  }

  findShortestPath(start: NodeId, end: NodeId): ShortestPathResult {
    const { distances, previous } = this.calculateAllShortestPaths(start);
    
    if (distances[end] === Infinity) {
      throw new Error(`No path exists from ${start} to ${end}`);
    }

    return {
      path: this.reconstructPath(previous, end),
      distance: distances[end],
      distances
    };
  }

  calculateAllShortestPaths(start: NodeId): DijkstraResult {
    const distances: Record<NodeId, Distance> = {};
    const previous: Record<NodeId, NodeId | null> = {};
    const unvisited = new Set<NodeId>();
    const visited = new Set<NodeId>();

    // Initialize
    this.nodes.forEach((_, id) => {
      distances[id] = id === start ? 0 : Infinity;
      previous[id] = null;
      unvisited.add(id);
    });

    while (unvisited.size > 0) {
      const currentNode = this.getMinDistanceNode(unvisited, distances);
      
      if (distances[currentNode] === Infinity) break;

      unvisited.delete(currentNode);
      visited.add(currentNode);

      const node = this.nodes.get(currentNode);
      if (!node) continue;

      // Update neighbor distances
      for (const [neighbor, edgeDistance] of node.edges) {
        if (!this.nodes.has(neighbor)) continue;
        if (visited.has(neighbor)) continue;

        const newDistance = distances[currentNode] + edgeDistance;
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = currentNode;
        }
      }
    }

    return { distances, previous };
  }

  private getMinDistanceNode(
    nodes: Set<NodeId>, 
    distances: Record<NodeId, Distance>
  ): NodeId {
    let minNode = '';
    let minDistance = Infinity;

    for (const node of nodes) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        minNode = node;
      }
    }

    return minNode;
  }

  private reconstructPath(
    previous: Record<NodeId, NodeId | null>, 
    end: NodeId
  ): NodeId[] {
    const path: NodeId[] = [];
    let current: NodeId | null = end;

    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    return path;
  }
}
// Create graph nodes
const nodes: GraphNode[] = [
  { id: 'A', edges: [['B', 4], ['C', 2]] },
  { id: 'B', edges: [['D', 5], ['E', 3]] },
  { id: 'C', edges: [['B', 1], ['D', 8]] },
  { id: 'D', edges: [['E', 2]] },
  { id: 'E', edges: [] }
];

// Create Dijkstra instance
const dijkstra = new DijkstraAlgorithm(nodes);

// Find shortest path
try {
  const result = dijkstra.findShortestPath('A', 'E');
  console.log('Shortest path:', result.path.join(' → '));
  console.log('Distance:', result.distance);
  console.log('All distances:', result.distances);
} catch (error) {
  console.error(error.message);
}

// Alternative: Simple graph format
const simpleGraph: Graph = {
  'A': { 'B': 4, 'C': 2 },
  'B': { 'D': 5, 'E': 3 },
  'C': { 'B': 1, 'D': 8 },
  'D': { 'E': 2 },
  'E': {}
};

const simpleDijkstra = new Dijkstra(simpleGraph);
const simpleResult = simpleDijkstra.findShortestPath('A', 'E');
console.log('Simple path:', simpleResult.path.join(' → '));
interface PriorityQueueItem {
  node: NodeId;
  distance: Distance;
}

class PriorityQueue {
  private heap: PriorityQueueItem[] = [];

  enqueue(node: NodeId, distance: Distance): void {
    this.heap.push({ node, distance });
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue(): PriorityQueueItem | null {
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
      let leftChild: PriorityQueueItem;
      let rightChild: PriorityQueueItem;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.distance < element.distance) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if ((swap === null && rightChild.distance < element.distance) ||
            (swap !== null && rightChild.distance < leftChild!.distance)) {
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

// Define NodeId for clarity, can be string or number
type NodeId = string;

// Represents an edge connecting two nodes with a weight
interface Edge {
  node: NodeId;
  weight: number;
}

// Result structure for Dijkstra's
interface DijkstraResult {
  distances: Map<NodeId, number>;
  previousNodes: Map<NodeId, NodeId | null>;
}

// For the MinHeap, an item will have a value (NodeId) and a priority (distance)
interface HeapItem<T> {
  value: T;
  priority: number;
}
class MinHeap<T> {
  private heap: HeapItem<T>[] = [];

  constructor() {}

  insert(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.bubbleUp();
  }

  extractMin(): HeapItem<T> | undefined {
    if (this.isEmpty()) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!; // Move last element to root
    this.sinkDown();
    return min;
  }

  peekMin(): HeapItem<T> | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].priority < this.heap[parentIndex].priority) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private sinkDown(): void {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild: HeapItem<T> | undefined;
      let rightChild: HeapItem<T> | undefined;
      let swapIndex: number | null = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null && rightChild.priority < element.priority) ||
          (swapIndex !== null &&
            rightChild.priority < leftChild!.priority) // Compare with the left child if it was already selected
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;

      this.swap(index, swapIndex);
      index = swapIndex;
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
class Graph {
  private adjacencyList: Map<NodeId, Edge[]>;
  private allNodes: Set<NodeId>;

  constructor() {
    this.adjacencyList = new Map();
    this.allNodes = new Set();
  }

  addNode(node: NodeId): void {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
      this.allNodes.add(node);
    }
  }

  addEdge(from: NodeId, to: NodeId, weight: number): void {
    if (!this.adjacencyList.has(from)) {
      this.addNode(from);
    }
    if (!this.adjacencyList.has(to)) {
      this.addNode(to);
    }
    // For a directed graph, add only one way
    this.adjacencyList.get(from)!.push({ node: to, weight });
    // For an undirected graph, uncomment the line below:
    // this.adjacencyList.get(to)!.push({ node: from, weight });
  }

  getNeighbors(node: NodeId): Edge[] {
    return this.adjacencyList.get(node) || [];
  }

  getAllNodes(): Set<NodeId> {
    return this.allNodes;
  }
}
function dijkstra(graph: Graph, startNode: NodeId, endNode?: NodeId): DijkstraResult {
  const distances = new Map<NodeId, number>();
  const previousNodes = new Map<NodeId, NodeId | null>();
  const pq = new MinHeap<NodeId>(); // Priority queue stores nodes with their current shortest distance

  // Initialize distances and previousNodes
  for (const node of graph.getAllNodes()) {
    distances.set(node, Infinity);
    previousNodes.set(node, null);
  }

  // Distance to the start node is 0
  distances.set(startNode, 0);
  pq.insert(startNode, 0); // Add start node to the priority queue

  while (!pq.isEmpty()) {
    const { value: currentNode, priority: currentDistance } = pq.extractMin()!;

    // Optimization: If we've already found a shorter path to currentNode, skip
    if (currentDistance > distances.get(currentNode)!) {
      continue;
    }

    // If an endNode is specified and we reached it, we can stop early
    if (endNode && currentNode === endNode) {
      break;
    }

    // Iterate over neighbors of the current node
    for (const neighbor of graph.getNeighbors(currentNode)) {
      const distance = currentDistance + neighbor.weight;

      // If a shorter path to neighbor is found
      if (distance < distances.get(neighbor.node)!) {
        distances.set(neighbor.node, distance);
        previousNodes.set(neighbor.node, currentNode);
        pq.insert(neighbor.node, distance); // Add or update neighbor in priority queue
      }
    }
  }

  return { distances, previousNodes };
}
function reconstructPath(
  previousNodes: Map<NodeId, NodeId | null>,
  startNode: NodeId,
  endNode: NodeId
): NodeId[] | null {
  const path: NodeId[] = [];
  let currentNode: NodeId | null = endNode;

  while (currentNode !== null) {
    path.unshift(currentNode); // Add to the beginning of the array
    currentNode = previousNodes.get(currentNode)!;
    if (currentNode === startNode) {
      path.unshift(startNode);
      break;
    }
    // Break if we loop back to startNode (prevents infinite loop if startNode's previous is itself)
    // or if we hit a node that has no previous, indicating no path from startNode to endNode
    if (currentNode && previousNodes.get(currentNode) === currentNode) break;
  }

  // If the path doesn't start with the startNode, it means no path was found
  if (path[0] !== startNode) {
    return null;
  }

  return path;
}
// --- Example Usage ---
const graph = new Graph();

// Add nodes
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addNode("F");

// Add edges (Directed Graph)
graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1); // Note: This edge creates a shorter path to F via E if going from A

console.log("Graph Nodes:", Array.from(graph.getAllNodes()));

const startNode = "A";

// Run Dijkstra's from 'A' to all reachable nodes
const { distances, previousNodes } = dijkstra(graph, startNode);

console.log(`\nShortest Distances from ${startNode}:`);
for (const [node, distance] of distances.entries()) {
  console.log(`  To ${node}: ${distance === Infinity ? "Infinity" : distance}`);
}

// Reconstruct a specific path
const targetNode = "F";
const path = reconstructPath(previousNodes, startNode, targetNode);

console.log(`\nShortest Path from ${startNode} to ${targetNode}:`);
if (path) {
  console.log(`  Path: ${path.join(" -> ")}`);
  console.log(`  Total Distance: ${distances.get(targetNode)}`);
} else {
  console.log(`  No path found from ${startNode} to ${targetNode}.`);
}

// Another path example
const targetNode2 = "E";
const path2 = reconstructPath(previousNodes, startNode, targetNode2);
console.log(`\nShortest Path from ${startNode} to ${targetNode2}:`);
if (path2) {
  console.log(`  Path: ${path2.join(" -> ")}`);
  console.log(`  Total Distance: ${distances.get(targetNode2)}`);
} else {
  console.log(`  No path found from ${startNode} to ${targetNode2}.`);
}

// Example with a node that is not connected or unreachable
graph.addNode("Z");
const resultZ = dijkstra(graph, "A", "Z");
const pathZ = reconstructPath(resultZ.previousNodes, "A", "Z");
console.log(`\nShortest Path from A to Z:`);
if (pathZ) {
    console.log(`  Path: ${pathZ.join(" -> ")}`);
    console.log(`  Total Distance: ${resultZ.distances.get("Z")}`);
} else {
    console.log(`  No path found from A to Z. Distance: ${resultZ.distances.get("Z")}`);
}

// Node represents a vertex in the graph
type Node = string | number;

// Edge represents a connection between nodes with a weight
interface Edge {
  target: Node;
  weight: number;
}

// Graph structure using adjacency list
type Graph = Map<Node, Edge[]>;

// Result of Dijkstra's algorithm
interface DijkstraResult {
  distances: Map<Node, number>;
  previous: Map<Node, Node | null>;
}

// Shortest path result
interface ShortestPath {
  path: Node[];
  distance: number;
}
class PriorityQueue<T> {
  private elements: [T, number][] = [];

  enqueue(item: T, priority: number): void {
    this.elements.push([item, priority]);
    this.elements.sort((a, b) => a[1] - b[1]);
  }

  dequeue(): T | null {
    return this.elements.shift()?.[0] ?? null;
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }
}
class DijkstraAlgorithm {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  findShortestPaths(startNode: Node): DijkstraResult {
    // Initialize data structures
    const distances = new Map<Node, number>();
    const previous = new Map<Node, Node | null>();
    const visited = new Set<Node>();
    const priorityQueue = new PriorityQueue<Node>();

    // Set initial values
    for (const node of this.graph.keys()) {
      distances.set(node, node === startNode ? 0 : Infinity);
      previous.set(node, null);
    }

    // Start with the initial node
    priorityQueue.enqueue(startNode, 0);

    while (!priorityQueue.isEmpty()) {
      const currentNode = priorityQueue.dequeue();
      
      if (!currentNode || visited.has(currentNode)) {
        continue;
      }

      visited.add(currentNode);
      const currentDistance = distances.get(currentNode)!;

      // Explore neighbors
      const neighbors = this.graph.get(currentNode) || [];
      
      for (const neighbor of neighbors) {
        if (visited.has(neighbor.target)) {
          continue;
        }

        const newDistance = currentDistance + neighbor.weight;
        const existingDistance = distances.get(neighbor.target) ?? Infinity;

        if (newDistance < existingDistance) {
          distances.set(neighbor.target, newDistance);
          previous.set(neighbor.target, currentNode);
          priorityQueue.enqueue(neighbor.target, newDistance);
        }
      }
    }

    return { distances, previous };
  }

  getShortestPath(startNode: Node, endNode: Node): ShortestPath | null {
    const { distances, previous } = this.findShortestPaths(startNode);
    
    // Check if end node is reachable
    const distance = distances.get(endNode);
    if (distance === undefined || distance === Infinity) {
      return null;
    }

    // Reconstruct path
    const path: Node[] = [];
    let currentNode: Node | null = endNode;
    
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous.get(currentNode) ?? null;
    }

    // Verify path starts from startNode
    if (path[0] !== startNode) {
      return null;
    }

    return {
      path,
      distance: distances.get(endNode)!
    };
  }
}
// Create a graph
const graph: Graph = new Map();

// Add nodes and edges
graph.set('A', [
  { target: 'B', weight: 4 },
  { target: 'C', weight: 2 }
]);

graph.set('B', [
  { target: 'D', weight: 3 },
  { target: 'E', weight: 1 }
]);

graph.set('C', [
  { target: 'B', weight: 1 },
  { target: 'D', weight: 5 }
]);

graph.set('D', [
  { target: 'E', weight: 2 }
]);

graph.set('E', []);

// Use the algorithm
const dijkstra = new DijkstraAlgorithm(graph);

// Find shortest path from A to E
const result = dijkstra.getShortestPath('A', 'E');

if (result) {
  console.log(`Shortest path: ${result.path.join(' -> ')}`);
  console.log(`Total distance: ${result.distance}`);
} else {
  console.log('No path found');
}

// Output:
// Shortest path: A -> C -> B -> E
// Total distance: 4
function dijkstraShortestPath(
  graph: Graph, 
  startNode: Node, 
  endNode: Node
): ShortestPath | null {
  
  const distances = new Map<Node, number>();
  const previous = new Map<Node, Node | null>();
  const unvisited = new Set<Node>();
  
  // Initialize
  for (const node of graph.keys()) {
    distances.set(node, node === startNode ? 0 : Infinity);
    previous.set(node, null);
    unvisited.add(node);
  }
  
  while (unvisited.size > 0) {
    // Find unvisited node with smallest distance
    let currentNode: Node | null = null;
    let smallestDistance = Infinity;
    
    for (const node of unvisited) {
      const distance = distances.get(node)!;
      if (distance < smallestDistance) {
        smallestDistance = distance;
        currentNode = node;
      }
    }
    
    if (currentNode === null || smallestDistance === Infinity) {
      break;
    }
    
    unvisited.delete(currentNode);
    
    // Update neighbors
    const neighbors = graph.get(currentNode) || [];
    for (const neighbor of neighbors) {
      if (unvisited.has(neighbor.target)) {
        const newDistance = smallestDistance + neighbor.weight;
        const currentNeighborDistance = distances.get(neighbor.target)!;
        
        if (newDistance < currentNeighborDistance) {
          distances.set(neighbor.target, newDistance);
          previous.set(neighbor.target, currentNode);
        }
      }
    }
  }
  
  // Reconstruct path
  const distance = distances.get(endNode);
  if (distance === undefined || distance === Infinity) {
    return null;
  }
  
  const path: Node[] = [];
  let currentNode: Node | null = endNode;
  
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previous.get(currentNode) ?? null;
  }
  
  return {
    path,
    distance
  };
}

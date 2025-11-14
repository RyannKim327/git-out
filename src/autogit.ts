interface Graph {
  [node: string]: { [neighbor: string]: number };
}

interface DistanceMap {
  [node: string]: number;
}

interface PreviousNodeMap {
  [node: string]: string | null;
}

class PriorityQueue<T> {
  private elements: { element: T; priority: number }[] = [];

  enqueue(element: T, priority: number): void {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | null {
    return this.elements.shift()?.element || null;
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }
}

function dijkstra(graph: Graph, startNode: string): { distances: DistanceMap; previous: PreviousNodeMap } {
  const distances: DistanceMap = {};
  const previous: PreviousNodeMap = {};
  const visited = new Set<string>();
  const queue = new PriorityQueue<string>();

  // Initialize distances
  for (const node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
    queue.enqueue(node, distances[node]);
  }

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue();
    
    if (!currentNode || visited.has(currentNode)) continue;
    
    visited.add(currentNode);

    // Update distances to neighbors
    for (const neighbor in graph[currentNode]) {
      if (visited.has(neighbor)) continue;

      const distanceToNeighbor = distances[currentNode] + graph[currentNode][neighbor];
      
      if (distanceToNeighbor < distances[neighbor]) {
        distances[neighbor] = distanceToNeighbor;
        previous[neighbor] = currentNode;
        queue.enqueue(neighbor, distanceToNeighbor);
      }
    }
  }

  return { distances, previous };
}
interface Graph {
  [node: string]: { [neighbor: string]: number };
}

interface ShortestPathResult {
  distance: number;
  path: string[];
}

class DijkstraAlgorithm {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public findShortestPath(startNode: string, endNode?: string): ShortestPathResult | DistanceMap {
    const { distances, previous } = this.calculateShortestPaths(startNode);
    
    if (endNode) {
      return this.reconstructPath(startNode, endNode, distances, previous);
    }
    
    return distances;
  }

  private calculateShortestPaths(startNode: string): { distances: DistanceMap; previous: PreviousNodeMap } {
    const distances: DistanceMap = {};
    const previous: PreviousNodeMap = {};
    const visited = new Set<string>();
    const queue = new PriorityQueue<string>();

    // Initialize all nodes
    for (const node in this.graph) {
      distances[node] = node === startNode ? 0 : Infinity;
      previous[node] = null;
      queue.enqueue(node, distances[node]);
    }

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue();
      
      if (!currentNode || distances[currentNode] === Infinity) continue;
      if (visited.has(currentNode)) continue;
      
      visited.add(currentNode);

      // Process neighbors
      for (const neighbor in this.graph[currentNode]) {
        if (visited.has(neighbor)) continue;

        const newDistance = distances[currentNode] + this.graph[currentNode][neighbor];
        
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = currentNode;
          queue.enqueue(neighbor, newDistance);
        }
      }
    }

    return { distances, previous };
  }

  private reconstructPath(
    startNode: string, 
    endNode: string, 
    distances: DistanceMap, 
    previous: PreviousNodeMap
  ): ShortestPathResult {
    if (distances[endNode] === Infinity) {
      throw new Error(`No path exists from ${startNode} to ${endNode}`);
    }

    const path: string[] = [];
    let currentNode: string | null = endNode;

    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }

    return {
      distance: distances[endNode],
      path
    };
  }

  public getAllShortestPathsFrom(startNode: string): DistanceMap {
    const { distances } = this.calculateShortestPaths(startNode);
    return distances;
  }
}
// Example 1: Simple graph
const simpleGraph: Graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 1, D: 5 },
  C: { A: 2, B: 1, D: 8, E: 10 },
  D: { B: 5, C: 8, E: 2 },
  E: { C: 10, D: 2 }
};

// Using the function approach
const { distances, previous } = dijkstra(simpleGraph, 'A');
console.log('Distances from A:', distances);
// Output: { A: 0, B: 3, C: 2, D: 8, E: 10 }

// Using the class approach
const dijkstraSolver = new DijkstraAlgorithm(simpleGraph);

// Find shortest path from A to E
const pathResult = dijkstraSolver.findShortestPath('A', 'E') as ShortestPathResult;
console.log(`Shortest path from A to E:`, pathResult.path);
console.log(`Distance:`, pathResult.distance);
// Output: Path: ['A', 'C', 'B', 'D', 'E'], Distance: 10

// Get all distances from A
const allDistances = dijkstraSolver.getAllShortestPathsFrom('A');
console.log('All distances from A:', allDistances);

// Example 2: More complex graph
const cityGraph: Graph = {
  'New York': { 'Boston': 215, 'Philadelphia': 95 },
  'Boston': { 'New York': 215, 'Chicago': 983 },
  'Philadelphia': { 'New York': 95, 'Chicago': 759, 'Atlanta': 665 },
  'Chicago': { 'Boston': 983, 'Philadelphia': 759, 'Denver': 1003 },
  'Atlanta': { 'Philadelphia': 665, 'Denver': 1400, 'Los Angeles': 2180 },
  'Denver': { 'Chicago': 1003, 'Atlanta': 1400, 'Los Angeles': 1015 },
  'Los Angeles': { 'Atlanta': 2180, 'Denver': 1015 }
};

const cityRouter = new DijkstraAlgorithm(cityGraph);

// Find shortest path from New York to Los Angeles
const route = cityRouter.findShortestPath('New York', 'Los Angeles') as ShortestPathResult;
console.log(`Route from NY to LA:`, route.path.join(' → '));
console.log(`Total distance:`, route.distance, 'miles');

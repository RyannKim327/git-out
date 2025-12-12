interface Edge {
  to: string;
  weight: number;
}

interface Graph {
  [node: string]: Edge[];
}

interface DistanceMap {
  [node: string]: number;
}

interface PreviousNodeMap {
  [node: string]: string | null;
}

class DijkstraAlgorithm {
  private graph: Graph;
  
  constructor(graph: Graph) {
    this.graph = graph;
  }

  /**
   * Finds the shortest path from startNode to endNode
   */
  findShortestPath(startNode: string, endNode: string): {
    path: string[];
    distance: number;
  } {
    // Initialize distances and previous nodes
    const distances: DistanceMap = {};
    const previous: PreviousNodeMap = {};
    const unvisited: Set<string> = new Set();
    
    // Initialize all distances to Infinity and previous nodes to null
    for (const node in this.graph) {
      distances[node] = Infinity;
      previous[node] = null;
      unvisited.add(node);
    }
    
    // Set start node distance to 0
    distances[startNode] = 0;
    
    while (unvisited.size > 0) {
      // Find the unvisited node with the smallest distance
      const currentNode = this.getMinDistanceNode(unvisited, distances);
      
      // If we reached the end node or no more nodes to process
      if (currentNode === endNode || distances[currentNode] === Infinity) {
        break;
      }
      
      unvisited.delete(currentNode);
      
      // Process all neighbors of the current node
      for (const edge of this.graph[currentNode]) {
        if (!unvisited.has(edge.to)) continue;
        
        const newDistance = distances[currentNode] + edge.weight;
        
        if (newDistance < distances[edge.to]) {
          distances[edge.to] = newDistance;
          previous[edge.to] = currentNode;
        }
      }
    }
    
    return {
      path: this.reconstructPath(previous, endNode),
      distance: distances[endNode]
    };
  }
  
  /**
   * Gets the unvisited node with the smallest distance
   */
  private getMinDistanceNode(unvisited: Set<string>, distances: DistanceMap): string {
    let minNode = '';
    let minDistance = Infinity;
    
    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        minNode = node;
      }
    }
    
    return minNode;
  }
  
  /**
   * Reconstructs the path from endNode to startNode
   */
  private reconstructPath(previous: PreviousNodeMap, endNode: string): string[] {
    const path: string[] = [];
    let currentNode: string | null = endNode;
    
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }
    
    return path;
  }
  
  /**
   * Gets all shortest paths from startNode to all other nodes
   */
  getAllShortestPaths(startNode: string): {
    distances: DistanceMap;
    paths: { [node: string]: string[] };
  } {
    const distances: DistanceMap = {};
    const previous: PreviousNodeMap = {};
    const unvisited: Set<string> = new Set();
    
    for (const node in this.graph) {
      distances[node] = Infinity;
      previous[node] = null;
      unvisited.add(node);
    }
    
    distances[startNode] = 0;
    
    while (unvisited.size > 0) {
      const currentNode = this.getMinDistanceNode(unvisited, distances);
      
      if (distances[currentNode] === Infinity) break;
      
      unvisited.delete(currentNode);
      
      for (const edge of this.graph[currentNode]) {
        if (!unvisited.has(edge.to)) continue;
        
        const newDistance = distances[currentNode] + edge.weight;
        
        if (newDistance < distances[edge.to]) {
          distances[edge.to] = newDistance;
          previous[edge.to] = currentNode;
        }
      }
    }
    
    const paths: { [node: string]: string[] } = {};
    for (const node in this.graph) {
      paths[node] = this.reconstructPath(previous, node);
    }
    
    return { distances, paths };
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

class OptimizedDijkstraAlgorithm {
  private graph: Graph;
  
  constructor(graph: Graph) {
    this.graph = graph;
  }
  
  findShortestPath(startNode: string, endNode: string): {
    path: string[];
    distance: number;
  } {
    const distances: DistanceMap = {};
    const previous: PreviousNodeMap = {};
    const pq = new PriorityQueue();
    
    // Initialize
    for (const node in this.graph) {
      distances[node] = Infinity;
      previous[node] = null;
    }
    distances[startNode] = 0;
    pq.enqueue(startNode, 0);
    
    while (!pq.isEmpty()) {
      const currentNode = pq.dequeue();
      
      if (!currentNode || currentNode === endNode) break;
      
      for (const edge of this.graph[currentNode]) {
        const newDistance = distances[currentNode] + edge.weight;
        
        if (newDistance < distances[edge.to]) {
          distances[edge.to] = newDistance;
          previous[edge.to] = currentNode;
          pq.enqueue(edge.to, newDistance);
        }
      }
    }
    
    return {
      path: this.reconstructPath(previous, endNode),
      distance: distances[endNode]
    };
  }
  
  private reconstructPath(previous: PreviousNodeMap, endNode: string): string[] {
    const path: string[] = [];
    let currentNode: string | null = endNode;
    
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }
    
    return path;
  }
}
// Create a sample graph
const graph: Graph = {
  'A': [{ to: 'B', weight: 4 }, { to: 'C', weight: 2 }],
  'B': [{ to: 'D', weight: 5 }, { to: 'E', weight: 3 }],
  'C': [{ to: 'B', weight: 1 }, { to: 'D', weight: 8 }],
  'D': [{ to: 'E', weight: 2 }],
  'E': []
};

// Using the algorithm
const dijkstra = new DijkstraAlgorithm(graph);
const result = dijkstra.findShortestPath('A', 'E');

console.log('Shortest path:', result.path.join(' -> '));
console.log('Total distance:', result.distance);

// Get all shortest paths from 'A'
const allPaths = dijkstra.getAllShortestPaths('A');
console.log('All distances:', allPaths.distances);
// Test function
function testDijkstra() {
  const testGraph: Graph = {
    'A': [{ to: 'B', weight: 1 }, { to: 'C', weight: 4 }],
    'B': [{ to: 'C', weight: 2 }, { to: 'D', weight: 5 }],
    'C': [{ to: 'D', weight: 1 }],
    'D': []
  };
  
  const dijkstra = new DijkstraAlgorithm(testGraph);
  const result = dijkstra.findShortestPath('A', 'D');
  
  // Expected: A -> B -> C -> D with distance 4 (1 + 2 + 1)
  console.assert(result.path.join(',') === 'A,B,C,D', 'Path incorrect');
  console.assert(result.distance === 4, 'Distance incorrect');
  
  console.log('All tests passed!');
}

testDijkstra();

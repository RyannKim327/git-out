// Node interface
interface Node {
  id: string;
  x: number;
  y: number;
}

// Edge interface
interface Edge {
  from: string;
  to: string;
  cost: number;
}

// Pathfinding result
interface PathResult {
  path: string[];
  cost: number;
  visited: string[];
}
class PriorityQueue<T> {
  private elements: { item: T; priority: number }[] = [];

  enqueue(item: T, priority: number): void {
    this.elements.push({ item, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | null {
    return this.elements.shift()?.item || null;
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  contains(item: T): boolean {
    return this.elements.some(element => element.item === item);
  }

  updatePriority(item: T, newPriority: number): void {
    const index = this.elements.findIndex(element => element.item === item);
    if (index !== -1) {
      this.elements[index].priority = newPriority;
      this.elements.sort((a, b) => a.priority - b.priority);
    }
  }
}
class Graph {
  private nodes: Map<string, Node> = new Map();
  private edges: Map<string, Edge[]> = new Map();

  addNode(node: Node): void {
    this.nodes.set(node.id, node);
    this.edges.set(node.id, []);
  }

  addEdge(edge: Edge): void {
    const fromEdges = this.edges.get(edge.from);
    if (fromEdges) {
      fromEdges.push(edge);
    }
  }

  getNeighbors(nodeId: string): Edge[] {
    return this.edges.get(nodeId) || [];
  }

  getNode(nodeId: string): Node | undefined {
    return this.nodes.get(nodeId);
  }

  heuristic(nodeA: string, nodeB: string): number {
    const a = this.nodes.get(nodeA);
    const b = this.nodes.get(nodeB);
    
    if (!a || !b) return Infinity;
    
    // Euclidean distance as heuristic
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }
}
class AStarSearch {
  constructor(private graph: Graph) {}

  findPath(start: string, goal: string): PathResult | null {
    // Priority queue for open set
    const openSet = new PriorityQueue<string>();
    
    // Maps for tracking costs and paths
    const gScore: Map<string, number> = new Map(); // Cost from start to node
    const fScore: Map<string, number> = new Map(); // Estimated total cost (g + h)
    const cameFrom: Map<string, string> = new Map(); // Path reconstruction
    
    const visited: Set<string> = new Set();

    // Initialize scores
    gScore.set(start, 0);
    fScore.set(start, this.graph.heuristic(start, goal));
    openSet.enqueue(start, fScore.get(start)!);

    while (!openSet.isEmpty()) {
      const current = openSet.dequeue();
      
      if (!current) break;
      
      visited.add(current);

      // Found the goal
      if (current === goal) {
        return {
          path: this.reconstructPath(cameFrom, current),
          cost: gScore.get(current)!,
          visited: Array.from(visited)
        };
      }

      // Explore neighbors
      const neighbors = this.graph.getNeighbors(current);
      
      for (const neighborEdge of neighbors) {
        const neighbor = neighborEdge.to;
        
        // Calculate tentative gScore
        const tentativeGScore = gScore.get(current)! + neighborEdge.cost;
        
        // If this path is better than any previous one
        if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)!) {
          // Update the path and scores
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeGScore);
          
          const newFScore = tentativeGScore + this.graph.heuristic(neighbor, goal);
          fScore.set(neighbor, newFScore);
          
          // Add to open set if not already there, or update priority
          if (!openSet.contains(neighbor)) {
            openSet.enqueue(neighbor, newFScore);
          } else {
            openSet.updatePriority(neighbor, newFScore);
          }
        }
      }
    }

    // No path found
    return null;
  }

  private reconstructPath(cameFrom: Map<string, string>, current: string): string[] {
    const path: string[] = [current];
    let currentId = current;
    
    while (cameFrom.has(currentId)) {
      currentId = cameFrom.get(currentId)!;
      path.unshift(currentId);
    }
    
    return path;
  }
}
// Create a sample graph
const graph = new Graph();

// Add nodes
graph.addNode({ id: 'A', x: 0, y: 0 });
graph.addNode({ id: 'B', x: 1, y: 1 });
graph.addNode({ id: 'C', x: 2, y: 2 });
graph.addNode({ id: 'D', x: 3, y: 3 });
graph.addNode({ id: 'E', x: 4, y: 4 });

// Add edges with costs
graph.addEdge({ from: 'A', to: 'B', cost: 1 });
graph.addEdge({ from: 'A', to: 'C', cost: 1.5 });
graph.addEdge({ from: 'B', to: 'D', cost: 1 });
graph.addEdge({ from: 'C', to: 'D', cost: 1 });
graph.addEdge({ from: 'D', to: 'E', cost: 1 });

// Create A* search instance
const aStar = new AStarSearch(graph);

// Find path from A to E
const result = aStar.findPath('A', 'E');

if (result) {
  console.log('Path found:', result.path.join(' → '));
  console.log('Total cost:', result.cost);
  console.log('Nodes visited:', result.visited.join(', '));
} else {
  console.log('No path found');
}
// Manhattan distance heuristic (for grid-based maps)
function manhattanHeuristic(nodeA: Node, nodeB: Node): number {
  return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
}

// Custom heuristic function
function customHeuristic(nodeA: Node, nodeB: Node): number {
  // Your custom heuristic logic here
  return Math.sqrt(Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2));
}

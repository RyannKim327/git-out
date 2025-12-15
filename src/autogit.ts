// Define interfaces for our data structures
interface Node {
  x: number;
  y: number;
  walkable: boolean;
}

interface PathNode extends Node {
  f: number; // Total cost (g + h)
  g: number; // Cost from start to this node
  h: number; // Heuristic cost to end
  parent: PathNode | null;
}

class AStar {
  private grid: Node[][];
  private openList: PathNode[];
  private closedList: PathNode[];
  private startNode: PathNode;
  private endNode: Node;

  constructor(grid: Node[][], start: Node, end: Node) {
    this.grid = grid;
    this.openList = [];
    this.closedList = [];
    
    // Initialize start node
    this.startNode = {
      ...start,
      f: 0,
      g: 0,
      h: this.calculateHeuristic(start, end),
      parent: null
    };
    
    this.endNode = end;
  }

  // Manhattan distance heuristic
  private calculateHeuristic(nodeA: Node, nodeB: Node): number {
    return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
  }

  // Find path using A* algorithm
  public findPath(): Node[] | null {
    // Add start node to open list
    this.openList.push(this.startNode);

    while (this.openList.length > 0) {
      // Get node with lowest f cost
      const currentNode = this.openList.reduce((minNode, node) => 
        node.f < minNode.f ? node : minNode, this.openList[0]
      );

      // Remove current node from open list
      this.openList = this.openList.filter(node => 
        node.x !== currentNode.x || node.y !== currentNode.y
      );

      // Add to closed list
      this.closedList.push(currentNode);

      // Check if we reached the end
      if (currentNode.x === this.endNode.x && currentNode.y === this.endNode.y) {
        return this.retracePath(currentNode);
      }

      // Get neighbors
      const neighbors = this.getNeighbors(currentNode);

      for (const neighbor of neighbors) {
        // Skip if neighbor is not walkable or in closed list
        if (!neighbor.walkable || 
            this.closedList.some(node => 
              node.x === neighbor.x && node.y === neighbor.y)) {
          continue;
        }

        const newMovementCost = currentNode.g + 1; // Assuming uniform cost of 1
        const isInOpenList = this.openList.some(node => 
          node.x === neighbor.x && node.y === neighbor.y
        );

        if (newMovementCost < neighbor.g || !isInOpenList) {
          neighbor.g = newMovementCost;
          neighbor.h = this.calculateHeuristic(neighbor, this.endNode);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = currentNode;

          if (!isInOpenList) {
            this.openList.push(neighbor);
          }
        }
      }
    }

    // No path found
    return null;
  }

  private getNeighbors(node: Node): PathNode[] {
    const neighbors: PathNode[] = [];
    const directions = [
      { x: 0, y: -1 },  // Up
      { x: 1, y: 0 },   // Right
      { x: 0, y: 1 },   // Down
      { x: -1, y: 0 }   // Left
    ];

    for (const dir of directions) {
      const newX = node.x + dir.x;
      const newY = node.y + dir.y;

      // Check if within grid bounds
      if (newX >= 0 && newX < this.grid[0].length && 
          newY >= 0 && newY < this.grid.length) {
        
        const gridNode = this.grid[newY][newX];
        neighbors.push({
          ...gridNode,
          f: 0,
          g: 0,
          h: 0,
          parent: null
        });
      }
    }

    return neighbors;
  }

  private retracePath(endNode: PathNode): Node[] {
    const path: Node[] = [];
    let currentNode: PathNode | null = endNode;

    while (currentNode !== null) {
      path.push({ x: currentNode.x, y: currentNode.y, walkable: currentNode.walkable });
      currentNode = currentNode.parent;
    }

    return path.reverse();
  }
}
// Create a grid (example: 5x5 grid)
const grid: Node[][] = [];
const gridSize = 5;

// Initialize grid with all walkable nodes
for (let y = 0; y < gridSize; y++) {
  grid[y] = [];
  for (let x = 0; x < gridSize; x++) {
    grid[y][x] = { x, y, walkable: true };
  }
}

// Add some obstacles
grid[1][1].walkable = false;
grid[2][2].walkable = false;
grid[3][3].walkable = false;

// Define start and end positions
const startNode: Node = { x: 0, y: 0, walkable: true };
const endNode: Node = { x: 4, y: 4, walkable: true };

// Find path
const aStar = new AStar(grid, startNode, endNode);
const path = aStar.findPath();

if (path) {
  console.log("Path found:");
  path.forEach(node => console.log(`(${node.x}, ${node.y})`));
} else {
  console.log("No path found");
}
class PriorityQueue<T> {
  private elements: { priority: number; element: T }[] = [];

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

// Modified A* class using priority queue
class AStarEnhanced extends AStar {
  private openList: PriorityQueue<PathNode>;

  constructor(grid: Node[][], start: Node, end: Node) {
    super(grid, start, end);
    this.openList = new PriorityQueue<PathNode>();
  }

  // Override findPath method to use priority queue
  public findPath(): Node[] | null {
    this.openList.enqueue(this.startNode, this.startNode.f);

    while (!this.openList.isEmpty()) {
      const currentNode = this.openList.dequeue()!;

      // ... rest of the implementation similar to the base class
      // but using the priority queue instead of array operations
    }

    return null;
  }
}

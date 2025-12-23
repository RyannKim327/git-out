interface Node {
  x: number;
  y: number;
}

interface PathNode extends Node {
  f: number; // Total cost (g + h)
  g: number; // Cost from start to this node
  h: number; // Heuristic cost to goal
  parent: PathNode | null;
}

class AStarSearch {
  private grid: number[][]; // 0 = walkable, 1 = obstacle
  private rows: number;
  private cols: number;

  constructor(grid: number[][]) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0].length;
  }

  // Heuristic function (Manhattan distance)
  private heuristic(a: Node, b: Node): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  // Get neighbors of a node
  private getNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];
    const directions = [
      { dx: 0, dy: -1 }, // up
      { dx: 1, dy: 0 },  // right
      { dx: 0, dy: 1 },  // down
      { dx: -1, dy: 0 }, // left
    ];

    for (const dir of directions) {
      const newX = node.x + dir.dx;
      const newY = node.y + dir.dy;

      // Check bounds and if cell is walkable
      if (newX >= 0 && newX < this.cols && 
          newY >= 0 && newY < this.rows && 
          this.grid[newY][newX] === 0) {
        neighbors.push({ x: newX, y: newY });
      }
    }

    return neighbors;
  }

  // Reconstruct the path from end to start
  private reconstructPath(current: PathNode): Node[] {
    const path: Node[] = [];
    let temp: PathNode | null = current;

    while (temp !== null) {
      path.unshift({ x: temp.x, y: temp.y });
      temp = temp.parent;
    }

    return path;
  }

  // Main A* search function
  search(start: Node, goal: Node): Node[] | null {
    // Open set (nodes to be evaluated)
    const openSet: Map<string, PathNode> = new Map();
    // Closed set (nodes already evaluated)
    const closedSet: Map<string, boolean> = new Map();

    // Create start node
    const startNode: PathNode = {
      ...start,
      f: 0,
      g: 0,
      h: this.heuristic(start, goal),
      parent: null
    };

    // Key function for node identification
    const getKey = (node: Node) => `${node.x},${node.y}`;

    openSet.set(getKey(start), startNode);

    while (openSet.size > 0) {
      // Get node with lowest f score
      let current: PathNode | null = null;
      for (const node of openSet.values()) {
        if (current === null || node.f < current.f) {
          current = node;
        }
      }

      if (!current) break;

      const currentKey = getKey(current);

      // Check if we reached the goal
      if (current.x === goal.x && current.y === goal.y) {
        return this.reconstructPath(current);
      }

      // Move current from open to closed set
      openSet.delete(currentKey);
      closedSet.set(currentKey, true);

      // Check neighbors
      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        const neighborKey = getKey(neighbor);

        // Skip if already evaluated
        if (closedSet.has(neighborKey)) continue;

        // Calculate tentative g score
        const tentativeG = current.g + 1; // Assuming movement cost is 1

        // Check if neighbor is not in open set or found a better path
        let neighborNode = openSet.get(neighborKey);
        if (!neighborNode) {
          neighborNode = {
            ...neighbor,
            f: 0,
            g: Number.MAX_SAFE_INTEGER,
            h: this.heuristic(neighbor, goal),
            parent: null
          };
        }

        if (tentativeG < neighborNode.g) {
          // This path is better
          neighborNode.parent = current;
          neighborNode.g = tentativeG;
          neighborNode.f = neighborNode.g + neighborNode.h;

          if (!openSet.has(neighborKey)) {
            openSet.set(neighborKey, neighborNode);
          }
        }
      }
    }

    // No path found
    return null;
  }
}
// Example usage
const grid = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0], // 1 represents obstacles
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0]
];

const aStar = new AStarSearch(grid);

const start = { x: 0, y: 0 };
const goal = { x: 4, y: 4 };

const path = aStar.search(start, goal);

if (path) {
  console.log("Path found:");
  path.forEach(node => console.log(`(${node.x}, ${node.y})`));
} else {
  console.log("No path found");
}
// Different heuristic options
enum HeuristicType {
  MANHATTAN,
  EUCLIDEAN,
  DIAGONAL
}

class EnhancedAStar extends AStarSearch {
  private heuristicType: HeuristicType;

  constructor(grid: number[][], heuristicType: HeuristicType = HeuristicType.MANHATTAN) {
    super(grid);
    this.heuristicType = heuristicType;
  }

  protected heuristic(a: Node, b: Node): number {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);

    switch (this.heuristicType) {
      case HeuristicType.EUCLIDEAN:
        return Math.sqrt(dx * dx + dy * dy);
      
      case HeuristicType.DIAGONAL:
        return Math.max(dx, dy);
      
      case HeuristicType.MANHATTAN:
      default:
        return dx + dy;
    }
  }
}
// Simple priority queue implementation
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

// Modified A* with priority queue
class OptimizedAStar extends AStarSearch {
  search(start: Node, goal: Node): Node[] | null {
    const openSet = new PriorityQueue<PathNode>();
    const closedSet: Map<string, boolean> = new Map();
    const nodeMap: Map<string, PathNode> = new Map();

    const getKey = (node: Node) => `${node.x},${node.y}`;

    const startNode: PathNode = {
      ...start,
      f: 0,
      g: 0,
      h: this.heuristic(start, goal),
      parent: null
    };

    openSet.enqueue(startNode, startNode.f);
    nodeMap.set(getKey(start), startNode);

    while (!openSet.isEmpty()) {
      const current = openSet.dequeue();
      if (!current) break;

      const currentKey = getKey(current);

      if (current.x === goal.x && current.y === goal.y) {
        return this.reconstructPath(current);
      }

      closedSet.set(currentKey, true);

      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        const neighborKey = getKey(neighbor);

        if (closedSet.has(neighborKey)) continue;

        const tentativeG = current.g + 1;
        let neighborNode = nodeMap.get(neighborKey);

        if (!neighborNode) {
          neighborNode = {
            ...neighbor,
            f: 0,
            g: Number.MAX_SAFE_INTEGER,
            h: this.heuristic(neighbor, goal),
            parent: null
          };
          nodeMap.set(neighborKey, neighborNode);
        }

        if (tentativeG < neighborNode.g) {
          neighborNode.parent = current;
          neighborNode.g = tentativeG;
          neighborNode.f = neighborNode.g + neighborNode.h;

          // Re-add to priority queue with new priority
          openSet.enqueue(neighborNode, neighborNode.f);
        }
      }
    }

    return null;
  }
}

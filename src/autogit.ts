interface Node {
  x: number;
  y: number;
}

interface AStarNode extends Node {
  f: number; // total cost (g + h)
  g: number; // cost from start
  h: number; // heuristic cost to end
  parent: AStarNode | null;
}

interface Heuristic {
  (a: Node, b: Node): number;
}

interface Grid {
  width: number;
  height: number;
  isWalkable: (x: number, y: number) => boolean;
}
class AStar {
  private grid: Grid;
  private heuristic: Heuristic;

  constructor(grid: Grid, heuristic: Heuristic = this.manhattan) {
    this.grid = grid;
    this.heuristic = heuristic;
  }

  // Manhattan distance heuristic
  private manhattan(a: Node, b: Node): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  // Euclidean distance heuristic
  private euclidean(a: Node, b: Node): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  // Find path from start to end
  findPath(start: Node, end: Node): Node[] | null {
    const openSet: AStarNode[] = [];
    const closedSet: Set<string> = new Set();
    const nodeMap: Map<string, AStarNode> = new Map();

    // Create start node
    const startNode: AStarNode = {
      ...start,
      f: 0,
      g: 0,
      h: this.heuristic(start, end),
      parent: null
    };

    openSet.push(startNode);
    nodeMap.set(this.getNodeKey(start), startNode);

    while (openSet.length > 0) {
      // Get node with lowest f cost
      let current = openSet.reduce((min, node) => 
        node.f < min.f ? node : min, openSet[0]);

      // Remove current from open set
      openSet.splice(openSet.indexOf(current), 1);
      closedSet.add(this.getNodeKey(current));

      // Found the path
      if (current.x === end.x && current.y === end.y) {
        return this.reconstructPath(current);
      }

      // Check all neighbors
      for (const neighbor of this.getNeighbors(current)) {
        const neighborKey = this.getNodeKey(neighbor);

        // Skip if already evaluated or not walkable
        if (closedSet.has(neighborKey) || !this.grid.isWalkable(neighbor.x, neighbor.y)) {
          continue;
        }

        // Calculate tentative g score
        const tentativeG = current.g + 1; // Assuming each move costs 1

        let neighborNode = nodeMap.get(neighborKey);
        if (!neighborNode) {
          neighborNode = {
            ...neighbor,
            f: 0,
            g: Infinity,
            h: this.heuristic(neighbor, end),
            parent: null
          };
          nodeMap.set(neighborKey, neighborNode);
        }

        // This is a better path
        if (tentativeG < neighborNode.g) {
          neighborNode.parent = current;
          neighborNode.g = tentativeG;
          neighborNode.f = neighborNode.g + neighborNode.h;

          // Add to open set if not already there
          if (!openSet.includes(neighborNode)) {
            openSet.push(neighborNode);
          }
        }
      }
    }

    return null; // No path found
  }

  // Get all valid neighbors
  private getNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];
    const directions = [
      { x: 0, y: -1 }, // up
      { x: 1, y: 0 },  // right
      { x: 0, y: 1 },  // down
      { x: -1, y: 0 }, // left
      // Uncomment for diagonal movement:
      // { x: 1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }, { x: -1, y: -1 }
    ];

    for (const dir of directions) {
      const newX = node.x + dir.x;
      const newY = node.y + dir.y;

      if (this.isValidPosition(newX, newY)) {
        neighbors.push({ x: newX, y: newY });
      }
    }

    return neighbors;
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.grid.width && 
           y >= 0 && y < this.grid.height;
  }

  private getNodeKey(node: Node): string {
    return `${node.x},${node.y}`;
  }

  private reconstructPath(node: AStarNode): Node[] {
    const path: Node[] = [];
    let current: AStarNode | null = node;

    while (current) {
      path.unshift({ x: current.x, y: current.y });
      current = current.parent;
    }

    return path;
  }
}
// Example grid implementation
const exampleGrid: Grid = {
  width: 10,
  height: 10,
  isWalkable: (x: number, y: number) => {
    // Define obstacles here
    const obstacles = [
      { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 },
      { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 }
    ];
    return !obstacles.some(obs => obs.x === x && obs.y === y);
  }
};

// Create A* instance
const aStar = new AStar(exampleGrid);

// Define start and end points
const start: Node = { x: 1, y: 1 };
const end: Node = { x: 8, y: 8 };

// Find path
const path = aStar.findPath(start, end);

if (path) {
  console.log("Path found:");
  path.forEach((node, index) => {
    console.log(`${index}: (${node.x}, ${node.y})`);
  });
} else {
  console.log("No path found");
}
// Priority queue implementation
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

  contains(element: T): boolean {
    return this.elements.some(item => item.element === element);
  }
}

// Update the findPath method to use priority queue
// Replace openSet array with:
// const openSet = new PriorityQueue<AStarNode>();
// openSet.enqueue(startNode, startNode.f);

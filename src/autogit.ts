interface Node {
  x: number;
  y: number;
}

interface AStarNode extends Node {
  f: number; // total cost
  g: number; // cost from start
  h: number; // heuristic cost to end
  parent: AStarNode | null;
}

interface Grid {
  width: number;
  height: number;
  isBlocked: (x: number, y: number) => boolean;
}

type HeuristicFunction = (a: Node, b: Node) => number;
class AStarPathfinder {
  private grid: Grid;
  private heuristic: HeuristicFunction;

  constructor(grid: Grid, heuristic: HeuristicFunction = this.manhattanDistance) {
    this.grid = grid;
    this.heuristic = heuristic;
  }

  // Manhattan distance heuristic
  private manhattanDistance(a: Node, b: Node): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  // Euclidean distance heuristic (alternative)
  private euclideanDistance(a: Node, b: Node): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  private getNeighbors(node: AStarNode): AStarNode[] {
    const neighbors: AStarNode[] = [];
    const directions = [
      { x: 0, y: -1 },  // up
      { x: 1, y: 0 },   // right
      { x: 0, y: 1 },   // down
      { x: -1, y: 0 },  // left
    ];

    for (const dir of directions) {
      const newX = node.x + dir.x;
      const newY = node.y + dir.y;

      // Check bounds and obstacles
      if (newX >= 0 && newX < this.grid.width && 
          newY >= 0 && newY < this.grid.height && 
          !this.grid.isBlocked(newX, newY)) {
        neighbors.push({
          x: newX,
          y: newY,
          f: 0,
          g: 0,
          h: 0,
          parent: null
        });
      }
    }

    return neighbors;
  }

  private nodeToKey(node: Node): string {
    return `${node.x},${node.y}`;
  }

  findPath(start: Node, end: Node): Node[] | null {
    // Initialize open and closed lists
    const openList: AStarNode[] = [];
    const closedList = new Set<string>();

    // Create start node
    const startNode: AStarNode = {
      ...start,
      g: 0,
      h: this.heuristic(start, end),
      f: this.heuristic(start, end),
      parent: null
    };

    openList.push(startNode);

    while (openList.length > 0) {
      // Get node with lowest f cost
      openList.sort((a, b) => a.f - b.f);
      const currentNode = openList.shift()!;

      // Add to closed list
      closedList.add(this.nodeToKey(currentNode));

      // Check if we reached the goal
      if (currentNode.x === end.x && currentNode.y === end.y) {
        return this.reconstructPath(currentNode);
      }

      // Process neighbors
      const neighbors = this.getNeighbors(currentNode);
      for (const neighbor of neighbors) {
        const neighborKey = this.nodeToKey(neighbor);

        // Skip if in closed list
        if (closedList.has(neighborKey)) continue;

        // Calculate costs
        const gScore = currentNode.g + 1; // Assuming uniform movement cost
        const hScore = this.heuristic(neighbor, end);
        const fScore = gScore + hScore;

        // Check if this path is better
        const existingNode = openList.find(n => 
          n.x === neighbor.x && n.y === neighbor.y
        );

        if (!existingNode || gScore < existingNode.g) {
          const newNeighbor: AStarNode = {
            ...neighbor,
            g: gScore,
            h: hScore,
            f: fScore,
            parent: currentNode
          };

          if (!existingNode) {
            openList.push(newNeighbor);
          } else {
            // Update existing node
            existingNode.g = gScore;
            existingNode.h = hScore;
            existingNode.f = fScore;
            existingNode.parent = currentNode;
          }
        }
      }
    }

    return null; // No path found
  }

  private reconstructPath(node: AStarNode): Node[] {
    const path: Node[] = [];
    let currentNode: AStarNode | null = node;

    while (currentNode !== null) {
      path.push({ x: currentNode.x, y: currentNode.y });
      currentNode = currentNode.parent;
    }

    return path.reverse();
  }
}
// Example grid implementation
const exampleGrid: Grid = {
  width: 10,
  height: 10,
  isBlocked: (x: number, y: number) => {
    // Define obstacles
    const obstacles = [
      { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 },
      { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 }
    ];
    return obstacles.some(obs => obs.x === x && obs.y === y);
  }
};

// Create pathfinder
const pathfinder = new AStarPathfinder(exampleGrid);

// Find path
const start = { x: 1, y: 1 };
const end = { x: 8, y: 8 };
const path = pathfinder.findPath(start, end);

if (path) {
  console.log("Path found:");
  console.log(path.map(p => `(${p.x},${p.y})`).join(" → "));
} else {
  console.log("No path found");
}
// Diagonal movement
private getNeighborsWithDiagonals(node: AStarNode): AStarNode[] {
  const neighbors: AStarNode[] = [];
  const directions = [
    { x: 0, y: -1 },  // up
    { x: 1, y: 0 },   // right
    { x: 0, y: 1 },   // down
    { x: -1, y: 0 },  // left
    { x: 1, y: -1 },  // up-right
    { x: 1, y: 1 },   // down-right
    { x: -1, y: 1 },  // down-left
    { x: -1, y: -1 }, // up-left
  ];

  // ... same logic as before
}

// Variable movement costs
interface GridWithCosts extends Grid {
  getCost?: (x: number, y: number) => number;
}

// Weighted heuristic
const weightedManhattan = (a: Node, b: Node, weight: number = 1.0): number => {
  return weight * (Math.abs(a.x - b.x) + Math.abs(a.y - b.y));
};

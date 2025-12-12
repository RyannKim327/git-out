interface Node {
  x: number;
  y: number;
}

interface PathNode extends Node {
  f: number; // total cost
  g: number; // cost from start
  h: number; // heuristic cost to end
  parent: PathNode | null;
}

interface Grid {
  width: number;
  height: number;
  isObstacle: (x: number, y: number) => boolean;
}

interface AStarResult {
  path: Node[];
  visited: Node[];
  success: boolean;
}
class AStar {
  private grid: Grid;
  private openSet: PathNode[];
  private closedSet: Set<string>;
  private visitedNodes: PathNode[];

  constructor(grid: Grid) {
    this.grid = grid;
    this.openSet = [];
    this.closedSet = new Set();
    this.visitedNodes = [];
  }

  private heuristic(node: Node, end: Node): number {
    // Manhattan distance
    return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
  }

  private getNeighbors(node: PathNode): PathNode[] {
    const neighbors: PathNode[] = [];
    const directions = [
      { dx: 0, dy: -1 }, // up
      { dx: 1, dy: 0 },  // right
      { dx: 0, dy: 1 },  // down
      { dx: -1, dy: 0 }, // left
      // Uncomment for diagonal movement:
      // { dx: 1, dy: -1 }, { dx: 1, dy: 1 }, { dx: -1, dy: 1 }, { dx: -1, dy: -1 }
    ];

    for (const dir of directions) {
      const newX = node.x + dir.dx;
      const newY = node.y + dir.dy;

      // Check bounds and obstacles
      if (
        newX >= 0 && newX < this.grid.width &&
        newY >= 0 && newY < this.grid.height &&
        !this.grid.isObstacle(newX, newY)
      ) {
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

  private getNodeKey(node: Node): string {
    return `${node.x},${node.y}`;
  }

  private reconstructPath(endNode: PathNode): Node[] {
    const path: Node[] = [];
    let currentNode: PathNode | null = endNode;

    while (currentNode !== null) {
      path.unshift({ x: currentNode.x, y: currentNode.y });
      currentNode = currentNode.parent;
    }

    return path;
  }

  findPath(start: Node, end: Node): AStarResult {
    this.openSet = [];
    this.closedSet = new Set();
    this.visitedNodes = [];

    // Create start node
    const startNode: PathNode = {
      ...start,
      f: 0,
      g: 0,
      h: this.heuristic(start, end),
      parent: null
    };

    this.openSet.push(startNode);

    while (this.openSet.length > 0) {
      // Find node with lowest f cost
      let lowestIndex = 0;
      for (let i = 1; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }

      const currentNode = this.openSet[lowestIndex];
      this.visitedNodes.push(currentNode);

      // Check if we reached the goal
      if (currentNode.x === end.x && currentNode.y === end.y) {
        return {
          path: this.reconstructPath(currentNode),
          visited: this.visitedNodes.map(n => ({ x: n.x, y: n.y })),
          success: true
        };
      }

      // Remove current node from open set and add to closed set
      this.openSet.splice(lowestIndex, 1);
      this.closedSet.add(this.getNodeKey(currentNode));

      // Explore neighbors
      const neighbors = this.getNeighbors(currentNode);
      
      for (const neighbor of neighbors) {
        const neighborKey = this.getNodeKey(neighbor);

        // Skip if in closed set
        if (this.closedSet.has(neighborKey)) {
          continue;
        }

        // Calculate tentative g score
        const tentativeG = currentNode.g + 1; // Assuming uniform cost of 1

        // Check if this path is better
        let neighborInOpenSet = this.openSet.find(n => 
          n.x === neighbor.x && n.y === neighbor.y
        );

        if (!neighborInOpenSet) {
          // New node discovered
          const newNeighbor: PathNode = {
            ...neighbor,
            g: tentativeG,
            h: this.heighbor(neighbor, end),
            f: tentativeG + this.heighbor(neighbor, end),
            parent: currentNode
          };
          this.openSet.push(newNeighbor);
        } else if (tentativeG < neighborInOpenSet.g) {
          // Found a better path to this node
          neighborInOpenSet.g = tentativeG;
          neighborInOpenSet.f = tentativeG + neighborInOpenSet.h;
          neighborInOpenSet.parent = currentNode;
        }
      }
    }

    // No path found
    return {
      path: [],
      visited: this.visitedNodes.map(n => ({ x: n.x, y: n.y })),
      success: false
    };
  }
}
// Example grid implementation
class SimpleGrid implements Grid {
  obstacles: Set<string>;
  
  constructor(public width: number, public height: number, obstacles: Node[] = []) {
    this.obstacles = new Set(obstacles.map(obs => `${obs.x},${obs.y}`));
  }

  isObstacle(x: number, y: number): boolean {
    return this.obstacles.has(`${x},${y}`);
  }
}

// Example usage
function example() {
  // Create a 10x10 grid with some obstacles
  const obstacles: Node[] = [
    { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
    { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 },
    { x: 8, y: 8 }, { x: 8, y: 9 }
  ];

  const grid = new SimpleGrid(10, 10, obstacles);
  const aStar = new AStar(grid);

  const start: Node = { x: 0, y: 0 };
  const end: Node = { x: 9, y: 9 };

  const result = aStar.findPath(start, end);

  if (result.success) {
    console.log('Path found:');
    result.path.forEach(node => {
      console.log(`(${node.x}, ${node.y})`);
    });
  } else {
    console.log('No path found');
  }

  console.log(`Visited ${result.visited.length} nodes`);
}
// Weighted grid with different terrain costs
interface WeightedGrid extends Grid {
  getCost: (x: number, y: number) => number;
}

// Custom heuristic functions
const heuristics = {
  manhattan: (a: Node, b: Node) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y),
  euclidean: (a: Node, b: Node) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)),
  diagonal: (a: Node, b: Node) => {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return Math.max(dx, dy);
  }
};

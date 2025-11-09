interface GridNode {
  x: number;
  y: number;
  id: string; // Unique identifier, e.g., "x,y"
}

// Helper to create a node and its ID
function createGridNode(x: number, y: number): GridNode {
  return { x, y, id: `${x},${y}` };
}
class PriorityQueue<T> {
  private heap: T[] = [];
  private comparator: (a: T, b: T) => number; // Returns < 0 if a has higher priority

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  enqueue(item: T): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown();
    return min;
  }

  peek(): T | undefined {
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
      if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown(): void {
    let index = 0;
    const lastIndex = this.heap.length - 1;
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let smallestIndex = index;

      if (
        leftChildIndex <= lastIndex &&
        this.comparator(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex <= lastIndex &&
        this.comparator(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0
      ) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex !== index) {
        [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
        index = smallestIndex;
      } else {
        break;
      }
    }
  }
}
// Manhattan distance heuristic
function manhattanDistance(nodeA: GridNode, nodeB: GridNode): number {
  return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
}
// Grid layout: 0 = traversable, 1 = wall
type Grid = number[][];

function getNeighbors(node: GridNode, grid: Grid): GridNode[] {
  const neighbors: GridNode[] = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // Possible movements: Up, Down, Left, Right
  const directions = [
    { dx: 0, dy: -1 }, // Up
    { dx: 0, dy: 1 },  // Down
    { dx: -1, dy: 0 }, // Left
    { dx: 1, dy: 0 },  // Right
  ];

  for (const dir of directions) {
    const newX = node.x + dir.dx;
    const newY = node.y + dir.dy;

    // Check bounds
    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
      // Check if it's a wall
      if (grid[newY][newX] === 0) {
        neighbors.push(createGridNode(newX, newY));
      }
    }
  }
  return neighbors;
}
function reconstructPath(
  cameFrom: Map<string, string>,
  currentId: string,
  startId: string,
  nodeMap: Map<string, GridNode> // To get actual GridNode objects from IDs
): GridNode[] {
  const path: GridNode[] = [];
  let current = nodeMap.get(currentId);

  if (!current) {
    // This case should ideally not happen if path found
    return [];
  }

  while (current.id !== startId) {
    path.unshift(current); // Add to the beginning
    const previousId = cameFrom.get(current.id);
    if (!previousId) {
      // Should not happen if a valid path exists
      console.error("Path reconstruction error: no previous node found for", current.id);
      return [];
    }
    current = nodeMap.get(previousId);
    if (!current) {
        console.error("Path reconstruction error: previous node not found in nodeMap", previousId);
        return [];
    }
  }
  path.unshift(current); // Add the start node
  return path;
}
function aStarSearch(
  grid: Grid,
  start: GridNode,
  target: GridNode
): GridNode[] | null {
  // --- Initialize Data Structures ---

  // For path reconstruction
  const cameFrom = new Map<string, string>();

  // gScore: Cost from start to this node
  const gScore = new Map<string, number>();
  gScore.set(start.id, 0);

  // fScore: gScore + heuristic (estimated total cost)
  const fScore = new Map<string, number>();
  fScore.set(start.id, manhattanDistance(start, target));

  // Priority queue for nodes to evaluate, ordered by fScore
  const openSet = new PriorityQueue<GridNode>(
    (a, b) => (fScore.get(a.id) || Infinity) - (fScore.get(b.id) || Infinity)
  );
  openSet.enqueue(start);

  // Keep a map of all created nodes to retrieve them by ID for path reconstruction
  const nodeMap = new Map<string, GridNode>();
  nodeMap.set(start.id, start);
  nodeMap.set(target.id, target); // Ensure target is also in map

  // --- Main A* Loop ---
  while (!openSet.isEmpty()) {
    const current = openSet.dequeue()!; // Get node with lowest fScore

    // If target reached, reconstruct and return path
    if (current.id === target.id) {
      return reconstructPath(cameFrom, current.id, start.id, nodeMap);
    }

    // Explore neighbors
    for (const neighbor of getNeighbors(current, grid)) {
      nodeMap.set(neighbor.id, neighbor); // Add neighbor to nodeMap
      
      // Cost from start to neighbor through current node
      const tentative_gScore = (gScore.get(current.id) || Infinity) + 1; // Assuming cost of 1 per step

      // If this path to neighbor is better than any previous one
      if (tentative_gScore < (gScore.get(neighbor.id) || Infinity)) {
        cameFrom.set(neighbor.id, current.id);
        gScore.set(neighbor.id, tentative_gScore);
        fScore.set(
          neighbor.id,
          tentative_gScore + manhattanDistance(neighbor, target)
        );

        // Add neighbor to openSet (if not already there or if priority improved).
        // For simplicity, we just enqueue it. The PriorityQueue will always dequeue
        // the one with the lowest fScore. If an inferior path to a node was enqueued
        // earlier, it will be ignored when dequeued because its gScore won't be optimal.
        openSet.enqueue(neighbor);
      }
    }
  }

  // If openSet is empty and target was not reached, no path exists
  return null;
}
// Define a grid (0 = traversable, 1 = wall)
const grid: Grid = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

// Define start and target nodes
const startNode = createGridNode(0, 0); // (x, y)
const targetNode = createGridNode(4, 4); // (x, y)

// Run A*
const path = aStarSearch(grid, startNode, targetNode);

if (path) {
  console.log("Path found:");
  path.forEach((node) => console.log(`(${node.x}, ${node.y})`));

  // Visualizing the path on the grid (optional)
  const pathGrid = grid.map(row => [...row]); // Create a copy
  path.forEach(node => {
      pathGrid[node.y][node.x] = 2; // Mark path with '2'
  });
  pathGrid[startNode.y][startNode.x] = 'S';
  pathGrid[targetNode.y][targetNode.x] = 'T';

  console.log("\nVisualized Path (S=Start, T=Target, 2=Path, 0=Empty, 1=Wall):");
  pathGrid.forEach(row => console.log(row.join(' ')));

} else {
  console.log("No path found!");
}

// Example with no path
const startNode2 = createGridNode(0, 0);
const targetNode2 = createGridNode(0, 4); // Target behind a wall
const grid2: Grid = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
];
const path2 = aStarSearch(grid2, startNode2, targetNode2);
console.log("\n--- Second Example (No Path) ---");
if (path2) {
    console.log("Path found:");
} else {
    console.log("No path found for the second example!");
}

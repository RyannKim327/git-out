// Define the coordinate type (can be extended for other graph types)
type Coordinate = { x: number; y: number };

// Generic node type that A* works with
interface AStarNode<T> {
  data: T;
  position: Coordinate;
  neighbors: AStarNode<T>[];
  heuristic: (node: AStarNode<T>, goal: AStarNode<T>) => number;
}

// Priority queue for A* (using a simple binary heap)
class PriorityQueue<T> {
  private items: { item: T; priority: number }[] = [];
  private indexMap = new Map<T, number>();

  enqueue(item: T, priority: number): void {
    if (this.indexMap.has(item)) {
      return; // Item already exists
    }
    
    this.items.push({ item, priority });
    this.indexMap.set(item, this.items.length - 1);
    this.siftUp(this.items.length - 1);
  }

  dequeue(): T | null {
    if (this.items.length === 0) return null;
    
    this.swap(0, this.items.length - 1);
    const item = this.items.pop()!.item;
    this.indexMap.delete(item);
    
    if (this.items.length > 0) {
      this.siftDown(0);
    }
    
    return item;
  }

  update(item: T, priority: number): void {
    const index = this.indexMap.get(item);
    if (index === undefined || index >= this.items.length) return;
    
    this.items[index].priority = priority;
    this.siftUp(index);
    this.siftDown(index);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  private siftUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.items[parentIndex].priority <= this.items[index].priority) {
        break;
      }
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  private siftDown(index: number): void {
    const length = this.items.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < length && this.items[left].priority < this.items[smallest].priority) {
        smallest = left;
      }
      if (right < length && this.items[right].priority < this.items[smallest].priority) {
        smallest = right;
      }

      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = temp;

    this.indexMap.set(this.items[i].item, i);
    this.indexMap.set(this.items[j].item, j);
  }
}

// Main A* implementation
class AStar<T> {
  private gScore = new Map<AStarNode<T>, number>();
  private fScore = new Map<AStarNode<T>, number>();
  private cameFrom = new Map<AStarNode<T>, AStarNode<T> | null>();
  private openSet: PriorityQueue<AStarNode<T>> = new PriorityQueue();

  search(
    start: AStarNode<T>, 
    goal: AStarNode<T>
  ): { path: AStarNode<T>[]; found: boolean } {
    // Reset maps and queue
    this.gScore.clear();
    this.fScore.clear();
    this.cameFrom.clear();
    this.openSet = new PriorityQueue();

    // Initialize
    this.gScore.set(start, 0);
    this.fScore.set(start, start.heuristic(start, goal));
    this.openSet.enqueue(start, this.fScore.get(start)!);

    while (!this.openSet.isEmpty()) {
      const current = this.openSet.dequeue()!;

      if (this.isEqual(current, goal)) {
        return { path: this.reconstructPath(cameFrom, current), found: true };
      }

      for (const neighbor of current.neighbors) {
        const tentativeGScore = this.gScore.get(current)! + this.distance(current, neighbor);

        if (!this.gScore.has(neighbor) || tentativeGScore < this.gScore.get(neighbor)!) {
          this.cameFrom.set(neighbor, current);
          this.gScore.set(neighbor, tentativeGScore);

          const fScore = tentativeGScore + neighbor.heuristic(neighbor, goal);
          this.fScore.set(neighbor, fScore);

          if (!this.openSet.isEmpty()) {
            // Check if neighbor is already in open set
            const existingIndex = Array.from(this.openSet as any).findIndex(
              (item: { item: AStarNode<T>; priority: number }) => 
                this.isEqual(item.item, neighbor)
            );
            
            if (existingIndex !== -1) {
              this.openSet.update(neighbor, fScore);
            } else {
              this.openSet.enqueue(neighbor, fScore);
            }
          }
        }
      }
    }

    // No path found
    return { path: [], found: false };
  }

  private reconstructPath(
    cameFrom: Map<AStarNode<T>, AStarNode<T> | null>, 
    current: AStarNode<T>
  ): AStarNode<T>[] {
    const path: AStarNode<T>[] = [current];
    while (cameFrom.get(current) !== null) {
      current = cameFrom.get(current)!;
      path.unshift(current);
    }
    return path;
  }

  private distance(node1: AStarNode<T>, node2: AStarNode<T>): number {
    const dx = node1.position.x - node2.position.x;
    const dy = node1.position.y - node2.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private isEqual(node1: AStarNode<T>, node2: AStarNode<T>): boolean {
    return node1.position.x === node2.position.x && 
           node1.position.y === node2.position.y;
  }
}

// Example usage with a grid-based maze
class GridNode implements AStarNode<{ id: string; isWall: boolean }> {
  data: { id: string; isWall: boolean };
  position: Coordinate;
  neighbors: GridNode[] = [];
  heuristic: (node: GridNode, goal: GridNode) => number;

  constructor(x: number, y: number, isWall: boolean = false) {
    this.position = { x, y };
    this.data = { id: `(${x},${y})`, isWall };
    // Manhattan distance heuristic (good for grid with 4-directional movement)
    this.heuristic = (node: GridNode, goal: GridNode) => {
      const dx = Math.abs(node.position.x - goal.position.x);
      const dy = Math.abs(node.position.y - goal.position.y);
      return dx + dy;
    };
  }
}

// Utility to create a grid
function createGrid(width: number, height: number, walls: Coordinate[] = []): GridNode[][] {
  const grid: GridNode[][] = [];
  
  for (let y = 0; y < height; y++) {
    grid[y] = [];
    for (let x = 0; x < width; x++) {
      const isWall = walls.some(wall => wall.x === x && wall.y === y);
      const node = new GridNode(x, y, isWall);
      grid[y][x] = node;
    }
  }

  // Connect neighbors (4-directional movement)
  const directions = [
    { dx: 0, dy: -1 }, // up
    { dx: 0, dy: 1 },  // down
    { dx: -1, dy: 0 }, // left
    { dx: 1, dy: 0 }   // right
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const node = grid[y][x];
      if (node.data.isWall) continue;

      for (const dir of directions) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;
        
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const neighbor = grid[ny][nx];
          if (!neighbor.data.isWall) {
            node.neighbors.push(neighbor);
          }
        }
      }
    }
  }

  return grid;
}

// Example usage
function exampleUsage() {
  // Create a 10x10 grid with some walls
  const walls: Coordinate[] = [
    { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
    { x: 2, y: 3 }, { x: 4, y: 3 },
    { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
    { x: 7, y: 5 }, { x: 7, y: 6 }, { x: 7, y: 7 }
  ];

  const grid = createGrid(10, 10, walls);
  const start = grid[0][0];  // Top-left
  const goal = grid[9][9];   // Bottom-right

  const aStar = new AStar<GridNode['data']>();
  const result = aStar.search(start, goal);

  if (result.found) {
    console.log('Path found with', result.path.length, 'nodes:');
    result.path.forEach((node, index) => {
      console.log(`Step ${index}: (${node.position.x}, ${node.position.y})`);
    });
  } else {
    console.log('No path found');
  }
}

// Run the example
exampleUsage();

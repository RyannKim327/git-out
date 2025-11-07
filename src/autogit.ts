interface Graph {
  [node: string]: string[];
}

function bfs(graph: Graph, start: string): string[] {
  const visited: Set<string> = new Set();
  const queue: string[] = [start];
  const result: string[] = [];
  
  visited.add(start);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode);

    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

// Example usage
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

console.log(bfs(graph, 'A')); // ['A', 'B', 'C', 'D', 'E', 'F']
interface PathResult {
  path: string[];
  distance: number;
}

function bfsPath(graph: Graph, start: string, target: string): PathResult | null {
  const visited: Set<string> = new Set();
  const queue: string[] = [start];
  const parent: Map<string, string> = new Map();
  
  visited.add(start);
  parent.set(start, '');

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    if (currentNode === target) {
      // Reconstruct path
      const path: string[] = [];
      let node = currentNode;
      while (node !== '') {
        path.unshift(node);
        node = parent.get(node)!;
      }
      return { path, distance: path.length - 1 };
    }

    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, currentNode);
        queue.push(neighbor);
      }
    }
  }

  return null;
}

// Example usage
console.log(bfsPath(graph, 'A', 'F')); 
// { path: ['A', 'C', 'F'], distance: 2 }
type Grid = number[][];
type Point = [number, number]; // [row, col]

function bfsGrid(
  grid: Grid, 
  start: Point, 
  end: Point
): Point[] | null {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions: Point[] = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  
  const visited: boolean[][] = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false));
  
  const queue: Point[] = [start];
  const parent: Map<string, Point> = new Map();
  
  visited[start[0]][start[1]] = true;
  parent.set(`${start[0]},${start[1]}`, [-1, -1]);

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;

    if (row === end[0] && col === end[1]) {
      // Reconstruct path
      const path: Point[] = [];
      let current: Point = [row, col];
      
      while (current[0] !== -1 && current[1] !== -1) {
        path.unshift(current);
        current = parent.get(`${current[0]},${current[1]}`)!;
      }
      
      return path;
    }

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols &&
        grid[newRow][newCol] === 0 && // 0 represents empty cell
        !visited[newRow][newCol]
      ) {
        visited[newRow][newCol] = true;
        queue.push([newRow, newCol]);
        parent.set(`${newRow},${newCol}`, [row, col]);
      }
    }
  }

  return null;
}

// Example usage
const maze: Grid = [
  [0, 1, 0, 0, 0], // 0 = empty, 1 = wall
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0]
];

console.log(bfsGrid(maze, [0, 0], [4, 4]));
class BFS<T> {
  constructor(
    private getNeighbors: (node: T) => T[],
    private areEqual: (a: T, b: T) => boolean = (a, b) => a === b
  ) {}

  traverse(start: T): T[] {
    const visited: T[] = [];
    const queue: T[] = [start];
    const visitedSet = new Set<string>([JSON.stringify(start)]);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      visited.push(currentNode);

      for (const neighbor of this.getNeighbors(currentNode)) {
        const neighborKey = JSON.stringify(neighbor);
        if (!visitedSet.has(neighborKey)) {
          visitedSet.add(neighborKey);
          queue.push(neighbor);
        }
      }
    }

    return visited;
  }

  findPath(start: T, target: T): T[] | null {
    const visitedSet = new Set<string>([JSON.stringify(start)]);
    const queue: T[] = [start];
    const parent = new Map<string, T>();

    parent.set(JSON.stringify(start), null as any);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;

      if (this.areEqual(currentNode, target)) {
        return this.reconstructPath(parent, currentNode);
      }

      for (const neighbor of this.getNeighbors(currentNode)) {
        const neighborKey = JSON.stringify(neighbor);
        if (!visitedSet.has(neighborKey)) {
          visitedSet.add(neighborKey);
          parent.set(neighborKey, currentNode);
          queue.push(neighbor);
        }
      }
    }

    return null;
  }

  private reconstructPath(parent: Map<string, T>, end: T): T[] {
    const path: T[] = [];
    let current: T | null = end;
    
    while (current !== null) {
      path.unshift(current);
      current = parent.get(JSON.stringify(current)) || null;
    }
    
    return path;
  }
}

// Example usage
const graphBFS = new BFS<string>((node) => graph[node]);
console.log(graphBFS.traverse('A'));
console.log(graphBFS.findPath('A', 'F'));

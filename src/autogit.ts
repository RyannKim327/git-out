interface Graph {
  [key: string]: string[];
}

function bfs(graph: Graph, start: string, target?: string): string[] | boolean {
  const visited = new Set<string>();
  const queue: string[] = [start];
  const result: string[] = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);
    
    // If we're searching for a specific node and found it
    if (target && current === target) {
      return true;
    }
    
    // Visit all unvisited neighbors
    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  // Return traversal order, or false if searching for target that wasn't found
  return target ? false : result;
}
interface BFSResult {
  traversalOrder: string[];
  distances: Map<string, number>;
  parents: Map<string, string | null>;
  path: string[] | null;
}

function bfsWithPaths(graph: Graph, start: string, target?: string): BFSResult {
  const visited = new Set<string>();
  const queue: string[] = [start];
  const distances = new Map<string, number>();
  const parents = new Map<string, string | null>();
  const traversalOrder: string[] = [];
  
  distances.set(start, 0);
  parents.set(start, null);
  visited.add(start);
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    traversalOrder.push(current);
    
    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        distances.set(neighbor, distances.get(current)! + 1);
        parents.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }
  
  // Build path if target is specified
  let path: string[] | null = null;
  if (target && parents.has(target)) {
    path = [];
    let current: string | null = target;
    while (current !== null) {
      path.unshift(current);
      current = parents.get(current)!;
    }
  }
  
  return {
    traversalOrder,
    distances,
    parents,
    path
  };
}
interface Point {
  x: number;
  y: number;
}

function bfsMatrix(
  grid: number[][],
  start: Point,
  target: Point
): { path: Point[]; visited: Point[] } | null {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set<string>();
  const parents = new Map<string, Point | null>();
  const queue: Point[] = [start];
  
  const pointToString = (p: Point): string => `${p.x},${p.y}`;
  
  visited.add(pointToString(start));
  parents.set(pointToString(start), null);
  
  const directions = [
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
    [-1, 0]  // up
  ];
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    
    // Check if we reached the target
    if (current.x === target.x && current.y === target.y) {
      // Reconstruct path
      const path: Point[] = [];
      let temp: Point | null = current;
      
      while (temp !== null) {
        path.unshift(temp);
        const parentStr = pointToString(temp);
        temp = parents.get(parentStr)!;
      }
      
      return {
        path,
        visited: Array.from(visited).map(str => {
          const [x, y] = str.split(',').map(Number);
          return { x, y };
        })
      };
    }
    
    // Explore neighbors
    for (const [dx, dy] of directions) {
      const neighbor: Point = {
        x: current.x + dx,
        y: current.y + dy
      };
      
      const neighborStr = pointToString(neighbor);
      
      // Check bounds and obstacles (0 = obstacle, 1 = free)
      if (
        neighbor.x >= 0 && neighbor.x < rows &&
        neighbor.y >= 0 && neighbor.y < cols &&
        grid[neighbor.x][neighbor.y] === 1 &&
        !visited.has(neighborStr)
      ) {
        visited.add(neighborStr);
        parents.set(neighborStr, current);
        queue.push(neighbor);
      }
    }
  }
  
  return null; // No path found
}
// Example 1: Basic graph traversal
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

console.log('BFS Traversal:', bfs(graph, 'A')); // ['A', 'B', 'C', 'D', 'E', 'F']
console.log('Search for F:', bfs(graph, 'A', 'F')); // true

// Example 2: BFS with paths
const result = bfsWithPaths(graph, 'A', 'F');
console.log('Shortest path from A to F:', result.path); // ['A', 'C', 'F']
console.log('Distances:', Object.fromEntries(result.distances)); // {A: 0, B: 1, C: 1, D: 2, E: 2, F: 2}

// Example 3: Matrix BFS
const grid = [
  [1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 1, 1, 1]
];

const start = { x: 0, y: 0 };
const target = { x: 3, y: 4 };
const matrixResult = bfsMatrix(grid, start, target);
console.log('Matrix path length:', matrixResult?.path.length); // 8
console.log('Matrix path:', matrixResult?.path);
function genericBFS<T>(
  start: T,
  getNeighbors: (node: T) => T[],
  isTarget?: (node: T) => boolean,
  hashFunction?: (node: T) => string
): { visited: T[]; path?: T[] } {
  const defaultHash = (node: T): string => JSON.stringify(node);
  const hashFn = hashFunction || defaultHash;
  
  const visited = new Set<string>();
  const queue: T[] = [start];
  const parents = new Map<string, T | null>();
  const traversalOrder: T[] = [];
  
  visited.add(hashFn(start));
  parents.set(hashFn(start), null);
  
  let targetNode: T | null = null;
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    traversalOrder.push(current);
    
    if (isTarget?.(current)) {
      targetNode = current;
      break;
    }
    
    for (const neighbor of getNeighbors(current)) {
      const neighborHash = hashFn(neighbor);
      if (!visited.has(neighborHash)) {
        visited.add(neighborHash);
        parents.set(neighborHash, current);
        queue.push(neighbor);
      }
    }
  }
  
  // Build path if target was found
  let path: T[] | undefined;
  if (targetNode) {
    path = [];
    let current: T | null = targetNode;
    while (current !== null) {
      path.unshift(current);
      const parentHash = hashFn(current);
      current = parents.get(parentHash)!;
    }
  }
  
  return { visited: traversalOrder, path };
}

interface Graph {
  [key: string]: string[];
}

function bfs(graph: Graph, startNode: string): string[] {
  const visited: Set<string> = new Set();
  const queue: string[] = [];
  const result: string[] = [];

  // Start with the initial node
  visited.add(startNode);
  queue.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode);

    // Visit all unvisited neighbors
    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}
function bfsWithPath(graph: Graph, startNode: string, targetNode: string): string[] | null {
  const visited: Set<string> = new Set();
  const queue: { node: string; path: string[] }[] = [];
  
  visited.add(startNode);
  queue.push({ node: startNode, path: [startNode] });

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;
    
    if (node === targetNode) {
      return path;
    }

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({
          node: neighbor,
          path: [...path, neighbor]
        });
      }
    }
  }

  return null; // No path found
}
interface BFSResult<T> {
  visited: T[];
  distances: Map<T, number>;
  predecessors: Map<T, T | null>;
}

function genericBfs<T>(
  startNode: T,
  getNeighbors: (node: T) => T[]
): BFSResult<T> {
  const visited: T[] = [];
  const distances = new Map<T, number>();
  const predecessors = new Map<T, T | null>();
  const queue: T[] = [];

  distances.set(startNode, 0);
  predecessors.set(startNode, null);
  queue.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    visited.push(currentNode);

    const currentDistance = distances.get(currentNode)!;

    for (const neighbor of getNeighbors(currentNode)) {
      if (!distances.has(neighbor)) {
        distances.set(neighbor, currentDistance + 1);
        predecessors.set(neighbor, currentNode);
        queue.push(neighbor);
      }
    }
  }

  return { visited, distances, predecessors };
}
// Example 1: Simple Graph
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

console.log('BFS traversal:', bfs(graph, 'A'));
// Output: ['A', 'B', 'C', 'D', 'E', 'F']

console.log('Path from A to F:', bfsWithPath(graph, 'A', 'F'));
// Output: ['A', 'B', 'E', 'F'] or ['A', 'C', 'F']

// Example 2: Using generic BFS
const result = genericBfs('A', (node: string) => graph[node]);
console.log('Visited order:', result.visited);
console.log('Distances:', result.distances);
console.log('Predecessors:', result.predecessors);
interface Point {
  x: number;
  y: number;
}

function bfsGrid(
  grid: number[][],
  start: Point,
  isTarget: (point: Point) => boolean,
  isValidMove: (point: Point) => boolean
): Point[] | null {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited: boolean[][] = Array(rows).fill(null).map(() => Array(cols).fill(false));
  const queue: { point: Point; path: Point[] }[] = [];
  const directions = [
    { x: 0, y: 1 },  // right
    { x: 1, y: 0 },  // down
    { x: 0, y: -1 }, // left
    { x: -1, y: 0 }  // up
  ];

  visited[start.x][start.y] = true;
  queue.push({ point: start, path: [start] });

  while (queue.length > 0) {
    const { point, path } = queue.shift()!;

    if (isTarget(point)) {
      return path;
    }

    for (const dir of directions) {
      const newPoint: Point = {
        x: point.x + dir.x,
        y: point.y + dir.y
      };

      if (isValidMove(newPoint) && !visited[newPoint.x]?.[newPoint.y]) {
        visited[newPoint.x][newPoint.y] = true;
        queue.push({
          point: newPoint,
          path: [...path, newPoint]
        });
      }
    }
  }

  return null;
}
class GraphNode<T> {
  constructor(
    public value: T,
    public neighbors: GraphNode<T>[] = []
  ) {}

  addNeighbor(node: GraphNode<T>): void {
    this.neighbors.push(node);
  }
}

function bfsGraphNode<T>(startNode: GraphNode<T>): T[] {
  const visited = new Set<GraphNode<T>>();
  const queue: GraphNode<T>[] = [];
  const result: T[] = [];

  visited.add(startNode);
  queue.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode.value);

    for (const neighbor of currentNode.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

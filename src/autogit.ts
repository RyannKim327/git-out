interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

function bfsTree<T>(root: TreeNode<T>): T[] {
  const result: T[] = [];
  const queue: TreeNode<T>[] = [root];
  
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode.value);
    
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
  
  return result;
}

// Usage
const tree: TreeNode<number> = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 }
  },
  right: {
    value: 3,
    left: { value: 6 },
    right: { value: 7 }
  }
};

console.log(bfsTree(tree)); // [1, 2, 3, 4, 5, 6, 7]
interface Graph {
  [key: string]: string[];
}

function bfsGraph(graph: Graph, startNode: string): string[] {
  const visited: Set<string> = new Set();
  const result: string[] = [];
  const queue: string[] = [startNode];
  visited.add(startNode);
  
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

// Usage
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

console.log(bfsGraph(graph, 'A')); // ['A', 'B', 'C', 'D', 'E', 'F']
function bfs<T>(
  startNode: T,
  getNeighbors: (node: T) => T[],
  processNode?: (node: T) => void
): T[] {
  const visited: Set<T> = new Set();
  const result: T[] = [];
  const queue: T[] = [startNode];
  visited.add(startNode);
  
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode);
    
    // Optional node processing
    if (processNode) {
      processNode(currentNode);
    }
    
    const neighbors = getNeighbors(currentNode);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}

// Usage with a grid (2D array)
type GridNode = [number, number]; // [row, col]

const grid = [
  [1, 1, 1, 1],
  [1, 0, 1, 1],
  [1, 1, 1, 1]
];

function getGridNeighbors(node: GridNode): GridNode[] {
  const [row, col] = node;
  const neighbors: GridNode[] = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  
  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    
    if (newRow >= 0 && newRow < grid.length && 
        newCol >= 0 && newCol < grid[0].length &&
        grid[newRow][newCol] === 1) {
      neighbors.push([newRow, newCol]);
    }
  }
  
  return neighbors;
}

const start: GridNode = [0, 0];
const visitedNodes = bfs(start, getGridNeighbors);
console.log(visitedNodes); // All accessible grid positions
function bfsWithPath<T>(
  startNode: T,
  targetNode: T,
  getNeighbors: (node: T) => T[]
): T[] | null {
  const visited: Set<T> = new Set();
  const queue: T[] = [startNode];
  const parentMap: Map<T, T> = new Map();
  visited.add(startNode);
  
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    
    if (currentNode === targetNode) {
      return reconstructPath(parentMap, startNode, targetNode);
    }
    
    for (const neighbor of getNeighbors(currentNode)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parentMap.set(neighbor, currentNode);
        queue.push(neighbor);
      }
    }
  }
  
  return null; // No path found
}

function reconstructPath<T>(
  parentMap: Map<T, T>,
  start: T,
  end: T
): T[] {
  const path: T[] = [end];
  let current = end;
  
  while (current !== start) {
    current = parentMap.get(current)!;
    path.unshift(current);
  }
  
  return path;
}

// Usage
const graph2: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D'],
  'C': ['A', 'E'],
  'D': ['B', 'F'],
  'E': ['C', 'F'],
  'F': ['D', 'E']
};

const path = bfsWithPath('A', 'F', (node) => graph2[node]);
console.log(path); // ['A', 'B', 'D', 'F'] or ['A', 'C', 'E', 'F']

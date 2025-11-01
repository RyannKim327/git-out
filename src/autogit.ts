interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function bfsTree<T>(root: TreeNode<T> | null): T[] {
  if (!root) return [];
  
  const result: T[] = [];
  const queue: TreeNode<T>[] = [root];
  
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode.value);
    
    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
  }
  
  return result;
}

// Usage example
const tree: TreeNode<number> = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null }
  },
  right: {
    value: 3,
    left: { value: 6, left: null, right: null },
    right: { value: 7, left: null, right: null }
  }
};

console.log(bfsTree(tree)); // [1, 2, 3, 4, 5, 6, 7]
interface Graph {
  [key: string]: string[];
}

function bfsGraph(
  graph: Graph,
  startNode: string,
  targetNode?: string
): { path: string[]; found: boolean } {
  const visited: Set<string> = new Set();
  const queue: string[] = [startNode];
  const parent: Map<string, string> = new Map();
  
  visited.add(startNode);
  parent.set(startNode, null);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    
    // If we're searching for a specific node and found it
    if (targetNode && currentNode === targetNode) {
      return {
        path: reconstructPath(parent, startNode, targetNode),
        found: true
      };
    }
    
    for (const neighbor of graph[currentNode] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, currentNode);
        queue.push(neighbor);
      }
    }
  }
  
  return {
    path: targetNode ? [] : Array.from(visited),
    found: false
  };
}

function reconstructPath(
  parent: Map<string, string>,
  start: string,
  end: string
): string[] {
  const path: string[] = [];
  let current = end;
  
  while (current !== null) {
    path.unshift(current);
    current = parent.get(current)!;
  }
  
  return path;
}

// Usage example
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

// Find shortest path from A to F
const result = bfsGraph(graph, 'A', 'F');
console.log(result.path); // ['A', 'C', 'F']
console.log(result.found); // true

// Get all nodes in BFS order
const allNodes = bfsGraph(graph, 'A');
console.log(allNodes.path); // ['A', 'B', 'C', 'D', 'E', 'F']
class BFS<T> {
  constructor(
    private getNeighbors: (node: T) => T[],
    private areEqual: (a: T, b: T) => boolean = (a, b) => a === b
  ) {}

  search(
    startNode: T,
    targetNode?: T
  ): { path: T[]; visited: T[]; found: boolean } {
    const visited: T[] = [];
    const queue: T[] = [startNode];
    const parent = new Map<T, T>();
    const visitedSet = new Set<T>([startNode]);
    
    parent.set(startNode, null!);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      visited.push(currentNode);

      // Check if we found the target
      if (targetNode && this.areEqual(currentNode, targetNode)) {
        return {
          path: this.reconstructPath(parent, startNode, targetNode),
          visited,
          found: true
        };
      }

      // Explore neighbors
      for (const neighbor of this.getNeighbors(currentNode)) {
        if (!Array.from(visitedSet).some(node => this.areEqual(node, neighbor))) {
          visitedSet.add(neighbor);
          parent.set(neighbor, currentNode);
          queue.push(neighbor);
        }
      }
    }

    return {
      path: [],
      visited,
      found: false
    };
  }

  private reconstructPath(
    parent: Map<T, T>,
    start: T,
    end: T
  ): T[] {
    const path: T[] = [];
    let current = end;
    
    while (current !== null!) {
      path.unshift(current);
      current = parent.get(current)!;
    }
    
    return path;
  }
}

// Usage example with custom objects
interface City {
  name: string;
  connections: string[];
}

const cityGraph: City[] = [
  { name: 'NYC', connections: ['Boston', 'Philly'] },
  { name: 'Boston', connections: ['NYC', 'Portland'] },
  { name: 'Philly', connections: ['NYC', 'DC'] },
  { name: 'DC', connections: ['Philly'] },
  { name: 'Portland', connections: ['Boston'] }
];

const bfs = new BFS<City>(
  (city) => cityGraph.filter(c => city.connections.includes(c.name)),
  (a, b) => a.name === b.name
);

const start = cityGraph[0]; // NYC
const target = cityGraph.find(c => c.name === 'DC')!;

const result = bfs.search(start, target);
console.log(result.path.map(c => c.name)); // ['NYC', 'Philly', 'DC']

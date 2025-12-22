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
interface GraphNode<T> {
  value: T;
  neighbors: GraphNode<T>[];
}

function bfsGraph<T>(
  startNode: GraphNode<T>,
  targetValue?: T
): { path: T[]; found: boolean } {
  const visited = new Set<GraphNode<T>>();
  const queue: { node: GraphNode<T>; path: T[] }[] = [
    { node: startNode, path: [startNode.value] }
  ];
  visited.add(startNode);

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;
    
    // If searching for specific value
    if (targetValue !== undefined && node.value === targetValue) {
      return { path, found: true };
    }
    
    for (const neighbor of node.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ 
          node: neighbor, 
          path: [...path, neighbor.value] 
        });
      }
    }
  }
  
  return { path: [], found: false };
}
interface BFSResult<T> {
  traversal: T[];
  levels: T[][];
  paths: Map<T, T[]>;
}

function bfsWithPathTracking<T>(
  startNode: GraphNode<T>,
  targetValue?: T
): BFSResult<T> {
  const visited = new Set<GraphNode<T>>();
  const queue: { node: GraphNode<T>; path: T[]; level: number }[] = [
    { node: startNode, path: [startNode.value], level: 0 }
  ];
  visited.add(startNode);
  
  const result: BFSResult<T> = {
    traversal: [],
    levels: [],
    paths: new Map()
  };
  
  result.paths.set(startNode.value, [startNode.value]);

  while (queue.length > 0) {
    const { node, path, level } = queue.shift()!;
    
    // Add to traversal result
    result.traversal.push(node.value);
    
    // Initialize level array if needed
    if (!result.levels[level]) {
      result.levels[level] = [];
    }
    result.levels[level].push(node.value);
    
    // Store path for this node
    result.paths.set(node.value, path);
    
    // Check if target found
    if (targetValue !== undefined && node.value === targetValue) {
      break;
    }
    
    // Process neighbors
    for (const neighbor of node.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({
          node: neighbor,
          path: [...path, neighbor.value],
          level: level + 1
        });
      }
    }
  }
  
  return result;
}
// Create a sample tree
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

console.log('Tree BFS:', bfsTree(tree)); 
// Output: [1, 2, 3, 4, 5, 6, 7]

// Create a sample graph
const nodeA: GraphNode<string> = { value: 'A', neighbors: [] };
const nodeB: GraphNode<string> = { value: 'B', neighbors: [] };
const nodeC: GraphNode<string> = { value: 'C', neighbors: [] };
const nodeD: GraphNode<string> = { value: 'D', neighbors: [] };

nodeA.neighbors = [nodeB, nodeC];
nodeB.neighbors = [nodeA, nodeD];
nodeC.neighbors = [nodeA, nodeD];
nodeD.neighbors = [nodeB, nodeC];

const result = bfsGraph(nodeA, 'D');
console.log('Path to D:', result.path); 
// Output: ['A', 'B', 'D'] or ['A', 'C', 'D']

const detailedResult = bfsWithPathTracking(nodeA);
console.log('Level order:', detailedResult.levels);
// Output: [['A'], ['B', 'C'], ['D']]
function bfsWithCallback<T>(
  startNode: GraphNode<T>,
  processNode: (node: GraphNode<T>, path: T[]) => void
): void {
  const visited = new Set<GraphNode<T>>();
  const queue: { node: GraphNode<T>; path: T[] }[] = [
    { node: startNode, path: [startNode.value] }
  ];
  visited.add(startNode);

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;
    
    // Process the current node
    processNode(node, path);
    
    for (const neighbor of node.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ 
          node: neighbor, 
          path: [...path, neighbor.value] 
        });
      }
    }
  }
}

// Usage with callback
bfsWithCallback(nodeA, (node, path) => {
  console.log(`Visited ${node.value} via path:`, path);
});

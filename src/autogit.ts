interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

function bfsTree<T>(root: TreeNode<T>): T[] {
  const result: T[] = [];
  const queue: TreeNode<T>[] = [root];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode.value);
    
    // Add all children to the queue
    for (const child of currentNode.children) {
      queue.push(child);
    }
  }

  return result;
}

// Example usage:
const tree: TreeNode<number> = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        { value: 4, children: [] },
        { value: 5, children: [] }
      ]
    },
    {
      value: 3,
      children: [
        { value: 6, children: [] }
      ]
    }
  ]
};

console.log(bfsTree(tree)); // Output: [1, 2, 3, 4, 5, 6]
type Graph = Map<number, number[]>;

function bfsGraph(
  graph: Graph, 
  startNode: number
): number[] {
  const visited: Set<number> = new Set();
  const result: number[] = [];
  const queue: number[] = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode);

    const neighbors = graph.get(currentNode) || [];
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

// Example usage:
const graph: Graph = new Map([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6]],
  [4, []],
  [5, []],
  [6, []]
]);

console.log(bfsGraph(graph, 1)); // Output: [1, 2, 3, 4, 5, 6]
function bfs<T>(
  startNode: T,
  getNeighbors: (node: T) => T[],
  processNode?: (node: T) => void
): T[] {
  const visited = new Set<T>();
  const result: T[] = [];
  const queue: T[] = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode);
    
    // Optional processing callback
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

// Example usage with a graph:
const graphNodes = new Map<number, number[]>([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6]],
  [4, []],
  [5, []],
  [6, []]
]);

const getNeighbors = (node: number): number[] => 
  graphNodes.get(node) || [];

console.log(bfs(1, getNeighbors)); // Output: [1, 2, 3, 4, 5, 6]
function bfsWithPath<T>(
  startNode: T,
  targetNode: T,
  getNeighbors: (node: T) => T[]
): T[] | null {
  const visited = new Set<T>();
  const queue: T[] = [startNode];
  const parentMap = new Map<T, T>();
  visited.add(startNode);
  parentMap.set(startNode, startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    
    if (currentNode === targetNode) {
      // Reconstruct path
      const path: T[] = [];
      let node: T = targetNode;
      
      while (node !== startNode) {
        path.unshift(node);
        node = parentMap.get(node)!;
      }
      path.unshift(startNode);
      
      return path;
    }

    const neighbors = getNeighbors(currentNode);
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parentMap.set(neighbor, currentNode);
        queue.push(neighbor);
      }
    }
  }

  return null; // No path found
}

// Example usage:
const path = bfsWithPath(1, 6, getNeighbors);
console.log(path); // Output: [1, 3, 6]

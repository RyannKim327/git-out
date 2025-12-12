// TreeNode interface
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

// Recursive DFS for trees
function dfsTreeRecursive<T>(node: TreeNode<T> | null, callback: (value: T) => void): void {
  if (!node) return;
  
  callback(node.value); // Pre-order traversal
  
  for (const child of node.children) {
    dfsTreeRecursive(child, callback);
  }
}

// Iterative DFS for trees using stack
function dfsTreeIterative<T>(root: TreeNode<T> | null, callback: (value: T) => void): void {
  if (!root) return;
  
  const stack: TreeNode<T>[] = [root];
  
  while (stack.length > 0) {
    const node = stack.pop()!;
    callback(node.value);
    
    // Push children in reverse order to process left-to-right
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
}
// Graph representation using adjacency list
interface Graph<T> {
  nodes: Map<T, T[]>;
}

// Recursive DFS for graphs with cycle detection
function dfsGraphRecursive<T>(
  graph: Graph<T>,
  start: T,
  callback: (value: T) => void,
  visited: Set<T> = new Set()
): void {
  if (visited.has(start)) return;
  
  visited.add(start);
  callback(start);
  
  const neighbors = graph.nodes.get(start) || [];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      dfsGraphRecursive(graph, neighbor, callback, visited);
    }
  }
}

// Iterative DFS for graphs using stack
function dfsGraphIterative<T>(
  graph: Graph<T>,
  start: T,
  callback: (value: T) => void
): void {
  const visited = new Set<T>();
  const stack: T[] = [start];
  
  while (stack.length > 0) {
    const node = stack.pop()!;
    
    if (!visited.has(node)) {
      visited.add(node);
      callback(node);
      
      const neighbors = graph.nodes.get(node) || [];
      // Push neighbors in reverse order to maintain order
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
  }
}
// Generic DFS implementation with options
interface DFSOptions<T> {
  preOrderCallback?: (value: T) => void;
  postOrderCallback?: (value: T) => void;
  onDiscover?: (value: T) => void;
  onFinish?: (value: T) => void;
}

function comprehensiveDFS<T>(
  graph: Graph<T>,
  start: T,
  options: DFSOptions<T> = {}
): void {
  const visited = new Set<T>();
  const stack: { node: T; index: number }[] = [{ node: start, index: 0 }];
  
  visited.add(start);
  options.onDiscover?.(start);
  options.preOrderCallback?.(start);
  
  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = graph.nodes.get(current.node) || [];
    
    if (current.index < neighbors.length) {
      const nextNode = neighbors[current.index];
      current.index++;
      
      if (!visited.has(nextNode)) {
        visited.add(nextNode);
        options.onDiscover?.(nextNode);
        options.preOrderCallback?.(nextNode);
        stack.push({ node: nextNode, index: 0 });
      }
    } else {
      const finishedNode = stack.pop()!.node;
      options.onFinish?.(finishedNode);
      options.postOrderCallback?.(finishedNode);
    }
  }
}

// Usage example
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
        { value: 6, children: [] },
        { value: 7, children: [] }
      ]
    }
  ]
};

console.log("Tree DFS (Recursive):");
dfsTreeRecursive(tree, (val) => console.log(val));

console.log("\nTree DFS (Iterative):");
dfsTreeIterative(tree, (val) => console.log(val));

// Graph example
const graph: Graph<string> = {
  nodes: new Map([
    ['A', ['B', 'C']],
    ['B', ['A', 'D', 'E']],
    ['C', ['A', 'F']],
    ['D', ['B']],
    ['E', ['B', 'F']],
    ['F', ['C', 'E']]
  ])
};

console.log("\nGraph DFS:");
dfsGraphIterative(graph, 'A', (val) => console.log(val));
function findPathDFS<T>(
  graph: Graph<T>,
  start: T,
  end: T
): T[] | null {
  const visited = new Set<T>();
  const stack: { node: T; path: T[] }[] = [{ node: start, path: [start] }];
  
  while (stack.length > 0) {
    const { node, path } = stack.pop()!;
    
    if (node === end) {
      return path;
    }
    
    if (!visited.has(node)) {
      visited.add(node);
      
      const neighbors = graph.nodes.get(node) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          stack.push({
            node: neighbor,
            path: [...path, neighbor]
          });
        }
      }
    }
  }
  
  return null;
}

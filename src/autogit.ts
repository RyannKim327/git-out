interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

function dfsTree<T>(
  node: TreeNode<T> | null,
  callback: (value: T) => void,
  order: 'pre' | 'in' | 'post' = 'pre'
): void {
  if (!node) return;

  switch (order) {
    case 'pre':
      callback(node.value);
      node.children.forEach(child => dfsTree(child, callback, order));
      break;
    
    case 'post':
      node.children.forEach(child => dfsTree(child, callback, order));
      callback(node.value);
      break;
    
    // In-order traversal for binary trees
    case 'in':
      if (node.children.length >= 1) dfsTree(node.children[0], callback, order);
      callback(node.value);
      if (node.children.length >= 2) dfsTree(node.children[1], callback, order);
      break;
  }
}

// Example usage
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

dfsTree(tree, val => console.log(val), 'pre');
type Graph = Map<number, number[]>;
type Visited = Set<number>;

function dfsGraph(
  graph: Graph,
  startNode: number,
  callback: (node: number) => void
): void {
  const visited: Visited = new Set();
  
  function dfs(node: number): void {
    if (visited.has(node)) return;
    
    visited.add(node);
    callback(node);
    
    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }
  
  dfs(startNode);
}

// Example usage
const graph: Graph = new Map([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6]],
  [4, []],
  [5, []],
  [6, []]
]);

dfsGraph(graph, 1, node => console.log(node));
function dfsIterative<T>(
  startNode: TreeNode<T>,
  callback: (value: T) => void
): void {
  const stack: TreeNode<T>[] = [startNode];
  
  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    callback(currentNode.value);
    
    // Push children in reverse order to maintain left-to-right traversal
    for (let i = currentNode.children.length - 1; i >= 0; i--) {
      stack.push(currentNode.children[i]);
    }
  }
}

// Example usage
dfsIterative(tree, val => console.log(val));
function dfsWithPath<T>(
  startNode: TreeNode<T>,
  targetValue: T
): T[] | null {
  function dfs(
    node: TreeNode<T>,
    path: T[]
  ): T[] | null {
    const currentPath = [...path, node.value];
    
    if (node.value === targetValue) {
      return currentPath;
    }
    
    for (const child of node.children) {
      const result = dfs(child, currentPath);
      if (result) return result;
    }
    
    return null;
  }
  
  return dfs(startNode, []);
}

// Example usage
const path = dfsWithPath(tree, 5);
console.log('Path to 5:', path); // [1, 2, 5]
class DFS<T> {
  // Recursive DFS for trees
  static treeDFS(
    node: TreeNode<T> | null,
    visit: (value: T) => void
  ): void {
    if (!node) return;
    
    visit(node.value);
    node.children.forEach(child => this.treeDFS(child, visit));
  }

  // Iterative DFS for graphs
  static graphDFS(
    graph: Map<T, T[]>,
    start: T,
    visit: (node: T) => void
  ): void {
    const visited = new Set<T>();
    const stack: T[] = [start];
    
    while (stack.length > 0) {
      const node = stack.pop()!;
      
      if (!visited.has(node)) {
        visited.add(node);
        visit(node);
        
        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }
  }
}

// Usage example
const treeNode: TreeNode<string> = {
  value: 'A',
  children: [
    { value: 'B', children: [] },
    { value: 'C', children: [] }
  ]
};

DFS.treeDFS(treeNode, val => console.log(val));

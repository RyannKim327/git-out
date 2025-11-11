interface Graph {
  [key: string]: string[];
}

function dfsRecursive(
  graph: Graph, 
  start: string, 
  visited: Set<string> = new Set()
): string[] {
  const result: string[] = [];
  
  if (visited.has(start)) return result;
  
  visited.add(start);
  result.push(start);
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      result.push(...dfsRecursive(graph, neighbor, visited));
    }
  }
  
  return result;
}
function dfsIterative(graph: Graph, start: string): string[] {
  const stack: string[] = [start];
  const visited = new Set<string>();
  const result: string[] = [];
  
  while (stack.length > 0) {
    const current = stack.pop()!;
    
    if (!visited.has(current)) {
      visited.add(current);
      result.push(current);
      
      // Add neighbors in reverse to maintain order (optional)
      for (let i = graph[current].length - 1; i >= 0; i--) {
        const neighbor = graph[current][i];
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  
  return result;
}
function dfsFindPath(
  graph: Graph, 
  start: string, 
  target: string
): string[] | null {
  const stack: { node: string; path: string[] }[] = [{ node: start, path: [start] }];
  const visited = new Set<string>();
  
  while (stack.length > 0) {
    const { node, path } = stack.pop()!;
    
    if (node === target) {
      return path;
    }
    
    if (!visited.has(node)) {
      visited.add(node);
      
      for (const neighbor of graph[node]) {
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
function dfsWithCallback<T>(
  start: T,
  getNeighbors: (node: T) => T[],
  callback?: (node: T) => void
): void {
  const stack: T[] = [start];
  const visited = new Set<T>();
  
  while (stack.length > 0) {
    const current = stack.pop()!;
    
    if (!visited.has(current)) {
      visited.add(current);
      callback?.(current);
      
      for (const neighbor of getNeighbors(current)) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
}
// Example graph
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

// Test the implementations
console.log('Recursive DFS:', dfsRecursive(graph, 'A'));
console.log('Iterative DFS:', dfsIterative(graph, 'A'));
console.log('Path from A to F:', dfsFindPath(graph, 'A', 'F'));

// Using the generic DFS
dfsWithCallback('A', (node) => graph[node], (node) => {
  console.log('Visiting:', node);
});
class TreeNode {
  constructor(
    public value: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

function dfsBinaryTree(root: TreeNode | null): number[] {
  if (!root) return [];
  
  const result: number[] = [];
  const stack: TreeNode[] = [root];
  
  while (stack.length > 0) {
    const current = stack.pop()!;
    result.push(current.value);
    
    // Push right first, then left (so left is processed first)
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
  
  return result;
}

// Tree example
const tree = new TreeNode(1,
  new TreeNode(2,
    new TreeNode(4),
    new TreeNode(5)
  ),
  new TreeNode(3,
    new TreeNode(6),
    new TreeNode(7)
  )
);

console.log('Tree DFS:', dfsBinaryTree(tree));

type Graph = Record<string, string[]>;

class DepthFirstSearch {
  private visited: Set<string> = new Set();

  // Recursive DFS
  dfsRecursive(graph: Graph, node: string): void {
    if (this.visited.has(node)) return;
    
    console.log(node); // Process the node
    this.visited.add(node);
    
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      this.dfsRecursive(graph, neighbor);
    }
  }

  // Iterative DFS using a stack
  dfsIterative(graph: Graph, startNode: string): void {
    const stack: string[] = [startNode];
    const visited: Set<string> = new Set();

    while (stack.length > 0) {
      const node = stack.pop()!;
      
      if (visited.has(node)) continue;
      
      console.log(node); // Process the node
      visited.add(node);
      
      const neighbors = graph[node] || [];
      // Push neighbors in reverse order to maintain DFS order
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
  }

  // Clear visited nodes
  clearVisited(): void {
    this.visited.clear();
  }
}
type Graph<T> = Record<string, T[]>;
type VisitCallback<T> = (node: string, data: T) => void;

class GenericDFS<T> {
  dfs(
    graph: Graph<T>, 
    startNode: string, 
    callback: VisitCallback<T>
  ): void {
    const visited = new Set<string>();
    const stack: string[] = [startNode];

    while (stack.length > 0) {
      const node = stack.pop()!;
      
      if (visited.has(node)) continue;
      
      visited.add(node);
      callback(node, graph[node] as T);
      
      const neighbors = Object.keys(graph[node] || {});
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
  }
}
interface TreeNode {
  value: number;
  children: TreeNode[];
}

class TreeDFS {
  // Pre-order traversal (root, then children)
  preOrder(node: TreeNode | null, callback: (value: number) => void): void {
    if (!node) return;
    
    callback(node.value);
    for (const child of node.children) {
      this.preOrder(child, callback);
    }
  }

  // Post-order traversal (children, then root)
  postOrder(node: TreeNode | null, callback: (value: number) => void): void {
    if (!node) return;
    
    for (const child of node.children) {
      this.postOrder(child, callback);
    }
    callback(node.value);
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

const dfs = new DepthFirstSearch();

console.log('Recursive DFS:');
dfs.dfsRecursive(graph, 'A');
dfs.clearVisited();

console.log('\nIterative DFS:');
dfs.dfsIterative(graph, 'A');

// Example with custom callback
const genericDfs = new GenericDFS<string[]>();
genericDfs.dfs(graph, 'A', (node, neighbors) => {
  console.log(`Node ${node} has neighbors: ${neighbors.join(', ')}`);
});
class DFSWithPath {
  findPath(graph: Graph, start: string, target: string): string[] | null {
    const stack: { node: string; path: string[] }[] = [{ node: start, path: [start] }];
    const visited = new Set<string>();

    while (stack.length > 0) {
      const { node, path } = stack.pop()!;
      
      if (node === target) return path;
      
      if (visited.has(node)) continue;
      visited.add(node);
      
      const neighbors = graph[node] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          stack.push({
            node: neighbor,
            path: [...path, neighbor]
          });
        }
      }
    }
    
    return null; // No path found
  }

  findAllPaths(graph: Graph, start: string, target: string): string[][] {
    const paths: string[][] = [];
    const stack: { node: string; path: string[] }[] = [{ node: start, path: [start] }];

    while (stack.length > 0) {
      const { node, path } = stack.pop()!;
      
      if (node === target) {
        paths.push(path);
        continue;
      }
      
      const neighbors = graph[node] || [];
      for (const neighbor of neighbors) {
        if (!path.includes(neighbor)) { // Avoid cycles
          stack.push({
            node: neighbor,
            path: [...path, neighbor]
          });
        }
      }
    }
    
    return paths;
  }
}

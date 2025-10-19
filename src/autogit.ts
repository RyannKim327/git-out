interface GraphNode<T> {
  id: T;
  neighbors: T[];
}

class Graph<T> {
  private adjacencyList: Map<T, T[]> = new Map();

  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1: T, vertex2: T): void {
    if (!this.adjacencyList.has(vertex1)) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList.has(vertex2)) {
      this.addVertex(vertex2);
    }
    
    this.adjacencyList.get(vertex1)!.push(vertex2);
    this.adjacencyList.get(vertex2)!.push(vertex1); // For undirected graph
  }

  getNeighbors(vertex: T): T[] {
    return this.adjacencyList.get(vertex) || [];
  }

  getVertices(): T[] {
    return Array.from(this.adjacencyList.keys());
  }
}
class DFSRecursive<T> {
  private visited: Set<T> = new Set();

  dfs(graph: Graph<T>, startVertex: T, visitCallback?: (vertex: T) => void): T[] {
    const result: T[] = [];
    
    const dfsHelper = (vertex: T): void => {
      if (this.visited.has(vertex)) {
        return;
      }

      this.visited.add(vertex);
      result.push(vertex);
      
      if (visitCallback) {
        visitCallback(vertex);
      }

      const neighbors = graph.getNeighbors(vertex);
      for (const neighbor of neighbors) {
        if (!this.visited.has(neighbor)) {
          dfsHelper(neighbor);
        }
      }
    };

    dfsHelper(startVertex);
    return result;
  }

  // Reset visited set for multiple traversals
  reset(): void {
    this.visited.clear();
  }
}
class DFSIterative<T> {
  dfs(graph: Graph<T>, startVertex: T, visitCallback?: (vertex: T) => void): T[] {
    const visited: Set<T> = new Set();
    const stack: T[] = [startVertex];
    const result: T[] = [];

    while (stack.length > 0) {
      const vertex = stack.pop()!;
      
      if (visited.has(vertex)) {
        continue;
      }

      visited.add(vertex);
      result.push(vertex);
      
      if (visitCallback) {
        visitCallback(vertex);
      }

      const neighbors = graph.getNeighbors(vertex);
      // Push neighbors in reverse order to maintain the same traversal order as recursive
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbor = neighbors[i];
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }

    return result;
  }
}
// Example usage
function example() {
  // Create a sample graph
  const graph = new Graph<number>();
  
  // Add vertices and edges
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 3);
  graph.addEdge(1, 4);
  graph.addEdge(2, 5);
  graph.addEdge(3, 6);
  graph.addEdge(4, 6);
  graph.addEdge(5, 6);

  console.log("Graph vertices:", graph.getVertices());
  // Output: Graph vertices: [0, 1, 2, 3, 4, 5, 6]

  // Recursive DFS
  const recursiveDFS = new DFSRecursive<number>();
  console.log("Recursive DFS from 0:", recursiveDFS.dfs(graph, 0));
  // Output: [0, 1, 3, 6, 4, 2, 5] (order may vary based on neighbor order)

  // Iterative DFS
  const iterativeDFS = new DFSIterative<number>();
  console.log("Iterative DFS from 0:", iterativeDFS.dfs(graph, 0));
  // Output: Similar order to recursive DFS

  // With visit callback
  const visitOrder: number[] = [];
  iterativeDFS.dfs(graph, 0, (vertex) => {
    visitOrder.push(vertex);
    console.log(`Visiting node: ${vertex}`);
  });
  console.log("Visit order:", visitOrder);
}
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

class TreeDFS<T> {
  // Pre-order traversal (root -> left -> right)
  preOrderTraversal(root: TreeNode<T> | null, visitCallback?: (node: TreeNode<T>) => void): T[] {
    const result: T[] = [];
    
    const traverse = (node: TreeNode<T>): void => {
      result.push(node.value);
      if (visitCallback) {
        visitCallback(node);
      }
      
      for (const child of node.children) {
        traverse(child);
      }
    };

    if (root) {
      traverse(root);
    }
    
    return result;
  }

  // In-order traversal (left -> root -> right) - for binary trees
  inOrderTraversal(root: TreeNode<T> | null, visitCallback?: (node: TreeNode<T>) => void): T[] {
    const result: T[] = [];
    
    const traverse = (node: TreeNode<T>): void => {
      if (node.children.length > 0) {
        traverse(node.children[0]); // Left child
      }
      
      result.push(node.value);
      if (visitCallback) {
        visitCallback(node);
      }
      
      if (node.children.length > 1) {
        traverse(node.children[1]); // Right child
      }
      
      // Process remaining children
      for (let i = 2; i < node.children.length; i++) {
        traverse(node.children[i]);
      }
    };

    if (root) {
      traverse(root);
    }
    
    return result;
  }

  // Post-order traversal (left -> right -> root)
  postOrderTraversal(root: TreeNode<T> | null, visitCallback?: (node: TreeNode<T>) => void): T[] {
    const result: T[] = [];
    
    const traverse = (node: TreeNode<T>): void => {
      for (const child of node.children) {
        traverse(child);
      }
      
      result.push(node.value);
      if (visitCallback) {
        visitCallback(node);
      }
    };

    if (root) {
      traverse(root);
    }
    
    return result;
  }
}

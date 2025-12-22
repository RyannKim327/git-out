interface Node<T> {
  value: T;
  children?: Node<T>[];
}

class DepthLimitedSearch<T> {
  /**
   * Perform depth-limited search
   * @param root - Starting node
   * @param target - Target value to search for
   * @param depthLimit - Maximum depth to explore
   * @returns Found node or null if not found within depth limit
   */
  search(root: Node<T>, target: T, depthLimit: number): Node<T> | null {
    return this.dlsRecursive(root, target, depthLimit, 0);
  }

  /**
   * Recursive helper function for DLS
   */
  private dlsRecursive(
    node: Node<T>,
    target: T,
    depthLimit: number,
    currentDepth: number
  ): Node<T> | null {
    // Check if current node is the target
    if (node.value === target) {
      return node;
    }

    // Check if we've reached the depth limit
    if (currentDepth >= depthLimit) {
      return null;
    }

    // Recursively search children
    if (node.children) {
      for (const child of node.children) {
        const result = this.dlsRecursive(
          child,
          target,
          depthLimit,
          currentDepth + 1
        );
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }
}
interface GraphNode<T> {
  id: string;
  value: T;
  neighbors: GraphNode<T>[];
}

class AdvancedDepthLimitedSearch<T> {
  private visited: Set<string> = new Set();

  /**
   * Depth-limited search for graph structures
   */
  searchGraph(
    start: GraphNode<T>,
    target: T,
    depthLimit: number
  ): GraphNode<T> | null {
    this.visited.clear();
    return this.dlsGraphRecursive(start, target, depthLimit, 0);
  }

  private dlsGraphRecursive(
    node: GraphNode<T>,
    target: T,
    depthLimit: number,
    currentDepth: number
  ): GraphNode<T> | null {
    // Mark node as visited
    this.visited.add(node.id);

    // Check if current node contains target
    if (node.value === target) {
      return node;
    }

    // Check depth limit
    if (currentDepth >= depthLimit) {
      return null;
    }

    // Search neighbors
    for (const neighbor of node.neighbors) {
      if (!this.visited.has(neighbor.id)) {
        const result = this.dlsGraphRecursive(
          neighbor,
          target,
          depthLimit,
          currentDepth + 1
        );
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }

  /**
   * Find all nodes within depth limit
   */
  findAllWithinDepth(
    start: GraphNode<T>,
    depthLimit: number
  ): GraphNode<T>[] {
    this.visited.clear();
    const result: GraphNode<T>[] = [];
    this.collectNodesRecursive(start, depthLimit, 0, result);
    return result;
  }

  private collectNodesRecursive(
    node: GraphNode<T>,
    depthLimit: number,
    currentDepth: number,
    result: GraphNode<T>[]
  ): void {
    result.push(node);
    this.visited.add(node.id);

    if (currentDepth < depthLimit) {
      for (const neighbor of node.neighbors) {
        if (!this.visited.has(neighbor.id)) {
          this.collectNodesRecursive(
            neighbor,
            depthLimit,
            currentDepth + 1,
            result
          );
        }
      }
    }
  }
}
// Example 1: Tree structure
const treeExample = () => {
  // Create a sample tree
  const tree: Node<number> = {
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

  const dls = new DepthLimitedSearch<number>();
  const result = dls.search(tree, 5, 2); // Should find node with value 5
  console.log(result?.value); // Output: 5

  const notFound = dls.search(tree, 7, 1); // Depth limit too low
  console.log(notFound); // Output: null
};

// Example 2: Graph structure
const graphExample = () => {
  // Create sample graph nodes
  const nodeA: GraphNode<string> = { id: 'A', value: 'Apple', neighbors: [] };
  const nodeB: GraphNode<string> = { id: 'B', value: 'Banana', neighbors: [] };
  const nodeC: GraphNode<string> = { id: 'C', value: 'Cherry', neighbors: [] };
  const nodeD: GraphNode<string> = { id: 'D', value: 'Date', neighbors: [] };

  // Connect nodes
  nodeA.neighbors = [nodeB, nodeC];
  nodeB.neighbors = [nodeA, nodeD];
  nodeC.neighbors = [nodeA];
  nodeD.neighbors = [nodeB];

  const advancedDls = new AdvancedDepthLimitedSearch<string>();
  
  // Search for target
  const found = advancedDls.searchGraph(nodeA, 'Date', 2);
  console.log(found?.value); // Output: Date

  // Find all nodes within depth
  const allNodes = advancedDls.findAllWithinDepth(nodeA, 1);
  console.log(allNodes.map(n => n.value)); // Output: ['Apple', 'Banana', 'Cherry']
};

// Run examples
treeExample();
graphExample();
class IterativeDepthLimitedSearch<T> {
  /**
   * Iterative depth-limited search using a stack
   */
  searchIterative(root: Node<T>, target: T, depthLimit: number): Node<T> | null {
    const stack: { node: Node<T>; depth: number }[] = [{ node: root, depth: 0 }];

    while (stack.length > 0) {
      const { node, depth } = stack.pop()!;

      if (node.value === target) {
        return node;
      }

      if (depth < depthLimit && node.children) {
        // Push children in reverse order for DFS behavior
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ node: node.children[i], depth: depth + 1 });
        }
      }
    }

    return null;
  }
}

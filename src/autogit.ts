interface GraphNode<T> {
  id: string;
  data: T;
  children?: string[]; // IDs of child nodes
}

interface Graph<T> {
  nodes: Map<string, GraphNode<T>>;
}

class DepthLimitedSearch<T> {
  private visited: Set<string> = new Set();
  
  search(
    graph: Graph<T>,
    startNodeId: string,
    targetNodeId: string,
    depthLimit: number
  ): DLSResult<T> {
    this.visited.clear();
    return this.dlsRecursive(graph, startNodeId, targetNodeId, depthLimit, 0);
  }

  private dlsRecursive(
    graph: Graph<T>,
    currentNodeId: string,
    targetNodeId: string,
    depthLimit: number,
    currentDepth: number
  ): DLSResult<T> {
    const currentNode = graph.nodes.get(currentNodeId);
    
    if (!currentNode) {
      return { found: false, path: [], reason: 'Node not found' };
    }

    // Mark as visited and add to path
    this.visited.add(currentNodeId);

    // Check if we found the target
    if (currentNodeId === targetNodeId) {
      return { 
        found: true, 
        path: [currentNodeId],
        depth: currentDepth
      };
    }

    // Check depth limit
    if (currentDepth >= depthLimit) {
      return { 
        found: false, 
        path: [currentNodeId],
        reason: 'Depth limit reached',
        depth: currentDepth
      };
    }

    // Explore children
    if (currentNode.children) {
      for (const childId of currentNode.children) {
        // Skip already visited nodes to avoid cycles
        if (this.visited.has(childId)) {
          continue;
        }

        const result = this.dlsRecursive(
          graph, 
          childId, 
          targetNodeId, 
          depthLimit, 
          currentDepth + 1
        );

        // If found in subtree, prepend current node to path
        if (result.found || result.reason === 'Depth limit reached') {
          return {
            ...result,
            path: [currentNodeId, ...result.path]
          };
        }
      }
    }

    return { 
      found: false, 
      path: [currentNodeId],
      reason: 'Target not found in subtree',
      depth: currentDepth
    };
  }
}

interface DLSResult<T> {
  found: boolean;
  path: string[];
  depth?: number;
  reason?: string;
  node?: GraphNode<T>;
}
// Define a simple tree node structure
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

class TreeDLS<T> {
  /**
   * Depth-limited search for a value in a tree
   */
  search(
    root: TreeNode<T>,
    targetValue: T,
    depthLimit: number,
    compareFn: (a: T, b: T) => boolean = (a, b) => a === b
  ): DLSResult<T> {
    return this.dlsTreeRecursive(root, targetValue, depthLimit, 0, compareFn);
  }

  private dlsTreeRecursive(
    node: TreeNode<T>,
    targetValue: T,
    depthLimit: number,
    currentDepth: number,
    compareFn: (a: T, b: T) => boolean
  ): DLSResult<T> {
    // Check if current node is the target
    if (compareFn(node.value, targetValue)) {
      return {
        found: true,
        value: node.value,
        depth: currentDepth,
        path: [node.value]
      };
    }

    // Check depth limit
    if (currentDepth >= depthLimit) {
      return {
        found: false,
        value: node.value,
        depth: currentDepth,
        path: [node.value],
        reason: 'Depth limit reached'
      };
    }

    // Search in children
    for (const child of node.children) {
      const result = this.dlsTreeRecursive(
        child,
        targetValue,
        depthLimit,
        currentDepth + 1,
        compareFn
      );

      if (result.found || result.reason === 'Depth limit reached') {
        return {
          ...result,
          path: [node.value, ...result.path]
        };
      }
    }

    return {
      found: false,
      value: node.value,
      depth: currentDepth,
      path: [node.value],
      reason: 'Target not found in subtree'
    };
  }
}

// Enhanced result interface
interface DLSResult<T> {
  found: boolean;
  value?: T;
  depth: number;
  path: T[];
  reason?: string;
}
// Create a sample tree
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
        { 
          value: 7, 
          children: [
            { value: 8, children: [] },
            { value: 9, children: [] }
          ]
        }
      ]
    }
  ]
};

// Test the DLS
const dls = new TreeDLS<number>();

console.log('Searching for 8 with depth limit 3:');
const result1 = dls.search(tree, 8, 3);
console.log(result1);
// Output: { found: true, depth: 3, path: [1, 3, 7, 8] }

console.log('\nSearching for 8 with depth limit 2:');
const result2 = dls.search(tree, 8, 2);
console.log(result2);
// Output: { found: false, depth: 2, path: [1, 3, 7], reason: 'Depth limit reached' }

console.log('\nSearching for 10 (non-existent):');
const result3 = dls.search(tree, 10, 5);
console.log(result3);
// Output: { found: false, depth: 0, path: [1], reason: 'Target not found in subtree' }
class IterativeDLS<T> {
  search(
    graph: Graph<T>,
    startNodeId: string,
    targetNodeId: string,
    depthLimit: number
  ): DLSResult<T> {
    const stack: { nodeId: string; depth: number; path: string[] }[] = [];
    const visited: Set<string> = new Set();

    stack.push({ nodeId: startNodeId, depth: 0, path: [startNodeId] });

    while (stack.length > 0) {
      const { nodeId, depth, path } = stack.pop()!;
      
      if (visited.has(nodeId)) continue;
      visited.add(nodeId);

      const currentNode = graph.nodes.get(nodeId);
      if (!currentNode) continue;

      // Check if target found
      if (nodeId === targetNodeId) {
        return { found: true, path, depth };
      }

      // Check depth limit
      if (depth >= depthLimit) {
        continue;
      }

      // Add children to stack (in reverse order for DFS)
      if (currentNode.children) {
        for (let i = currentNode.children.length - 1; i >= 0; i--) {
          const childId = currentNode.children[i];
          if (!visited.has(childId)) {
            stack.push({
              nodeId: childId,
              depth: depth + 1,
              path: [...path, childId]
            });
          }
        }
      }
    }

    return { found: false, path: [], reason: 'Target not found' };
  }
}

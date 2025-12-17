interface Node {
  id: string;
  children: Node[];
  // Add any other properties you need
}

class DepthLimitedSearch {
  /**
   * Performs depth-limited search
   * @param root Starting node
   * @param targetId ID of the node to find
   * @param limit Maximum depth to search
   * @returns The found node or null if not found
   */
  search(root: Node, targetId: string, limit: number): Node | null {
    return this.dlsRecursive(root, targetId, limit, 0);
  }

  /**
   * Recursive helper function for DLS
   */
  private dlsRecursive(node: Node, targetId: string, limit: number, depth: number): Node | null {
    // Base case: found the target
    if (node.id === targetId) {
      return node;
    }

    // Base case: reached depth limit
    if (depth >= limit) {
      return null;
    }

    // Recursively search children
    for (const child of node.children) {
      const result = this.dlsRecursive(child, targetId, limit, depth + 1);
      if (result !== null) {
        return result;
      }
    }

    return null;
  }
}
interface GraphNode<T = any> {
  id: string;
  value?: T;
  neighbors: GraphNode<T>[];
}

interface SearchResult<T = any> {
  node: GraphNode<T> | null;
  path: string[];
  depth: number;
}

class DepthLimitedSearchAdvanced<T = any> {
  /**
   * Enhanced DLS with path tracking and result object
   */
  search(
    startNode: GraphNode<T>,
    targetId: string,
    depthLimit: number
  ): SearchResult<T> {
    return this.dlsWithPath(startNode, targetId, depthLimit, 0, []);
  }

  private dlsWithPath(
    node: GraphNode<T>,
    targetId: string,
    limit: number,
    currentDepth: number,
    currentPath: string[]
  ): SearchResult<T> {
    const newPath = [...currentPath, node.id];

    if (node.id === targetId) {
      return {
        node,
        path: newPath,
        depth: currentDepth
      };
    }

    if (currentDepth >= limit) {
      return {
        node: null,
        path: newPath,
        depth: currentDepth
      };
    }

    for (const neighbor of node.neighbors) {
      // Avoid cycles by checking if we've already visited this node
      if (!currentPath.includes(neighbor.id)) {
        const result = this.dlsWithPath(
          neighbor,
          targetId,
          limit,
          currentDepth + 1,
          newPath
        );
        
        if (result.node !== null) {
          return result;
        }
      }
    }

    return {
      node: null,
      path: newPath,
      depth: currentDepth
    };
  }

  /**
   * Iterative Deepening Depth-First Search (IDDFS)
   * Repeatedly runs DLS with increasing depth limits
   */
  iddfs(
    startNode: GraphNode<T>,
    targetId: string,
    maxDepth: number
  ): SearchResult<T> {
    for (let depth = 0; depth <= maxDepth; depth++) {
      const result = this.search(startNode, targetId, depth);
      if (result.node !== null) {
        return result;
      }
    }

    return {
      node: null,
      path: [startNode.id],
      depth: -1
    };
  }
}
// Example usage
const nodeA: GraphNode<string> = { id: 'A', neighbors: [], value: 'Node A' };
const nodeB: GraphNode<string> = { id: 'B', neighbors: [], value: 'Node B' };
const nodeC: GraphNode<string> = { id: 'C', neighbors: [], value: 'Node C' };
const nodeD: GraphNode<string> = { id: 'D', neighbors: [], value: 'Node D' };

// Build a simple graph: A -> B -> C -> D
nodeA.neighbors = [nodeB];
nodeB.neighbors = [nodeC];
nodeC.neighbors = [nodeD];

// Create search instance
const dls = new DepthLimitedSearchAdvanced<string>();

// Search with depth limit of 2 (should find nodes within 2 steps)
const result1 = dls.search(nodeA, 'C', 2);
console.log('Found:', result1.node?.id); // 'C'
console.log('Path:', result1.path); // ['A', 'B', 'C']
console.log('Depth:', result1.depth); // 2

// Search with depth limit of 1 (should not find node C)
const result2 = dls.search(nodeA, 'C', 1);
console.log('Found:', result2.node?.id); // null

// Use IDDFS to find node D with max depth of 5
const result3 = dls.iddfs(nodeA, 'D', 5);
console.log('IDDFS Found:', result3.node?.id); // 'D'
console.log('IDDFS Path:', result3.path); // ['A', 'B', 'C', 'D']
interface DLSConfig<T> {
  getChildren: (node: T) => T[];
  isTarget: (node: T) => boolean;
  getNodeId: (node: T) => string;
}

class GenericDepthLimitedSearch<T> {
  search(
    startNode: T,
    depthLimit: number,
    config: DLSConfig<T>
  ): { node: T | null; path: string[] } {
    return this.genericDLS(
      startNode,
      depthLimit,
      0,
      [],
      config
    );
  }

  private genericDLS(
    node: T,
    limit: number,
    depth: number,
    path: string[],
    config: DLSConfig<T>
  ): { node: T | null; path: string[] } {
    const nodeId = config.getNodeId(node);
    const newPath = [...path, nodeId];

    if (config.isTarget(node)) {
      return { node, path: newPath };
    }

    if (depth >= limit) {
      return { node: null, path: newPath };
    }

    for (const child of config.getChildren(node)) {
      const childId = config.getNodeId(child);
      // Avoid cycles
      if (!newPath.includes(childId)) {
        const result = this.genericDLS(
          child,
          limit,
          depth + 1,
          newPath,
          config
        );
        if (result.node !== null) {
          return result;
        }
      }
    }

    return { node: null, path: newPath };
  }
}

// Usage example with custom data structure
interface CustomNode {
  name: string;
  connections: CustomNode[];
  data: number;
}

const customDLS = new GenericDepthLimitedSearch<CustomNode>();
const result = customDLS.search(
  customStartNode,
  3,
  {
    getChildren: (node) => node.connections,
    isTarget: (node) => node.data === 42,
    getNodeId: (node) => node.name
  }
);

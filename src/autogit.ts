interface GraphNode<T> {
  value: T;
  neighbors: GraphNode<T>[];
}

interface SearchState<T> {
  node: GraphNode<T>;
  depth: number;
  path: T[];
}

class DepthLimitedSearch<T> {
  /**
   * Iterative Depth-Limited Search
   * @param startNode - Starting node
   * @param goalValue - Value to search for
   * @param depthLimit - Maximum depth to search
   * @returns Path to goal or null if not found
   */
  search(
    startNode: GraphNode<T>,
    goalValue: T,
    depthLimit: number
  ): T[] | null {
    // Use a stack for DFS (LIFO)
    const stack: SearchState<T>[] = [
      {
        node: startNode,
        depth: 0,
        path: [startNode.value]
      }
    ];

    while (stack.length > 0) {
      const current = stack.pop()!;
      
      // Check if we found the goal
      if (current.node.value === goalValue) {
        return current.path;
      }

      // Only explore neighbors if we haven't reached depth limit
      if (current.depth < depthLimit) {
        // Add neighbors in reverse order to maintain DFS order
        for (let i = current.node.neighbors.length - 1; i >= 0; i--) {
          const neighbor = current.node.neighbors[i];
          
          // Avoid cycles by checking if node is already in path
          if (!current.path.includes(neighbor.value)) {
            stack.push({
              node: neighbor,
              depth: current.depth + 1,
              path: [...current.path, neighbor.value]
            });
          }
        }
      }
    }

    return null; // Goal not found within depth limit
  }
}
type NodeId = string | number;

interface GraphNode<T> {
  id: NodeId;
  value: T;
  neighbors: GraphNode<T>[];
}

interface DLSResult<T> {
  found: boolean;
  path: T[];
  depth: number;
  nodesVisited: number;
}

class EnhancedDepthLimitedSearch<T> {
  /**
   * Enhanced iterative DLS with better tracking and cycle prevention
   */
  search(
    startNode: GraphNode<T>,
    goalValue: T,
    depthLimit: number,
    allowCycles: boolean = false
  ): DLSResult<T> {
    if (depthLimit < 0) {
      throw new Error('Depth limit must be non-negative');
    }

    const stack: SearchState<T>[] = [
      {
        node: startNode,
        depth: 0,
        path: [startNode.value],
        visited: new Set<NodeId>([startNode.id])
      }
    ];

    let nodesVisited = 0;

    while (stack.length > 0) {
      const current = stack.pop()!;
      nodesVisited++;

      // Check if we found the goal
      if (current.node.value === goalValue) {
        return {
          found: true,
          path: current.path,
          depth: current.depth,
          nodesVisited
        };
      }

      // Explore neighbors if within depth limit
      if (current.depth < depthLimit) {
        for (let i = current.node.neighbors.length - 1; i >= 0; i--) {
          const neighbor = current.node.neighbors[i];
          
          // Cycle prevention
          if (!allowCycles && current.visited.has(neighbor.id)) {
            continue;
          }

          const newVisited = allowCycles 
            ? current.visited 
            : new Set(current.visited).add(neighbor.id);

          stack.push({
            node: neighbor,
            depth: current.depth + 1,
            path: [...current.path, neighbor.value],
            visited: newVisited
          });
        }
      }
    }

    return {
      found: false,
      path: [],
      depth: -1,
      nodesVisited
    };
  }
}
// Create a sample graph
const nodeA: GraphNode<string> = { id: 'A', value: 'A', neighbors: [] };
const nodeB: GraphNode<string> = { id: 'B', value: 'B', neighbors: [] };
const nodeC: GraphNode<string> = { id: 'C', value: 'C', neighbors: [] };
const nodeD: GraphNode<string> = { id: 'D', value: 'D', neighbors: [] };

// Build connections
nodeA.neighbors = [nodeB, nodeC];
nodeB.neighbors = [nodeD];
nodeC.neighbors = [nodeD];
nodeD.neighbors = [nodeA]; // Creates a cycle

// Test the search
const dls = new DepthLimitedSearch<string>();
const result = dls.search(nodeA, 'D', 2);

console.log('Path found:', result); // ['A', 'B', 'D'] or ['A', 'C', 'D']

// Test with enhanced version
const enhancedDLS = new EnhancedDepthLimitedSearch<string>();
const enhancedResult = enhancedDLS.search(nodeA, 'D', 2, false);

console.log('Enhanced result:', enhancedResult);
function iterativeDLS<T>(
  startNode: GraphNode<T>,
  isGoal: (node: GraphNode<T>) => boolean,
  depthLimit: number
): T[] | null {
  
  const stack: Array<{ node: GraphNode<T>; depth: number; path: T[] }> = [
    { node: startNode, depth: 0, path: [startNode.value] }
  ];

  while (stack.length > 0) {
    const { node, depth, path } = stack.pop()!;

    if (isGoal(node)) {
      return path;
    }

    if (depth < depthLimit) {
      // Add neighbors to stack (reverse order for DFS)
      for (let i = node.neighbors.length - 1; i >= 0; i--) {
        const neighbor = node.neighbors[i];
        if (!path.includes(neighbor.value)) {
          stack.push({
            node: neighbor,
            depth: depth + 1,
            path: [...path, neighbor.value]
          });
        }
      }
    }
  }

  return null;
}

// Usage
const result = iterativeDLS(
  nodeA,
  (node) => node.value === 'D',
  2
);

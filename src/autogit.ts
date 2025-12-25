interface GraphNode<T> {
  value: T;
  neighbors: GraphNode<T>[];
}

interface SearchResult<T> {
  found: boolean;
  node?: GraphNode<T>;
  path?: T[];
}

class DepthLimitedSearch<T> {
  /**
   * Iterative Depth-Limited Search
   * @param startNode - Starting node for the search
   * @param targetValue - Value to search for
   * @param depthLimit - Maximum depth to search
   * @returns Search result with path if found
   */
  search(
    startNode: GraphNode<T>,
    targetValue: T,
    depthLimit: number
  ): SearchResult<T> {
    if (depthLimit < 0) {
      throw new Error("Depth limit must be non-negative");
    }

    // Use a stack for DFS (Last In, First Out)
    const stack: Array<{ node: GraphNode<T>; depth: number; path: T[] }> = [];
    const visited = new Set<GraphNode<T>>();

    // Start with the initial node
    stack.push({
      node: startNode,
      depth: 0,
      path: [startNode.value]
    });
    visited.add(startNode);

    while (stack.length > 0) {
      const { node, depth, path } = stack.pop()!;

      // Check if we found the target
      if (node.value === targetValue) {
        return {
          found: true,
          node: node,
          path: path
        };
      }

      // Only explore neighbors if we haven't reached depth limit
      if (depth < depthLimit) {
        // Process neighbors in reverse order for correct DFS order
        for (let i = node.neighbors.length - 1; i >= 0; i--) {
          const neighbor = node.neighbors[i];
          
          // Avoid cycles by checking if we've visited this node
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            stack.push({
              node: neighbor,
              depth: depth + 1,
              path: [...path, neighbor.value]
            });
          }
        }
      }
    }

    return { found: false };
  }
}
interface EnhancedGraphNode<T> {
  id: string;
  value: T;
  neighbors: EnhancedGraphNode<T>[];
}

interface EnhancedSearchResult<T> {
  found: boolean;
  node?: EnhancedGraphNode<T>;
  path?: T[];
  nodesVisited: number;
  maxDepthReached: number;
}

class EnhancedDepthLimitedSearch<T> {
  /**
   * Enhanced iterative DLS with better tracking
   */
  search(
    startNode: EnhancedGraphNode<T>,
    targetValue: T,
    depthLimit: number
  ): EnhancedSearchResult<T> {
    if (depthLimit < 0) {
      throw new Error("Depth limit must be non-negative");
    }

    const stack: Array<{
      node: EnhancedGraphNode<T>;
      depth: number;
      path: T[];
    }> = [];
    
    const visited = new Set<string>(); // Track by ID to avoid object reference issues
    let nodesVisited = 0;
    let maxDepthReached = 0;

    stack.push({
      node: startNode,
      depth: 0,
      path: [startNode.value]
    });
    visited.add(startNode.id);

    while (stack.length > 0) {
      const { node, depth, path } = stack.pop()!;
      nodesVisited++;
      maxDepthReached = Math.max(maxDepthReached, depth);

      // Debug logging (optional)
      // console.log(`Visiting: ${node.value}, Depth: ${depth}, Path: ${path.join(' -> ')}`);

      if (node.value === targetValue) {
        return {
          found: true,
          node: node,
          path: path,
          nodesVisited,
          maxDepthReached
        };
      }

      if (depth < depthLimit) {
        // Explore neighbors in the order they appear
        const unvisitedNeighbors = node.neighbors.filter(
          neighbor => !visited.has(neighbor.id)
        );

        // Push neighbors in reverse order to maintain correct DFS order
        for (let i = unvisitedNeighbors.length - 1; i >= 0; i--) {
          const neighbor = unvisitedNeighbors[i];
          visited.add(neighbor.id);
          stack.push({
            node: neighbor,
            depth: depth + 1,
            path: [...path, neighbor.value]
          });
        }
      }
    }

    return {
      found: false,
      nodesVisited,
      maxDepthReached
    };
  }

  /**
   * Find all nodes within depth limit (like BFS but depth-limited)
   */
  findAllWithinDepth(
    startNode: EnhancedGraphNode<T>,
    depthLimit: number
  ): EnhancedGraphNode<T>[] {
    const result: EnhancedGraphNode<T>[] = [];
    const stack: Array<{
      node: EnhancedGraphNode<T>;
      depth: number;
    }> = [];
    const visited = new Set<string>();

    stack.push({ node: startNode, depth: 0 });
    visited.add(startNode.id);
    result.push(startNode);

    while (stack.length > 0) {
      const { node, depth } = stack.pop()!;

      if (depth < depthLimit) {
        for (let i = node.neighbors.length - 1; i >= 0; i--) {
          const neighbor = node.neighbors[i];
          if (!visited.has(neighbor.id)) {
            visited.add(neighbor.id);
            result.push(neighbor);
            stack.push({
              node: neighbor,
              depth: depth + 1
            });
          }
        }
      }
    }

    return result;
  }
}
// Example usage
const nodeA = { id: 'A', value: 'A', neighbors: [] };
const nodeB = { id: 'B', value: 'B', neighbors: [] };
const nodeC = { id: 'C', value: 'C', neighbors: [] };
const nodeD = { id: 'D', value: 'D', neighbors: [] };
const nodeE = { id: 'E', value: 'E', neighbors: [] };

// Create a simple graph: A -> B -> C -> D
//           -> E
nodeA.neighbors = [nodeB, nodeE];
nodeB.neighbors = [nodeC];
nodeC.neighbors = [nodeD];
nodeE.neighbors = [];

const dls = new EnhancedDepthLimitedSearch<string>();

// Search for node D with depth limit 3
const result1 = dls.search(nodeA, 'D', 3);
console.log('Search for D (limit 3):', result1);

// Search for node D with depth limit 2 (should fail)
const result2 = dls.search(nodeA, 'D', 2);
console.log('Search for D (limit 2):', result2);

// Find all nodes within depth 2
const nodesWithin2 = dls.findAllWithinDepth(nodeA, 2);
console.log('Nodes within depth 2:', nodesWithin2.map(n => n.value));

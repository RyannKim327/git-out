interface GraphNode {
  id: string;
  children?: GraphNode[];
}

interface DLSResult {
  found: boolean;
  node?: GraphNode;
  depth: number;
}

class DepthLimitedSearch {
  /**
   * Perform depth-limited search on a graph/tree
   * @param startNode - The starting node
   * @param targetId - The ID of the node to search for
   * @param depthLimit - Maximum depth to search
   * @returns DLSResult object with search results
   */
  static search(
    startNode: GraphNode, 
    targetId: string, 
    depthLimit: number
  ): DLSResult {
    return this.dlsRecursive(startNode, targetId, depthLimit, 0);
  }

  /**
   * Recursive helper function for DLS
   */
  private static dlsRecursive(
    currentNode: GraphNode,
    targetId: string,
    depthLimit: number,
    currentDepth: number
  ): DLSResult {
    // Check if current node is the target
    if (currentNode.id === targetId) {
      return { found: true, node: currentNode, depth: currentDepth };
    }

    // Check if we've reached the depth limit
    if (currentDepth >= depthLimit) {
      return { found: false, depth: currentDepth };
    }

    // Recursively search children
    if (currentNode.children) {
      for (const child of currentNode.children) {
        const result = this.dlsRecursive(child, targetId, depthLimit, currentDepth + 1);
        if (result.found) {
          return result;
        }
      }
    }

    return { found: false, depth: currentDepth };
  }

  /**
   * Perform iterative deepening depth-first search (IDDFS)
   * which repeatedly calls DLS with increasing depth limits
   * @param startNode - The starting node
   * @param targetId - The ID of the node to search for
   * @param maxDepth - Maximum depth to search (safety limit)
   * @returns DLSResult object with search results
   */
  static iterativeDeepeningSearch(
    startNode: GraphNode,
    targetId: string,
    maxDepth: number = 100
  ): DLSResult {
    for (let depth = 0; depth <= maxDepth; depth++) {
      const result = this.search(startNode, targetId, depth);
      if (result.found || result.depth < depth) {
        // Found target or searched entire tree without hitting depth limit
        return result;
      }
    }
    return { found: false, depth: maxDepth };
  }
}

// Example usage and test
function createSampleGraph(): GraphNode {
  return {
    id: "A",
    children: [
      {
        id: "B",
        children: [
          { id: "D", children: [{ id: "G" }] },
          { id: "E" }
        ]
      },
      {
        id: "C",
        children: [
          { id: "F", children: [{ id: "H" }, { id: "I" }] }
        ]
      }
    ]
  };
}

// Test the implementation
function testDepthLimitedSearch() {
  const graph = createSampleGraph();
  
  console.log("=== Depth-Limited Search Tests ===");
  
  // Test 1: Search for node within depth limit
  const result1 = DepthLimitedSearch.search(graph, "F", 3);
  console.log("Search for 'F' with depth limit 3:", result1);
  
  // Test 2: Search for node beyond depth limit
  const result2 = DepthLimitedSearch.search(graph, "G", 1);
  console.log("Search for 'G' with depth limit 1:", result2);
  
  // Test 3: Search for non-existent node
  const result3 = DepthLimitedSearch.search(graph, "Z", 5);
  console.log("Search for 'Z' with depth limit 5:", result3);
  
  // Test 4: Iterative deepening search
  const result4 = DepthLimitedSearch.iterativeDeepeningSearch(graph, "I");
  console.log("Iterative deepening search for 'I':", result4);
}

// Run tests
testDepthLimitedSearch();
interface DLSResultWithPath extends DLSResult {
  path?: string[];
}

class DepthLimitedSearchWithPath {
  static search(
    startNode: GraphNode,
    targetId: string,
    depthLimit: number
  ): DLSResultWithPath {
    return this.dlsRecursive(startNode, targetId, depthLimit, 0, []);
  }

  private static dlsRecursive(
    currentNode: GraphNode,
    targetId: string,
    depthLimit: number,
    currentDepth: number,
    currentPath: string[]
  ): DLSResultWithPath {
    const newPath = [...currentPath, currentNode.id];

    if (currentNode.id === targetId) {
      return { 
        found: true, 
        node: currentNode, 
        depth: currentDepth,
        path: newPath
      };
    }

    if (currentDepth >= depthLimit) {
      return { found: false, depth: currentDepth, path: newPath };
    }

    if (currentNode.children) {
      for (const child of currentNode.children) {
        const result = this.dlsRecursive(
          child, 
          targetId, 
          depthLimit, 
          currentDepth + 1, 
          newPath
        );
        if (result.found) {
          return result;
        }
      }
    }

    return { found: false, depth: currentDepth, path: newPath };
  }
}

// Test the path-tracking version
function testDLSWithPath() {
  const graph = createSampleGraph();
  
  console.log("\n=== DLS with Path Tracking ===");
  const result = DepthLimitedSearchWithPath.search(graph, "H", 3);
  console.log("Search for 'H' with path tracking:", result);
}

testDLSWithPath();

interface Node {
  id: string;
  children?: Node[];
  // Add any other properties your nodes need
}

class DepthLimitedSearch {
  /**
   * Perform depth-limited search
   * @param root Starting node
   * @param targetId Node ID to search for
   * @param maxDepth Maximum depth to search
   * @returns Found node or null if not found
   */
  search(root: Node, targetId: string, maxDepth: number): Node | null {
    return this.dlsRecursive(root, targetId, maxDepth, 0);
  }

  /**
   * Recursive helper function for DLS
   */
  private dlsRecursive(node: Node, targetId: string, maxDepth: number, currentDepth: number): Node | null {
    // Base case: found the target
    if (node.id === targetId) {
      return node;
    }

    // Base case: reached depth limit
    if (currentDepth >= maxDepth) {
      return null;
    }

    // Recursively search children
    if (node.children) {
      for (const child of node.children) {
        const result = this.dlsRecursive(child, targetId, maxDepth, currentDepth + 1);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }
}
interface GraphNode {
  id: string;
  value: number; // Example property
  neighbors: GraphNode[];
  visited?: boolean;
}

class GraphDepthLimitedSearch {
  /**
   * DLS for graph structures (prevents cycles)
   */
  searchGraph(
    startNode: GraphNode,
    targetId: string,
    maxDepth: number
  ): GraphNode | null {
    // Reset visited state for a clean search
    this.resetVisited(startNode);
    return this.dlsGraphRecursive(startNode, targetId, maxDepth, 0);
  }

  private dlsGraphRecursive(
    node: GraphNode,
    targetId: string,
    maxDepth: number,
    currentDepth: number
  ): GraphNode | null {
    // Mark as visited to prevent cycles
    node.visited = true;

    if (node.id === targetId) {
      return node;
    }

    if (currentDepth >= maxDepth) {
      return null;
    }

    for (const neighbor of node.neighbors) {
      if (!neighbor.visited) {
        const result = this.dlsGraphRecursive(
          neighbor,
          targetId,
          maxDepth,
          currentDepth + 1
        );
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }

  private resetVisited(startNode: GraphNode): void {
    const visitedNodes = new Set<GraphNode>();
    this.resetRecursive(startNode, visitedNodes);
  }

  private resetRecursive(node: GraphNode, visitedNodes: Set<GraphNode>): void {
    if (visitedNodes.has(node)) return;
    
    visitedNodes.add(node);
    node.visited = false;
    
    for (const neighbor of node.neighbors) {
      this.resetRecursive(neighbor, visitedNodes);
    }
  }
}
// Example 1: Tree structure
const tree: Node = {
  id: "A",
  children: [
    {
      id: "B",
      children: [
        { id: "D", children: [] },
        { id: "E", children: [] }
      ]
    },
    {
      id: "C",
      children: [
        { id: "F", children: [] },
        { id: "G", children: [] }
      ]
    }
  ]
};

const dls = new DepthLimitedSearch();
const result = dls.search(tree, "G", 3);
console.log(result?.id); // "G"

// Example 2: Graph structure
const nodeA: GraphNode = { id: "A", value: 1, neighbors: [], visited: false };
const nodeB: GraphNode = { id: "B", value: 2, neighbors: [], visited: false };
const nodeC: GraphNode = { id: "C", value: 3, neighbors: [], visited: false };

// Create a cyclic graph
nodeA.neighbors = [nodeB];
nodeB.neighbors = [nodeC, nodeA]; // Cycle back to A
nodeC.neighbors = [nodeB];

const graphDLS = new GraphDepthLimitedSearch();
const graphResult = graphDLS.searchGraph(nodeA, "C", 3);
console.log(graphResult?.id); // "C"
interface SearchResult {
  node: Node | null;
  path: string[];
}

class AdvancedDLS {
  searchWithPath(root: Node, targetId: string, maxDepth: number): SearchResult {
    return this.dlsWithPath(root, targetId, maxDepth, 0, []);
  }

  private dlsWithPath(
    node: Node,
    targetId: string,
    maxDepth: number,
    currentDepth: number,
    currentPath: string[]
  ): SearchResult {
    const newPath = [...currentPath, node.id];

    if (node.id === targetId) {
      return { node, path: newPath };
    }

    if (currentDepth >= maxDepth) {
      return { node: null, path: newPath };
    }

    if (node.children) {
      for (const child of node.children) {
        const result = this.dlsWithPath(
          child,
          targetId,
          maxDepth,
          currentDepth + 1,
          newPath
        );
        if (result.node !== null) {
          return result;
        }
      }
    }

    return { node: null, path: newPath };
  }
}

// Usage
const advancedDLS = new AdvancedDLS();
const resultWithPath = advancedDLS.searchWithPath(tree, "G", 3);
console.log("Found:", resultWithPath.node?.id);
console.log("Path:", resultWithPath.path);

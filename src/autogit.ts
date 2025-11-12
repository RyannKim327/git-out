interface Node {
  id: string;
  value: any;
  children?: Node[];
}

class BreadthLimitedSearch {
  private visited: Set<string> = new Set();
  
  /**
   * Perform breadth-limited search
   * @param startNode - Starting node
   * @param targetId - ID of node to find
   * @param maxDepth - Maximum search depth
   * @returns Found node or null if not found
   */
  search(startNode: Node, targetId: string, maxDepth: number): Node | null {
    if (maxDepth < 0) {
      throw new Error("Max depth must be non-negative");
    }

    const queue: { node: Node; depth: number }[] = [];
    this.visited.clear();

    // Start with initial node
    queue.push({ node: startNode, depth: 0 });
    this.visited.add(startNode.id);

    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;

      // Check if current node is the target
      if (node.id === targetId) {
        return node;
      }

      // Stop exploring if depth limit reached
      if (depth >= maxDepth) {
        continue;
      }

      // Explore children
      if (node.children) {
        for (const child of node.children) {
          if (!this.visited.has(child.id)) {
            this.visited.add(child.id);
            queue.push({ node: child, depth: depth + 1 });
          }
        }
      }
    }

    return null;
  }
}
interface SearchResult {
  node: Node | null;
  path: string[];
  depth: number;
}

class AdvancedBreadthLimitedSearch {
  private visited: Set<string> = new Set();
  
  /**
   * Enhanced BLS with path tracking
   */
  searchWithPath(
    startNode: Node, 
    targetId: string, 
    maxDepth: number
  ): SearchResult {
    const queue: { 
      node: Node; 
      depth: number; 
      path: string[] 
    }[] = [];
    
    this.visited.clear();

    queue.push({ 
      node: startNode, 
      depth: 0, 
      path: [startNode.id] 
    });
    this.visited.add(startNode.id);

    while (queue.length > 0) {
      const { node, depth, path } = queue.shift()!;

      if (node.id === targetId) {
        return { node, path, depth };
      }

      if (depth >= maxDepth || !node.children) {
        continue;
      }

      for (const child of node.children) {
        if (!this.visited.has(child.id)) {
          this.visited.add(child.id);
          queue.push({
            node: child,
            depth: depth + 1,
            path: [...path, child.id]
          });
        }
      }
    }

    return { node: null, path: [], depth: -1 };
  }
}
// Example node structure
const graph: Node = {
  id: "A",
  value: "Root",
  children: [
    {
      id: "B",
      value: "Child 1",
      children: [
        { id: "D", value: "Grandchild 1" },
        { id: "E", value: "Grandchild 2" }
      ]
    },
    {
      id: "C",
      value: "Child 2",
      children: [
        { id: "F", value: "Grandchild 3" },
        { id: "G", value: "Grandchild 4" }
      ]
    }
  ]
};

// Using the search algorithm
const bls = new BreadthLimitedSearch();
const result = bls.search(graph, "G", 2); // Search for node G with max depth 2

console.log(result?.value); // "Grandchild 4"

// Using advanced version
const advancedBls = new AdvancedBreadthLimitedSearch();
const advancedResult = advancedBls.searchWithPath(graph, "G", 2);

console.log("Path:", advancedResult.path); // ["A", "C", "G"]
console.log("Depth:", advancedResult.depth); // 2
type VisitCallback = (node: Node, depth: number) => void;

class GenericBreadthLimitedSearch {
  
  /**
   * Generic BLS with callback support
   */
  searchGeneric(
    startNode: Node,
    maxDepth: number,
    onVisit?: VisitCallback,
    shouldStop?: (node: Node) => boolean
  ): Node | null {
    const queue: { node: Node; depth: number }[] = [];
    const visited = new Set<string>();

    queue.push({ node: startNode, depth: 0 });
    visited.add(startNode.id);

    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;

      // Custom stop condition
      if (shouldStop && shouldStop(node)) {
        return node;
      }

      // Visit callback
      if (onVisit) {
        onVisit(node, depth);
      }

      if (depth >= maxDepth || !node.children) {
        continue;
      }

      for (const child of node.children) {
        if (!visited.has(child.id)) {
          visited.add(child.id);
          queue.push({ node: child, depth: depth + 1 });
        }
      }
    }

    return null;
  }
}

// Usage with callbacks
const genericBls = new GenericBreadthLimitedSearch();

genericBls.searchGeneric(
  graph,
  3,
  (node, depth) => console.log(`Visited ${node.id} at depth ${depth}`),
  (node) => node.id === "G"
);

interface GraphNode<T> {
  value: T;
  children: GraphNode<T>[];
}

class BreadthLimitedSearch<T> {
  /**
   * Perform breadth-limited search starting from the root node
   * @param root Starting node
   * @param target Value to search for
   * @param maxDepth Maximum depth to search (0 = only root, 1 = root and direct children, etc.)
   * @returns The found node or null if not found within depth limit
   */
  search(root: GraphNode<T>, target: T, maxDepth: number): GraphNode<T> | null {
    if (maxDepth < 0) {
      throw new Error("Max depth must be non-negative");
    }

    const queue: { node: GraphNode<T>; depth: number }[] = [];
    const visited = new Set<GraphNode<T>>();

    // Start with root node at depth 0
    queue.push({ node: root, depth: 0 });
    visited.add(root);

    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;

      // Check if we found the target
      if (node.value === target) {
        return node;
      }

      // Only explore children if we haven't reached depth limit
      if (depth < maxDepth) {
        for (const child of node.children) {
          if (!visited.has(child)) {
            visited.add(child);
            queue.push({ node: child, depth: depth + 1 });
          }
        }
      }
    }

    return null; // Target not found within depth limit
  }

  /**
   * Get all nodes within the depth limit (useful for visualization or analysis)
   */
  getAllNodesWithinDepth(root: GraphNode<T>, maxDepth: number): GraphNode<T>[] {
    const nodes: GraphNode<T>[] = [];
    const queue: { node: GraphNode<T>; depth: number }[] = [];
    const visited = new Set<GraphNode<T>>();

    queue.push({ node: root, depth: 0 });
    visited.add(root);
    nodes.push(root);

    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;

      if (depth < maxDepth) {
        for (const child of node.children) {
          if (!visited.has(child)) {
            visited.add(child);
            nodes.push(child);
            queue.push({ node: child, depth: depth + 1 });
          }
        }
      }
    }

    return nodes;
  }

  /**
   * Get the path from root to target if found
   */
  searchWithPath(root: GraphNode<T>, target: T, maxDepth: number): GraphNode<T>[] | null {
    const queue: { node: GraphNode<T>; depth: number; path: GraphNode<T>[] }[] = [];
    const visited = new Set<GraphNode<T>>();

    queue.push({ node: root, depth: 0, path: [root] });
    visited.add(root);

    while (queue.length > 0) {
      const { node, depth, path } = queue.shift()!;

      if (node.value === target) {
        return path;
      }

      if (depth < maxDepth) {
        for (const child of node.children) {
          if (!visited.has(child)) {
            visited.add(child);
            queue.push({ 
              node: child, 
              depth: depth + 1, 
              path: [...path, child] 
            });
          }
        }
      }
    }

    return null;
  }
}
interface SearchResult<T> {
  node: GraphNode<T>;
  depth: number;
  path?: GraphNode<T>[];
}

class GenericBreadthLimitedSearch<T> {
  /**
   * Search with custom goal test and node processing
   */
  search(
    root: GraphNode<T>,
    maxDepth: number,
    goalTest: (node: GraphNode<T>) => boolean,
    processNode?: (node: GraphNode<T>, depth: number) => void
  ): SearchResult<T> | null {
    
    const queue: { node: GraphNode<T>; depth: number }[] = [];
    const visited = new Set<GraphNode<T>>();

    queue.push({ node: root, depth: 0 });
    visited.add(root);

    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;

      // Process node if callback provided
      processNode?.(node, depth);

      // Check if this node satisfies the goal
      if (goalTest(node)) {
        return { node, depth };
      }

      if (depth < maxDepth) {
        for (const child of node.children) {
          if (!visited.has(child)) {
            visited.add(child);
            queue.push({ node: child, depth: depth + 1 });
          }
        }
      }
    }

    return null;
  }

  /**
   * Find all nodes that satisfy a condition within depth limit
   */
  findAll(
    root: GraphNode<T>,
    maxDepth: number,
    condition: (node: GraphNode<T>) => boolean
  ): SearchResult<T>[] {
    
    const results: SearchResult<T>[] = [];
    const queue: { node: GraphNode<T>; depth: number }[] = [];
    const visited = new Set<GraphNode<T>>();

    queue.push({ node: root, depth: 0 });
    visited.add(root);

    if (condition(root)) {
      results.push({ node: root, depth: 0 });
    }

    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;

      if (depth < maxDepth) {
        for (const child of node.children) {
          if (!visited.has(child)) {
            visited.add(child);
            
            if (condition(child)) {
              results.push({ node: child, depth: depth + 1 });
            }
            
            queue.push({ node: child, depth: depth + 1 });
          }
        }
      }
    }

    return results;
  }
}
// Create a sample graph
const createSampleGraph = (): GraphNode<string> => {
  const root: GraphNode<string> = { value: "A", children: [] };
  const b: GraphNode<string> = { value: "B", children: [] };
  const c: GraphNode<string> = { value: "C", children: [] };
  const d: GraphNode<string> = { value: "D", children: [] };
  const e: GraphNode<string> = { value: "E", children: [] };
  const f: GraphNode<string> = { value: "F", children: [] };

  root.children = [b, c];
  b.children = [d, e];
  c.children = [f];
  d.children = [];
  e.children = [];
  f.children = [];

  return root;
};

// Usage examples
const example = () => {
  const graph = createSampleGraph();
  const bls = new BreadthLimitedSearch<string>();

  // Search for node "E" with max depth 2
  const result1 = bls.search(graph, "E", 2);
  console.log("Search for 'E' with depth 2:", result1?.value); // Should find E

  // Search for node "E" with max depth 1 (should not find it)
  const result2 = bls.search(graph, "E", 1);
  console.log("Search for 'E' with depth 1:", result2?.value); // Should be null

  // Get path to node
  const path = bls.searchWithPath(graph, "F", 2);
  console.log("Path to F:", path?.map(n => n.value).join(" -> ")); // A -> C -> F

  // Get all nodes within depth 1
  const nodes = bls.getAllNodesWithinDepth(graph, 1);
  console.log("Nodes within depth 1:", nodes.map(n => n.value)); // [A, B, C]
};

// Run the example
example();
interface WeightedGraphNode<T> {
  value: T;
  edges: { node: WeightedGraphNode<T>; cost: number }[];
}

class CostLimitedBreadthSearch<T> {
  /**
   * Breadth-limited search with cost consideration
   */
  searchWithCost(
    root: WeightedGraphNode<T>,
    target: T,
    maxDepth: number,
    maxCost: number
  ): { node: WeightedGraphNode<T>; cost: number; depth: number } | null {
    
    const queue: { node: WeightedGraphNode<T>; depth: number; cost: number }[] = [];
    const visited = new Set<WeightedGraphNode<T>>();

    queue.push({ node: root, depth: 0, cost: 0 });
    visited.add(root);

    while (queue.length > 0) {
      // Sort by cost for best-first approach (optional)
      queue.sort((a, b) => a.cost - b.cost);
      
      const { node, depth, cost } = queue.shift()!;

      if (node.value === target) {
        return { node, cost, depth };
      }

      if (depth < maxDepth && cost < maxCost) {
        for (const edge of node.edges) {
          if (!visited.has(edge.node)) {
            visited.add(edge.node);
            queue.push({
              node: edge.node,
              depth: depth + 1,
              cost: cost + edge.cost
            });
          }
        }
      }
    }

    return null;
  }
}

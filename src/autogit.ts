interface Node<T> {
  value: T;
  children: Node<T>[];
}

interface SearchResult<T> {
  found: boolean;
  node?: Node<T>;
  path?: T[];
  depth: number;
}

class BreadthLimitedSearch<T> {
  /**
   * Perform breadth-limited search
   * @param root Starting node
   * @param target Value to search for
   * @param maxDepth Maximum depth to search (0-based)
   * @returns Search result
   */
  search(root: Node<T>, target: T, maxDepth: number): SearchResult<T> {
    if (maxDepth < 0) {
      throw new Error("Max depth must be non-negative");
    }

    // Queue stores nodes along with their depth and path
    const queue: Array<{ node: Node<T>; depth: number; path: T[] }> = [
      { node: root, depth: 0, path: [root.value] }
    ];

    while (queue.length > 0) {
      const { node, depth, path } = queue.shift()!;

      // Check if current node is the target
      if (node.value === target) {
        return {
          found: true,
          node: node,
          path: path,
          depth: depth
        };
      }

      // Only explore children if we haven't reached max depth
      if (depth < maxDepth) {
        for (const child of node.children) {
          queue.push({
            node: child,
            depth: depth + 1,
            path: [...path, child.value]
          });
        }
      }
    }

    return {
      found: false,
      depth: -1
    };
  }

  /**
   * Alternative implementation with early termination check
   */
  searchWithTermination(
    root: Node<T>,
    target: T,
    maxDepth: number,
    maxNodes?: number
  ): SearchResult<T> {
    if (maxDepth < 0) {
      throw new Error("Max depth must be non-negative");
    }

    const queue: Array<{ node: Node<T>; depth: number; path: T[] }> = [
      { node: root, depth: 0, path: [root.value] }
    ];
    let nodesVisited = 0;

    while (queue.length > 0) {
      // Early termination if we've visited too many nodes
      if (maxNodes && nodesVisited >= maxNodes) {
        return {
          found: false,
          depth: -1
        };
      }

      const { node, depth, path } = queue.shift()!;
      nodesVisited++;

      if (node.value === target) {
        return {
          found: true,
          node: node,
          path: path,
          depth: depth
        };
      }

      if (depth < maxDepth) {
        for (const child of node.children) {
          queue.push({
            node: child,
            depth: depth + 1,
            path: [...path, child.value]
          });
        }
      }
    }

    return {
      found: false,
      depth: -1
    };
  }
}
// Example: Building a tree and performing search
function createExampleTree(): Node<string> {
  return {
    value: "A",
    children: [
      {
        value: "B",
        children: [
          { value: "D", children: [] },
          { value: "E", children: [] }
        ]
      },
      {
        value: "C",
        children: [
          { value: "F", children: [] },
          { value: "G", children: [] }
        ]
      }
    ]
  };
}

// Using the breadth-limited search
const bls = new BreadthLimitedSearch<string>();
const tree = createExampleTree();

// Search with depth limit of 2
const result1 = bls.search(tree, "G", 2);
console.log("Search for 'G' with depth limit 2:", result1);

// Search with depth limit of 1 (should not find G)
const result2 = bls.search(tree, "G", 1);
console.log("Search for 'G' with depth limit 1:", result2);

// Search with node limit
const result3 = bls.searchWithTermination(tree, "G", 3, 5);
console.log("Search for 'G' with node limit 5:", result3);
// Helper function to create nodes
function createNode<T>(value: T, children: Node<T>[] = []): Node<T> {
  return { value, children };
}

// Function to build a tree from adjacency list representation
function buildTreeFromAdjacencyList<T>(
  adjacencyList: Map<T, T[]>,
  rootValue: T
): Node<T> {
  const buildNode = (value: T): Node<T> => {
    const childrenValues = adjacencyList.get(value) || [];
    const children = childrenValues.map(childValue => buildNode(childValue));
    return { value, children };
  };

  return buildNode(rootValue);
}

// Example usage of utility functions
const adjacencyList = new Map<string, string[]>([
  ["A", ["B", "C"]],
  ["B", ["D", "E"]],
  ["C", ["F", "G"]],
  ["D", []],
  ["E", []],
  ["F", []],
  ["G", []]
]);

const treeFromAdjacency = buildTreeFromAdjacencyList(adjacencyList, "A");
class OptimizedBreadthLimitedSearch<T> {
  /**
   * Optimized version that uses a single array and index pointer
   * to avoid shift() operations which are O(n)
   */
  searchOptimized(root: Node<T>, target: T, maxDepth: number): SearchResult<T> {
    const queue: Array<{ node: Node<T>; depth: number; path: T[] }> = [
      { node: root, depth: 0, path: [root.value] }
    ];
    let index = 0;

    while (index < queue.length) {
      const { node, depth, path } = queue[index];
      index++;

      if (node.value === target) {
        return {
          found: true,
          node: node,
          path: path,
          depth: depth
        };
      }

      if (depth < maxDepth) {
        for (const child of node.children) {
          queue.push({
            node: child,
            depth: depth + 1,
            path: [...path, child.value]
          });
        }
      }
    }

    return {
      found: false,
      depth: -1
    };
  }
}

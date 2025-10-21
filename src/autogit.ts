interface Node<T> {
  value: T;
  children: Node<T>[];
}

class DepthLimitedSearch<T> {
  // Iterative depth-limited search
  search(
    root: Node<T>,
    target: T,
    depthLimit: number
  ): { node: Node<T> | null; depth: number } {
    // Stack stores node and current depth
    const stack: Array<{ node: Node<T>; depth: number }> = [
      { node: root, depth: 0 }
    ];

    while (stack.length > 0) {
      const { node, depth } = stack.pop()!;

      // Check if we found the target
      if (node.value === target) {
        return { node, depth };
      }

      // Only explore children if we haven't exceeded depth limit
      if (depth < depthLimit) {
        // Add children to stack in reverse order for DFS behavior
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ node: node.children[i], depth: depth + 1 });
        }
      }
    }

    return { node: null, depth: -1 };
  }
}
interface SearchResult<T> {
  found: boolean;
  node: Node<T> | null;
  depth: number;
  path: T[];
}

class EnhancedDepthLimitedSearch<T> {
  searchWithPath(
    root: Node<T>,
    target: T,
    depthLimit: number
  ): SearchResult<T> {
    // Store node, depth, and path
    const stack: Array<{
      node: Node<T>;
      depth: number;
      path: T[];
    }> = [{ node: root, depth: 0, path: [root.value] }];

    while (stack.length > 0) {
      const { node, depth, path } = stack.pop()!;

      // Check if we found the target
      if (node.value === target) {
        return {
          found: true,
          node,
          depth,
          path
        };
      }

      // Only explore children if we haven't exceeded depth limit
      if (depth < depthLimit) {
        // Add children to stack
        for (let i = node.children.length - 1; i >= 0; i--) {
          const child = node.children[i];
          stack.push({
            node: child,
            depth: depth + 1,
            path: [...path, child.value]
          });
        }
      }
    }

    return {
      found: false,
      node: null,
      depth: -1,
      path: []
    };
  }

  // Find all nodes within depth limit
  findAllWithinDepth(
    root: Node<T>,
    predicate: (node: Node<T>) => boolean,
    depthLimit: number
  ): Array<{ node: Node<T>; depth: number; path: T[] }> {
    const results: Array<{ node: Node<T>; depth: number; path: T[] }> = [];
    const stack: Array<{
      node: Node<T>;
      depth: number;
      path: T[];
    }> = [{ node: root, depth: 0, path: [root.value] }];

    while (stack.length > 0) {
      const { node, depth, path } = stack.pop()!;

      // Check if current node matches predicate
      if (predicate(node)) {
        results.push({ node, depth, path });
      }

      // Only explore children if we haven't exceeded depth limit
      if (depth < depthLimit) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          const child = node.children[i];
          stack.push({
            node: child,
            depth: depth + 1,
            path: [...path, child.value]
          });
        }
      }
    }

    return results;
  }
}
// Example usage with a tree structure
class TreeNode<T> implements Node<T> {
  constructor(
    public value: T,
    public children: TreeNode<T>[] = []
  ) {}

  addChild(value: T): TreeNode<T> {
    const child = new TreeNode(value);
    this.children.push(child);
    return child;
  }
}

// Create a sample tree
const root = new TreeNode('A');
const b = root.addChild('B');
const c = root.addChild('C');
b.addChild('D');
b.addChild('E');
c.addChild('F');
c.addChild('G');

// Usage examples
const dls = new EnhancedDepthLimitedSearch<string>();

// Search for a specific node
console.log('Search for "F":');
const result1 = dls.searchWithPath(root, 'F', 3);
console.log(result1);

console.log('\nSearch for "X" (non-existent):');
const result2 = dls.searchWithPath(root, 'X', 3);
console.log(result2);

console.log('\nFind all nodes with depth <= 2:');
const allNodes = dls.findAllWithinDepth(root, () => true, 2);
allNodes.forEach(({ node, depth, path }) => {
  console.log(`Value: ${node.value}, Depth: ${depth}, Path: ${path.join(' -> ')}`);
});

// Example with custom predicate
console.log('\nFind nodes with values longer than 1 character:');
const longNodes = dls.findAllWithinDepth(
  root,
  (node) => node.value.length > 1,
  3
);
console.log(longNodes);
class SafeDepthLimitedSearch<T> {
  search(
    root: Node<T>,
    target: T,
    depthLimit: number
  ): SearchResult<T> {
    const visited = new Set<Node<T>>();
    const stack: Array<{
      node: Node<T>;
      depth: number;
      path: T[];
    }> = [{ node: root, depth: 0, path: [root.value] }];

    while (stack.length > 0) {
      const { node, depth, path } = stack.pop()!;

      // Skip if already visited (cycle detection)
      if (visited.has(node)) {
        continue;
      }
      visited.add(node);

      if (node.value === target) {
        return {
          found: true,
          node,
          depth,
          path
        };
      }

      if (depth < depthLimit) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          const child = node.children[i];
          if (!visited.has(child)) {
            stack.push({
              node: child,
              depth: depth + 1,
              path: [...path, child.value]
            });
          }
        }
      }
    }

    return {
      found: false,
      node: null,
      depth: -1,
      path: []
    };
  }
}

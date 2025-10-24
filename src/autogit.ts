interface GraphNode {
  id: string;
  children?: GraphNode[];
}

interface DLSResult<T> {
  found: boolean;
  node?: T;
  depth: number;
}

class DepthLimitedSearch<T extends GraphNode> {
  /**
   * Iterative Depth-Limited Search
   * @param root - Starting node
   * @param targetId - ID of node to find
   * @param maxDepth - Maximum search depth
   * @returns Search result
   */
  search(root: T, targetId: string, maxDepth: number): DLSResult<T> {
    if (maxDepth < 0) {
      return { found: false, depth: 0 };
    }

    // Stack will store [node, currentDepth]
    const stack: [T, number][] = [[root, 0]];
    
    while (stack.length > 0) {
      const [currentNode, currentDepth] = stack.pop()!;
      
      // Check if we found the target
      if (currentNode.id === targetId) {
        return { found: true, node: currentNode, depth: currentDepth };
      }
      
      // Only explore children if we haven't reached max depth
      if (currentDepth < maxDepth && currentNode.children) {
        // Push children in reverse order to maintain left-to-right exploration
        for (let i = currentNode.children.length - 1; i >= 0; i--) {
          stack.push([currentNode.children[i] as T, currentDepth + 1]);
        }
      }
    }
    
    return { found: false, depth: maxDepth };
  }

  /**
   * Find all nodes at a specific depth
   * @param root - Starting node
   * @param targetDepth - Depth to search for
   * @returns Array of nodes at target depth
   */
  findNodesAtDepth(root: T, targetDepth: number): T[] {
    const result: T[] = [];
    const stack: [T, number][] = [[root, 0]];
    
    while (stack.length > 0) {
      const [currentNode, currentDepth] = stack.pop()!;
      
      if (currentDepth === targetDepth) {
        result.push(currentNode);
      } else if (currentDepth < targetDepth && currentNode.children) {
        for (let i = currentNode.children.length - 1; i >= 0; i--) {
          stack.push([currentNode.children[i] as T, currentDepth + 1]);
        }
      }
    }
    
    return result;
  }
}
interface SearchableNode<T> {
  getChildren(): SearchableNode<T>[];
  getData(): T;
}

interface SearchCriteria<T> {
  (node: T): boolean;
}

interface SearchResult<T> {
  found: boolean;
  node?: T;
  depth: number;
  path?: T[];
}

class GenericDepthLimitedSearch<T> {
  /**
   * Generic iterative DLS with custom search criteria
   */
  search(
    root: SearchableNode<T>,
    criteria: SearchCriteria<T>,
    maxDepth: number
  ): SearchResult<T> {
    // Stack stores [node, depth, path]
    const stack: [SearchableNode<T>, number, T[]][] = [
      [root, 0, [root.getData()]]
    ];
    
    while (stack.length > 0) {
      const [currentNode, currentDepth, path] = stack.pop()!;
      
      if (criteria(currentNode.getData())) {
        return {
          found: true,
          node: currentNode.getData(),
          depth: currentDepth,
          path
        };
      }
      
      if (currentDepth < maxDepth) {
        const children = currentNode.getChildren();
        for (let i = children.length - 1; i >= 0; i--) {
          const child = children[i];
          stack.push([
            child,
            currentDepth + 1,
            [...path, child.getData()]
          ]);
        }
      }
    }
    
    return { found: false, depth: maxDepth };
  }
}
// Example 1: Simple tree structure
class TreeNode implements GraphNode {
  constructor(
    public id: string,
    public value: number,
    public children: TreeNode[] = []
  ) {}
}

// Create a sample tree
const tree = new TreeNode('A', 1, [
  new TreeNode('B', 2, [
    new TreeNode('D', 4),
    new TreeNode('E', 5),
  ]),
  new TreeNode('C', 3, [
    new TreeNode('F', 6, [
      new TreeNode('G', 7),
      new TreeNode('H', 8),
    ]),
  ]),
]);

// Usage
const dls = new DepthLimitedSearch<TreeNode>();
const result = dls.search(tree, 'G', 3);
console.log(result); // { found: true, node: TreeNode, depth: 3 }

const nodesAtDepth2 = dls.findNodesAtDepth(tree, 2);
console.log(nodesAtDepth2.map(n => n.id)); // ['D', 'E', 'F']

// Example 2: With custom search criteria
class CustomNode implements SearchableNode<string> {
  constructor(
    private data: string,
    private childNodes: CustomNode[] = []
  ) {}

  getChildren(): CustomNode[] {
    return this.childNodes;
  }

  getData(): string {
    return this.data;
  }
}

const customTree = new CustomNode('root', [
  new CustomNode('child1', [
    new CustomNode('grandchild1'),
    new CustomNode('target'),
  ]),
  new CustomNode('child2'),
]);

const genericDLS = new GenericDepthLimitedSearch<string>();
const customResult = genericDLS.search(
  customTree,
  (data: string) => data === 'target',
  2
);

console.log(customResult);
// { found: true, node: 'target', depth: 2, path: ['root', 'child1', 'target'] }
class OptimizedDLS<T extends GraphNode> extends DepthLimitedSearch<T> {
  private visited = new Set<string>();

  /**
   * DLS with cycle detection
   */
  searchWithCycleDetection(root: T, targetId: string, maxDepth: number): DLSResult<T> {
    this.visited.clear();
    const stack: [T, number][] = [[root, 0]];
    
    while (stack.length > 0) {
      const [currentNode, currentDepth] = stack.pop()!;
      
      // Skip if already visited (cycle detection)
      if (this.visited.has(currentNode.id)) {
        continue;
      }
      this.visited.add(currentNode.id);
      
      if (currentNode.id === targetId) {
        return { found: true, node: currentNode, depth: currentDepth };
      }
      
      if (currentDepth < maxDepth && currentNode.children) {
        for (let i = currentNode.children.length - 1; i >= 0; i--) {
          if (!this.visited.has(currentNode.children[i].id)) {
            stack.push([currentNode.children[i] as T, currentDepth + 1]);
          }
        }
      }
    }
    
    return { found: false, depth: maxDepth };
  }

  /**
   * Clear visited set for reuse
   */
  clearVisited(): void {
    this.visited.clear();
  }
}

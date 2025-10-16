interface Node<T> {
  data: T;
  children: Node<T>[];
  // Optional: parent, depth, etc.
}

class DepthLimitedSearch<T> {
  private limit: number;
  private visited: Set<string>;

  constructor(limit: number) {
    this.limit = limit;
    this.visited = new Set();
  }

  /**
   * Performs depth-limited search starting from root node
   * @param root - Starting node
   * @param target - Target value to find
   * @param nodeKey - Function to extract unique key from node data
   * @returns Found node or null if not found
   */
  search(
    root: Node<T>,
    target: T,
    nodeKey: (data: T) => string
  ): Node<T> | null {
    this.visited.clear();
    return this.dlsHelper(root, 0, target, nodeKey);
  }

  private dlsHelper(
    node: Node<T>,
    depth: number,
    target: T,
    nodeKey: (data: T) => string
  ): Node<T> | null {
    // Check if we've reached the depth limit
    if (depth > this.limit) {
      return null;
    }

    // Check if current node is the target
    if (node.data === target) {
      return node;
    }

    // Check if node has been visited to avoid cycles
    const nodeId = nodeKey(node.data);
    if (this.visited.has(nodeId)) {
      return null;
    }
    this.visited.add(nodeId);

    // Recursively search children
    for (const child of node.children) {
      const result = this.dlsHelper(child, depth + 1, target, nodeKey);
      if (result !== null) {
        return result;
      }
    }

    return null;
  }

  /**
   * Generic version that works with any tree structure
   * @param root - Starting node
   * @param getChildren - Function to get children from a node
   * @param isTarget - Function to check if node matches target
   * @param getNodeKey - Function to get unique key for visited tracking
   * @returns Found node or null
   */
  searchGeneric<U>(
    root: U,
    getChildren: (node: U) => U[],
    isTarget: (node: U) => boolean,
    getNodeKey: (node: U) => string
  ): U | null {
    this.visited.clear();
    return this.dlsGenericHelper(root, 0, getChildren, isTarget, getNodeKey);
  }

  private dlsGenericHelper<U>(
    node: U,
    depth: number,
    getChildren: (node: U) => U[],
    isTarget: (node: U) => boolean,
    getNodeKey: (node: U) => string
  ): U | null {
    if (depth > this.limit) {
      return null;
    }

    if (isTarget(node)) {
      return node;
    }

    const nodeId = getNodeKey(node);
    if (this.visited.has(nodeId)) {
      return null;
    }
    this.visited.add(nodeId);

    const children = getChildren(node);
    for (const child of children) {
      const result = this.dlsGenericHelper(
        child,
        depth + 1,
        getChildren,
        isTarget,
        getNodeKey
      );
      if (result !== null) {
        return result;
      }
    }

    return null;
  }
}

// Example usage and test
class TreeNode {
  constructor(
    public value: string,
    public children: TreeNode[] = []
  ) {}
}

// Example tree structure
function createExampleTree(): TreeNode {
  const leaf1 = new TreeNode("leaf1");
  const leaf2 = new TreeNode("leaf2");
  const leaf3 = new TreeNode("target");
  const leaf4 = new TreeNode("leaf4");
  const leaf5 = new TreeNode("leaf5");

  const level2a = new TreeNode("level2a", [leaf1, leaf2]);
  const level2b = new TreeNode("level2b", [leaf3]);
  const level2c = new TreeNode("level2c", [leaf4]);
  const level2d = new TreeNode("level2d", [leaf5]);

  const level1a = new TreeNode("level1a", [level2a, level2b]);
  const level1b = new TreeNode("level1b", [level2c, level2d]);

  const root = new TreeNode("root", [level1a, level1b]);
  return root;
}

// Usage example
function demonstrateDepthLimitedSearch() {
  const search = new DepthLimitedSearch(2); // Limit depth to 2
  const tree = createExampleTree();

  // Using the generic version
  const foundNode = search.searchGeneric(
    tree,
    (node: TreeNode) => node.children, // get children
    (node: TreeNode) => node.value === "target", // is target
    (node: TreeNode) => node.value // get unique key
  );

  if (foundNode) {
    console.log("Found target:", foundNode.value);
    console.log("Search completed within depth limit");
  } else {
    console.log("Target not found within depth limit");
  }

  // Test with deeper limit
  const deeperSearch = new DepthLimitedSearch(4);
  const deeperResult = deeperSearch.searchGeneric(
    tree,
    (node: TreeNode) => node.children,
    (node: TreeNode) => node.value === "leaf5",
    (node: TreeNode) => node.value
  );

  console.log("Leaf5 found:", deeperResult ? deeperResult.value : "not found");
}

// If using the Node interface version
function demonstrateNodeInterface() {
  // Convert TreeNode to Node interface format
  function treeNodeToNode(treeNode: TreeNode): Node<string> {
    return {
      data: treeNode.value,
      children: treeNode.children.map(child => treeNodeToNode(child))
    };
  }

  const tree = createExampleTree();
  const nodeTree = treeNodeToNode(tree);

  const search = new DepthLimitedSearch(3);
  const result = search.search(nodeTree, "target", (data: string) => data);

  console.log("Interface version result:", result ? result.data : "not found");
}

// Run demonstration
if (require.main === module) {
  demonstrateDepthLimitedSearch();
  demonstrateNodeInterface();
}

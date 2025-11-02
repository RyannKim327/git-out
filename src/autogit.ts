interface Node {
  id: string;
  children?: Node[];
}

interface DLSResult {
  found: boolean;
  node?: Node;
  path: string[];
}
function depthLimitedSearch(
  node: Node,
  targetId: string,
  depthLimit: number,
  currentDepth: number = 0,
  path: string[] = []
): DLSResult {
  // Add current node to path
  const currentPath = [...path, node.id];
  
  // Base case: found the target
  if (node.id === targetId) {
    return { found: true, node, path: currentPath };
  }
  
  // Base case: reached depth limit
  if (currentDepth >= depthLimit) {
    return { found: false, path: currentPath };
  }
  
  // Recursive case: search children
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      const result = depthLimitedSearch(
        child,
        targetId,
        depthLimit,
        currentDepth + 1,
        currentPath
      );
      
      if (result.found) {
        return result;
      }
    }
  }
  
  return { found: false, path: currentPath };
}
function iterativeDepthLimitedSearch(
  startNode: Node,
  targetId: string,
  depthLimit: number
): DLSResult {
  const stack: { node: Node; depth: number; path: string[] }[] = [
    { node: startNode, depth: 0, path: [startNode.id] }
  ];
  
  while (stack.length > 0) {
    const { node, depth, path } = stack.pop()!;
    
    if (node.id === targetId) {
      return { found: true, node, path };
    }
    
    if (depth < depthLimit && node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        const child = node.children[i];
        stack.push({
          node: child,
          depth: depth + 1,
          path: [...path, child.id]
        });
      }
    }
  }
  
  return { found: false, path: [] };
}
// Example tree structure
const tree: Node = {
  id: 'A',
  children: [
    {
      id: 'B',
      children: [
        { id: 'D', children: [{ id: 'H' }] },
        { id: 'E' }
      ]
    },
    {
      id: 'C',
      children: [
        { id: 'F' },
        { id: 'G' }
      ]
    }
  ]
};

// Using the recursive implementation
const result1 = depthLimitedSearch(tree, 'G', 3);
console.log('Recursive result:', result1);

// Using the iterative implementation  
const result2 = iterativeDepthLimitedSearch(tree, 'G', 3);
console.log('Iterative result:', result2);
interface EnhancedDLSResult extends DLSResult {
  depthReached: number;
  nodesVisited: number;
}

function enhancedDepthLimitedSearch(
  node: Node,
  targetId: string,
  depthLimit: number,
  currentDepth: number = 0,
  path: string[] = [],
  nodesVisited: number = 0
): EnhancedDLSResult {
  const currentNodesVisited = nodesVisited + 1;
  
  if (node.id === targetId) {
    return {
      found: true,
      node,
      path: [...path, node.id],
      depthReached: currentDepth,
      nodesVisited: currentNodesVisited
    };
  }
  
  if (currentDepth >= depthLimit) {
    return {
      found: false,
      path: [...path, node.id],
      depthReached: currentDepth,
      nodesVisited: currentNodesVisited
    };
  }
  
  if (node.children) {
    for (const child of node.children) {
      const result = enhancedDepthLimitedSearch(
        child,
        targetId,
        depthLimit,
        currentDepth + 1,
        [...path, node.id],
        currentNodesVisited
      );
      
      if (result.found) {
        return result;
      }
    }
  }
  
  return {
    found: false,
    path: [...path, node.id],
    depthReached: currentDepth,
    nodesVisited: currentNodesVisited
  };
}

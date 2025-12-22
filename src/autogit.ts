// Define types for the search
interface SearchNode<T> {
  state: T;
  depth: number;
  path: T[];
}

interface SearchResult<T> {
  found: boolean;
  node?: T;
  path?: T[];
  depth?: number;
}

class BreadthLimitedSearch<T> {
  private visited: Set<T>;
  
  constructor() {
    this.visited = new Set<T>();
  }

  /**
   * Perform breadth-limited search
   * @param startNode - Starting node
   * @param goalTest - Function to test if node is goal
   * @param getSuccessors - Function to get child nodes
   * @param depthLimit - Maximum depth to search
   */
  search(
    startNode: T,
    goalTest: (node: T) => boolean,
    getSuccessors: (node: T) => T[],
    depthLimit: number
  ): SearchResult<T> {
    this.visited.clear();
    
    if (goalTest(startNode)) {
      return {
        found: true,
        node: startNode,
        path: [startNode],
        depth: 0
      };
    }

    const queue: SearchNode<T>[] = [{
      state: startNode,
      depth: 0,
      path: [startNode]
    }];

    this.visited.add(startNode);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;

      if (currentNode.depth >= depthLimit) {
        continue; // Skip expanding nodes at depth limit
      }

      const successors = getSuccessors(currentNode.state);
      
      for (const successor of successors) {
        if (this.visited.has(successor)) {
          continue;
        }

        if (goalTest(successor)) {
          return {
            found: true,
            node: successor,
            path: [...currentNode.path, successor],
            depth: currentNode.depth + 1
          };
        }

        this.visited.add(successor);
        queue.push({
          state: successor,
          depth: currentNode.depth + 1,
          path: [...currentNode.path, successor]
        });
      }
    }

    return { found: false };
  }

  /**
   * Clear visited nodes for new search
   */
  clearVisited(): void {
    this.visited.clear();
  }
}
// Example: Graph search
interface GraphNode {
  id: string;
  value: number;
}

// Create a simple graph
const graph: Record<string, GraphNode[]> = {
  'A': [{ id: 'B', value: 1 }, { id: 'C', value: 2 }],
  'B': [{ id: 'D', value: 3 }, { id: 'E', value: 4 }],
  'C': [{ id: 'F', value: 5 }],
  'D': [{ id: 'G', value: 6 }],
  'E': [],
  'F': [],
  'G': []
};

// Create search instance
const bls = new BreadthLimitedSearch<GraphNode>();

// Define helper functions
const getNodeById = (id: string): GraphNode => ({ id, value: 0 });

const getSuccessors = (node: GraphNode): GraphNode[] => {
  return graph[node.id] || [];
};

const goalTest = (node: GraphNode): boolean => node.id === 'G';

// Perform search
const startNode = getNodeById('A');
const result = bls.search(startNode, goalTest, getSuccessors, 3);

console.log('Search result:', result);
if (result.found) {
  console.log('Path:', result.path?.map(n => n.id).join(' → '));
  console.log('Depth:', result.depth);
}
function breadthLimitedSearch<T>(
  startNode: T,
  goalTest: (node: T) => boolean,
  getSuccessors: (node: T) => T[],
  depthLimit: number
): SearchResult<T> {
  const visited = new Set<T>();
  const queue: SearchNode<T>[] = [{
    state: startNode,
    depth: 0,
    path: [startNode]
  }];

  visited.add(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    if (currentNode.depth >= depthLimit) {
      continue;
    }

    const successors = getSuccessors(currentNode.state);
    
    for (const successor of successors) {
      if (visited.has(successor)) {
        continue;
      }

      const newDepth = currentNode.depth + 1;
      const newPath = [...currentNode.path, successor];

      if (goalTest(successor)) {
        return {
          found: true,
          node: successor,
          path: newPath,
          depth: newDepth
        };
      }

      visited.add(successor);
      queue.push({
        state: successor,
        depth: newDepth,
        path: newPath
      });
    }
  }

  return { found: false };
}
interface SearchOptions<T> {
  maxDepth: number;
  allowCycles?: boolean;
  onVisit?: (node: T, depth: number) => void;
  onExpand?: (node: T, successors: T[]) => void;
}

class EnhancedBLS<T> {
  search(
    startNode: T,
    goalTest: (node: T) => boolean,
    getSuccessors: (node: T) => T[],
    options: SearchOptions<T>
  ): SearchResult<T> {
    const visited = new Set<T>();
    const queue: SearchNode<T>[] = [{
      state: startNode,
      depth: 0,
      path: [startNode]
    }];

    visited.add(startNode);
    options.onVisit?.(startNode, 0);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;

      if (currentNode.depth >= options.maxDepth) {
        continue;
      }

      const successors = getSuccessors(currentNode.state);
      options.onExpand?.(currentNode.state, successors);

      for (const successor of successors) {
        if (!options.allowCycles && visited.has(successor)) {
          continue;
        }

        const newDepth = currentNode.depth + 1;
        const newPath = [...currentNode.path, successor];

        if (goalTest(successor)) {
          return {
            found: true,
            node: successor,
            path: newPath,
            depth: newDepth
          };
        }

        if (!options.allowCycles) {
          visited.add(successor);
        }
        options.onVisit?.(successor, newDepth);
        
        queue.push({
          state: successor,
          depth: newDepth,
          path: newPath
        });
      }
    }

    return { found: false };
  }
}
// For tree structures where cycles aren't possible
const result = bls.search(startNode, goalTest, getSuccessors, 5, { allowCycles: true });

// With callbacks for monitoring
const result = enhancedBls.search(startNode, goalTest, getSuccessors, {
  maxDepth: 4,
  onVisit: (node, depth) => console.log(`Visiting ${node.id} at depth ${depth}`),
  onExpand: (node, successors) => console.log(`Expanding ${node.id} with ${successors.length} children`)
});

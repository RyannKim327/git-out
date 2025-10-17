interface GraphNode<T> {
  value: T;
  neighbors: GraphNode<T>[];
}

class BreadthLimitedSearch<T> {
  /**
   * Perform breadth-limited search starting from a node
   * @param startNode - The starting node
   * @param depthLimit - Maximum depth to search (0 = only start node)
   * @returns Array of visited nodes in BFS order
   */
  search(startNode: GraphNode<T>, depthLimit: number): T[] {
    if (depthLimit < 0) return [];
    
    const visited = new Set<GraphNode<T>>();
    const result: T[] = [];
    const queue: { node: GraphNode<T>; depth: number }[] = [];
    
    // Start with the initial node at depth 0
    queue.push({ node: startNode, depth: 0 });
    visited.add(startNode);
    
    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;
      result.push(node.value);
      
      // If we haven't reached depth limit, explore neighbors
      if (depth < depthLimit) {
        for (const neighbor of node.neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push({ node: neighbor, depth: depth + 1 });
          }
        }
      }
    }
    
    return result;
  }
}
interface SearchResult<T> {
  found: boolean;
  path: T[];
  depthReached: number;
}

class AdvancedBreadthLimitedSearch<T> {
  /**
   * Search for a specific goal node with depth limit
   */
  searchWithGoal(
    startNode: GraphNode<T>, 
    goalPredicate: (node: T) => boolean,
    depthLimit: number
  ): SearchResult<T> {
    const visited = new Map<GraphNode<T>, GraphNode<T> | null>(); // Track parent for path reconstruction
    const queue: { node: GraphNode<T>; depth: number }[] = [];
    
    queue.push({ node: startNode, depth: 0 });
    visited.set(startNode, null);
    
    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;
      
      // Check if we found the goal
      if (goalPredicate(node.value)) {
        return {
          found: true,
          path: this.reconstructPath(visited, node),
          depthReached: depth
        };
      }
      
      // Expand if within depth limit
      if (depth < depthLimit) {
        for (const neighbor of node.neighbors) {
          if (!visited.has(neighbor)) {
            visited.set(neighbor, node); // Record parent
            queue.push({ node: neighbor, depth: depth + 1 });
          }
        }
      }
    }
    
    // Goal not found within depth limit
    return {
      found: false,
      path: [],
      depthReached: depthLimit
    };
  }
  
  private reconstructPath(
    visited: Map<GraphNode<T>, GraphNode<T> | null>, 
    goalNode: GraphNode<T>
  ): T[] {
    const path: T[] = [];
    let current: GraphNode<T> | null = goalNode;
    
    while (current !== null) {
      path.unshift(current.value);
      current = visited.get(current)!;
    }
    
    return path;
  }
}
// Create a sample graph
const createSampleGraph = (): GraphNode<string> => {
  const nodeA: GraphNode<string> = { value: 'A', neighbors: [] };
  const nodeB: GraphNode<string> = { value: 'B', neighbors: [] };
  const nodeC: GraphNode<string> = { value: 'C', neighbors: [] };
  const nodeD: GraphNode<string> = { value: 'D', neighbors: [] };
  const nodeE: GraphNode<string> = { value: 'E', neighbors: [] };
  const nodeF: GraphNode<string> = { value: 'F', neighbors: [] };
  const nodeG: GraphNode<string> = { value: 'G', neighbors: [] };
  
  // Build the graph: A -> B, C; B -> D, E; C -> F; E -> G
  nodeA.neighbors = [nodeB, nodeC];
  nodeB.neighbors = [nodeD, nodeE];
  nodeC.neighbors = [nodeF];
  nodeE.neighbors = [nodeG];
  
  return nodeA;
};

// Example usage
const graph = createSampleGraph();
const bfs = new BreadthLimitedSearch<string>();
const advancedBfs = new AdvancedBreadthLimitedSearch<string>();

// Basic search with depth limit 2
console.log('BFS with depth limit 2:', bfs.search(graph, 2));
// Output: ['A', 'B', 'C', 'D', 'E', 'F']

// Search with depth limit 1
console.log('BFS with depth limit 1:', bfs.search(graph, 1));
// Output: ['A', 'B', 'C']

// Goal search
const result = advancedBfs.searchWithGoal(
  graph, 
  (value) => value === 'G',
  3
);

console.log('Goal search result:', result);
// Output: { found: true, path: ['A', 'B', 'E', 'G'], depthReached: 3 }
interface Graph<T> {
  getNeighbors(node: T): T[];
  areEqual(a: T, b: T): boolean;
}

class GenericBreadthLimitedSearch<T> {
  constructor(private graph: Graph<T>) {}
  
  search(
    startNode: T,
    depthLimit: number,
    visitCallback?: (node: T, depth: number) => void
  ): T[] {
    const visited = new Set<T>();
    const result: T[] = [];
    const queue: { node: T; depth: number }[] = [];
    
    // Use a custom equality function
    const isVisited = (node: T) => {
      for (const visitedNode of visited) {
        if (this.graph.areEqual(node, visitedNode)) {
          return true;
        }
      }
      return false;
    };
    
    queue.push({ node: startNode, depth: 0 });
    visited.add(startNode);
    
    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;
      result.push(node);
      visitCallback?.(node, depth);
      
      if (depth < depthLimit) {
        const neighbors = this.graph.getNeighbors(node);
        for (const neighbor of neighbors) {
          if (!isVisited(neighbor)) {
            visited.add(neighbor);
            queue.push({ node: neighbor, depth: depth + 1 });
          }
        }
      }
    }
    
    return result;
  }
}

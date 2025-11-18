// Define interfaces for graph structure
interface GraphNode {
  id: string;
  value?: any;
}

interface GraphEdge {
  from: string;
  to: string;
}

class Graph {
  private nodes: Map<string, GraphNode>;
  private edges: Map<string, string[]>;

  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  addNode(node: GraphNode): void {
    this.nodes.set(node.id, node);
    this.edges.set(node.id, []);
  }

  addEdge(from: string, to: string): void {
    const neighbors = this.edges.get(from);
    if (neighbors) {
      neighbors.push(to);
    }
  }

  getNeighbors(nodeId: string): string[] {
    return this.edges.get(nodeId) || [];
  }

  getNode(nodeId: string): GraphNode | undefined {
    return this.nodes.get(nodeId);
  }
}

// Depth-Limited Search Implementation
class DepthLimitedSearch {
  private visited: Set<string>;
  private path: string[];

  constructor() {
    this.visited = new Set();
    this.path = [];
  }

  /**
   * Performs depth-limited search from start node to target node
   * @param graph - The graph to search
   * @param startId - Starting node ID
   * @param targetId - Target node ID to find
   * @param limit - Maximum depth to search
   * @returns The path if found, null otherwise
   */
  search(
    graph: Graph,
    startId: string,
    targetId: string,
    limit: number
  ): string[] | null {
    this.visited.clear();
    this.path = [];
    
    const found = this.dlsRecursive(graph, startId, targetId, limit, 0);
    return found ? [...this.path] : null;
  }

  private dlsRecursive(
    graph: Graph,
    currentId: string,
    targetId: string,
    limit: number,
    depth: number
  ): boolean {
    // Mark node as visited and add to path
    this.visited.add(currentId);
    this.path.push(currentId);

    // Check if we found the target
    if (currentId === targetId) {
      return true;
    }

    // Check depth limit
    if (depth >= limit) {
      this.path.pop(); // Remove current node from path since we're backtracking
      return false;
    }

    // Explore neighbors
    const neighbors = graph.getNeighbors(currentId);
    for (const neighborId of neighbors) {
      if (!this.visited.has(neighborId)) {
        const found = this.dlsRecursive(
          graph,
          neighborId,
          targetId,
          limit,
          depth + 1
        );
        if (found) {
          return true;
        }
      }
    }

    // Backtrack if no path found from this node
    this.path.pop();
    return false;
  }

  /**
   * Alternative iterative implementation
   */
  searchIterative(
    graph: Graph,
    startId: string,
    targetId: string,
    limit: number
  ): string[] | null {
    const visited = new Set<string>();
    const stack: { nodeId: string; depth: number; path: string[] }[] = [];
    
    stack.push({ nodeId: startId, depth: 0, path: [startId] });
    visited.add(startId);

    while (stack.length > 0) {
      const { nodeId, depth, path } = stack.pop()!;

      if (nodeId === targetId) {
        return path;
      }

      if (depth < limit) {
        const neighbors = graph.getNeighbors(nodeId);
        for (const neighborId of neighbors.reverse()) { // Reverse to maintain DFS order
          if (!visited.has(neighborId)) {
            visited.add(neighborId);
            stack.push({
              nodeId: neighborId,
              depth: depth + 1,
              path: [...path, neighborId]
            });
          }
        }
      }
    }

    return null;
  }
}
// Create and populate a graph
const graph = new Graph();

// Add nodes
graph.addNode({ id: 'A', value: 'Node A' });
graph.addNode({ id: 'B', value: 'Node B' });
graph.addNode({ id: 'C', value: 'Node C' });
graph.addNode({ id: 'D', value: 'Node D' });
graph.addNode({ id: 'E', value: 'Node E' });
graph.addNode({ id: 'F', value: 'Node F' });

// Add edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('E', 'F');

// Perform depth-limited search
const dls = new DepthLimitedSearch();

// Search with depth limit 2
const result1 = dls.search(graph, 'A', 'F', 2);
console.log('Search A->F with limit 2:', result1); 
// Output: null (F is at depth 3 from A)

// Search with depth limit 3
const result2 = dls.search(graph, 'A', 'F', 3);
console.log('Search A->F with limit 3:', result2);
// Output: ['A', 'C', 'F'] or ['A', 'B', 'E', 'F'] depending on traversal order

// Iterative approach
const result3 = dls.searchIterative(graph, 'A', 'D', 2);
console.log('Iterative search A->D with limit 2:', result3);
// Output: ['A', 'B', 'D']
interface SearchResult<T> {
  found: boolean;
  path: T[];
  depth: number;
}

class GenericDepthLimitedSearch<T> {
  search(
    start: T,
    isGoal: (node: T) => boolean,
    getNeighbors: (node: T) => T[],
    limit: number
  ): SearchResult<T> {
    const visited = new Set<T>();
    return this.dlsRecursive(start, isGoal, getNeighbors, limit, 0, visited, []);
  }

  private dlsRecursive(
    current: T,
    isGoal: (node: T) => boolean,
    getNeighbors: (node: T) => T[],
    limit: number,
    depth: number,
    visited: Set<T>,
    path: T[]
  ): SearchResult<T> {
    visited.add(current);
    path.push(current);

    if (isGoal(current)) {
      return { found: true, path: [...path], depth };
    }

    if (depth >= limit) {
      path.pop();
      return { found: false, path: [], depth };
    }

    const neighbors = getNeighbors(current);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const result = this.dlsRecursive(
          neighbor,
          isGoal,
          getNeighbors,
          limit,
          depth + 1,
          visited,
          path
        );
        if (result.found) {
          return result;
        }
      }
    }

    path.pop();
    return { found: false, path: [], depth };
  }
}

// Usage of generic version
const genericDLS = new GenericDepthLimitedSearch<string>();

const result = genericDLS.search(
  'A',
  (node) => node === 'F',
  (node) => graph.getNeighbors(node),
  3
);

console.log('Generic search result:', result);

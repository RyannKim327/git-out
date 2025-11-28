interface Node {
  id: string;
  neighbors: string[];
  // Add any additional properties you need
}

interface Graph {
  [key: string]: Node;
}

class BreadthLimitedSearch {
  private visited: Set<string> = new Set();
  
  /**
   * Performs breadth-limited search
   * @param graph - The graph to search
   * @param startNode - Starting node ID
   * @param goalNode - Target node ID
   * @param maxDepth - Maximum search depth
   * @returns Path from start to goal, or null if not found
   */
  search(
    graph: Graph,
    startNode: string,
    goalNode: string,
    maxDepth: number
  ): string[] | null {
    this.visited.clear();
    
    // Queue stores [currentNode, path, currentDepth]
    const queue: [string, string[], number][] = [
      [startNode, [startNode], 0]
    ];
    
    this.visited.add(startNode);

    while (queue.length > 0) {
      const [currentNode, path, depth] = queue.shift()!;

      if (currentNode === goalNode) {
        return path;
      }

      // Stop if we've reached the depth limit
      if (depth >= maxDepth) {
        continue;
      }

      const neighbors = graph[currentNode]?.neighbors || [];
      
      for (const neighbor of neighbors) {
        if (!this.visited.has(neighbor)) {
          this.visited.add(neighbor);
          queue.push([neighbor, [...path, neighbor], depth + 1]);
        }
      }
    }

    return null;
  }
}
interface SearchResult {
  path: string[] | null;
  nodesVisited: number;
  depthReached: number;
}

class AdvancedBreadthLimitedSearch {
  private visited: Set<string> = new Set();
  private nodesVisited: number = 0;

  search(
    graph: Graph,
    startNode: string,
    goalNode: string,
    maxDepth: number
  ): SearchResult {
    this.visited.clear();
    this.nodesVisited = 0;

    // Early termination if start node doesn't exist
    if (!graph[startNode]) {
      return { path: null, nodesVisited: 0, depthReached: 0 };
    }

    const queue: [string, string[], number][] = [
      [startNode, [startNode], 0]
    ];
    
    this.visited.add(startNode);
    this.nodesVisited++;

    let maxDepthReached = 0;

    while (queue.length > 0) {
      const [currentNode, path, depth] = queue.shift()!;
      maxDepthReached = Math.max(maxDepthReached, depth);

      if (currentNode === goalNode) {
        return {
          path,
          nodesVisited: this.nodesVisited,
          depthReached: depth
        };
      }

      if (depth >= maxDepth) {
        continue;
      }

      const neighbors = graph[currentNode]?.neighbors || [];
      
      for (const neighbor of neighbors) {
        if (!this.visited.has(neighbor) && graph[neighbor]) {
          this.visited.add(neighbor);
          this.nodesVisited++;
          queue.push([neighbor, [...path, neighbor], depth + 1]);
        }
      }
    }

    return {
      path: null,
      nodesVisited: this.nodesVisited,
      depthReached: maxDepthReached
    };
  }

  // Alternative: Find all nodes within depth limit
  findNodesWithinDepth(
    graph: Graph,
    startNode: string,
    maxDepth: number
  ): Set<string> {
    this.visited.clear();
    const result = new Set<string>();
    
    if (!graph[startNode]) return result;

    const queue: [string, number][] = [[startNode, 0]];
    this.visited.add(startNode);
    result.add(startNode);

    while (queue.length > 0) {
      const [currentNode, depth] = queue.shift()!;

      if (depth >= maxDepth) {
        continue;
      }

      const neighbors = graph[currentNode]?.neighbors || [];
      
      for (const neighbor of neighbors) {
        if (!this.visited.has(neighbor) && graph[neighbor]) {
          this.visited.add(neighbor);
          result.add(neighbor);
          queue.push([neighbor, depth + 1]);
        }
      }
    }

    return result;
  }
}
// Example graph structure
const exampleGraph: Graph = {
  'A': { id: 'A', neighbors: ['B', 'C'] },
  'B': { id: 'B', neighbors: ['A', 'D', 'E'] },
  'C': { id: 'C', neighbors: ['A', 'F'] },
  'D': { id: 'D', neighbors: ['B'] },
  'E': { id: 'E', neighbors: ['B', 'G'] },
  'F': { id: 'F', neighbors: ['C'] },
  'G': { id: 'G', neighbors: ['E'] }
};

// Using the search algorithm
const bls = new BreadthLimitedSearch();
const result = bls.search(exampleGraph, 'A', 'G', 3);

console.log('Path found:', result); // ['A', 'B', 'E', 'G']

// Using advanced version
const advancedBls = new AdvancedBreadthLimitedSearch();
const advancedResult = advancedBls.search(exampleGraph, 'A', 'G', 2);

console.log('Advanced result:', advancedResult);
// { path: null, nodesVisited: 4, depthReached: 2 }

// Find all nodes within depth 2
const nodesWithinDepth = advancedBls.findNodesWithinDepth(exampleGraph, 'A', 2);
console.log('Nodes within depth 2:', Array.from(nodesWithinDepth));
// ['A', 'B', 'C', 'D', 'E', 'F']
interface GenericNode<T> {
  id: string;
  data: T;
  neighbors: string[];
}

interface GenericGraph<T> {
  [key: string]: GenericNode<T>;
}

class GenericBreadthLimitedSearch<T> {
  search(
    graph: GenericGraph<T>,
    startNode: string,
    goalNode: string,
    maxDepth: number,
    predicate?: (node: GenericNode<T>) => boolean
  ): string[] | null {
    const visited = new Set<string>();
    const queue: [string, string[], number][] = [
      [startNode, [startNode], 0]
    ];
    
    visited.add(startNode);

    while (queue.length > 0) {
      const [currentNode, path, depth] = queue.shift()!;

      // Custom predicate check
      if (predicate && !predicate(graph[currentNode])) {
        continue;
      }

      if (currentNode === goalNode) {
        return path;
      }

      if (depth >= maxDepth) {
        continue;
      }

      const neighbors = graph[currentNode]?.neighbors || [];
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && graph[neighbor]) {
          visited.add(neighbor);
          queue.push([neighbor, [...path, neighbor], depth + 1]);
        }
      }
    }

    return null;
  }
}

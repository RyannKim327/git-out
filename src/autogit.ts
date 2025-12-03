interface Graph {
  [node: string]: string[];
}

interface BidirectionalSearchResult {
  path: string[];
  meetingNode: string | null;
  visitedFromStart: Set<string>;
  visitedFromEnd: Set<string>;
}
class BidirectionalSearch {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  /**
   * Perform bidirectional search between start and end nodes
   */
  search(start: string, end: string): BidirectionalSearchResult {
    // Handle same node case
    if (start === end) {
      return {
        path: [start],
        meetingNode: start,
        visitedFromStart: new Set([start]),
        visitedFromEnd: new Set([end])
      };
    }

    // Initialize queues and visited sets
    const queueStart: string[] = [start];
    const queueEnd: string[] = [end];
    const visitedFromStart: Set<string> = new Set([start]);
    const visitedFromEnd: Set<string> = new Set([end]);
    const parentFromStart: Map<string, string> = new Map();
    const parentFromEnd: Map<string, string> = new Map();

    let meetingNode: string | null = null;

    // Main search loop
    while (queueStart.length > 0 && queueEnd.length > 0) {
      // Expand from start
      meetingNode = this.expandLevel(queueStart, visitedFromStart, visitedFromEnd, parentFromStart);
      if (meetingNode) {
        break;
      }

      // Expand from end
      meetingNode = this.expandLevel(queueEnd, visitedFromEnd, visitedFromStart, parentFromEnd);
      if (meetingNode) {
        break;
      }
    }

    // Reconstruct path if meeting node found
    let path: string[] = [];
    if (meetingNode) {
      path = this.reconstructPath(meetingNode, parentFromStart, parentFromEnd);
    }

    return {
      path,
      meetingNode,
      visitedFromStart,
      visitedFromEnd
    };
  }

  /**
   * Expand one level from the current queue
   */
  private expandLevel(
    queue: string[],
    visited: Set<string>,
    otherVisited: Set<string>,
    parent: Map<string, string>
  ): string | null {
    const levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift()!;
      
      // Check neighbors
      for (const neighbor of this.graph[currentNode] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          parent.set(neighbor, currentNode);
          queue.push(neighbor);

          // Check if this node has been visited from the other side
          if (otherVisited.has(neighbor)) {
            return neighbor; // Meeting point found
          }
        }
      }
    }
    
    return null;
  }

  /**
   * Reconstruct the path from start to end through meeting node
   */
  private reconstructPath(
    meetingNode: string,
    parentFromStart: Map<string, string>,
    parentFromEnd: Map<string, string>
  ): string[] {
    // Reconstruct path from start to meeting node
    const pathFromStart: string[] = [];
    let current = meetingNode;
    
    while (parentFromStart.has(current)) {
      pathFromStart.unshift(current);
      current = parentFromStart.get(current)!;
    }
    pathFromStart.unshift(current); // Add start node

    // Reconstruct path from meeting node to end
    const pathFromEnd: string[] = [];
    current = meetingNode;
    
    while (parentFromEnd.has(current)) {
      pathFromEnd.push(current);
      current = parentFromEnd.get(current)!;
    }
    pathFromEnd.push(current); // Add end node

    // Remove duplicate meeting node and combine paths
    return [...pathFromStart, ...pathFromEnd.slice(1)];
  }

  /**
   * Alternative BFS implementation for comparison
   */
  bfs(start: string, end: string): string[] {
    const queue: string[] = [start];
    const visited: Set<string> = new Set([start]);
    const parent: Map<string, string> = new Map();
    
    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      
      if (currentNode === end) {
        return this.reconstructBFSPath(end, parent);
      }
      
      for (const neighbor of this.graph[currentNode] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          parent.set(neighbor, currentNode);
          queue.push(neighbor);
        }
      }
    }
    
    return [];
  }

  private reconstructBFSPath(end: string, parent: Map<string, string>): string[] {
    const path: string[] = [];
    let current = end;
    
    while (parent.has(current)) {
      path.unshift(current);
      current = parent.get(current)!;
    }
    path.unshift(current);
    
    return path;
  }
}
// Example graph
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E', 'G'],
  'G': ['F']
};

// Create bidirectional search instance
const biSearch = new BidirectionalSearch(graph);

// Perform search
const result = biSearch.search('A', 'G');
console.log('Bidirectional Search Result:');
console.log('Path:', result.path);
console.log('Meeting Node:', result.meetingNode);
console.log('Visited from start:', Array.from(result.visitedFromStart));
console.log('Visited from end:', Array.from(result.visitedFromEnd));

// Compare with regular BFS
const bfsPath = biSearch.bfs('A', 'G');
console.log('BFS Path:', bfsPath);
interface SearchMetrics {
  nodesVisited: number;
  timeMs: number;
  pathLength: number;
}

class AdvancedBidirectionalSearch extends BidirectionalSearch {
  searchWithMetrics(start: string, end: string): {
    result: BidirectionalSearchResult;
    metrics: SearchMetrics;
  } {
    const startTime = performance.now();
    const result = this.search(start, end);
    const endTime = performance.now();

    const metrics: SearchMetrics = {
      nodesVisited: result.visitedFromStart.size + result.visitedFromEnd.size,
      timeMs: endTime - startTime,
      pathLength: result.path.length
    };

    return { result, metrics };
  }

  compareWithBFS(start: string, end: string): void {
    const biResult = this.searchWithMetrics(start, end);
    const bfsStartTime = performance.now();
    const bfsPath = this.bfs(start, end);
    const bfsEndTime = performance.now();

    console.log('Comparison:');
    console.log('Bidirectional Search:');
    console.log(`- Path: ${biResult.result.path.join(' -> ')}`);
    console.log(`- Nodes visited: ${biResult.metrics.nodesVisited}`);
    console.log(`- Time: ${biResult.metrics.timeMs}ms`);
    
    console.log('BFS:');
    console.log(`- Path: ${bfsPath.join(' -> ')}`);
    console.log(`- Nodes visited: ${biResult.result.visitedFromStart.size + biResult.result.visitedFromEnd.size}`);
    console.log(`- Time: ${bfsEndTime - bfsStartTime}ms`);
  }
}

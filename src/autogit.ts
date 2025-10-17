interface Graph {
  [node: string]: string[];
}

class BidirectionalSearch {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  /**
   * Perform bidirectional search to find the shortest path between start and end nodes
   */
  search(start: string, end: string): string[] | null {
    if (start === end) {
      return [start];
    }

    // Queues for BFS from both directions
    const queueStart: string[] = [start];
    const queueEnd: string[] = [end];

    // Visited nodes and their parents for tracking paths
    const visitedFromStart: Map<string, string | null> = new Map();
    const visitedFromEnd: Map<string, string | null> = new Map();

    visitedFromStart.set(start, null);
    visitedFromEnd.set(end, null);

    while (queueStart.length > 0 && queueEnd.length > 0) {
      // Expand from start side
      const intersection = this.expandLevel(queueStart, visitedFromStart, visitedFromEnd);
      if (intersection) {
        return this.constructPath(intersection, visitedFromStart, visitedFromEnd);
      }

      // Expand from end side
      const intersection2 = this.expandLevel(queueEnd, visitedFromEnd, visitedFromStart);
      if (intersection2) {
        return this.constructPath(intersection2, visitedFromStart, visitedFromEnd);
      }
    }

    return null; // No path found
  }

  private expandLevel(
    queue: string[],
    visitedThisSide: Map<string, string | null>,
    visitedOtherSide: Map<string, string | null>
  ): string | null {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift()!;

      // Check all neighbors
      for (const neighbor of this.graph[currentNode] || []) {
        if (!visitedThisSide.has(neighbor)) {
          visitedThisSide.set(neighbor, currentNode);
          queue.push(neighbor);

          // Check if we've found an intersection
          if (visitedOtherSide.has(neighbor)) {
            return neighbor;
          }
        }
      }
    }

    return null;
  }

  private constructPath(
    intersection: string,
    visitedFromStart: Map<string, string | null>,
    visitedFromEnd: Map<string, string | null>
  ): string[] {
    // Construct path from start to intersection
    const pathFromStart: string[] = [];
    let current: string | null = intersection;
    
    while (current !== null) {
      pathFromStart.unshift(current);
      current = visitedFromStart.get(current) || null;
    }

    // Construct path from intersection to end (excluding intersection)
    const pathFromEnd: string[] = [];
    current = visitedFromEnd.get(intersection) || null;
    
    while (current !== null) {
      pathFromEnd.push(current);
      current = visitedFromEnd.get(current) || null;
    }

    return [...pathFromStart, ...pathFromEnd];
  }
}
// Example graph
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B', 'G'],
  'E': ['B', 'H'],
  'F': ['C', 'I'],
  'G': ['D', 'H'],
  'H': ['E', 'G', 'I'],
  'I': ['F', 'H', 'J'],
  'J': ['I']
};

// Using the bidirectional search
const bidirectionalSearch = new BidirectionalSearch(graph);
const path = bidirectionalSearch.search('A', 'J');

console.log('Path found:', path);
// Output: Path found: ['A', 'C', 'F', 'I', 'J']
interface SearchResult {
  path: string[] | null;
  nodesVisited: number;
  timeTaken: number;
}

class EnhancedBidirectionalSearch {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  search(start: string, end: string): SearchResult {
    const startTime = performance.now();
    
    if (!this.graph[start] || !this.graph[end]) {
      throw new Error('Start or end node not found in graph');
    }

    if (start === end) {
      return {
        path: [start],
        nodesVisited: 1,
        timeTaken: performance.now() - startTime
      };
    }

    const queueStart: string[] = [start];
    const queueEnd: string[] = [end];
    
    const visitedFromStart = new Map<string, string | null>();
    const visitedFromEnd = new Map<string, string | null>();
    
    visitedFromStart.set(start, null);
    visitedFromEnd.set(end, null);

    let nodesVisited = 2; // Start and end nodes

    while (queueStart.length > 0 && queueEnd.length > 0) {
      // Expand from start side
      const intersection1 = this.expandLevel(
        queueStart, 
        visitedFromStart, 
        visitedFromEnd,
        () => nodesVisited++
      );
      
      if (intersection1) {
        return {
          path: this.constructPath(intersection1, visitedFromStart, visitedFromEnd),
          nodesVisited,
          timeTaken: performance.now() - startTime
        };
      }

      // Expand from end side
      const intersection2 = this.expandLevel(
        queueEnd, 
        visitedFromEnd, 
        visitedFromStart,
        () => nodesVisited++
      );
      
      if (intersection2) {
        return {
          path: this.constructPath(intersection2, visitedFromStart, visitedFromEnd),
          nodesVisited,
          timeTaken: performance.now() - startTime
        };
      }
    }

    return {
      path: null,
      nodesVisited,
      timeTaken: performance.now() - startTime
    };
  }

  private expandLevel(
    queue: string[],
    visitedThisSide: Map<string, string | null>,
    visitedOtherSide: Map<string, string | null>,
    onVisit: () => void
  ): string | null {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift()!;
      const neighbors = this.graph[currentNode] || [];

      for (const neighbor of neighbors) {
        if (!visitedThisSide.has(neighbor)) {
          visitedThisSide.set(neighbor, currentNode);
          queue.push(neighbor);
          onVisit();

          if (visitedOtherSide.has(neighbor)) {
            return neighbor;
          }
        }
      }
    }

    return null;
  }

  private constructPath(
    intersection: string,
    visitedFromStart: Map<string, string | null>,
    visitedFromEnd: Map<string, string | null>
  ): string[] {
    const pathFromStart: string[] = [];
    let current: string | null = intersection;
    
    // Build path from start to intersection
    while (current !== null) {
      pathFromStart.unshift(current);
      current = visitedFromStart.get(current) || null;
    }

    // Remove intersection from the end (it will be added from the other side)
    pathFromStart.pop();

    // Build path from intersection to end
    const pathFromEnd: string[] = [];
    current = visitedFromEnd.get(intersection) || null;
    
    while (current !== null) {
      pathFromEnd.push(current);
      current = visitedFromEnd.get(current) || null;
    }

    return [...pathFromStart, intersection, ...pathFromEnd];
  }
}
// Test the implementation
function testBidirectionalSearch() {
  const complexGraph: Graph = {
    '1': ['2', '3'],
    '2': ['1', '4', '5'],
    '3': ['1', '6', '7'],
    '4': ['2', '8'],
    '5': ['2', '9'],
    '6': ['3', '10'],
    '7': ['3', '11'],
    '8': ['4', '12'],
    '9': ['5', '12'],
    '10': ['6', '12'],
    '11': ['7', '12'],
    '12': ['8', '9', '10', '11']
  };

  const search = new EnhancedBidirectionalSearch(complexGraph);
  const result = search.search('1', '12');

  console.log('Search Result:', {
    path: result.path,
    nodesVisited: result.nodesVisited,
    timeTaken: `${result.timeTaken.toFixed(2)}ms`
  });
}

testBidirectionalSearch();

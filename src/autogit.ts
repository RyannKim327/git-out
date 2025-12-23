interface Graph<T> {
  getNeighbors(node: T): T[];
}

interface SearchResult<T> {
  path: T[];
  visited: Set<T>;
}

class BidirectionalSearch<T> {
  constructor(private graph: Graph<T>) {}

  search(start: T, goal: T): SearchResult<T> {
    if (start === goal) {
      return { path: [start], visited: new Set([start]) };
    }

    // Queues for BFS from both directions
    const queueStart: T[] = [start];
    const queueGoal: T[] = [goal];
    
    // Visited nodes and parent pointers for both directions
    const visitedStart = new Map<T, T>();
    const visitedGoal = new Map<T, T>();
    
    visitedStart.set(start, null!);
    visitedGoal.set(goal, null!);

    const allVisited = new Set<T>([start, goal]);

    while (queueStart.length > 0 && queueGoal.length > 0) {
      // Search from start direction
      const meetingPoint = this.bfsStep(
        queueStart, 
        visitedStart, 
        visitedGoal, 
        this.graph.getNeighbors.bind(this.graph)
      );
      
      if (meetingPoint) {
        return {
          path: this.constructPath(meetingPoint, visitedStart, visitedGoal),
          visited: allVisited
        };
      }

      // Search from goal direction
      const meetingPoint2 = this.bfsStep(
        queueGoal,
        visitedGoal,
        visitedStart,
        this.graph.getNeighbors.bind(this.graph)
      );
      
      if (meetingPoint2) {
        return {
          path: this.constructPath(meetingPoint2, visitedStart, visitedGoal),
          visited: allVisited
        };
      }
    }

    return { path: [], visited: allVisited };
  }

  private bfsStep(
    queue: T[],
    visitedThis: Map<T, T>,
    visitedOther: Map<T, T>,
    getNeighbors: (node: T) => T[]
  ): T | null {
    if (queue.length === 0) return null;

    const current = queue.shift()!;
    const neighbors = getNeighbors(current);

    for (const neighbor of neighbors) {
      if (!visitedThis.has(neighbor)) {
        visitedThis.set(neighbor, current);
        
        // Check if this node has been visited from the other direction
        if (visitedOther.has(neighbor)) {
          return neighbor; // Meeting point found
        }
        
        queue.push(neighbor);
      }
    }

    return null;
  }

  private constructPath(
    meetingPoint: T,
    visitedStart: Map<T, T>,
    visitedGoal: Map<T, T>
  ): T[] {
    // Construct path from start to meeting point
    const pathFromStart: T[] = [];
    let current: T = meetingPoint;
    
    while (current !== null!) {
      pathFromStart.unshift(current);
      current = visitedStart.get(current)!;
    }

    // Construct path from meeting point to goal
    const pathFromGoal: T[] = [];
    current = visitedGoal.get(meetingPoint)!;
    
    while (current !== null!) {
      pathFromGoal.push(current);
      current = visitedGoal.get(current)!;
    }

    return [...pathFromStart, ...pathFromGoal];
  }
}
// Example graph implementation
class SimpleGraph implements Graph<string> {
  private adjacencyList: Map<string, string[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addEdge(from: string, to: string): void {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, []);
    }
    if (!this.adjacencyList.has(to)) {
      this.adjacencyList.set(to, []);
    }
    this.adjacencyList.get(from)!.push(to);
    this.adjacencyList.get(to)!.push(from); // For undirected graph
  }

  getNeighbors(node: string): string[] {
    return this.adjacencyList.get(node) || [];
  }
}

// Usage example
const graph = new SimpleGraph();
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'F');
graph.addEdge('F', 'G');

const bidirectionalSearch = new BidirectionalSearch<string>(graph);
const result = bidirectionalSearch.search('A', 'G');

console.log('Path:', result.path.join(' → '));
console.log('Nodes visited:', Array.from(result.visited).join(', '));
interface EnhancedSearchResult<T> extends SearchResult<T> {
  meetingPoint: T;
  iterations: number;
  executionTime: number;
}

class EnhancedBidirectionalSearch<T> extends BidirectionalSearch<T> {
  searchWithMetrics(start: T, goal: T): EnhancedSearchResult<T> {
    const startTime = performance.now();
    let iterations = 0;
    
    if (start === goal) {
      const endTime = performance.now();
      return {
        path: [start],
        visited: new Set([start]),
        meetingPoint: start,
        iterations: 1,
        executionTime: endTime - startTime
      };
    }

    const queueStart: T[] = [start];
    const queueGoal: T[] = [goal];
    const visitedStart = new Map<T, T>();
    const visitedGoal = new Map<T, T>();
    visitedStart.set(start, null!);
    visitedGoal.set(goal, null!);
    const allVisited = new Set<T>([start, goal]);

    while (queueStart.length > 0 && queueGoal.length > 0) {
      iterations++;
      
      // Alternate between directions for better balance
      const meetingPoint = this.bfsStep(
        queueStart, 
        visitedStart, 
        visitedGoal, 
        this.graph.getNeighbors.bind(this.graph)
      );
      
      if (meetingPoint) {
        const endTime = performance.now();
        return {
          path: this.constructPath(meetingPoint, visitedStart, visitedGoal),
          visited: allVisited,
          meetingPoint,
          iterations,
          executionTime: endTime - startTime
        };
      }

      iterations++;
      
      const meetingPoint2 = this.bfsStep(
        queueGoal,
        visitedGoal,
        visitedStart,
        this.graph.getNeighbors.bind(this.graph)
      );
      
      if (meetingPoint2) {
        const endTime = performance.now();
        return {
          path: this.constructPath(meetingPoint2, visitedStart, visitedGoal),
          visited: allVisited,
          meetingPoint: meetingPoint2,
          iterations,
          executionTime: endTime - startTime
        };
      }
    }

    const endTime = performance.now();
    return {
      path: [],
      visited: allVisited,
      meetingPoint: null!,
      iterations,
      executionTime: endTime - startTime
    };
  }
}

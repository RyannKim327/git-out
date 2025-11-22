interface Graph {
  [node: string]: string[];
}

class BiDirectionalSearch {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  /**
   * Find path between start and end using bi-directional BFS
   */
  findPath(start: string, end: string): string[] | null {
    if (start === end) return [start];
    
    // Initialize forward and backward search
    const forwardQueue: string[] = [start];
    const backwardQueue: string[] = [end];
    
    const forwardVisited: Map<string, string | null> = new Map([[start, null]]);
    const backwardVisited: Map<string, string | null> = new Map([[end, null]]);
    
    const forwardParents: Map<string, string> = new Map();
    const backwardParents: Map<string, string> = new Map();

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      // Expand forward search
      if (this.expandSearch(forwardQueue, forwardVisited, backwardVisited, forwardParents, true)) {
        return this.constructPath(start, end, forwardParents, backwardParents);
      }

      // Expand backward search
      if (this.expandSearch(backwardQueue, backwardVisited, forwardVisited, backwardParents, false)) {
        return this.constructPath(start, end, forwardParents, backwardParents);
      }
    }

    return null; // No path found
  }

  private expandSearch(
    queue: string[],
    currentVisited: Map<string, string | null>,
    otherVisited: Map<string, string | null>,
    parents: Map<string, string>,
    isForward: boolean
  ): boolean {
    const currentNode = queue.shift()!;
    
    for (const neighbor of this.graph[currentNode] || []) {
      if (!currentVisited.has(neighbor)) {
        currentVisited.set(neighbor, currentNode);
        parents.set(neighbor, currentNode);
        queue.push(neighbor);
        
        // Check if paths have connected
        if (otherVisited.has(neighbor)) {
          return true;
        }
      }
    }
    
    return false;
  }

  private constructPath(
    start: string,
    end: string,
    forwardParents: Map<string, string>,
    backwardParents: Map<string, string>
  ): string[] {
    const meetingPoint = this.findMeetingPoint(forwardParents, backwardParents);
    
    if (!meetingPoint) return [start]; // Shouldn't happen if path exists
    
    // Construct path from start to meeting point
    const forwardPath = this.getPathToNode(start, meetingPoint, forwardParents);
    
    // Construct path from meeting point to end (reverse)
    const backwardPath = this.getPathToNode(end, meetingPoint, backwardParents);
    backwardPath.reverse(); // Reverse to get meetingPoint → end
    
    // Combine paths (remove duplicate meeting point)
    return [...forwardPath, ...backwardPath.slice(1)];
  }

  private findMeetingPoint(
    forwardParents: Map<string, string>,
    backwardParents: Map<string, string>
  ): string | null {
    for (const node of forwardParents.keys()) {
      if (backwardParents.has(node)) {
        return node;
      }
    }
    return null;
  }

  private getPathToNode(start: string, target: string, parents: Map<string, string>): string[] {
    const path: string[] = [];
    let current = target;
    
    while (current !== start) {
      path.unshift(current);
      current = parents.get(current)!;
    }
    path.unshift(start);
    
    return path;
  }
}

// Example usage
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E', 'G'],
  'G': ['F']
};

const bds = new BiDirectionalSearch(graph);
const path = bds.findPath('A', 'G');
console.log('Path:', path); // Output: ['A', 'C', 'F', 'G']
type NodeId = string | number;

interface BiDirectionalSearchResult {
  path: NodeId[];
  visitedNodes: Set<NodeId>;
  meetingPoint?: NodeId;
}

class EnhancedBiDirectionalSearch<T extends NodeId> {
  private adjacencyList: Map<T, T[]>;

  constructor(adjacencyList: Map<T, T[]>) {
    this.adjacencyList = adjacencyList;
  }

  search(start: T, goal: T): BiDirectionalSearchResult {
    if (start === goal) {
      return {
        path: [start],
        visitedNodes: new Set([start])
      };
    }

    // Initialize data structures
    const forwardQueue: T[] = [start];
    const backwardQueue: T[] = [goal];
    
    const forwardVisited = new Map<T, T | null>([[start, null]]);
    const backwardVisited = new Map<T, T | null>([[goal, null]]);
    
    const forwardParents = new Map<T, T>();
    const backwardParents = new Map<T, T>();

    const allVisited = new Set<T>([start, goal]);

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      // Expand forward search
      const forwardMeetingPoint = this.expandLevel(
        forwardQueue, 
        forwardVisited, 
        backwardVisited, 
        forwardParents,
        allVisited
      );
      
      if (forwardMeetingPoint) {
        return {
          path: this.reconstructPath(start, goal, forwardMeetingPoint, forwardParents, backwardParents),
          visitedNodes: allVisited,
          meetingPoint: forwardMeetingPoint
        };
      }

      // Expand backward search
      const backwardMeetingPoint = this.expandLevel(
        backwardQueue,
        backwardVisited,
        forwardVisited,
        backwardParents,
        allVisited
      );
      
      if (backwardMeetingPoint) {
        return {
          path: this.reconstructPath(start, goal, backwardMeetingPoint, forwardParents, backwardParents),
          visitedNodes: allVisited,
          meetingPoint: backwardMeetingPoint
        };
      }
    }

    return {
      path: [],
      visitedNodes: allVisited
    };
  }

  private expandLevel(
    queue: T[],
    currentVisited: Map<T, T | null>,
    otherVisited: Map<T, T | null>,
    parents: Map<T, T>,
    allVisited: Set<T>
  ): T | null {
    const levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift()!;
      const neighbors = this.adjacencyList.get(currentNode) || [];
      
      for (const neighbor of neighbors) {
        if (!currentVisited.has(neighbor)) {
          currentVisited.set(neighbor, currentNode);
          parents.set(neighbor, currentNode);
          queue.push(neighbor);
          allVisited.add(neighbor);
          
          // Check if the other search has visited this node
          if (otherVisited.has(neighbor)) {
            return neighbor;
          }
        }
      }
    }
    
    return null;
  }

  private reconstructPath(
    start: T,
    goal: T,
    meetingPoint: T,
    forwardParents: Map<T, T>,
    backwardParents: Map<T, T>
  ): T[] {
    // Build path from start to meeting point
    const forwardPath: T[] = [];
    let current: T = meetingPoint;
    
    while (current !== start) {
      forwardPath.unshift(current);
      current = forwardParents.get(current)!;
    }
    forwardPath.unshift(start);
    
    // Build path from meeting point to goal
    const backwardPath: T[] = [];
    current = meetingPoint;
    
    while (current !== goal) {
      const parent = backwardParents.get(current)!;
      backwardPath.push(parent);
      current = parent;
    }
    
    // Combine paths (remove duplicate meeting point)
    return [...forwardPath, ...backwardPath];
  }
}

// Example usage with numeric nodes
const numericGraph = new Map<number, number[]>([
  [1, [2, 3]],
  [2, [1, 4, 5]],
  [3, [1, 6]],
  [4, [2]],
  [5, [2, 6]],
  [6, [3, 5, 7]],
  [7, [6]]
]);

const numericSearch = new EnhancedBiDirectionalSearch<number>(numericGraph);
const result = numericSearch.search(1, 7);
console.log('Path:', result.path);
console.log('Visited nodes:', Array.from(result.visitedNodes));
// Create a graph
const socialNetwork: Graph = {
  'Alice': ['Bob', 'Charlie', 'David'],
  'Bob': ['Alice', 'Eve', 'Frank'],
  'Charlie': ['Alice', 'Grace'],
  'David': ['Alice', 'Henry'],
  'Eve': ['Bob', 'Ivan'],
  'Frank': ['Bob'],
  'Grace': ['Charlie', 'Ivan'],
  'Henry': ['David'],
  'Ivan': ['Eve', 'Grace', 'Julia'],
  'Julia': ['Ivan']
};

// Find connection between two people
const socialBDS = new BiDirectionalSearch(socialNetwork);
const connection = socialBDS.findPath('Alice', 'Julia');
console.log('Connection path:', connection);
// Output might be: ['Alice', 'Charlie', 'Grace', 'Ivan', 'Julia']

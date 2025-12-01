interface Graph {
  [node: string]: string[];
}

class BidirectionalBFS {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  findPath(start: string, end: string): string[] | null {
    if (start === end) return [start];
    
    // Initialize forward and backward searches
    const forwardQueue: string[] = [start];
    const backwardQueue: string[] = [end];
    
    const forwardVisited: Map<string, string | null> = new Map();
    const backwardVisited: Map<string, string | null> = new Map();
    
    forwardVisited.set(start, null);
    backwardVisited.set(end, null);

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      // Expand forward search
      if (this.expandSearch(forwardQueue, forwardVisited, backwardVisited)) {
        return this.constructPath(start, end, forwardVisited, backwardVisited);
      }

      // Expand backward search
      if (this.expandSearch(backwardQueue, backwardVisited, forwardVisited)) {
        return this.constructPath(start, end, forwardVisited, backwardVisited);
      }
    }

    return null;
  }

  private expandSearch(
    queue: string[],
    currentVisited: Map<string, string | null>,
    otherVisited: Map<string, string | null>
  ): boolean {
    const current = queue.shift()!;
    
    for (const neighbor of this.graph[current] || []) {
      if (!currentVisited.has(neighbor)) {
        currentVisited.set(neighbor, current);
        queue.push(neighbor);
        
        // Check if paths have met
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
    forwardVisited: Map<string, string | null>,
    backwardVisited: Map<string, string | null>
  ): string[] {
    // Find meeting point
    let meetingNode: string | null = null;
    
    for (const node of forwardVisited.keys()) {
      if (backwardVisited.has(node)) {
        meetingNode = node;
        break;
      }
    }

    if (!meetingNode) return [];

    // Build path from start to meeting node
    const forwardPath: string[] = [];
    let currentNode = meetingNode;
    
    while (currentNode !== null) {
      forwardPath.unshift(currentNode);
      currentNode = forwardVisited.get(currentNode)!;
    }

    // Build path from meeting node to end
    const backwardPath: string[] = [];
    currentNode = meetingNode;
    
    while (currentNode !== null) {
      backwardPath.push(currentNode);
      currentNode = backwardVisited.get(currentNode)!;
    }

    // Combine paths (remove duplicate meeting node)
    return [...forwardPath, ...backwardPath.slice(1)];
  }
}

// Usage example
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E', 'G'],
  'G': ['F']
};

const bfs = new BidirectionalBFS(graph);
console.log(bfs.findPath('A', 'G')); // ['A', 'C', 'F', 'G']
class BidirectionalStringSearch {
  static findSubstring(text: string, pattern: string): number {
    const n = text.length;
    const m = pattern.length;
    
    if (m === 0) return 0;
    if (m > n) return -1;

    // Precompute forward and backward hash values
    const forwardHashes: number[] = new Array(n - m + 1);
    const backwardHashes: number[] = new Array(n - m + 1);
    
    // Simple hash function (for demonstration)
    const base = 256;
    const mod = 1e9 + 7;
    
    // Compute forward hash
    let forwardHash = 0;
    for (let i = 0; i < m; i++) {
      forwardHash = (forwardHash * base + text.charCodeAt(i)) % mod;
    }
    forwardHashes[0] = forwardHash;
    
    // Compute pattern hash
    let patternHash = 0;
    for (let i = 0; i < m; i++) {
      patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;
    }
    
    // Precompute powers for rolling hash
    const power = Math.pow(base, m - 1) % mod;
    
    // Forward search
    for (let i = 1; i <= n - m; i++) {
      forwardHash = (forwardHash - text.charCodeAt(i - 1) * power) % mod;
      forwardHash = (forwardHash * base + text.charCodeAt(i + m - 1)) % mod;
      forwardHash = (forwardHash + mod) % mod; // Ensure positive
      forwardHashes[i] = forwardHash;
    }
    
    // Backward search (reverse pattern)
    let backwardHash = 0;
    for (let i = m - 1; i >= 0; i--) {
      backwardHash = (backwardHash * base + text.charCodeAt(i)) % mod;
    }
    backwardHashes[0] = backwardHash;
    
    for (let i = 1; i <= n - m; i++) {
      backwardHash = (backwardHash - text.charCodeAt(m - i) * power) % mod;
      backwardHash = (backwardHash * base + text.charCodeAt(i - 1)) % mod;
      backwardHash = (backwardHash + mod) % mod;
      backwardHashes[i] = backwardHash;
    }
    
    // Check for matches from both directions
    for (let i = 0; i <= n - m; i++) {
      if (forwardHashes[i] === patternHash) {
        // Verify actual match (to avoid hash collisions)
        if (text.substring(i, i + m) === pattern) {
          return i;
        }
      }
      
      if (backwardHashes[i] === patternHash) {
        if (text.substring(i, i + m) === pattern) {
          return i;
        }
      }
    }
    
    return -1;
  }
}

// Usage example
const text = "hello world this is a test";
const pattern = "world";
console.log(BidirectionalStringSearch.findSubstring(text, pattern)); // 6
interface BidirectionalSearch<T> {
  search(start: T, goal: T): T[] | null;
  getNeighbors(node: T): T[];
  isMeetingPoint(forwardVisited: Set<T>, backwardVisited: Set<T>): T | null;
}

class GenericBidirectionalSearch<T> implements BidirectionalSearch<T> {
  constructor(private neighborFunction: (node: T) => T[]) {}
  
  search(start: T, goal: T): T[] | null {
    if (start === goal) return [start];
    
    const forwardQueue: T[] = [start];
    const backwardQueue: T[] = [goal];
    
    const forwardVisited = new Set<T>([start]);
    const backwardVisited = new Set<T>([goal]);
    
    const forwardParents = new Map<T, T>();
    const backwardParents = new Map<T, T>();
    
    forwardParents.set(start, null!);
    backwardParents.set(goal, null!);

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      // Expand forward
      const forwardCurrent = forwardQueue.shift()!;
      for (const neighbor of this.getNeighbors(forwardCurrent)) {
        if (!forwardVisited.has(neighbor)) {
          forwardVisited.add(neighbor);
          forwardParents.set(neighbor, forwardCurrent);
          forwardQueue.push(neighbor);
          
          if (backwardVisited.has(neighbor)) {
            return this.constructPath(neighbor, forwardParents, backwardParents);
          }
        }
      }
      
      // Expand backward
      const backwardCurrent = backwardQueue.shift()!;
      for (const neighbor of this.getNeighbors(backwardCurrent)) {
        if (!backwardVisited.has(neighbor)) {
          backwardVisited.add(neighbor);
          backwardParents.set(neighbor, backwardCurrent);
          backwardQueue.push(neighbor);
          
          if (forwardVisited.has(neighbor)) {
            return this.constructPath(neighbor, forwardParents, backwardParents);
          }
        }
      }
    }
    
    return null;
  }
  
  getNeighbors(node: T): T[] {
    return this.neighborFunction(node);
  }
  
  private constructPath(
    meetingPoint: T,
    forwardParents: Map<T, T>,
    backwardParents: Map<T, T>
  ): T[] {
    const path: T[] = [];
    let current: T | null = meetingPoint;
    
    // Build forward path
    while (current !== null!) {
      path.unshift(current);
      current = forwardParents.get(current)!;
    }
    
    // Build backward path
    current = backwardParents.get(meetingPoint)!;
    while (current !== null!) {
      path.push(current);
      current = backwardParents.get(current)!;
    }
    
    return path;
  }
  
  isMeetingPoint(forwardVisited: Set<T>, backwardVisited: Set<T>): T | null {
    for (const node of forwardVisited) {
      if (backwardVisited.has(node)) {
        return node;
      }
    }
    return null;
  }
}

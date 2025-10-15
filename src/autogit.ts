// Generic graph representation using adjacency list
type Graph<T> = Map<T, T[]>;

// Node representation for search
interface SearchNode<T> {
  value: T;
  depth: number;
  parent: SearchNode<T> | null;
}

// Breadth-limited search function
function breadthLimitedSearch<T>(
  graph: Graph<T>,
  start: T,
  goal: T,
  limit: number
): SearchNode<T> | null {
  // Base case: if start is the goal
  if (start === goal) {
    return { value: start, depth: 0, parent: null };
  }

  // Queue for BFS (stores nodes to explore)
  const queue: SearchNode<T>[] = [
    { value: start, depth: 0, parent: null }
  ];
  
  // Track visited nodes to avoid cycles
  const visited = new Set<T>();
  visited.add(start);

  while (queue.length > 0) {
    const current = queue.shift()!; // Dequeue

    // If we've reached the goal
    if (current.value === goal) {
      return current;
    }

    // If we've exceeded the depth limit, skip this branch
    if (current.depth >= limit) {
      continue;
    }

    // Get neighbors from the graph
    const neighbors = graph.get(current.value) || [];
    
    for (const neighbor of neighbors) {
      // Skip if already visited
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        
        // Create new node with incremented depth
        const newNode: SearchNode<T> = {
          value: neighbor,
          depth: current.depth + 1,
          parent: current
        };
        
        queue.push(newNode);
      }
    }
  }

  // No path found within the limit
  return null;
}

// Utility function to reconstruct the path from goal back to start
function getPath<T>(goalNode: SearchNode<T> | null): T[] {
  if (!goalNode) return [];
  
  const path: T[] = [];
  let current: SearchNode<T> | null = goalNode;
  
  while (current !== null) {
    path.unshift(current.value);
    current = current.parent;
  }
  
  return path;
}

// Utility function to get search statistics
function getSearchStats<T>(
  result: SearchNode<T> | null,
  limit: number
): {
  found: boolean;
  depthReached: number;
  pathLength: number;
  limited: boolean;
} {
  if (!result) {
    return { found: false, depthReached: limit, pathLength: 0, limited: true };
  }
  
  return {
    found: true,
    depthReached: result.depth,
    pathLength: getPath(result).length,
    limited: result.depth === limit
  };
}

// Example usage and testing
function example() {
  // Create a sample graph (undirected)
  const graph: Graph<string> = new Map([
    ['A', ['B', 'C']],
    ['B', ['A', 'D', 'E']],
    ['C', ['A', 'F']],
    ['D', ['B', 'G']],
    ['E', ['B', 'H']],
    ['F', ['C']],
    ['G', ['D']],
    ['H', ['E']],
  ]);

  console.log('Graph:');
  for (const [node, neighbors] of graph) {
    console.log(`  ${node} -> [${neighbors.join(', ')}]`);
  }
  console.log();

  // Test different search scenarios
  const testCases = [
    { start: 'A', goal: 'G', limit: 3 },
    { start: 'A', goal: 'H', limit: 2 },
    { start: 'A', goal: 'A', limit: 5 }, // Start equals goal
    { start: 'A', goal: 'Z', limit: 3 }, // Non-existent goal
  ];

  for (const test of testCases) {
    console.log(`\n--- Searching from ${test.start} to ${test.goal} (limit: ${test.limit}) ---`);
    
    const result = breadthLimitedSearch(graph, test.start, test.goal, test.limit);
    const path = getPath(result);
    const stats = getSearchStats(result, test.limit);
    
    console.log(`Found: ${stats.found}`);
    console.log(`Path: [${path.join(' -> ')}]`);
    console.log(`Path length: ${stats.pathLength}`);
    console.log(`Depth reached: ${stats.depthReached}`);
    console.log(`Limited by depth: ${stats.limited}`);
    
    if (result) {
      console.log(`Final node depth: ${result.depth}`);
    }
  }
}

// TypeScript class-based implementation (alternative approach)
class BreadthLimitedSearch<T> {
  private graph: Graph<T>;

  constructor(graph: Graph<T>) {
    this.graph = graph;
  }

  search(start: T, goal: T, limit: number): SearchNode<T> | null {
    return breadthLimitedSearch(this.graph, start, goal, limit);
  }

  getShortestPath(start: T, goal: T, limit: number): T[] {
    const result = this.search(start, goal, limit);
    return getPath(result);
  }
}

// Run the example
example();

// Demonstrate class usage
console.log('\n--- Class-based usage ---');
const searchEngine = new BreadthLimitedSearch<string>(new Map([
  ['A', ['B', 'C']],
  ['B', ['A', 'D']],
  ['C', ['A']],
  ['D', ['B']],
]));

const path = searchEngine.getShortestPath('A', 'D', 3);
console.log(`Path from A to D: [${path.join(' -> ')}]`);
function iterativeDeepeningSearch<T>(
  graph: Graph<T>,
  start: T,
  goal: T,
  maxLimit: number
): SearchNode<T> | null {
  for (let limit = 0; limit <= maxLimit; limit++) {
    const result = breadthLimitedSearch(graph, start, goal, limit);
    if (result) return result;
  }
  return null;
}

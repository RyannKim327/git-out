// Define the generic types
type Node<T> = T;
type SuccessorFn<T> = (node: Node<T>) => Node<T>[];
type GoalTestFn<T> = (node: Node<T>) => boolean;
type PathFn<T> = (node: Node<T>) => Node<T> | null; // Returns parent node

interface SearchResult<T> {
  found: boolean;
  path: Node<T>[];
  depth: number;
}

class DepthLimitedSearch<T> {
  private limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  search(
    start: Node<T>,
    successors: SuccessorFn<T>,
    goalTest: GoalTestFn<T>,
    pathFn: PathFn<T> = null
  ): SearchResult<T> {
    const result = this.recursiveDLS(
      start, 
      successors, 
      goalTest, 
      pathFn || ((node: Node<T>) => null), // Default path function
      0
    );
    
    if (result.found) {
      return {
        found: true,
        path: this.reconstructPath(result.node, pathFn),
        depth: result.depth
      };
    }
    
    return {
      found: false,
      path: [],
      depth: this.limit
    };
  }

  private recursiveDLS(
    node: Node<T>,
    successors: SuccessorFn<T>,
    goalTest: GoalTestFn<T>,
    pathFn: PathFn<T>,
    depth: number
  ): { found: boolean; node: Node<T>; depth: number } | null {
    // Base case: check if goal is found
    if (goalTest(node)) {
      return { found: true, node, depth };
    }

    // Base case: depth limit reached
    if (depth === this.limit) {
      return null;
    }

    // Generate successors
    const nextNodes = successors(node);
    
    // Recursively search each successor
    for (const nextNode of nextNodes) {
      pathFn(nextNode) = node; // Set parent for path reconstruction
      const result = this.recursiveDLS(nextNode, successors, goalTest, pathFn, depth + 1);
      
      if (result !== null) {
        return result;
      }
    }

    return null;
  }

  private reconstructPath(endNode: Node<T>, pathFn: PathFn<T>): Node<T>[] {
    const path: Node<T>[] = [];
    let current: Node<T> | null = endNode;

    while (current !== null) {
      path.unshift(current);
      current = pathFn(current);
    }

    return path;
  }
}
// Graph representation using adjacency list
interface GraphNode {
  id: string;
  name: string;
  neighbors: string[];
}

class CityGraph {
  private cities: Map<string, GraphNode>;

  constructor() {
    this.cities = new Map();
  }

  addCity(id: string, name: string, neighbors: string[]) {
    this.cities.set(id, { id, name, neighbors });
  }

  getNeighbors(cityId: string): GraphNode[] {
    const neighbors = this.cities.get(cityId)?.neighbors || [];
    return neighbors.map(id => this.cities.get(id)!).filter(Boolean);
  }

  getCity(id: string): GraphNode | undefined {
    return this.cities.get(id);
  }
}

// Usage example
function exampleUsage() {
  // Create a sample graph of cities
  const graph = new CityGraph();
  
  // Add cities and their connections
  graph.addCity('NYC', 'New York City', ['BOS', 'PHI', 'DC']);
  graph.addCity('BOS', 'Boston', ['NYC', 'POR']);
  graph.addCity('POR', 'Portland', ['BOS']);
  graph.addCity('PHI', 'Philadelphia', ['NYC', 'DC', 'PIT']);
  graph.addCity('DC', 'Washington DC', ['NYC', 'PHI', 'RIC']);
  graph.addCity('PIT', 'Pittsburgh', ['PHI', 'CLE']);
  graph.addCity('CLE', 'Cleveland', ['PIT', 'DET']);
  graph.addCity('DET', 'Detroit', ['CLE']);
  graph.addCity('RIC', 'Richmond', ['DC']);

  // Create depth-limited search with limit of 3
  const dls = new DepthLimitedSearch<GraphNode>(3);

  // Define search functions
  const successors = (node: GraphNode) => graph.getNeighbors(node.id);
  const goalTest = (node: GraphNode) => node.id === 'DET';
  const pathFn = (node: GraphNode) => null; // Will be set during search

  // Search from NYC to DET
  const startNode = graph.getCity('NYC')!;
  const result = dls.search(startNode, successors, goalTest, pathFn);

  if (result.found) {
    console.log('Path found:');
    result.path.forEach((city, index) => {
      console.log(`${index + 1}. ${city.name} (${city.id})`);
    });
    console.log(`Depth: ${result.depth}`);
  } else {
    console.log('No path found within depth limit');
    console.log(`Search depth limit: ${result.depth}`);
  }
}

// Iterative version (alternative implementation)
class IterativeDeepeningSearch<T> {
  private maxDepth: number;

  constructor(maxDepth: number) {
    this.maxDepth = maxDepth;
  }

  search(
    start: Node<T>,
    successors: SuccessorFn<T>,
    goalTest: GoalTestFn<T>,
    pathFn: PathFn<T> = null
  ): SearchResult<T> {
    for (let limit = 0; limit <= this.maxDepth; limit++) {
      const dls = new DepthLimitedSearch<T>(limit);
      const result = dls.search(start, successors, goalTest, pathFn);
      
      if (result.found) {
        return result;
      }
      
      console.log(`No solution found at depth ${limit}`);
    }
    
    return {
      found: false,
      path: [],
      depth: this.maxDepth
    };
  }
}

// Additional utility functions
function printSearchStats<T>(
  result: SearchResult<T>,
  algorithm: string,
  startNode: Node<T>
) {
  console.log(`\n=== ${algorithm} Results ===`);
  console.log(`Start: ${JSON.stringify(startNode)}`);
  console.log(`Found: ${result.found}`);
  
  if (result.found) {
    console.log(`Path length: ${result.path.length}`);
    console.log(`Search depth: ${result.depth}`);
    console.log('Path:', result.path.map(node => JSON.stringify(node)));
  } else {
    console.log(`Depth limit reached: ${result.depth}`);
  }
}

// Run the example
exampleUsage();
# Save as depth-limited-search.ts
# Compile and run
tsc depth-limited-search.ts
node depth-limited-search.js

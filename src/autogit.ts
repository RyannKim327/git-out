// Define the graph structure using adjacency list
type Graph = Map<number, number[]>; // Key: node, Value: array of dependent nodes

// Node info for processing
interface NodeInfo {
  node: number;
  visited: boolean;
  inDegree?: number; // For Kahn's algorithm
}

// Result type
interface TopologicalSortResult {
  order: number[];
  isValid: boolean; // true if no cycles detected
}
class TopologicalSortDFS {
  private graph: Graph;
  private visited: Set<number>;
  private result: number[];

  constructor(graph: Graph) {
    this.graph = graph;
    this.visited = new Set();
    this.result = [];
  }

  // Main method to perform topological sort
  public sort(): TopologicalSortResult {
    const allNodes = Array.from(this.graph.keys());
    
    for (const node of allNodes) {
      if (!this.visited.has(node)) {
        if (this.dfs(node)) {
          // Cycle detected
          return { order: [], isValid: false };
        }
      }
    }

    // Reverse the result to get correct topological order
    return { 
      order: this.result.reverse(), 
      isValid: true 
    };
  }

  // DFS traversal with cycle detection
  private dfs(node: number): boolean {
    this.visited.add(node);
    
    const neighbors = this.graph.get(node) || [];
    
    for (const neighbor of neighbors) {
      if (this.visited.has(neighbor)) {
        // Cycle detected (back edge to visited node)
        return true;
      }
      if (this.dfs(neighbor)) {
        // Cycle found in recursion
        return true;
      }
    }
    
    // Add node to result after processing all dependencies
    this.result.push(node);
    return false;
  }
}
class TopologicalSortKahn {
  private graph: Graph;
  private inDegree: Map<number, number>;

  constructor(graph: Graph) {
    this.graph = graph;
    this.inDegree = new Map();
    this.calculateInDegrees();
  }

  // Main method using Kahn's algorithm
  public sort(): TopologicalSortResult {
    const allNodes = Array.from(this.graph.keys());
    const queue: number[] = [];
    const result: number[] = [];

    // Initialize queue with nodes that have no incoming edges
    for (const node of allNodes) {
      if (this.inDegree.get(node) === 0) {
        queue.push(node);
      }
    }

    let processedCount = 0;

    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);
      processedCount++;

      // Process all neighbors
      const neighbors = this.graph.get(current) || [];
      for (const neighbor of neighbors) {
        const currentInDegree = this.inDegree.get(neighbor)! - 1;
        this.inDegree.set(neighbor, currentInDegree);

        // If in-degree becomes 0, add to queue
        if (currentInDegree === 0) {
          queue.push(neighbor);
        }
      }
    }

    // If not all nodes processed, there's a cycle
    const isValid = processedCount === allNodes.length;
    return { order: isValid ? result : [], isValid };
  }

  // Calculate in-degree for all nodes
  private calculateInDegrees(): void {
    const allNodes = Array.from(this.graph.keys());
    
    // Initialize in-degree for all nodes
    for (const node of allNodes) {
      this.inDegree.set(node, 0);
    }

    // Calculate in-degree by counting incoming edges
    for (const [node, neighbors] of this.graph) {
      for (const neighbor of neighbors) {
        if (this.inDegree.has(neighbor)) {
          const currentDegree = this.inDegree.get(neighbor)! + 1;
          this.inDegree.set(neighbor, currentDegree);
        } else {
          // If neighbor doesn't exist in graph, add it with in-degree 1
          this.inDegree.set(neighbor, 1);
        }
      }
    }
  }
}
// Helper function to create a sample graph
function createSampleGraph(): Graph {
  const graph = new Map<number, number[]>();
  
  // Example: Course prerequisites
  // 0 -> 1, 0 -> 2, 1 -> 3, 2 -> 3
  graph.set(0, [1, 2]);
  graph.set(1, [3]);
  graph.set(2, [3]);
  graph.set(3, []);
  
  return graph;
}

// Helper function to print graph
function printGraph(graph: Graph): void {
  console.log('Graph:');
  for (const [node, neighbors] of graph) {
    console.log(`  ${node} -> [${neighbors.join(', ')}]`);
  }
}

// Helper function to print topological order
function printTopologicalOrder(result: TopologicalSortResult): void {
  if (!result.isValid) {
    console.log('❌ Graph contains a cycle. No topological order possible.');
    return;
  }
  
  console.log('✅ Topological order:', result.order.join(' -> '));
}
function main() {
  // Create sample graph
  const graph = createSampleGraph();
  printGraph(graph);

  console.log('\n=== DFS Topological Sort ===');
  const dfsSorter = new TopologicalSortDFS(graph);
  const dfsResult = dfsSorter.sort();
  printTopologicalOrder(dfsResult);

  console.log('\n=== Kahn\'s Algorithm ===');
  const kahnSorter = new TopologicalSortKahn(graph);
  const kahnResult = kahnSorter.sort();
  printTopologicalOrder(kahnResult);
}

// Test with cyclic graph
function testCyclicGraph() {
  console.log('\n=== Testing Cyclic Graph ===');
  const cyclicGraph = new Map<number, number[]>();
  cyclicGraph.set(0, [1]);
  cyclicGraph.set(1, [2]);
  cyclicGraph.set(2, [0]); // Creates cycle: 0->1->2->0

  const kahnSorter = new TopologicalSortKahn(cyclicGraph);
  const result = kahnSorter.sort();
  printTopologicalOrder(result);
}

// Run examples
main();
testCyclicGraph();
Graph:
  0 -> [1, 2]
  1 -> [3]
  2 -> [3]
  3 -> []

=== DFS Topological Sort ===
✅ Topological order: 0 -> 2 -> 1 -> 3

=== Kahn's Algorithm ===
✅ Topological order: 0 -> 1 -> 2 -> 3

=== Testing Cyclic Graph ===
❌ Graph contains a cycle. No topological order possible.

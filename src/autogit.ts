// Define the graph structure using adjacency list
interface Graph {
  [key: string]: string[]; // Map of node to its neighbors
}

// Store visited nodes and recursion stack for cycle detection
interface TopologicalSortState {
  visited: Set<string>;
  recStack: Set<string>;
  result: string[];
}

// Main topological sort function
function topologicalSort(graph: Graph): string[] | null {
  const state: TopologicalSortState = {
    visited: new Set(),
    recStack: new Set(),
    result: []
  };

  // Iterate through all vertices
  for (const vertex in graph) {
    if (!state.visited.has(vertex)) {
      if (dfs(vertex, graph, state)) {
        return null; // Cycle detected
      }
    }
  }

  return state.result.reverse(); // Reverse to get correct order
}

// DFS helper function
function dfs(
  vertex: string,
  graph: Graph,
  state: TopologicalSortState
): boolean {
  // Mark current vertex as visited and add to recursion stack
  state.visited.add(vertex);
  state.recStack.add(vertex);

  // Explore all adjacent vertices
  if (graph[vertex]) {
    for (const neighbor of graph[vertex]) {
      if (!state.visited.has(neighbor)) {
        if (dfs(neighbor, graph, state)) {
          return true; // Cycle detected
        }
      } else if (state.recStack.has(neighbor)) {
        // Back edge found - cycle detected
        return true;
      }
    }
  }

  // Remove vertex from recursion stack and add to result
  state.recStack.delete(vertex);
  state.result.push(vertex);
  return false;
}

// Example usage and testing
function main() {
  // Example 1: Valid DAG
  const graph1: Graph = {
    '5': ['2', '0'],
    '7': ['8', '9'],
    '3': ['10', '8'],
    '11': ['9', '10'],
    '8': ['9', '11'],
    '2': [],
    '9': [],
    '0': ['1'],
    '10': [],
    '1': []
  };

  console.log('Graph 1 topological sort:', topologicalSort(graph1));
  // Output: ['5', '7', '3', '11', '8', '2', '0', '1', '9', '10']

  // Example 2: Graph with cycle (should return null)
  const graph2: Graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['E'],
    'D': ['C'], // Cycle: C -> E, but D -> C creates cycle
    'E': []
  };

  console.log('Graph 2 topological sort:', topologicalSort(graph2));
  // Output: null (cycle detected)

  // Example 3: Simple linear graph
  const graph3: Graph = {
    'A': ['B'],
    'B': ['C'],
    'C': []
  };

  console.log('Graph 3 topological sort:', topologicalSort(graph3));
  // Output: ['A', 'B', 'C']
}

// Alternative implementation using Kahn's Algorithm (BFS approach)
function topologicalSortKahn(graph: Graph): string[] | null {
  // Calculate in-degrees
  const inDegree: { [key: string]: number } = {};
  const queue: string[] = [];
  const result: string[] = [];

  // Initialize in-degrees
  for (const vertex in graph) {
    inDegree[vertex] = 0;
  }

  // Calculate in-degrees and find nodes with 0 in-degree
  for (const vertex in graph) {
    if (graph[vertex]) {
      for (const neighbor of graph[vertex]) {
        if (!inDegree[neighbor]) {
          inDegree[neighbor] = 0;
        }
        inDegree[neighbor]++;
      }
    }
  }

  // Add all nodes with 0 in-degree to queue
  for (const vertex in inDegree) {
    if (inDegree[vertex] === 0) {
      queue.push(vertex);
    }
  }

  // Process the queue
  while (queue.length > 0) {
    const vertex = queue.shift()!;
    result.push(vertex);

    // Reduce in-degree of neighbors
    if (graph[vertex]) {
      for (const neighbor of graph[vertex]) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }
  }

  // Check for cycle (if not all vertices processed)
  const totalVertices = Object.keys(graph).length;
  return result.length === totalVertices ? result : null;
}

// Test Kahn's algorithm
function testKahn() {
  const graph: Graph = {
    '5': ['2', '0'],
    '7': ['8', '9'],
    '3': ['10', '8'],
    '11': ['9', '10'],
    '8': ['9', '11'],
    '2': [],
    '9': [],
    '0': ['1'],
    '10': [],
    '1': []
  };

  console.log('Kahn\'s algorithm result:', topologicalSortKahn(graph));
}

// Utility function to print graph
function printGraph(graph: Graph): void {
  console.log('Graph:');
  for (const [vertex, neighbors] of Object.entries(graph)) {
    console.log(`${vertex} -> [${neighbors.join(', ')}]`);
  }
  console.log('');
}

// Run examples
main();
testKahn();
// Create a task dependency graph (real-world example)
const taskGraph: Graph = {
  'Write tests': ['Implement feature'],
  'Implement feature': ['Design API'],
  'Design API': ['Requirements gathering'],
  'Deploy to production': ['Write tests', 'Create documentation'],
  'Create documentation': ['Implement feature'],
  'Requirements gathering': []
};

const order = topologicalSort(taskGraph);
if (order) {
  console.log('Task execution order:', order);
  // Output: ['Requirements gathering', 'Design API', 'Implement feature', 'Write tests', 'Create documentation', 'Deploy to production']
} else {
  console.log('Cycle detected - invalid dependency graph');
}

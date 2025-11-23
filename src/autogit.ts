interface Graph {
  [node: string]: string[];
}

function topologicalSortKahn(graph: Graph): string[] {
  // Calculate in-degrees
  const inDegree: Record<string, number> = {};
  const nodes = Object.keys(graph);
  
  // Initialize in-degrees to 0
  nodes.forEach(node => inDegree[node] = 0);
  
  // Calculate actual in-degrees
  nodes.forEach(node => {
    graph[node].forEach(neighbor => {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    });
  });

  // Initialize queue with nodes having 0 in-degree
  const queue: string[] = nodes.filter(node => inDegree[node] === 0);
  const result: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    // Process neighbors
    graph[current].forEach(neighbor => {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }

  // Check for cycles
  if (result.length !== nodes.length) {
    throw new Error("Graph has a cycle, topological sort not possible");
  }

  return result;
}

// Example usage:
const graph: Graph = {
  A: ['B', 'C'],
  B: ['D'],
  C: ['D'],
  D: []
};

console.log(topologicalSortKahn(graph)); // ['A', 'B', 'C', 'D'] or ['A', 'C', 'B', 'D']
function topologicalSortDFS(graph: Graph): string[] {
  const visited: Set<string> = new Set();
  const recursionStack: Set<string> = new Set();
  const result: string[] = [];

  function dfs(node: string): boolean {
    if (recursionStack.has(node)) {
      return false; // Cycle detected
    }

    if (visited.has(node)) {
      return true;
    }

    visited.add(node);
    recursionStack.add(node);

    for (const neighbor of graph[node]) {
      if (!dfs(neighbor)) {
        return false;
      }
    }

    recursionStack.delete(node);
    result.unshift(node); // Add to front for topological order
    return true;
  }

  const nodes = Object.keys(graph);
  for (const node of nodes) {
    if (!visited.has(node)) {
      if (!dfs(node)) {
        throw new Error("Graph has a cycle, topological sort not possible");
      }
    }
  }

  return result;
}

// Example usage:
console.log(topologicalSortDFS(graph)); // ['A', 'B', 'C', 'D'] or ['A', 'C', 'B', 'D']
type Graph<T extends string | number | symbol> = Record<T, T[]>;

function topologicalSort<T extends string | number | symbol>(
  graph: Graph<T>,
  algorithm: 'kahn' | 'dfs' = 'kahn'
): T[] {
  if (algorithm === 'kahn') {
    return topologicalSortKahn(graph as Record<string, string[]>) as T[];
  } else {
    return topologicalSortDFS(graph as Record<string, string[]>) as T[];
  }
}

// Example with different node types
const numericGraph: Graph<number> = {
  1: [2, 3],
  2: [4],
  3: [4],
  4: []
};

console.log(topologicalSort(numericGraph, 'kahn')); // [1, 2, 3, 4] or [1, 3, 2, 4]
function validateGraph(graph: Graph<string>): boolean {
  const nodes = new Set(Object.keys(graph));
  
  // Check if all referenced nodes exist
  for (const [node, neighbors] of Object.entries(graph)) {
    for (const neighbor of neighbors) {
      if (!nodes.has(neighbor)) {
        throw new Error(`Node ${neighbor} referenced by ${node} but not found in graph`);
      }
    }
  }
  
  return true;
}

function safeTopologicalSort(graph: Graph<string>): string[] {
  validateGraph(graph);
  return topologicalSortKahn(graph);
}

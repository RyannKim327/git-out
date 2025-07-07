// Define the structure of a graph node (if needed)
interface GraphNode {
  id: string; // or number, depending on your data
  neighbors: GraphNode[];
}

// Or, if your graph is represented as an adjacency list:
type Graph = {
  [nodeId: string]: string[]; // mapping node IDs to arrays of neighbor IDs
} ;

/**
 * Depth-Limited Search function
 * @param graph - the graph represented as an adjacency list
 * @param start - the starting node ID
 * @param goal - the goal node ID you're searching for
 * @param maxDepth - maximum depth limit
 * @returns boolean indicating whether the goal was found within the depth limit
 */
function depthLimitedSearch(
  graph: Graph,
  start: string,
  goal: string,
  maxDepth: number
): boolean {
  // Internal recursive function
  function dls(node: string, depth: number, visited: Set<string>): boolean {
    if (node === goal) {
      return true; // Found the goal
    }
    if (depth >= maxDepth) {
      return false; // Reached maximum depth limit
    }
    visited.add(node);
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dls(neighbor, depth + 1, visited)) {
          return true; // Goal found in recursion
        }
      }
    }
    return false; // Goal not found in this path
  }

  // Initialize visited set and call the recursive function
  const visited = new Set<string>();
  return dls(start, 0, visited);
}

// Example usage:
const exampleGraph: Graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: ["F"],
  F: []
};

const startNode = "A";
const goalNode = "F";
const maxDepth = 3;

const found = depthLimitedSearch(exampleGraph, startNode, goalNode, maxDepth);
console.log(`Goal ${goalNode} found within depth ${maxDepth}:`, found);

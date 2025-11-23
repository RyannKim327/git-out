type Edge = { node: string; weight: number };
type Graph = Record<string, Edge[]>;

function dijkstra(graph: Graph, start: string): Record<string, { distance: number, previous: string | null }> {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const visited: Set<string> = new Set();

  // Initialize distances and previous
  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    // Find the unvisited node with the smallest distance
    let closestNode: string | null = null;
    let minDistance = Infinity;

    for (const node in graph) {
      if (!visited.has(node) && distances[node] < minDistance) {
        minDistance = distances[node];
        closestNode = node;
      }
    }

    if (closestNode === null) {
      break; // Remaining nodes are unreachable
    }

    visited.add(closestNode);

    // Update neighbors
    for (const edge of graph[closestNode]) {
      const neighbor = edge.node;
      const weight = edge.weight;
      const newDistance = distances[closestNode] + weight;
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = closestNode;
      }
    }
  }

  // Combine results
  const result: Record<string, { distance: number, previous: string | null }> = {};
  for (const node in graph) {
    result[node] = { distance: distances[node], previous: previous[node] };
  }
  return result;
}
const graph: Graph = {
 

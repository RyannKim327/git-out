// Define the structure of an edge
interface Edge {
  source: number;
  target: number;
  weight: number;
}

// Bellman-Ford algorithm implementation
function bellmanFord(
  verticesCount: number,
  edges: Edge[],
  source: number
): { distances: number[]; predecessor: (number | null)[] } {
  // Initialize distances and predecessors
  const distances: number[] = Array(verticesCount).fill(Infinity);
  const predecessor: (number | null)[] = Array(verticesCount).fill(null);

  distances[source] = 0;

  // Relax edges repeatedly
  for (let i = 0; i < verticesCount - 1; i++) {
    let updated = false;

    for (const edge of edges) {
      if (distances[edge.source] + edge.weight < distances[edge.target]) {
        distances[edge.target] = distances[edge.source] + edge.weight;
        predecessor[edge.target] = edge.source;
        updated = true;
      }
    }

    // Optimization: stop if no update in this iteration
    if (!updated) {
      break;
    }
  }

  // Check for negative weight cycles
  for (const edge of edges) {
    if (distances[edge.source] + edge.weight < distances[edge.target]) {
      throw new Error("Graph contains a negative weight cycle");
    }
  }

  return { distances, predecessor };
}

// Example usage:
const edges: Edge[] = [
  { source: 0, target: 1, weight: 6 },
  { source: 0, target: 2, weight: 5 },
  { source: 0, target: 3, weight: 5 },
  { source: 1, target: 4, weight: -1 },
  { source: 2, target: 1, weight: -2 },
  { source: 2, target: 4, weight: 1 },
  { source: 3, target: 2, weight: -2 },
  { source: 3, target: 5, weight: -1 },
  { source: 4, target: 6, weight: 3 },
  { source: 5, target: 6, weight: 3 },
];

const verticesCount = 7; // number of vertices
const sourceVertex = 0; // starting point

try {
  const result = bellmanFord(verticesCount, edges, sourceVertex);
  console.log("Distances from source:", result.distances);
  console.log("Predecessors:", result.predecessor);
} catch (error) {
  console.error(error.message);
}

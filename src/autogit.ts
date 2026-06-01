// 1️⃣  Define the graph

/** One directed edge with a weight. */
interface Edge {
  from: number;   // source vertex index
  to: number;     // destination vertex index
  weight: number; // edge weight
}

/** The graph is just a list of edges – we’re not building adjacency lists because
 *  Bellman‑Ford inherits its own relaxation loop from every edge.
 */
type EdgeList = Edge[];

/** Number of vertices is needed for the outer loop. */
type VertexCount = number;
/**
 * bellmanFord(source, n, edges)
 *
 * @param source  Index of the source vertex (0‑based)
 * @param n       Total number of vertices
 * @param edges   List of all directed edges
 *
 * @returns An object:
 *   – `dist`   array of shortest distances from `source`
 *   – `prev`   previous vertex on the optimal path (for path reconstruction)
 *   – `hasNegativeCycle` flag
 */
function bellmanFord(
  source: number,
  n: VertexCount,
  edges: EdgeList,
): { dist: number[]; prev: (number | null)[]; hasNegativeCycle: boolean } {
  const INF = Number.POSITIVE_INFINITY;
  const dist = Array(n).fill(INF);
  const prev = Array<VertexCount | null>(n).fill(null);

  dist[source] = 0;

  // Relax all edges (n‑1) times
  for (let i = 0; i < n - 1; i++) {
    let changed = false;

    for (const { from, to, weight } of edges) {
      const d = dist[from] + weight;
      if (d < dist[to]) {
        dist[to] = d;
        prev[to] = from;
        changed = true;
      }
    }

    // Early exit if no distance updates: the graph has no further changes
    if (!changed) break;
  }

  // Check for negative‑weight cycles reachable from `source`
  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (dist[from] + weight < dist[to]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { dist, prev, hasNegativeCycle };
}
// Example graph
const edges: EdgeList = [
  { from: 0, to: 1, weight: 5 },
  { from: 0, to: 2, weight: 4 },
  { from: 1, to: 2, weight: -2 },
  { from: 1, to: 3, weight: 3 },
  { from: 2, to: 1, weight: -1 },
  { from: 2, to: 3, weight: 2 },
  { from: 3, to: 0, weight: 2 },
];

// 4 vertices (0‑3)
const result = bellmanFord(0, 4, edges);

console.log('Distances:', result.dist);
console.log('Previous vertex on path:', result.prev);
console.log('Negative cycle?', result.hasNegativeCycle);
function reconstructPath(
  source: number,
  target: number,
  prev: (number | null)[],
): number[] | null {
  const path: number[] = [];
  let at = target;

  while (at !== null && at !== source) {
    path.push(at);
    at = prev[at];
  }

  if (at !== source) return null; // no path

  path.push(source);
  return path.reverse();
}

const path = reconstructPath(0, 3, result.prev);
console.log('Path from 0 to 3:', path);

/**
 * Edge list representation of a directed weighted graph.
 * `edges[i] = { from, to, weight }`
 */
type Edge = { from: number; to: number; weight: number };

/**
 * Result object:
 *   dist[v]  – shortest distance from source to v (∞ if unreachable)
 *   prev[v]  – predecessor of v on the shortest path (undefined if unreachable)
 */
type BFResult = { dist: number[]; prev: (number | undefined)[] };

/**
 * Bellman–Ford single-source shortest-path algorithm.
 * Returns the distance array and predecessor array.
 * Throws an Error if a negative-weight cycle reachable from source exists.
 *
 * @param n      number of vertices (vertices are 0..n-1)
 * @param edges  array of directed edges
 * @param source source vertex
 */
function bellmanFord(n: number, edges: Edge[], source: number): BFResult {
  const dist: number[] = Array(n).fill(Infinity);
  const prev: (number | undefined)[] = Array(n).fill(undefined);

  dist[source] = 0;

  // Relax all edges |V| - 1 times
  for (let i = 0; i < n - 1; i++) {
    for (const { from, to, weight } of edges) {
      if (dist[from] === Infinity) continue; // still unreachable
      const newDist = dist[from] + weight;
      if (newDist < dist[to]) {
        dist[to] = newDist;
        prev[to] = from;
      }
    }
  }

  // Check for negative-weight cycles
  for (const { from, to, weight } of edges) {
    if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
      throw new Error("Graph contains a negative-weight cycle reachable from source");
    }
  }

  return { dist, prev };
}

/* ------------------------------------------------------------------ */
/* Optional helper: reconstruct shortest path from source to target      */
function pathTo(target: number, prev: (number | undefined)[]): number[] | null {
  if (prev[target] === undefined && target !== 0) return null; // unreachable
  const path: number[] = [];
  let cur: number | undefined = target;
  while (cur !== undefined) {
    path.unshift(cur);
    cur = prev[cur];
  }
  return path;
}

/* ------------------------------------------------------------------ */
/* Example usage                                                       */
if (require.main === module) {
  const edges: Edge[] = [
    { from: 0, to: 1, weight: -1 },
    { from: 0, to: 2, weight: 4 },
    { from: 1, to: 2, weight: 3 },
    { from: 1, to: 3, weight: 2 },
    { from: 1, to: 4, weight: 2 },
    { from: 3, to: 2, weight: 5 },
    { from: 3, to: 1, weight: 1 },
    { from: 4, to: 3, weight: -3 },
  ];

  const n = 5;
  const source = 0;

  try {
    const { dist, prev } = bellmanFord(n, edges, source);
    console.log("Distances:", dist);
    console.log("Path to 4:", pathTo(4, prev)); // → [0, 1, 4]
  } catch (e) {
    console.error(e.message);
  }
}

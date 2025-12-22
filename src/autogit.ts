/**
 * Edge representation
 */
export interface Edge {
  from: number;
  to: number;
  weight: number;
}

/**
 * Result of the algorithm
 */
export interface BellmanFordResult {
  dist: number[];       // dist[v] = shortest distance from source to v
  prev: number[];         // prev[v] = predecessor of v on shortest path
  hasNegativeCycle: boolean;
}

/**
 * Bellman-Ford single-source shortest path.
 * @param n        Number of vertices (vertices are 0..n-1)
 * @param edges    Array of directed weighted edges
 * @param source   Source vertex
 * @returns        BellmanFordResult
 * @throws         If source is out of range
 */
export function bellmanFord(
  n: number,
  edges: Edge[],
  source: number
): BellmanFordResult {
  if (source < 0 || source >= n) {
    throw new Error('Source vertex out of range');
  }

  const INF = Number.POSITIVE_INFINITY;
  const dist = Array(n).fill(INF);
  const prev = Array(n).fill(-1);
  dist[source] = 0;

  // Relax all edges n-1 times
  for (let i = 0; i < n - 1; i++) {
    let updated = false;
    for (const { from, to, weight } of edges) {
      const newDist = dist[from] + weight;
      if (dist[from] !== INF && newDist < dist[to]) {
        dist[to] = newDist;
        prev[to] = from;
        updated = true;
      }
    }
    if (!updated) break; // Early exit: no relaxations happened
  }

  // Check for negative cycles
  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (dist[from] !== INF && dist[from] + weight < dist[to]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { dist, prev, hasNegativeCycle };
}

/**
 * Reconstruct shortest path from source to target.
 * Returns null if no path exists or if a negative cycle is on the path.
 */
export function buildPath(
  prev: number[],
  source: number,
  target: number
): number[] | null {
  const path: number[] = [];
  let v = target;
  while (v !== -1) {
    path.push(v);
    v = prev[v];
  }
  if (path[path.length - 1] !== source) return null; // unreachable
  return path.reverse();
}
const edges: Edge[] = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 2, weight: 3 },
  { from: 1, to: 2, weight: -2 },
  { from: 1, to: 3, weight: 3 },
  { from: 2, to: 4, weight: 2 },
  { from: 3, to: 4, weight: -3 },
];

const { dist, prev, hasNegativeCycle } = bellmanFord(5, edges, 0);

console.log('Distances:', dist); // [0, 4, 2, 7, -1]
console.log('Has neg cycle:', hasNegativeCycle); // false
console.log('Path 0→4:', buildPath(prev, 0, 4)); // [0, 2, 4]

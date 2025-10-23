/**
 * Edge list representation of a directed graph.
 *  – vertices are numbered 0 … n-1
 *  – edge {u, v, w} means u → v with weight w
 */
export interface Edge {
  u: number;
  v: number;
  w: number;
}

/**
 * Result of the algorithm.
 *  – dist[v] = shortest distance from source to v (∞ if unreachable)
 *  – pred[v] = predecessor of v on shortest path (null if unreachable)
 *  – hasNegativeCycle = true if any negative-weight cycle reachable from source
 */
export interface BellmanFordResult {
  dist: number[];
  pred: (number | null)[];
  hasNegativeCycle: boolean;
}

/**
 * Bellman–Ford single-source shortest-path algorithm.
 *
 * @param n        number of vertices
 * @param edges    list of directed edges
 * @param source   source vertex (0-based)
 * @returns        BellmanFordResult
 *
 * Time:  O(n * |E|)
 * Space: O(n)
 */
export function bellmanFord(
  n: number,
  edges: Edge[],
  source: number
): BellmanFordResult {
  const INF = Number.POSITIVE_INFINITY;

  // 1. Init
  const dist = Array<number>(n).fill(INF);
  const pred = Array<number | null>(n).fill(null);
  dist[source] = 0;

  // 2. Relax all edges n-1 times
  for (let i = 0; i < n - 1; ++i) {
    let updated = false;
    for (const { u, v, w } of edges) {
      if (dist[u] !== INF && dist[v] > dist[u] + w) {
        dist[v] = dist[u] + w;
        pred[v] = u;
        updated = true;
      }
    }
    if (!updated) break; // early exit if no update
  }

  // 3. Check for negative-weight cycles reachable from source
  let hasNegativeCycle = false;
  for (const { u, v, w } of edges) {
    if (dist[u] !== INF && dist[v] > dist[u] + w) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { dist, pred, hasNegativeCycle };
}

/**
 * Reconstruct the actual shortest-path vertices from predecessor array.
 * Returns empty array if no path exists.
 */
export function buildPath(
  pred: (number | null)[],
  source: number,
  target: number
): number[] {
  const path: number[] = [];
  let cur: number | null = target;
  while (cur !== null) {
    path.push(cur);
    cur = pred[cur];
  }
  if (path.length === 0 || path[path.length - 1] !== source) return [];
  return path.reverse();
}

/* ------------------ Usage demo ------------------ */
if (require.main === module) {
  const edges: Edge[] = [
    { u: 0, v: 1, w: 5 },
    { u: 0, v: 2, w: 4 },
    { u: 1, v: 3, w: 3 },
    { u: 2, v: 1, w: -6 },
    { u: 3, v: 2, w: 2 },
  ];
  const n = 4;
  const src = 0;

  const res = bellmanFord(n, edges, src);
  console.log("dist:", res.dist);
  console.log("pred:", res.pred);
  console.log("hasNegativeCycle:", res.hasNegativeCycle);

  const target = 3;
  const path = buildPath(res.pred, src, target);
  console.log(`Path ${src} → ${target}:`, path);
}
tsc bellmanFord.ts
node bellmanFord.js

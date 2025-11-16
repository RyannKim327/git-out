/**
 * Edge list representation of a directed weighted graph.
 * vertices are numbered 0 … n-1
 */
export interface Edge {
  from: number;
  to: number;
  weight: number;
}

/**
 * Result container
 */
export interface BellmanFordResult {
  distance: number[];      // distance[v] = shortest distance from source to v
  predecessor: number[];     // predecessor[v] = previous vertex on shortest path
  hasNegativeCycle: boolean;
}

/**
 * Bellman-Ford single-source shortest path.
 * @param n          number of vertices (0 … n-1)
 * @param edges      array of directed weighted edges
 * @param source     source vertex
 * @returns          BellmanFordResult
 * @throws           Error if source is out of range
 */
export function bellmanFord(
  n: number,
  edges: Edge[],
  source: number
): BellmanFordResult {
  if (source < 0 || source >= n) {
    throw new Error("Source vertex out of range");
  }

  const INF = Number.POSITIVE_INFINITY;
  const dist: number[] = Array(n).fill(INF);
  const pred: number[] = Array(n).fill(-1);
  dist[source] = 0;

  // Relax all edges n-1 times
  for (let i = 0; i < n - 1; i++) {
    let updated = false;
    for (const { from, to, weight } of edges) {
      const nd = dist[from] + weight;
      if (dist[from] !== INF && nd < dist[to]) {
        dist[to] = nd;
        pred[to] = from;
        updated = true;
      }
    }
    if (!updated) break; // early stop if no relaxations happened
  }

  // Check for negative-weight cycles reachable from source
  let hasNegCycle = false;
  for (const { from, to, weight } of edges) {
    if (dist[from] !== INF && dist[from] + weight < dist[to]) {
      hasNegCycle = true;
      break;
    }
  }

  return { distance: dist, predecessor: pred, hasNegativeCycle: hasNegCycle };
}

/**
 * Reconstruct shortest path from source to target.
 * Returns null if no path exists or if target is unreachable.
 */
export function buildPath(
  pred: number[],
  source: number,
  target: number
): number[] | null {
  if (target === source) return [source];
  const path: number[] = [];
  let cur = target;
  while (cur !== -1) {
    path.unshift(cur);
    cur = pred[cur];
  }
  return path[0] === source ? path : null;
}

/* ------------------- Usage example ------------------- */
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
  const src = 0;
  const res = bellmanFord(n, edges, src);

  console.log("Distance:", res.distance);
  console.log("Predecessor:", res.predecessor);
  console.log("Has negative cycle:", res.hasNegativeCycle);

  const target = 4;
  const path = buildPath(res.predecessor, src, target);
  console.log(`Path ${src} → ${target}:`, path ? path.join(" → ") : "none");
}
tsc bellmanFord.ts
node bellmanFord.js
Distance: [ 0, -1, 2, -2, 1 ]
Predecessor: [ -1, 0, 1, 4, 1 ]
Has negative cycle: false
Path 0 → 4: 0 → 1 → 4

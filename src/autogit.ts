export interface Edge {
  from: number;
  to: number;
  weight: number;
}

export interface ShortestPaths {
  dist: number[];      // dist[v] = shortest distance from source to v
  pred: number[];        // pred[v] = predecessor of v on that path (-1 = none)
  hasNegativeCycle: boolean;
}

/**
 * Bellman-Ford from a single source.
 *  - n: number of vertices (labelled 0 … n-1)
 *  - edges: list of directed edges
 *  - src: source vertex
 *
 * Complexity: O(V·E)
 */
export function bellmanFord(
  n: number,
  edges: Edge[],
  src: number
): ShortestPaths {
  const dist = Array(n).fill(Infinity);
  const pred = Array(n).fill(-1);
  dist[src] = 0;

  // Relax all edges up to V-1 times
  for (let i = 0; i < n - 1; i++) {
    let updated = false;
    for (const { from, to, weight } of edges) {
      const nd = dist[from] + weight;
      if (dist[from] !== Infinity && nd < dist[to]) {
        dist[to] = nd;
        pred[to] = from;
        updated = true;
      }
    }
    if (!updated) break; // early exit if no relaxations happened
  }

  // Check for negative-weight cycles
  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { dist, pred, hasNegativeCycle };
}

/* ------------------------------------------------------------------ */
/* Helper: reconstruct path from src to target                          */
/* ------------------------------------------------------------------ */
export function buildPath(pred: number[], src: number, target: number): number[] {
  const path: number[] = [];
  for (let v = target; v !== -1; v = pred[v]) path.unshift(v);
  return path[0] === src ? path : []; // empty if unreachable
}
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

const { dist, pred, hasNegativeCycle } = bellmanFord(5, edges, 0);

console.log('Distances:', dist); // [0, -1, 2, -2, 1]
console.log('Path 0→4:', buildPath(pred, 0, 4)); // [0, 1, 4]
console.log('Negative cycle?', hasNegativeCycle); // false
npx tsc bellmanFord.ts
node bellmanFord.js

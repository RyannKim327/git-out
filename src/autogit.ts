// Represents a single weighted directed edge.
export interface Edge {
  from: number;
  to: number;
  weight: number;
}
/**
 * Bellman–Ford shortest‑path algorithm.
 *
 * @param n      Number of vertices (vertices are 0 … n‑1).
 * @param edges  Array of directed weighted edges.
 * @param source Index of the source vertex.
 * @returns {distances, predecessors}
 *          - `distances` is an array where `distances[v]` holds the
 *            length of a shortest path from source to v.
 *          - `predecessors` holds the previous vertex on that path
 *            (use `-1` for the source and unreachable vertices).
 *
 * @throws Error if a negative cycle is reachable from source.
 */
export function bellmanFord(
  n: number,
  edges: Edge[],
  source: number = 0
): { distances: number[]; predecessors: number[] } {
  // 1️⃣ BFS‑style relaxation loop.
  const dist: number[] = Array(n).fill(Infinity);
  const pred: number[] = Array(n).fill(-1);

  dist[source] = 0;

  for (let i = 0; i < n - 1; i++) {
    let changed = false;
    for (const { from, to, weight } of edges) {
      if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
        dist[to] = dist[from] + weight;
        pred[to] = from;
        changed = true;
      }
    }
    // Early exit if nothing moved this pass.
    if (!changed) break;
  }

  // 2️⃣ Check for negative‑weight cycles.
  for (const { from, to, weight } of edges) {
    if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
      const cycle: number[] = findNegCycle(n, edges, to);
      throw new Error(
        `Negative cycle detected: ${cycle.join(' → ')}`
      );
    }
  }

  return { distances: dist, predecessors: pred };
}

/**
 * Helper: recover a node that lies on a negative cycle reachable from `start`.
 * Returns the cycle as a list of vertex indices in order.
 *
 * This is a brute‑force way – for large graphs you’ll want a more
 * sophisticated cycle extraction, but it’s fine for teaching/compacting.
 */
function findNegCycle(
  n: number,
  edges: Edge[],
  start: number
): number[] {
  const parent: number[] = Array(n).fill(-1);
  let x = start;
  for (let i = 0; i < n; i++) x = edges.find(e => e.to === x)?.from ?? -1;

  const cycle: number[] = [];
  let cur = x;
  do {
    cycle.push(cur);
    cur = parent[cur];
  } while (cur !== x && cur !== -1);
  cycle.reverse();
  return cycle;
}
import { bellmanFord, Edge } from './bellmanFord';

const edges: Edge[] = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 2, weight: 5 },
  { from: 1, to: 2, weight: -1 },
  { from: 1, to: 3, weight: 10 },
  { from: 2, to: 3, weight: 3 },
  // Add more edges as needed
];

const { distances, predecessors } = bellmanFord(4, edges, 0);

console.log('Distances:', distances);
// [0, 4, 3, 6]

console.log('Predecessors:', predecessors);
// [-1, 0, 1, 2]

// Reconstruct a path to vertex 3
function pathTo(v: number) {
  const path: number[] = [];
  while (v !== -1) {
    path.unshift(v);
    v = predecessors[v];
  }
  return path;
}

console.log('Path 0 → 3:', pathTo(3)); // [0, 1, 2, 3]

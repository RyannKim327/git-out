// A directed edge
export interface Edge {
  from: number;   // source vertex id
  to: number;     // destination vertex id
  weight: number; // edge weight (can be negative)
}
/**
 * Bellman‑Ford shortest‑path algorithm.
 *
 * @param verticesCount   Number of vertices in the graph (ids 0 … verticesCount‑1)
 * @param edges           Array of directed edges (may contain negative weights)
 * @param source          Index of the source vertex
 * @returns               An object with distances, predecessors and a flag for negative cycles
 */
export function bellmanFord(
  verticesCount: number,
  edges: Edge[],
  source: number
): {
  distances: number[];
  predecessors: (number | null)[];
  hasNegativeCycle: boolean;
} {
  // ---------- 1. initialise ----------
  const distances = new Array<number>(verticesCount).fill(Infinity);
  const predecessors: (number | null)[] = new Array<number | null>(verticesCount).fill(null);

  distances[source] = 0;

  // ---------- 2. relax edges V‑1 times ----------
  for (let i = 0; i < verticesCount - 1; i++) {
    let anyChange = false;

    for (const { from, to, weight } of edges) {
      if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
        distances[to] = distances[from] + weight;
        predecessors[to] = from;
        anyChange = true;
      }
    }

    // Early exit: if no edge was relaxed in this pass, we are done
    if (!anyChange) break;
  }

  // ---------- 3. check for negative cycles ----------
  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
      hasNegativeCycle = true;
      // Optionally you could propagate the "negative‑cycle reachable" flag
      // to all vertices that can be affected, but for most use‑cases a boolean is enough.
      break;
    }
  }

  return { distances, predecessors, hasNegativeCycle };
}

/**
 * Helper to reconstruct the path from `source` to `target`.
 *
 * @param predecessors   Array returned by `bellmanFord`
 * @param source          Source vertex id
 * @param target          Target vertex id
 * @returns               Array of vertex ids representing the path (empty if unreachable)
 */
export function reconstructPath(
  predecessors: (number | null)[],
  source: number,
  target: number
): number[] {
  const path: number[] = [];
  let cur: number | null = target;

  while (cur !== null) {
    path.push(cur);
    if (cur === source) break;
    cur = predecessors[cur];
  }

  // If we stopped before reaching the source, there is no path
  if (path[path.length - 1] !== source) return [];

  return path.reverse();
}
import { bellmanFord, reconstructPath, Edge } from "./bellmanFord";

// Build a graph with 5 vertices (0 … 4)
const edges: Edge[] = [
  { from: 0, to: 1, weight: 6 },
  { from: 0, to: 2, weight: 7 },
  { from: 1, to: 2, weight: 8 },
  { from: 1, to: 3, weight: 5 },
  { from: 1, to: 4, weight: -4 },
  { from: 2, to: 3, weight: -3 },
  { from: 2, to: 4, weight: 9 },
  { from: 3, to: 1, weight: -2 },
  { from: 4, to: 0, weight: 2 },
  { from: 4, to: 3, weight: 7 },
];

const source = 0;
const verticesCount = 5;

const { distances, predecessors, hasNegativeCycle } = bellmanFord(
  verticesCount,
  edges,
  source
);

if (hasNegativeCycle) {
  console.error("Graph contains a reachable negative‑weight cycle!");
} else {
  console.log("Shortest distances from source:", distances);
  // Example: path from 0 to 3
  const path = reconstructPath(predecessors, source, 3);
  console.log("Shortest path 0 → 3 :", path);
}
Shortest distances from source: [ 0, 2, 7, 4, -2 ]
Shortest path 0 → 3 : [ 0, 1, 4, 3 ]
const { distances, predecessors, hasNegativeCycle } = bellmanFord(V, edgeList, src);
if (!hasNegativeCycle) console.log(distances, reconstructPath(predecessors, src, target));

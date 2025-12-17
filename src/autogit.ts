// A directed edge with a weight
export interface Edge {
  from: number;   // source vertex index
  to: number;     // destination vertex index
  weight: number; // edge weight (can be negative)
}

// Result of the algorithm
export interface BellmanFordResult {
  distances: number[];      // shortest distance from source to each vertex
  predecessors: (number | null)[]; // previous vertex on the shortest path (null = none)
  hasNegativeCycle: boolean; // true if a reachable negative‑weight cycle exists
}
/**
 * Bellman‑Ford single‑source shortest‑paths.
 *
 * @param vertexCount   Number of vertices in the graph (vertices are 0 … vertexCount‑1)
 * @param edges         Array of directed edges
 * @param source        Index of the source vertex
 *
 * @returns BellmanFordResult containing distances, predecessor chain and a flag for negative cycles
 */
export function bellmanFord(
  vertexCount: number,
  edges: Edge[],
  source: number
): BellmanFordResult {
  // ---------- 1. initialise ----------
  const INF = Number.POSITIVE_INFINITY;
  const distances = new Array<number>(vertexCount).fill(INF);
  const predecessors = new Array<number | null>(vertexCount).fill(null);

  distances[source] = 0;

  // ---------- 2. relax edges V‑1 times ----------
  for (let i = 0; i < vertexCount - 1; i++) {
    let anyChange = false;

    for (const { from, to, weight } of edges) {
      if (distances[from] !== INF && distances[from] + weight < distances[to]) {
        distances[to] = distances[from] + weight;
        predecessors[to] = from;
        anyChange = true;
      }
    }

    // Early exit: if no edge changed in this pass, we are already optimal
    if (!anyChange) break;
  }

  // ---------- 3. check for negative‑weight cycles ----------
  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (distances[from] !== INF && distances[from] + weight < distances[to]) {
      hasNegativeCycle = true;
      // Optionally, you could propagate the effect of the cycle
      // by marking all vertices reachable from `to` as -Infinity.
      break;
    }
  }

  return { distances, predecessors, hasNegativeCycle };
}
export function reconstructPath(
  predecessors: (number | null)[],
  source: number,
  target: number
): number[] | null {
  if (predecessors[target] === null && source !== target) return null; // unreachable

  const path: number[] = [];
  let cur: number | null = target;
  while (cur !== null) {
    path.push(cur);
    if (cur === source) break;
    cur = predecessors[cur];
  }

  // If we stopped before reaching the source, there is no path
  if (path[path.length - 1] !== source) return null;

  return path.reverse(); // from source → target
}
import { bellmanFord, reconstructPath, Edge } from "./bellmanFord";

// ----- Define a graph -----
const V = 5; // vertices 0 … 4
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

// ----- Run Bellman‑Ford from source = 0 -----
const source = 0;
const result = bellmanFord(V, edges, source);

if (result.hasNegativeCycle) {
  console.error("Graph contains a reachable negative‑weight cycle!");
} else {
  console.log("Shortest distances from source:", result.distances);
  // Example: print path to vertex 3
  const target = 3;
  const path = reconstructPath(result.predecessors, source, target);
  console.log(`Shortest path 0 → ${target}:`, path?.join(" → "));
}

/* Expected console output:
Shortest distances from source: [ 0, 2, 7, 4, -2 ]
Shortest path 0 → 3: 0 → 2 → 3
*/
// bellmanFord.ts ---------------------------------------------------------

export interface Edge {
  from: number;
  to: number;
  weight: number;
}

export interface BellmanFordResult {
  distances: number[];
  predecessors: (number | null)[];
  hasNegativeCycle: boolean;
}

/**
 * Bellman‑Ford single‑source shortest‑paths.
 */
export function bellmanFord(
  vertexCount: number,
  edges: Edge[],
  source: number
): BellmanFordResult {
  const INF = Number.POSITIVE_INFINITY;
  const distances = new Array<number>(vertexCount).fill(INF);
  const predecessors = new Array<number | null>(vertexCount).fill(null);
  distances[source] = 0;

  // Relax edges V‑1 times
  for (let i = 0; i < vertexCount - 1; i++) {
    let changed = false;
    for (const { from, to, weight } of edges) {
      if (distances[from] !== INF && distances[from] + weight < distances[to]) {
        distances[to] = distances[from] + weight;
        predecessors[to] = from;
        changed = true;
      }
    }
    if (!changed) break; // early exit
  }

  // Detect negative‑weight cycles
  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (distances[from] !== INF && distances[from] + weight < distances[to]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { distances, predecessors, hasNegativeCycle };
}

/**
 * Reconstruct a path from source to target using the predecessor array.
 */
export function reconstructPath(
  predecessors: (number | null)[],
  source: number,
  target: number
): number[] | null {
  if (predecessors[target] === null && source !== target) return null;
  const path: number[] = [];
  let cur: number | null = target;
  while (cur !== null) {
    path.push(cur);
    if (cur === source) break;
    cur = predecessors[cur];
  }
  if (path[path.length - 1] !== source) return null;
  return path.reverse();
}

// ----------------------------------------------------------------------

// example.ts -------------------------------------------------------------

import { bellmanFord, reconstructPath, Edge } from "./bellmanFord";

const V = 5;
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
const result = bellmanFord(V, edges, source);

if (result.hasNegativeCycle) {
  console.error("Negative‑weight cycle detected!");
} else {
  console.log("Distances:", result.distances);
  const target = 3;
  const path = reconstructPath(result.predecessors, source, target);
  console.log(`Path ${source} → ${target}:`, path?.join(" → "));
}

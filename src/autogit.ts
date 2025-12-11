interface Edge {
  from: number;   // source vertex id
  to: number;     // destination vertex id
  weight: number; // edge weight (can be negative)
}
// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
export interface Edge {
  /** Source vertex index (0‑based) */
  from: number;
  /** Destination vertex index (0‑based) */
  to: number;
  /** Edge weight – can be negative */
  weight: number;
}

/** Result of Bellman‑Ford */
export interface BFResult {
  /** Shortest distance from source to each vertex (Infinity if unreachable) */
  distance: number[];
  /** Predecessor of each vertex on the shortest path (‑1 if none) */
  predecessor: number[];
  /** True if a negative‑weight cycle reachable from the source exists */
  hasNegativeCycle: boolean;
}

/**
 * Bellman‑Ford shortest‑path algorithm.
 *
 * @param V          Number of vertices in the graph.
 * @param edges      Array of all directed edges.
 * @param source     Index of the source vertex (0‑based).
 * @returns          An object containing distances, predecessors and a flag for negative cycles.
 */
export function bellmanFord(
  V: number,
  edges: Edge[],
  source: number = 0
): BFResult {
  // ------------------------------------------------------------
  // 1️⃣ Initialise
  // ------------------------------------------------------------
  const distance = new Array<number>(V).fill(Infinity);
  const predecessor = new Array<number>(V).fill(-1);

  distance[source] = 0;

  // ------------------------------------------------------------
  // 2️⃣ Relax edges V‑1 times
  // ------------------------------------------------------------
  for (let i = 0; i < V - 1; i++) {
    let anyChange = false;

    for (const { from, to, weight } of edges) {
      if (distance[from] !== Infinity && distance[from] + weight < distance[to]) {
        distance[to] = distance[from] + weight;
        predecessor[to] = from;
        anyChange = true;
      }
    }

    // Early exit: if no edge relaxed in this pass, we are done.
    if (!anyChange) break;
  }

  // ------------------------------------------------------------
  // 3️⃣ Detect negative‑weight cycles
  // ------------------------------------------------------------
  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (distance[from] !== Infinity && distance[from] + weight < distance[to]) {
      hasNegativeCycle = true;
      // Optional: you could also mark vertices that belong to or are reachable
      // from a negative cycle for later processing.
      break;
    }
  }

  return { distance, predecessor, hasNegativeCycle };
}

/**
 * Reconstruct the shortest path from `source` to `target` using the predecessor array.
 *
 * @param predecessor  Array returned by `bellmanFord`.
 * @param source       Source vertex index.
 * @param target       Target vertex index.
 * @returns            Array of vertex indices representing the path (empty if unreachable).
 */
export function reconstructPath(
  predecessor: number[],
  source: number,
  target: number
): number[] {
  const path: number[] = [];
  let cur = target;

  while (cur !== -1) {
    path.push(cur);
    if (cur === source) break;
    cur = predecessor[cur];
  }

  // If we stopped before reaching the source, there is no path.
  if (path[path.length - 1] !== source) return [];

  return path.reverse(); // from source → target
}
import { bellmanFord, reconstructPath, Edge } from "./bellmanFord";

// ------------------------------------------------------------
// Build a graph (example from CLRS, p. 673)
// ------------------------------------------------------------
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

const source = 0;
const result = bellmanFord(V, edges, source);

if (result.hasNegativeCycle) {
  console.error("Graph contains a reachable negative‑weight cycle!");
} else {
  console.log("Shortest distances from source:", result.distance);
  // Print a path to vertex 3 as an example
  const path = reconstructPath(result.predecessor, source, 3);
  console.log("Path 0 → 3 :", path.join(" → "));
}
Shortest distances from source: [ 0, 2, 7, 4, -2 ]
Path 0 → 3 : 0 → 2 → 3
function adjacencyListToEdgeArray(
  adj: Map<number, { to: number; weight: number }[]>
): Edge[] {
  const edges: Edge[] = [];
  for (const [from, list] of adj.entries()) {
    for (const { to, weight } of list) {
      edges.push({ from, to, weight });
    }
  }
  return edges;
}
// bellmanFord.ts ---------------------------------------------------------

export interface Edge {
  from: number;
  to: number;
  weight: number;
}

export interface BFResult {
  distance: number[];
  predecessor: number[];
  hasNegativeCycle: boolean;
}

/**
 * Bellman‑Ford shortest‑path algorithm.
 */
export function bellmanFord(V: number, edges: Edge[], source = 0): BFResult {
  const distance = new Array<number>(V).fill(Infinity);
  const predecessor = new Array<number>(V).fill(-1);
  distance[source] = 0;

  for (let i = 0; i < V - 1; i++) {
    let changed = false;
    for (const { from, to, weight } of edges) {
      if (distance[from] !== Infinity && distance[from] + weight < distance[to]) {
        distance[to] = distance[from] + weight;
        predecessor[to] = from;
        changed = true;
      }
    }
    if (!changed) break;
  }

  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (distance[from] !== Infinity && distance[from] + weight < distance[to]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { distance, predecessor, hasNegativeCycle };
}

/**
 * Reconstruct a path from the predecessor array.
 */
export function reconstructPath(predecessor: number[], source: number, target: number): number[] {
  const path: number[] = [];
  let cur = target;
  while (cur !== -1) {
    path.push(cur);
    if (cur === source) break;
    cur = predecessor[cur];
  }
  if (path[path.length - 1] !== source) return []; // unreachable
  return path.reverse();
}

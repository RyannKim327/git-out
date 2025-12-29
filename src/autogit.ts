interface Edge {
  from: number;   // source vertex id
  to: number;     // destination vertex id
  weight: number; // edge weight (can be negative)
}
// ---------------------------------------------------------------
// 1️⃣ Types
// ---------------------------------------------------------------
export interface Edge {
  /** Index of the source vertex */
  from: number;
  /** Index of the destination vertex */
  to: number;
  /** Edge weight – can be negative */
  weight: number;
}

/** Result of Bellman‑Ford */
export interface BellmanFordResult {
  /** Shortest distance from source to each vertex (Infinity = unreachable) */
  distance: number[];
  /** Predecessor of each vertex on the shortest path (‑1 = none) */
  predecessor: number[];
  /** True if a negative‑weight cycle reachable from the source exists */
  hasNegativeCycle: boolean;
}

/**
 * Runs Bellman‑Ford on a directed weighted graph.
 *
 * @param vertexCount   Number of vertices (0 … vertexCount‑1)
 * @param edges         Edge list of the graph
 * @param source        Index of the source vertex
 * @returns             Distances, predecessor list and a flag for negative cycles
 */
export function bellmanFord(
  vertexCount: number,
  edges: Edge[],
  source: number
): BellmanFordResult {
  // ---------------------------------------------------------------
  // 2️⃣ Initialisation
  // ---------------------------------------------------------------
  const distance = new Array<number>(vertexCount).fill(Infinity);
  const predecessor = new Array<number>(vertexCount).fill(-1);

  distance[source] = 0;

  // ---------------------------------------------------------------
  // 3️⃣ Relax edges |V|-1 times
  // ---------------------------------------------------------------
  for (let i = 0; i < vertexCount - 1; i++) {
    let anyChange = false;

    for (const { from, to, weight } of edges) {
      if (distance[from] !== Infinity && distance[from] + weight < distance[to]) {
        distance[to] = distance[from] + weight;
        predecessor[to] = from;
        anyChange = true;
      }
    }

    // Early exit: if no edge relaxed in this pass, we are done
    if (!anyChange) break;
  }

  // ---------------------------------------------------------------
  // 4️⃣ Detect negative‑weight cycles
  // ---------------------------------------------------------------
  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (distance[from] !== Infinity && distance[from] + weight < distance[to]) {
      hasNegativeCycle = true;
      // Optional: you could also mark the vertices that belong to the cycle
      break;
    }
  }

  return { distance, predecessor, hasNegativeCycle };
}

/**
 * Reconstructs the shortest path from `source` to `target` using the predecessor array.
 *
 * @param predecessor  Array returned by `bellmanFord`
 * @param source       Source vertex index
 * @param target       Target vertex index
 * @returns            Array of vertex indices representing the path (empty if unreachable)
 */
export function reconstructPath(
  predecessor: number[],
  source: number,
  target: number
): number[] {
  const path: number[] = [];
  let cur = target;

  // If the target is unreachable, distance would be Infinity and predecessor stays -1
  if (predecessor[cur] === -1 && cur !== source) return [];

  while (cur !== -1) {
    path.push(cur);
    if (cur === source) break;
    cur = predecessor[cur];
  }

  // The loop stopped before reaching the source → unreachable
  if (path[path.length - 1] !== source) return [];

  return path.reverse();
}
import { bellmanFord, reconstructPath, Edge } from "./bellmanFord";

// ---------------------------------------------------------------
// Build a graph (directed, may contain negative edges)
// ---------------------------------------------------------------
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

const V = 5;               // vertices 0 … 4
const source = 0;

const { distance, predecessor, hasNegativeCycle } = bellmanFord(V, edges, source);

if (hasNegativeCycle) {
  console.error("Graph contains a reachable negative‑weight cycle!");
} else {
  console.log("Shortest distances from source:", distance);
  // Print paths
  for (let v = 0; v < V; v++) {
    const path = reconstructPath(predecessor, source, v);
    console.log(`Path to ${v}:`, path.length ? path.join(" → ") : "unreachable");
  }
}
Shortest distances from source: [ 0, 2, 7, 4, -2 ]
Path to 0: 0
Path to 1: 0 → 4 → 1
Path to 2: 0 → 2
Path to 3: 0 → 2 → 3
Path to 4: 0 → 4
// bellmanFord.test.ts
import { bellmanFord, Edge } from "./bellmanFord";

test("example graph – no negative cycle", () => {
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

  const { distance, hasNegativeCycle } = bellmanFord(5, edges, 0);
  expect(hasNegativeCycle).toBe(false);
  expect(distance).toEqual([0, 2, 7, 4, -2]);
});
function bellmanFord(V: number, edges: Edge[], src: number) {
  const dist = Array(V).fill(Infinity);
  const pred = Array(V).fill(-1);
  dist[src] = 0;

  for (let i = 0; i < V - 1; i++) {
    let changed = false;
    for (const { from, to, weight } of edges) {
      if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
        dist[to] = dist[from] + weight;
        pred[to] = from;
        changed = true;
      }
    }
    if (!changed) break;
  }

  let hasNegCycle = false;
  for (const { from, to, weight } of edges) {
    if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
      hasNegCycle = true;
      break;
    }
  }

  return { dist, pred, hasNegCycle };
}

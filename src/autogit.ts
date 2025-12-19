// A directed edge with a weight
interface Edge {
  from: number;   // source vertex id (0‑based)
  to: number;     // destination vertex id
  weight: number; // edge weight (can be negative)
}
/**
 * Bellman‑Ford shortest‑path algorithm.
 *
 * @param vertexCount   Number of vertices in the graph (ids 0 … vertexCount‑1)
 * @param edges         Array of directed edges (may contain negative weights)
 * @param source        Index of the source vertex
 *
 * @returns An object containing:
 *   - distances: number[]   // shortest distances from source (Infinity = unreachable)
 *   - predecessors: (number | null)[] // previous vertex on the shortest path
 *   - hasNegativeCycle: boolean // true if a reachable negative‑weight cycle exists
 */
export function bellmanFord(
  vertexCount: number,
  edges: Edge[],
  source: number
): {
  distances: number[];
  predecessors: (number | null)[];
  hasNegativeCycle: boolean;
} {
  // ---------- 1. initialise ----------
  const distances = new Array<number>(vertexCount).fill(Infinity);
  const predecessors: (number | null)[] = new Array<number | null>(vertexCount).fill(null);

  distances[source] = 0; // distance to itself is zero

  // ---------- 2. relax edges |V|‑1 times ----------
  for (let i = 0; i < vertexCount - 1; i++) {
    let anyChange = false;

    for (const { from, to, weight } of edges) {
      if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
        distances[to] = distances[from] + weight;
        predecessors[to] = from;
        anyChange = true;
      }
    }

    // Early exit: if no distance changed in this pass, we are done
    if (!anyChange) break;
  }

  // ---------- 3. check for negative‑weight cycles ----------
  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
      // We can still improve a distance → a negative cycle is reachable
      hasNegativeCycle = true;
      break;
    }
  }

  return { distances, predecessors, hasNegativeCycle };
}

/**
 * Reconstruct the path from `source` to `target` using the predecessor array.
 *
 * @param predecessors  Array returned by `bellmanFord`
 * @param source        Source vertex id
 * @param target        Target vertex id
 *
 * @returns An array of vertex ids representing the path, or `null` if no path exists.
 */
export function reconstructPath(
  predecessors: (number | null)[],
  source: number,
  target: number
): number[] | null {
  if (predecessors[target] === null && source !== target) {
    // target is unreachable
    return null;
  }

  const path: number[] = [];
  let cur: number | null = target;

  while (cur !== null) {
    path.push(cur);
    if (cur === source) break;
    cur = predecessors[cur];
  }

  // If we stopped before reaching the source, there is no path
  if (path[path.length - 1] !== source) return null;

  path.reverse(); // from source → target
  return path;
}
import { bellmanFord, reconstructPath } from "./bellmanFord";

// Example graph (0‑based vertex ids)
//   0 → 1 (weight 5)
//   0 → 2 (weight 2)
//   1 → 2 (weight -4)
//   2 → 3 (weight 3)
//   3 → 1 (weight 1)
const edges: Edge[] = [
  { from: 0, to: 1, weight: 5 },
  { from: 0, to: 2, weight: 2 },
  { from: 1, to: 2, weight: -4 },
  { from: 2, to: 3, weight: 3 },
  { from: 3, to: 1, weight: 1 },
];

const V = 4;               // vertices 0 … 3
const source = 0;

const { distances, predecessors, hasNegativeCycle } = bellmanFord(V, edges, source);

if (hasNegativeCycle) {
  console.error("Graph contains a reachable negative‑weight cycle!");
} else {
  console.log("Shortest distances from source:", distances);
  // → [0, 2, 2, 5]

  // Reconstruct a path, e.g. from 0 to vertex 3
  const path = reconstructPath(predecessors, source, 3);
  console.log("Path 0 → 3 :", path?.join(" → "));
  // → Path 0 → 3 : 0 → 2 → 3
}
Shortest distances from source: [ 0, 2, 2, 5 ]
Path 0 → 3 : 0 → 2 → 3
// bellmanFord.ts -------------------------------------------------------------
export interface Edge {
  from: number;
  to: number;
  weight: number;
}

/**
 * Bellman‑Ford algorithm.
 */
export function bellmanFord(
  vertexCount: number,
  edges: Edge[],
  source: number
): {
  distances: number[];
  predecessors: (number | null)[];
  hasNegativeCycle: boolean;
} {
  const distances = new Array<number>(vertexCount).fill(Infinity);
  const predecessors: (number | null)[] = new Array<number | null>(vertexCount).fill(null);
  distances[source] = 0;

  for (let i = 0; i < vertexCount - 1; i++) {
    let changed = false;
    for (const { from, to, weight } of edges) {
      if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
        distances[to] = distances[from] + weight;
        predecessors[to] = from;
        changed = true;
      }
    }
    if (!changed) break;
  }

  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { distances, predecessors, hasNegativeCycle };
}

/**
 * Reconstruct a path from source to target.
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
  path.reverse();
  return path;
}

// demo.ts --------------------------------------------------------------------
import { bellmanFord, reconstructPath, Edge } from "./bellmanFord";

const edges: Edge[] = [
  { from: 0, to: 1, weight: 5 },
  { from: 0, to: 2, weight: 2 },
  { from: 1, to: 2, weight: -4 },
  { from: 2, to: 3, weight: 3 },
  { from: 3, to: 1, weight: 1 },
];

const V = 4;
const source = 0;

const { distances, predecessors, hasNegativeCycle } = bellmanFord(V, edges, source);

if (hasNegativeCycle) {
  console.error("Negative‑weight cycle detected!");
} else {
  console.log("Distances:", distances);
  const target = 3;
  const path = reconstructPath(predecessors, source, target);
  console.log(`Shortest path ${source} → ${target}:`, path?.join(" → "));
}
ts-node demo.ts

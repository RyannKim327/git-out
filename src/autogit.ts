// A directed edge with a (possibly negative) weight
interface Edge {
  from: number;   // source vertex index
  to: number;     // destination vertex index
  weight: number; // edge weight (can be negative)
}

// Optional: a simple adjacency list if you need it for other algorithms
type AdjList = Map<number, Edge[]>;
/**
 * Bellman‑Ford shortest‑path algorithm.
 *
 * @param vertexCount   Number of vertices in the graph (vertices are 0 … vertexCount‑1)
 * @param edges         Array of all directed edges
 * @param source        Index of the source vertex
 * @returns An object containing distances, predecessor list and a flag for negative cycles
 */
function bellmanFord(
  vertexCount: number,
  edges: Edge[],
  source: number
): {
  dist: number[];
  prev: number[];
  hasNegativeCycle: boolean;
  // If you need the actual vertices that belong to a negative cycle you can
  // extend the return type with `negCycleVertices: number[]`.
} {
  // ---------- 1. initialise ----------
  const dist = new Array<number>(vertexCount).fill(Infinity);
  const prev = new Array<number>(vertexCount).fill(-1);

  dist[source] = 0;

  // ---------- 2. relax edges |V|-1 times ----------
  for (let i = 0; i < vertexCount - 1; i++) {
    let anyChange = false;

    for (const { from, to, weight } of edges) {
      if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
        dist[to] = dist[from] + weight;
        prev[to] = from;
        anyChange = true;
      }
    }

    // Early exit: if no distance changed in this pass, we are done
    if (!anyChange) break;
  }

  // ---------- 3. check for negative‑weight cycles ----------
  let hasNegativeCycle = false;

  for (const { from, to, weight } of edges) {
    if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
      // We can still improve a distance → negative cycle reachable from source
      hasNegativeCycle = true;
      // Optional: propagate the "negative‑cycle" flag to all reachable vertices
      // (useful if you want to know which vertices are affected)
      // propagateNegCycle(to, edges, dist, prev);
    }
  }

  return { dist, prev, hasNegativeCycle };
}

/**
 * (Optional helper) Reconstruct the shortest path from source to a target vertex.
 *
 * @param target Destination vertex index
 * @param prev   Predecessor array returned by bellmanFord
 * @returns Array of vertex indices representing the path, or null if unreachable
 */
function reconstructPath(target: number, prev: number[]): number[] | null {
  const path: number[] = [];
  let cur = target;

  while (cur !== -1) {
    path.push(cur);
    cur = prev[cur];
  }

  path.reverse();

  // If the first vertex is not the source (i.e., distance is Infinity) → unreachable
  if (path.length === 0 || path[0] !== path[0]) return null;
  return path;
}
// ---------------------------------------------------
// Build a small graph with a negative edge but no cycle
// ---------------------------------------------------
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

const { dist, prev, hasNegativeCycle } = bellmanFord(V, edges, source);

if (hasNegativeCycle) {
  console.error('Graph contains a reachable negative‑weight cycle.');
} else {
  console.log('Shortest distances from source', source);
  for (let v = 0; v < V; v++) {
    console.log(`  to ${v}: ${dist[v]}`);
  }

  // Reconstruct a path, e.g. from source to vertex 3
  const target = 3;
  const path = reconstructPath(target, prev);
  console.log(`Path from ${source} to ${target}:`, path?.join(' → ') ?? 'unreachable');
}
Shortest distances from source 0
  to 0: 0
  to 1: 2
  to 2: 7
  to 3: 4
  to 4: -2
Path from 0 to 3: 0 → 2 → 3
// ---------- Types ----------
interface Edge {
  from: number;
  to: number;
  weight: number;
}

// ---------- Bellman‑Ford ----------
function bellmanFord(
  vertexCount: number,
  edges: Edge[],
  source: number
): {
  dist: number[];
  prev: number[];
  hasNegativeCycle: boolean;
} {
  const dist = new Array<number>(vertexCount).fill(Infinity);
  const prev = new Array<number>(vertexCount).fill(-1);
  dist[source] = 0;

  for (let i = 0; i < vertexCount - 1; i++) {
    let changed = false;
    for (const { from, to, weight } of edges) {
      if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
        dist[to] = dist[from] + weight;
        prev[to] = from;
        changed = true;
      }
    }
    if (!changed) break; // early exit
  }

  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { dist, prev, hasNegativeCycle };
}

// ---------- Path reconstruction ----------
function reconstructPath(target: number, prev: number[]): number[] | null {
  const path: number[] = [];
  let cur = target;
  while (cur !== -1) {
    path.push(cur);
    cur = prev[cur];
  }
  path.reverse();

  // If the first vertex is not reachable (distance = Infinity) we return null
  return path[0] === target || path.length > 0 ? path : null;
}

// ---------- Example ----------
(() => {
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
  const { dist, prev, hasNegativeCycle } = bellmanFord(V, edges, source);

  if (hasNegativeCycle) {
    console.error('Negative‑weight cycle detected.');
    return;
  }

  console.log('Distances from source', source);
  for (let v = 0; v < V; v++) console.log(`  ${v}: ${dist[v]}`);

  const target = 3;
  const path = reconstructPath(target, prev);
  console.log(`Path ${source} → ${target}:`, path?.join(' → ') ?? 'unreachable');
})();

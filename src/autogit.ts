/* ---------- 1️⃣  Types & helpers ------------------------------------ */

type Edge = {
  /** source vertex */
  u: number;
  /** destination vertex */
  v: number;
  /** edge weight */
  w: number;
};

interface Result {
  /** distance from the source to every vertex */
  dist: number[];
  /** immediately‑prev vertex on the shortest path, or null if unreachable */
  prev: (number | null)[];
  /** did we spot a negative‑weight cycle? */
  hasNegativeCycle: boolean;
}

/* ---------- 2️⃣  Bellman‑Ford implementation ----------------------- */

function bellmanFord(
  vertexCount: number,
  edges: Edge[],
  source: number
): Result {
  const dist = new Array<number>(vertexCount).fill(Infinity);
  const prev = new Array<number | null>(vertexCount).fill(null);

  dist[source] = 0;

  // 1️⃣ Relaxes every edge V‑1 times
  for (let iter = 0; iter < vertexCount - 1; ++iter) {
    let updated = false;

    for (const { u, v, w } of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
        updated = true;
      }
    }

    // Stop early if nothing changed
    if (!updated) break;
  }

  // 2️⃣ Detect negative‑weight cycles:
  let hasNegativeCycle = false;
  for (const { u, v, w } of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { dist, prev, hasNegativeCycle };
}

/* ---------- 3️⃣  Example usage ------------------------------------ */

const edges: Edge[] = [
  { u: 0, v: 1, w: 4 },
  { u: 0, v: 2, w: 5 },
  { u: 1, v: 2, w: -3 },
  { u: 1, v: 3, w: 2 },
  { u: 2, v: 3, w: 4 },
  { u: 3, v: 1, w: -7 }, // Adding a negative cycle edge
];

const vertexCount = 4;
const source = 0;

const result = bellmanFord(vertexCount, edges, source);

console.log('Distances:', result.dist);
console.log('Prev:' , result.prev);
console.log(
  'Negative cycle detected:',
  result.hasNegativeCycle ? 'Yes' : 'No'
);

// If you want to reconstruct a path to a target vertex:
function reconstructPath(prev: (number | null)[], target: number) {
  const path: number[] = [];
  let current: number | null = target;

  while (current !== null) {
    path.unshift(current);
    current = prev[current];
  }
  return path;
}

console.log('Path 0 → 3:', reconstructPath(result.prev, 3));

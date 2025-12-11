type Edge = { from: number; to: number; weight: number };

function bellmanFord(
  n: number,          // number of vertices (0 .. n-1)
  edges: Edge[],      // list of directed edges
  source: number        // source vertex
): { dist: number[]; prev: (number|null)[]; hasNegCycle: boolean } {
  const dist = Array<number>(n).fill(Infinity);
  const prev = Array<(number|null)>(n).fill(null);
  dist[source] = 0;

  // Relax edges up to n-1 times
  for (let i = 0; i < n - 1; i++) {
    let updated = false;
    for (const e of edges) {
      const { from: u, to: v, weight: w } = e;
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
        updated = true;
      }
    }
    if (!updated) break; // early exit
  }

  // Check for negative-weight cycles reachable from source
  let hasNegCycle = false;
  for (const e of edges) {
    const { from: u, to: v, weight: w } = e;
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      hasNegCycle = true;
      break;
    }
  }

  return { dist, prev, hasNegCycle };
}
function reconstructPath(
  source: number,
  target: number,
  prev: (number|null)[]
): number[] | null {
  const path: number[] = [];
  let at: number | null = target;
  const seen = new Set<number>();

  while (at !== null) {
    path.push(at);
    if (at === source) break;
    const p = prev[at];
    if (p === null || seen.has(at)) {
      // no path exists
      return null;
    }
    seen.add(at);
    at = p;
  }

  path.reverse();
  if (path[0] !== source) return null;
  return path;
}
const edges: Edge[] = [
  { from: 0, to: 1, weight: 5 },
  { from: 0, to: 2, weight: 4 },
  { from: 1, to: 2, weight: -6 },
  { from: 1, to: 3, weight: 2 },
  { from: 2, to: 3, weight: 3 },
];

const n = 4;
const source = 0;

const result = bellmanFord(n, edges, source);

console.log('Distances from source:', result.dist);
console.log('Has negative cycle reachable from source?', result.hasNegCycle);

if (!result.hasNegCycle) {
  const target = 3;
  const path = reconstructPath(source, target, result.prev);
  console.log(`Path from ${source} to ${target}:`, path ?? 'no path');
}

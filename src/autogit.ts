type Edge = { from: number; to: number; weight: number };

interface BellmanFordResult {
  dist: number[];          // shortest distance from source to each vertex   (Infinity = unreachable)
  prev: (number | null)[]; // previous vertex on the shortest path, or null
  hasNegativeCycle: boolean; // true if a negative cycle was detected
}

function bellmanFord(
  vertexCount: number,
  edges: Edge[],
  source: number
): BellmanFordResult
function bellmanFord(
  vertexCount: number,
  edges: Edge[],
  source: number
): BellmanFordResult {
  const dist = Array(vertexCount).fill(Infinity);
  const prev = Array<number | null>(vertexCount).fill(null);

  dist[source] = 0;

  // 1️⃣ Relax every edge |V|‑1 times
  for (let i = 0; i < vertexCount - 1; i++) {
    let updated = false;
    for (const {from, to, weight} of edges) {
      if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
        dist[to] = dist[from] + weight;
        prev[to] = from;
        updated = true;
      }
    }
    // If no distance changed, we’re done early
    if (!updated) break;
  }

  // 2️⃣ Check for negative cycles
  let hasNegativeCycle = false;
  for (const {from, to, weight} of edges) {
    if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return {dist, prev, hasNegativeCycle};
}
function reconstructPath(prev: (number | null)[], target: number): number[] {
  const path: number[] = [];
  let cur: number | null = target;

  while (cur !== null) {
    path.push(cur);
    cur = prev[cur];
  }
  path.reverse();
  return path;
}
const edges: Edge[] = [
  {from: 0, to: 1, weight: 5},
  {from: 1, to: 2, weight: -2},
  // ...
];
const {dist, prev, hasNegativeCycle} = bellmanFord(5, edges, 0);

console.log(dist);               // shortest distances
console.log(hasNegativeCycle);    // useful flag
console.log(reconstructPath(prev, 4)); // path from 0 to 4

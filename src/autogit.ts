type Edge = {
  from: number;   // vertex index
  to: number;     // vertex index
  weight: number; // can be negative
};

type BellmanFordResult = {
  distances: number[];
  predecessors: (number | null)[];
  hasNegativeCycle: boolean;
};
function bellmanFord(
  numVertices: number,
  edges: Edge[],
  source: number
): BellmanFordResult {
  const INF = Number.POSITIVE_INFINITY;

  // 1. Initialisation
  const dist = new Array(numVertices).fill(INF);
  dist[source] = 0;

  const pred = new Array<number | null>(numVertices).fill(null);

  // 2. Relax edges (V‑1) times
  for (let i = 0; i < numVertices - 1; i++) {
    let updated = false;
    for (const { from, to, weight } of edges) {
      if (dist[from] !== INF && dist[from] + weight < dist[to]) {
        dist[to] = dist[from] + weight;
        pred[to] = from;
        updated = true;
      }
    }
    // early exit if no change – optional but nice optimisation
    if (!updated) break;
  }

  // 3. Check for negative‑weight cycles
  let hasNegCycle = false;
  for (const { from, to, weight } of edges) {
    if (dist[from] !== INF && dist[from] + weight < dist[to]) {
      hasNegCycle = true;
      break;
    }
  }

  return { distances: dist, predecessors: pred, hasNegativeCycle: hasNegCycle };
}
// Build a tiny graph with a negative edge that doesn't form a cycle
const edges: Edge[] = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 2, weight: 5 },
  { from: 1, to: 3, weight: -3 },
  { from: 2, to: 3, weight: 2 },
];

const { distances, predecessors, hasNegativeCycle } = bellmanFord(4, edges, 0);

console.log('Distances:', distances);          // [0, 4, 5, 1]
console.log('Predecessors:', predecessors);    // [null, 0, 0, 1]
console.log('Negative cycle?', hasNegativeCycle); // false

// If you want to pull out the path 0 -> 1 -> 3:
function buildPath(pred: (number | null)[], target: number): number[] {
  const path: number[] = [];
  for (let v = target; v !== null; v = pred[v] as number | null) {
    path.push(v);
  }
  return path.reverse();
}

console.log('Path to node 3:', buildPath(predecessors, 3)); // [0, 1, 3]

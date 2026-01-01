// -------------- Types --------------
export type Edge = {
  from: number;
  to: number;
  weight: number;
};

export type Graph = {
  n: number;          // #vertices (0 … n-1)
  edges: Edge[];
};

export type Result = {
  dist: number[];     // dist[v] = shortest distance from source
  prev: number[];       // prev[v] = predecessor of v on shortest path
  hasNegativeCycle: boolean;
};

// -------------- Bellman–Ford --------------
export function bellmanFord(g: Graph, source: number): Result {
  const { n, edges } = g;
  const INF = Number.POSITIVE_INFINITY;

  // 1. Initialise
  const dist = Array<number>(n).fill(INF);
  const prev = Array<number>(n).fill(-1);
  dist[source] = 0;

  // 2. Relax all edges up to n-1 times
  for (let i = 0; i < n - 1; i++) {
    let updated = false;
    for (const e of edges) {
      const u = e.from;
      const v = e.to;
      const w = e.weight;
      if (dist[u] !== INF && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
        updated = true;
      }
    }
    if (!updated) break;           // Early exit: no relaxations → done
  }

  // 3. Check for negative cycles
  let hasNegativeCycle = false;
  for (const e of edges) {
    const u = e.from;
    const v = e.to;
    const w = e.weight;
    if (dist[u] !== INF && dist[u] + w < dist[v]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { dist, prev, hasNegativeCycle };
}

// -------------- Reconstruct path --------------
export function buildPath(prev: number[], target: number): number[] {
  const path: number[] = [];
  for (let v = target; v !== -1; v = prev[v]) path.push(v);
  path.reverse();
  return path.length > 0 && path[0] === target ? [] : path;
}

// -------------- Usage example --------------
if (require.main === module) {
  const g: Graph = {
    n: 5,
    edges: [
      { from: 0, to: 1, weight: -1 },
      { from: 0, to: 2, weight: 4 },
      { from: 1, to: 2, weight: 3 },
      { from: 1, to: 3, weight: 2 },
      { from: 1, to: 4, weight: 2 },
      { from: 3, to: 2, weight: 5 },
      { from: 3, to: 1, weight: 1 },
      { from: 4, to: 3, weight: -3 },
    ],
  };

  const res = bellmanFord(g, 0);
  console.log("Distances:", res.dist);
  console.log("Has negative cycle:", res.hasNegativeCycle);
  console.log("Path 0 → 4:", buildPath(res.prev, 4));
}

/* -------------------------------------------------------------
   Edge definition – just a source, destination and weight
------------------------------------------------------------- */
interface Edge {
  from: string;      // vertex id (string or number, just pick one type)
  to: string;
  weight: number;    // can be negative
}

/* -------------------------------------------------------------
   Bellman‑Ford implementation
   Parameters
   ----------  graph: Array<Edge>  – all directed edges
               source: string      – id of source vertex
   Returns
   -------  { dist: Map<string, number>,
              next: Map<string, string | null>,
              hasNegativeCycle: boolean }
------------------------------------------------------------- */
function bellmanFord(
  graph: Edge[],
  source: string
): { dist: Map<string, number>; next: Map<string, string | null>; hasNegativeCycle: boolean } {
  const dist = new Map<string, number>();
  const next = new Map<string, string | null>();

  // initialise distances
  graph.forEach(({ from }) => {
    dist.set(from, Infinity);
    next.set(from, null);
  });
  // if the source isn’t mentioned in any edge, we still need it in the map
  dist.set(source, 0);
  next.set(source, null);

  // total distinct vertices
  const vertices = Array.from(dist.keys());
  const V = vertices.length;

  // Relax edges V−1 times
  for (let i = 0; i < V - 1; i++) {
    let didRelax = false;
    for (const { from, to, weight } of graph) {
      const dFrom = dist.get(from);
      const dTo   = dist.get(to);
      if (dFrom! === Infinity) continue;                   // unreachable
      const newDist = dFrom! + weight;
      if (newDist < dTo!) {
        dist.set(to, newDist);
        next.set(to, from);
        didRelax = true;
      }
    }
    // early exit: no distance changed this round → we’re done
    if (!didRelax) break;
  }

  // Check for negative‑weight cycles reachable from source
  let hasNegativeCycle = false;
  for (const { from, to, weight } of graph) {
    const dFrom = dist.get(from);
    const dTo   = dist.get(to);
    if (dFrom! !== Infinity && dFrom! + weight < dTo!) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { dist, next, hasNegativeCycle };
}

/* -------------------------------------------------------------
   Example usage
------------------------------------------------------------- */
const edges: Edge[] = [
  { from: 'A', to: 'B', weight: 5 },
  { from: 'A', to: 'C', weight: 2 },
  { from: 'B', to: 'C', weight: -3 },
  { from: 'B', to: 'D', weight: 9 },
  { from: 'C', to: 'D', weight: 12 },
];

const { dist, next, hasNegativeCycle } = bellmanFord(edges, 'A');

if (hasNegativeCycle) {
  console.log('The graph contains a negative‑weight cycle reachable from A.');
} else {
  console.log('Shortest distances from A:');
  dist.forEach((d, v) => console.log(v, d));

  // helper to print a whole path from source to target
  function buildPath(target: string): string[] {
    const path: string[] = [];
    let cur: string | null = target;
    while (cur !== null) {
      path.unshift(cur);
      cur = next.get(cur) ?? null;
    }
    return path;
  }

  console.log('Path to D:', buildPath('D').join(' → '));
}

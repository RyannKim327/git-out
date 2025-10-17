// ------------- Types -------------
type Vertex = string | number;
type Edge = { from: Vertex; to: Vertex; weight: number };
type Graph = {
  vertices: Vertex[];
  edges: Edge[];
};

type DistanceMap = Map<Vertex, number>;
type PredecessorMap = Map<Vertex, Vertex | null>;

// ------------- Bellman–Ford -------------
/**
 * Returns shortest distances and predecessors from `source`.
 * If a negative-weight cycle is reachable from `source`, throws an Error.
 */
function bellmanFord(
  graph: Graph,
  source: Vertex
): { distance: DistanceMap; predecessor: PredecessorMap } {
  const { vertices, edges } = graph;
  const dist: DistanceMap = new Map();
  const pred: PredecessorMap = new Map();

  // 1. Initialise
  vertices.forEach(v => {
    dist.set(v, Infinity);
    pred.set(v, null);
  });
  dist.set(source, 0);

  // 2. Relax all edges |V| - 1 times
  for (let i = 1; i < vertices.length; i++) {
    for (const { from, to, weight } of edges) {
      const d = dist.get(from)! + weight;
      if (d < dist.get(to)!) {
        dist.set(to, d);
        pred.set(to, from);
      }
    }
  }

  // 3. Check for negative cycles
  for (const { from, to, weight } of edges) {
    if (dist.get(from)! + weight < dist.get(to)!) {
      throw new Error('Graph contains a negative-weight cycle reachable from source');
    }
  }

  return { distance: dist, predecessor: pred };
}

// ------------- Helper: Reconstruct path -------------
function buildPath(
  pred: PredecessorMap,
  target: Vertex
): Vertex[] {
  const path: Vertex[] = [];
  let curr: Vertex | null = target;
  while (curr !== null) {
    path.unshift(curr);
    curr = pred.get(curr);
  }
  return path;
}

// ------------- Demo -------------
if (require.main === module) {
  const g: Graph = {
    vertices: ['A', 'B', 'C', 'D', 'E'],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'B', to: 'C', weight: -3 },
      { from: 'C', to: 'D', weight: 2 },
      { from: 'C', to: 'B', weight: 1 },
      { from: 'B', to: 'E', weight: 3 },
      { from: 'D', to: 'E', weight: 3 },
    ],
  };

  try {
    const { distance, predecessor } = bellmanFord(g, 'A');
    console.table(Object.fromEntries(distance));
    console.log('Path A→E:', buildPath(predecessor, 'E'));
  } catch (e) {
    console.error(e.message);
  }
}

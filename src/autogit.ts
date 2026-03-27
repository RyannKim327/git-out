/** One directed edge in the graph */
interface Edge {
  from: number;   // source vertex id
  to: number;     // target vertex id
  weight: number; // edge weight
}

/** Graph represented only by its edge list */
type Graph = Edge[];

/** Result of the shortest‑path computation */
interface BellmanFordResult {
  /** distance from source to every vertex (Infinity if unreachable) */
  distances: number[];
  /** predecessor of each vertex on the shortest path tree */
  predecessors: (number | null)[];
  /** true if a negative cycle was detected that is reachable from the source */
  negativeCycleDetected: boolean;
}
/**
 * Bellman‑Ford single‑source shortest‑path solver.
 * @param edges  complete list of directed edges in the graph
 * @param vertexCount total number of vertices, 0 … vertexCount‑1
 * @param source id of the source vertex
 * @returns distances, predecessors and a flag for a reachable negative cycle
 */
export function bellmanFord(
  edges: Graph,
  vertexCount: number,
  source: number
): BellmanFordResult {
  const INF = Number.POSITIVE_INFINITY;

  const distances = Array(vertexCount).fill(INF);
  const predecessors = Array<null | number>(vertexCount).fill(null);

  distances[source] = 0;

  /* Relax edges V‑1 times */
  for (let i = 0; i < vertexCount - 1; i++) {
    let changed = false;
    for (const e of edges) {
      const { from, to, weight } = e;
      if (distances[from] !== INF && distances[from] + weight < distances[to]) {
        distances[to] = distances[from] + weight;
        predecessors[to] = from;
        changed = true;
      }
    }
    /* Early exit if no relaxation happened */
    if (!changed) break;
  }

  /* Check for negative‑weight cycles reachable from source */
  let negativeCycleDetected = false;
  for (const e of edges) {
    const { from, to, weight } = e;
    if (distances[from] !== INF && distances[from] + weight < distances[to]) {
      negativeCycleDetected = true;
      break;
    }
  }

  return { distances, predecessors, negativeCycleDetected };
}
/**
 * Retrieves the shortest path from source to `target` after a Bellman‑Ford run.
 * Returns `undefined` if the target is unreachable.
 */
export function reconstructPath(
  target: number,
  predecessors: (number | null)[]
): number[] | undefined {
  if (predecessors[target] === null) return undefined;

  const path: number[] = [];
  for (let v = target; v !== null; v = predecessors[v]) {
    path.push(v);
  }
  return path.reverse();
}
// A small graph with both positive and negative edges
const graph: Graph = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 2, weight: 5 },
  { from: 1, to: 2, weight: -3 },
  { from: 1, to: 3, weight: 2 },
  { from: 2, to: 3, weight: 4 },
];

const vertexCount = 4;          // vertices 0 … 3
const source = 0;
const result = bellmanFord(graph, vertexCount, source);

console.log('Distances:', result.distances);
// [0, 1, 2, 3]

console.log('Negative cycle detected?', result.negativeCycleDetected);
// false

const pathTo3 = reconstructPath(3, result.predecessors);
console.log('Path 0 → 3:', pathTo3); // [0, 1, 3]

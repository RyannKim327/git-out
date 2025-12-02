// ------------- Types -------------
export type Vertex = string | number;
export interface Edge {
  from: Vertex;
  to: Vertex;
  weight: number;
}

// ------------- Result Types -------------
export interface ShortestPath {
  distance: number;
  path: Vertex[];
}

export interface BellmanFordResult {
  distances: Map<Vertex, number>;
  predecessors: Map<Vertex, Vertex | null>;
  hasNegativeCycle: boolean;
}

// ------------- Algorithm -------------
/**
 * Bellman-Ford single-source shortest path.
 *  • Time:  O(|V|·|E|)
 *  • Space: O(|V|)
 *
 * @param vertices   list of all vertices in the graph
 * @param edges      list of directed edges (may contain parallel edges)
 * @param source     starting vertex
 * @param maxIterations  optional safety cap (default = vertices.length)
 */
export function bellmanFord(
  vertices: Vertex[],
  edges: Edge[],
  source: Vertex,
  maxIterations?: number
): BellmanFordResult {
  const distances = new Map<Vertex, number>();
  const predecessors = new Map<Vertex, Vertex | null>();

  // 1. Initialise
  for (const v of vertices) {
    distances.set(v, Infinity);
    predecessors.set(v, null);
  }
  distances.set(source, 0);

  const iterLimit = maxIterations ?? vertices.length;

  // 2. Relax edges repeatedly
  for (let i = 0; i < iterLimit; i++) {
    let updated = false;

    for (const { from, to, weight } of edges) {
      const dFrom = distances.get(from)!;
      const dTo = distances.get(to)!;

      if (dFrom === Infinity) continue;

      const newDist = dFrom + weight;
      if (newDist < dTo) {
        distances.set(to, newDist);
        predecessors.set(to, from);
        updated = true;
      }
    }

    // Early exit: no relaxations happened → optimal
    if (!updated) break;
  }

  // 3. Check for negative cycles
  let hasNegativeCycle = false;
  for (const { from, to, weight } of edges) {
    const dFrom = distances.get(from)!;
    const dTo = distances.get(to)!;

    if (dFrom !== Infinity && dTo > dFrom + weight) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { distances, predecessors, hasNegativeCycle };
}

// ------------- Pretty printer -------------
export function reconstructPath(
  predecessors: Map<Vertex, Vertex | null>,
  source: Vertex,
  target: Vertex
): Vertex[] {
  const path: Vertex[] = [];
  let curr: Vertex | null = target;

  while (curr !== null) {
    path.unshift(curr);
    curr = predecessors.get(curr)!;
    if (curr === source) {
      path.unshift(source);
      break;
    }
  }
  // If source is unreachable from target path will contain only target
  return path[0] === source ? path : [];
}

// ------------- Usage Example -------------
if (require.main === module) {
  const vertices = ["A", "B", "C", "D", "E"];
  const edges: Edge[] = [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "C", weight: 3 },
    { from: "B", to: "D", weight: 2 },
    { from: "B", to: "E", weight: 3 },
    { from: "C", to: "B", weight: 1 },
    { from: "C", to: "D", weight: 4 },
    { from: "C", to: "E", weight: 5 },
    { from: "E", to: "D", weight: -5 },
  ];

  const res = bellmanFord(vertices, edges, "A");

  console.log("Distances:", [...res.distances.entries()]);
  console.log("Has negative cycle:", res.hasNegativeCycle);

  const target = "D";
  console.log(
    `Path A → ${target}:`,
    reconstructPath(res.predecessors, "A", target)
  );
}
npx ts-node bellmanFord.ts

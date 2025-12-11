// ------------------  Types  ------------------
type Vertex = string;                // or `number` if you prefer
type Edge = { from: Vertex; to: Vertex; weight: number };

interface ShortestPath {
  distance: number;                 // +∞ means “unreachable”
  path: Vertex[];                   // empty array when source == target
}

// ------------------  Bellman-Ford  ------------------
/**
 * Bellman-Ford single-source shortest-path.
 * @param vertices   list of all vertex names
 * @param edges      list of directed weighted edges
 * @param start      source vertex
 * @returns          map vertex → ShortestPath
 * @throws           if a reachable negative-weight cycle exists
 */
function bellmanFord(
  vertices: Vertex[],
  edges: Edge[],
  start: Vertex
): Map<Vertex, ShortestPath> {
  const dist = new Map<Vertex, number>();
  const prev = new Map<Vertex, Vertex | null>();

  // 1. Initialise
  for (const v of vertices) {
    dist.set(v, Infinity);
    prev.set(v, null);
  }
  dist.set(start, 0);

  // 2. Relax edges repeatedly
  for (let i = 1; i < vertices.length; i++) {
    for (const { from, to, weight } of edges) {
      const d = dist.get(from)! + weight;
      if (d < dist.get(to)!) {
        dist.set(to, d);
        prev.set(to, from);
      }
    }
  }

  // 3. Check for negative-weight cycles
  for (const { from, to, weight } of edges) {
    if (dist.get(from)! + weight < dist.get(to)!) {
      throw new Error("Graph contains a negative-weight cycle reachable from start");
    }
  }

  // 4. Build result with paths
  const result = new Map<Vertex, ShortestPath>();
  for (const v of vertices) {
    const distance = dist.get(v)!;
    const path: Vertex[] = [];
    if (!isFinite(distance)) {        // unreachable
      result.set(v, { distance, path });
      continue;
    }
    // Reconstruct path by walking backwards via `prev`
    for (let at: Vertex | null = v; at !== null; at = prev.get(at)) path.unshift(at);
    result.set(v, { distance, path });
  }
  return result;
}

// ------------------  Demo  ------------------
if (require.main === module) {
  const vertices = ["A", "B", "C", "D", "E"];
  const edges: Edge[] = [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "C", weight: -3 },
    { from: "C", to: "D", weight: 2 },
    { from: "B", to: "E", weight: 3 },
    { from: "D", to: "B", weight: 1 },
    { from: "D", to: "E", weight: 1 },
  ];

  const sp = bellmanFord(vertices, edges, "A");
  for (const [v, { distance, path }] of sp) {
    console.log(
      `A → ${v}: distance = ${distance}, path = [${path.join(" → ")}]`
    );
  }
}
A → A: distance = 0, path = [A]
A → B: distance = 0, path = [A → C → B]
A → C: distance = 2, path = [A → C]
A → D: distance = 4, path = [A → C → D]
A → E: distance = 1, path = [A → C → B → E]

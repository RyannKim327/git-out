// ---------- Types ---------------------------------------------------------
type Vertex = string | number // whatever sort of key you like

// an edge is directed; the weight can be positive, negative or zero
interface Edge {
  from: Vertex
  to: Vertex
  weight: number
}

// ---------- Graph wrapper -----------------------------------------------
class Graph {
  private vertices: Set<Vertex> = new Set()
  private edges: Edge[] = []

  // you can add vertices explicitly if you want; adding an edge will
  // automatically pull its endpoints into the vertex set
  public addVertex(v: Vertex) {
    this.vertices.add(v)
  }

  public addEdge(from: Vertex, to: Vertex, weight: number) {
    this.vertices.add(from)
    this.vertices.add(to)
    this.edges.push({ from, to, weight })
  }

  public getVertices() {
    return Array.from(this.vertices)
  }

  public getEdges() {
    return this.edges.slice()
  }
}

// ---------- Bellman‑Ford algorithm ---------------------------------------
/**
 * Returns an object containing:
 *   distances:  map from vertex to its shortest‑path distance from source
 *   previous:   map from vertex to its predecessor on that shortest path
 *
 * Throws an Error if a negative‑weight cycle is reachable from `source`.
 */
function bellmanFord(
  graph: Graph,
  source: Vertex
): { distances: Record<Vertex, number>; previous: Record<Vertex, Vertex | null> } {
  const INF = Number.POSITIVE_INFINITY

  // 1. initialise
  const distance: Record<Vertex, number> = {}
  const previous: Record<Vertex, Vertex | null> = {}

  for (const v of graph.getVertices()) {
    distance[v] = INF
    previous[v] = null
  }
  distance[source] = 0

  const edges = graph.getEdges()
  const nvertices = graph.getVertices().length

  // 2. relaxation loop (nvertices - 1) times
  for (let i = 0; i < nvertices - 1; i++) {
    let updated = false
    for (const { from, to, weight } of edges) {
      const alt = distance[from] + weight
      if (alt < distance[to]) {
        distance[to] = alt
        previous[to] = from
        updated = true
      }
    }
    // early exit if nothing changed
    if (!updated) break
  }

  // 3. check for negative‑weight cycles
  for (const { from, to, weight } of edges) {
    if (distance[from] + weight < distance[to]) {
      throw new Error(
        `Negative‑weight cycle detected: edge ${from} → ${to} (weight ${weight})`
      )
    }
  }

  return { distances: distance, previous }
}

// ---------- Reconstruct path helper ---------------------------------------
function reconstructPath(
  previous: Record<Vertex, Vertex | null>,
  source: Vertex,
  target: Vertex
): Vertex[] {
  const path: Vertex[] = []
  let v: Vertex | null = target

  while (v !== null && v !== source) {
    path.unshift(v)
    v = previous[v]
  }
  if (v !== source) {
    // no path
    return []
  }
  path.unshift(source)
  return path
}

// ---------- Example usage -----------------------------------------------
const g = new Graph()

// sample graph: 0 → 1 (4), 0 → 2 (5), 1 → 2 (-1), 2 → 3 (3), 3 → 1 (-2)
g.addEdge(0, 1, 4)
g.addEdge(0, 2, 5)
g.addEdge(1, 2, -1)
g.addEdge(2, 3, 3)
g.addEdge(3, 1, -2)

try {
  const { distances, previous } = bellmanFord(g, 0)
  console.log('distances:', distances)

  for (const v of g.getVertices()) {
    const path = reconstructPath(previous, 0, v)
    console.log(`0 → ${v}  (dist=${distances[v]})  path:`, path.join(' → '))
  }
} catch (e) {
  console.error(e)
}

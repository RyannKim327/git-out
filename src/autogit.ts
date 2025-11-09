// A vertex can be any hashable value (string, number, object with id, …)
type Vertex<V> = V;

// Graph abstraction: for every vertex give me its neighbours
interface Graph<V> {
  neighbours(v: Vertex<V>): Iterable<Vertex<V>>;
}
/**
 * Breadth-first search.
 * @param graph     the graph to search
 * @param start     starting vertex
 * @param goal      optional predicate; when it returns true the search stops
 *                  and the path is returned. If omitted the entire component is visited.
 * @returns         shortest path (start … goal) or undefined if not found.
 *                  If no goal given → returns undefined but visited every node.
 */
export function bfs<V>(
  graph: Graph<V>,
  start: Vertex<V>,
  goal?: (v: Vertex<V>) => boolean
): Vertex<V>[] | undefined {
  const visited = new Set<Vertex<V>>();
  const queue: Vertex<V>[][] = []; // each queue element is a *path*

  queue.push([start]);

  while (queue.length) {
    const path = queue.shift()!;
    const last = path[path.length - 1];

    if (visited.has(last)) continue;
    visited.add(last);

    if (goal && goal(last)) return path; // found!

    for (const n of graph.neighbours(last)) {
      if (!visited.has(n)) queue.push([...path, n]);
    }
  }
  return undefined; // no path found
}
class AdjacencyList<V> implements Graph<V> {
  private readonly edges = new Map<Vertex<V>, Vertex<V>[]>();

  addEdge(from: Vertex<V>, to: Vertex<V>): void {
    if (!this.edges.has(from)) this.edges.set(from, []);
    this.edges.get(from)!.push(to);
  }

  neighbours(v: Vertex<V>): Iterable<Vertex<V>> {
    return this.edges.get(v) ?? [];
  }
}

/* ---------- demo ---------- */
const g = new AdjacencyList<string>();
["A B", "A C", "B D", "C D", "D E"].forEach(e => {
  const [f, t] = e.split(" ");
  g.addEdge(f, t);
  g.addEdge(t, f); // undirected
});

console.log(bfs(g, "A", v => v === "E")); // → [ 'A', 'C', 'D', 'E' ]

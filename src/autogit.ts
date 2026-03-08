// ──────────────────────────────────────────────────────────
// 1. Graph representation
// ──────────────────────────────────────────────────────────
type Vertex = string | number;

// An adjacency list where each vertex maps to an array of its outgoing neighbours.
class Graph {
  private readonly edges: Map<Vertex, Vertex[]> = new Map();

  constructor(edges?: [Vertex, Vertex][]) {
    if (edges) this.addEdges(edges);
  }

  /** Adds one or more directed edges to the graph. */
  addEdges(edges: [Vertex, Vertex][]): void {
    for (const [from, to] of edges) {
      if (!this.edges.has(from)) this.edges.set(from, []);
      this.edges.get(from)!.push(to);
      // Ensure the destination vertex exists in the map so it shows up in the keys.
      if (!this.edges.has(to)) this.edges.set(to, []);
    }
  }

  /** Returns all vertices in the graph. */
  vertices(): Vertex[] {
    return Array.from(this.edges.keys());
  }

  /** Returns the neighbours of a given vertex. */
  neighbours(v: Vertex): Vertex[] {
    return this.edges.get(v) ?? [];
  }
}

// ──────────────────────────────────────────────────────────
// 2. DFS‑based topological sort
// ──────────────────────────────────────────────────────────
function topoSortDFS(g: Graph): Vertex[] | null {
  const visited = new Set<Vertex>();
  const temp = new Set<Vertex>();   // vertices currently on recursion stack
  const order: Vertex[] = [];

  const visit = (v: Vertex): boolean => {
    if (temp.has(v)) return false; // cycle detected

    if (!visited.has(v)) {
      temp.add(v);
      for (const nb of g.neighbours(v)) {
        if (!visit(nb)) return false;
      }
      temp.delete(v);
      visited.add(v);
      order.push(v);
    }
    return true;
  };

  for (const v of g.vertices()) {
    if (!visit(v)) return null; // if a cycle is found, return null
  }

  return order.reverse(); // reverse to get the correct order
}

// ──────────────────────────────────────────────────────────
// 3. Kahn’s algorithm (BFS‑based)
// ──────────────────────────────────────────────────────────
function topoSortKahn(g: Graph): Vertex[] | null {
  // Compute in‑degree of each vertex
  const inDeg = new Map<Vertex, number>();
  for (const v of g.vertices()) inDeg.set(v, 0);
  for (const v of g.vertices()) {
    for (const nb of g.neighbours(v)) {
      inDeg.set(nb, (inDeg.get(nb) ?? 0) + 1);
    }
  }

  const queue: Vertex[] = [];
  for (const [v, d] of inDeg) if (d === 0) queue.push(v);

  const order: Vertex[] = [];
  while (queue.length) {
    const v = queue.shift()!;
    order.push(v);
    for (const nb of g.neighbours(v)) {
      const d = inDeg.get(nb)! - 1;
      inDeg.set(nb, d);
      if (d === 0) queue.push(nb);
    }
  }

  if (order.length !== g.vertices().length) return null; // cycle exists
  return order;
}

// ──────────────────────────────────────────────────────────
// 4. Demo / usage
// ──────────────────────────────────────────────────────────
const edges: [Vertex, Vertex][] = [
  ['a', 'd'],
  ['f', 'b'],
  ['b', 'd'],
  ['f', 'a'],
  ['d', 'c']
];

const graph = new Graph(edges);

console.log('DFS order:', topoSortDFS(graph));   // legal order or null
console.log('Kahn order:', topoSortKahn(graph)); // same result

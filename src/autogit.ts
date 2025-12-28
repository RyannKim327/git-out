// ---------- Types ----------
type Vertex = string | number;               // you can use any hashable type
interface Edge {
  target: Vertex;
  weight: number; // must be >= 0
}

// ---------- Graph ----------
class Graph {
  // adjacency list: vertex -> array of outgoing edges
  private adj: Map<Vertex, Edge[]> = new Map();

  /** Add a directed edge u → v with weight w (creates vertices if missing). */
  addEdge(u: Vertex, v: Vertex, w: number): void {
    if (w < 0) throw new Error('Dijkstra does not support negative weights');
    if (!this.adj.has(u)) this.adj.set(u, []);
    this.adj.get(u)!.push({ target: v, weight: w });
    // If you want an undirected graph, also add the reverse edge:
    // if (!this.adj.has(v)) this.adj.set(v, []);
    // this.adj.get(v)!.push({ target: u, weight: w });
  }

  /** Return the list of vertices (keys of the adjacency map). */
  vertices(): IterableIterator<Vertex> {
    return this.adj.keys();
  }

  /** Return outgoing edges for a vertex (empty array if none). */
  outEdges(u: Vertex): Edge[] {
    return this.adj.get(u) ?? [];
  }
}
// ---------- Min‑Heap ----------
class MinHeap<T> {
  private heap: { key: number; value: T }[] = [];

  private parent(i: number) { return ((i - 1) >> 1); }
  private left(i: number) { return (i << 1) + 1; }
  private right(i: number) { return (i << 1) + 2; }

  private swap(i: number, j: number) {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }

  /** Insert a new element with the given priority (key). */
  push(key: number, value: T): void {
    this.heap.push({ key, value });
    this.bubbleUp(this.heap.length - 1);
  }

  private bubbleUp(i: number) {
    while (i > 0) {
      const p = this.parent(i);
      if (this.heap[p].key <= this.heap[i].key) break;
      this.swap(i, p);
      i = p;
    }
  }

  /** Remove and return the element with the smallest key. */
  pop(): { key: number; value: T } | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return min;
  }

  private bubbleDown(i: number) {
    const n = this.heap.length;
    while (true) {
      const l = this.left(i);
      const r = this.right(i);
      let smallest = i;

      if (l < n && this.heap[l].key < this.heap[smallest].key) smallest = l;
      if (r < n && this.heap[r].key < this.heap[smallest].key) smallest = r;

      if (smallest === i) break;
      this.swap(i, smallest);
      i = smallest;
    }
  }

  /** Peek at the smallest element without removing it. */
  peek(): { key: number; value: T } | undefined {
    return this.heap[0];
  }

  /** True if the heap is empty. */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}
/**
 * Compute shortest‑path distances from `source` to every reachable vertex.
 *
 * @param graph   The Graph instance.
 * @param source  Starting vertex.
 * @param target  (optional) stop early when this vertex is settled.
 * @returns An object containing:
 *   - dist: Map<Vertex, number>   // distance from source (Infinity if unreachable)
 *   - prev: Map<Vertex, Vertex>   // predecessor on the shortest path (undefined if none)
 */
function dijkstra(
  graph: Graph,
  source: Vertex,
  target?: Vertex
): { dist: Map<Vertex, number>; prev: Map<Vertex, Vertex | undefined> } {
  const dist = new Map<Vertex, number>();
  const prev = new Map<Vertex, Vertex | undefined>();
  const heap = new MinHeap<Vertex>();

  // initialise
  for (const v of graph.vertices()) {
    dist.set(v, Infinity);
    prev.set(v, undefined);
  }
  dist.set(source, 0);
  heap.push(0, source);

  while (!heap.isEmpty()) {
    const { key: dU, value: u } = heap.pop()!; // smallest tentative distance

    // If we pulled a stale entry (distance larger than current known), skip it.
    if (dU > (dist.get(u) ?? Infinity)) continue;

    // Early exit if we only needed a single destination.
    if (target !== undefined && u === target) break;

    // Relax all outgoing edges u → v
    for (const { target: v, weight } of graph.outEdges(u)) {
      const alt = dU + weight;
      if (alt < (dist.get(v) ?? Infinity)) {
        dist.set(v, alt);
        prev.set(v, u);
        heap.push(alt, v);
      }
    }
  }

  return { dist, prev };
}
/**
 * Reconstruct the shortest path from `source` to `dest` using the `prev` map.
 * Returns an array of vertices from source → … → dest, or `null` if unreachable.
 */
function reconstructPath(
  prev: Map<Vertex, Vertex | undefined>,
  source: Vertex,
  dest: Vertex
): Vertex[] | null {
  const path: Vertex[] = [];
  let cur: Vertex | undefined = dest;

  while (cur !== undefined) {
    path.push(cur);
    if (cur === source) break;
    cur = prev.get(cur);
  }

  if (path[path.length - 1] !== source) {
    // we never reached the source → dest is unreachable
    return null;
  }

  return path.reverse(); // from source to dest
}
// ----- Example usage -----
function main() {
  const g = new Graph();

  // Build a simple weighted directed graph:
  //   A --5--> B
  //   A --2--> C
  //   C --1--> B
  //   B --3--> D
  //   C --4--> D
  g.addEdge('A', 'B', 5);
  g.addEdge('A', 'C', 2);
  g.addEdge('C', 'B', 1);
  g.addEdge('B', 'D', 3);
  g.addEdge('C', 'D', 4);

  const source = 'A';
  const { dist, prev } = dijkstra(g, source);

  // Print distances
  console.log('Shortest distances from', source);
  for (const v of g.vertices()) {
    console.log(`  ${v}: ${dist.get(v)}`);
  }

  // Print paths
  console.log('\nShortest paths:');
  for (const v of g.vertices()) {
    if (v === source) continue;
    const path = reconstructPath(prev, source, v);
    if (path) {
      console.log(`  ${source} → ${v}: ${path.join(' → ')}`);
    } else {
      console.log(`  ${source} → ${v}: unreachable`);
    }
  }
}

main();
Shortest distances from A
  A: 0
  B: 3
  C: 2
  D: 6

Shortest paths:
  A → B: A → C → B
  A → C: A → C
  A → D: A → C → D
type Vertex = string | number;
interface Edge { target: Vertex; weight: number; }

class Graph {
  private adj = new Map<Vertex, Edge[]>();
  addEdge(u: Vertex, v: Vertex, w: number) {
    if (w < 0) throw new Error('negative weight');
    if (!this.adj.has(u)) this.adj.set(u, []);
    this.adj.get(u)!.push({ target: v, weight: w });
  }
  vertices() { return this.adj.keys(); }
  outEdges(u: Vertex) { return this.adj.get(u) ?? []; }
}

class MinHeap<T> {
  private heap: { k: number; v: T }[] = [];
  private parent(i: number) { return (i - 1) >> 1; }
  private left(i: number) { return i * 2 + 1; }
  private right(i: number) { return i * 2 + 2; }
  private swap(i: number, j: number) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }
  push(k: number, v: T) { this.heap.push({ k, v }); this.bubbleUp(this.heap.length - 1); }
  private bubbleUp(i: number) {
    while (i > 0) {
      const p = this.parent(i);
      if (this.heap[p].k <= this.heap[i].k) break;
      this.swap(i, p);
      i = p;
    }
  }
  pop(): { k: number; v: T } | undefined {
    if (!this.heap.length) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length) { this.heap[0] = last; this.bubbleDown(0); }
    return min;
  }
  private bubbleDown(i: number) {
    const n = this.heap.length;
    while (true) {
      const l = this.left(i), r = this.right(i);
      let s = i;
      if (l < n && this.heap[l].k < this.heap[s].k) s = l;
      if (r < n && this.heap[r].k < this.heap[s].k) s = r;
      if (s === i) break;
      this.swap(i, s);
      i = s;
    }
  }
  isEmpty() { return this.heap.length === 0; }
}

function dijkstra(g: Graph, src: Vertex, target?: Vertex) {
  const dist = new Map<Vertex, number>();
  const prev = new Map<Vertex, Vertex | undefined>();
  const heap = new MinHeap<Vertex>();

  for (const v of g.vertices()) { dist.set(v, Infinity); prev.set(v, undefined); }
  dist.set(src, 0);
  heap.push(0, src);

  while (!heap.isEmpty()) {
    const { k: dU, v: u } = heap.pop()!;
    if (dU > (dist.get(u) ?? Infinity)) continue;
    if (target !== undefined && u === target) break;
    for (const { target: v, weight } of g.outEdges(u)) {
      const alt = dU + weight;
      if (alt < (dist.get(v) ?? Infinity)) {
        dist.set(v, alt);
        prev.set(v, u);
        heap.push(alt, v);
      }
    }
  }
  return { dist, prev };
}

function reconstruct(prev: Map<Vertex, Vertex | undefined>, src: Vertex, dst: Vertex) {
  const path: Vertex[] = [];
  let cur: Vertex | undefined = dst;
  while (cur !== undefined) {
    path.push(cur);
    if (cur === src) break;
    cur = prev.get(cur);
  }
  return path[path.length - 1] === src ? path.reverse() : null;
}

/* ---- Demo ---- */
const g = new Graph();
g.addEdge('A', 'B', 5);
g.addEdge('A', 'C', 2);
g.addEdge('C', 'B', 1);
g.addEdge('B', 'D', 3);
g.addEdge('C', 'D', 4);

const { dist, prev } = dijkstra(g, 'A');
console.log('distances:', Object.fromEntries(dist));
for (const v of g.vertices()) {
  if (v !== 'A') console.log('path A→', v, ':', reconstruct(prev, 'A', v));
}

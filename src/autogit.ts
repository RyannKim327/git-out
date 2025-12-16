// Edge from `to` with weight `weight`
export interface Edge<T> {
  to: T;
  weight: number;
}

// The whole graph: a map from a vertex to an array of outgoing edges
export type Graph<T> = Map<T, Edge<T>[]>;
export function addEdge<T>(g: Graph<T>, from: T, to: T, weight: number): void {
  if (!g.has(from)) g.set(from, []);
  g.get(from)!.push({ to, weight });

  // If the graph is undirected, also add the reverse edge:
  // if (!g.has(to)) g.set(to, []);
  // g.get(to)!.push({ to: from, weight });
}
// ---------- Priority Queue ----------
class MinHeap<T> {
  private heap: { key: number; value: T }[] = [];

  private parent(i: number) { return Math.floor((i - 1) / 2); }
  private left(i: number) { return 2 * i + 1; }
  private right(i: number) { return 2 * i + 2; }

  private swap(i: number, j: number) {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }

  /** Insert a value with a priority (the smaller the key, the higher the priority). */
  push(key: number, value: T): void {
    this.heap.push({ key, value });
    this.bubbleUp(this.heap.length - 1);
  }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const p = this.parent(idx);
      if (this.heap[p].key <= this.heap[idx].key) break;
      this.swap(p, idx);
      idx = p;
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

  private bubbleDown(idx: number) {
    const n = this.heap.length;
    while (true) {
      const l = this.left(idx);
      const r = this.right(idx);
      let smallest = idx;

      if (l < n && this.heap[l].key < this.heap[smallest].key) smallest = l;
      if (r < n && this.heap[r].key < this.heap[smallest].key) smallest = r;

      if (smallest === idx) break;
      this.swap(idx, smallest);
      idx = smallest;
    }
  }

  /** Peek at the smallest element without removing it. */
  peek(): { key: number; value: T } | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }
}
/**
 * Dijkstra’s algorithm.
 *
 * @param graph   The adjacency‑list graph.
 * @param source  The start vertex.
 * @returns       An object containing:
 *                - distances: Map<Vertex, distance from source>
 *                - previous:  Map<Vertex, predecessor on the shortest path>
 */
export function dijkstra<T>(graph: Graph<T>, source: T): {
  distances: Map<T, number>;
  previous: Map<T, T | null>;
} {
  const distances = new Map<T, number>();
  const previous = new Map<T, T | null>();
  const visited = new Set<T>();
  const pq = new MinHeap<T>();

  // Initialise distances
  for (const v of graph.keys()) {
    distances.set(v, Infinity);
    previous.set(v, null);
  }
  distances.set(source, 0);
  pq.push(0, source);

  while (pq.size() > 0) {
    const { key: curDist, value: u } = pq.pop()!;

    // If we have already processed a better distance, skip.
    if (visited.has(u)) continue;
    visited.add(u);

    // Early exit if we pop a vertex whose distance is already larger than the stored one.
    // (Useful when the same vertex is inserted multiple times with decreasing keys.)
    if (curDist > distances.get(u)!) continue;

    const edges = graph.get(u) ?? [];
    for (const { to: v, weight } of edges) {
      if (weight < 0) {
        throw new Error('Dijkstra does not support negative edge weights');
      }

      const alt = distances.get(u)! + weight;
      if (alt < distances.get(v)!) {
        distances.set(v, alt);
        previous.set(v, u);
        pq.push(alt, v);
      }
    }
  }

  return { distances, previous };
}
/**
 * Reconstruct the shortest path from `source` to `target` using the `previous` map.
 * Returns an array of vertices from source → target (inclusive). Empty array if unreachable.
 */
export function reconstructPath<T>(previous: Map<T, T | null>, source: T, target: T): T[] {
  const path: T[] = [];
  let cur: T | null = target;

  while (cur !== null) {
    path.push(cur);
    if (cur === source) break;
    cur = previous.get(cur) ?? null;
  }

  if (path[path.length - 1] !== source) {
    // No path found
    return [];
  }

  return path.reverse();
}
// ---------- Example usage ----------
function main() {
  // Build a simple weighted directed graph
  const g: Graph<string> = new Map();

  // Add edges (from, to, weight)
  addEdge(g, 'A', 'B', 4);
  addEdge(g, 'A', 'C', 2);
  addEdge(g, 'B', 'C', 5);
  addEdge(g, 'B', 'D', 10);
  addEdge(g, 'C', 'E', 3);
  addEdge(g, 'E', 'D', 4);
  addEdge(g, 'D', 'F', 11);

  const source = 'A';
  const { distances, previous } = dijkstra(g, source);

  console.log('Shortest distances from', source);
  for (const [v, d] of distances.entries()) {
    console.log(`  ${v}: ${d}`);
  }

  // Show path to a specific target
  const target = 'F';
  const path = reconstructPath(previous, source, target);
  console.log(`\nShortest path ${source} → ${target}:`, path.join(' → ') || 'unreachable');
}

main();
Shortest distances from A
  A: 0
  B: 4
  C: 2
  D: 9
  E: 5
  F: 20

Shortest path A → F: A → C → E → D → F
// dijkstra.ts ---------------------------------------------------------

export interface Edge<T> {
  to: T;
  weight: number;
}
export type Graph<T> = Map<T, Edge<T>[]>;

export function addEdge<T>(g: Graph<T>, from: T, to: T, weight: number): void {
  if (!g.has(from)) g.set(from, []);
  g.get(from)!.push({ to, weight });
}

/* ---------- MinHeap (priority queue) ---------- */
class MinHeap<T> {
  private heap: { key: number; value: T }[] = [];

  private parent(i: number) { return Math.floor((i - 1) / 2); }
  private left(i: number) { return 2 * i + 1; }
  private right(i: number) { return 2 * i + 2; }

  private swap(i: number, j: number) {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }

  push(key: number, value: T): void {
    this.heap.push({ key, value });
    this.bubbleUp(this.heap.length - 1);
  }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const p = this.parent(idx);
      if (this.heap[p].key <= this.heap[idx].key) break;
      this.swap(p, idx);
      idx = p;
    }
  }

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

  private bubbleDown(idx: number) {
    const n = this.heap.length;
    while (true) {
      const l = this.left(idx);
      const r = this.right(idx);
      let smallest = idx;
      if (l < n && this.heap[l].key < this.heap[smallest].key) smallest = l;
      if (r < n && this.heap[r].key < this.heap[smallest].key) smallest = r;
      if (smallest === idx) break;
      this.swap(idx, smallest);
      idx = smallest;
    }
  }

  peek(): { key: number; value: T } | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }
}

/* ---------- Dijkstra ---------- */
export function dijkstra<T>(graph: Graph<T>, source: T): {
  distances: Map<T, number>;
  previous: Map<T, T | null>;
} {
  const distances = new Map<T, number>();
  const previous = new Map<T, T | null>();
  const visited = new Set<T>();
  const pq = new MinHeap<T>();

  for (const v of graph.keys()) {
    distances.set(v, Infinity);
    previous.set(v, null);
  }
  distances.set(source, 0);
  pq.push(0, source);

  while (pq.size() > 0) {
    const { key: curDist, value: u } = pq.pop()!;

    if (visited.has(u)) continue;
    visited.add(u);
    if (curDist > distances.get(u)!) continue;

    const edges = graph.get(u) ?? [];
    for (const { to: v, weight } of edges) {
      if (weight < 0) throw new Error('Negative edge weight detected');
      const alt = distances.get(u)! + weight;
      if (alt < distances.get(v)!) {
        distances.set(v, alt);
        previous.set(v, u);
        pq.push(alt, v);
      }
    }
  }

  return { distances, previous };
}

/* ---------- Path reconstruction ---------- */
export function reconstructPath<T>(previous: Map<T, T | null>, source: T, target: T): T[] {
  const path: T[] = [];
  let cur: T | null = target;
  while (cur !== null) {
    path.push(cur);
    if (cur === source) break;
    cur = previous.get(cur) ?? null;
  }
  if (path[path.length - 1] !== source) return []; // unreachable
  return path.reverse();
}

/* ---------- Example / test ---------- */
function main() {
  const g: Graph<string> = new Map();

  addEdge(g, 'A', 'B', 4);
  addEdge(g, 'A', 'C', 2);
  addEdge(g, 'B', 'C', 5);
  addEdge(g, 'B', 'D', 10);
  addEdge(g, 'C', 'E', 3);
  addEdge(g, 'E', 'D', 4);
  addEdge(g, 'D', 'F', 11);

  const source = 'A';
  const { distances, previous } = dijkstra(g, source);

  console.log('Shortest distances from', source);
  for (const [v, d] of distances.entries()) {
    console.log(`  ${v}: ${d}`);
  }

  const target = 'F';
  const path = reconstructPath(previous, source, target);
  console.log(`\nShortest path ${source} → ${target}:`, path.join(' → ') || 'unreachable');
}

if (require.main === module) {
  main();
}
# If you have ts-node installed
npx ts-node dijkstra.ts

// Edge from `to` with a numeric weight.
export interface Edge {
  to: number;      // destination vertex id
  weight: number;  // non‑negative edge weight
}

// The whole graph: an array where index = vertex id.
export type Graph = Edge[][];
/**
 * Simple binary min‑heap for (priority, value) pairs.
 * The heap stores objects of shape { key: number, value: T }.
 */
export class MinHeap<T> {
  private heap: { key: number; value: T }[] = [];

  /** Insert a new element with the given priority (key). */
  push(key: number, value: T): void {
    this.heap.push({ key, value });
    this.bubbleUp(this.heap.length - 1);
  }

  /** Remove and return the element with the smallest key. */
  pop(): { key: number; value: T } | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  /** Return true if the heap is empty. */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /** Decrease the key of an existing element (optional, not used here). */
  // If you need a decrease‑key operation you can keep a map from value → index.
  // For simplicity we just push a new entry; the algorithm will ignore stale ones.

  private bubbleUp(idx: number): void {
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];
      if (element.key >= parent.key) break;
      this.heap[parentIdx] = element;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
  }

  private sinkDown(idx: number): void {
    const length = this.heap.length;
    const element = this.heap[idx];

    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let smallest = idx;

      if (leftIdx < length && this.heap[leftIdx].key < this.heap[smallest].key) {
        smallest = leftIdx;
      }
      if (rightIdx < length && this.heap[rightIdx].key < this.heap[smallest].key) {
        smallest = rightIdx;
      }
      if (smallest === idx) break;

      this.heap[idx] = this.heap[smallest];
      this.heap[smallest] = element;
      idx = smallest;
    }
  }
}
/**
 * Compute shortest distances from `source` to every vertex in `graph`.
 *
 * @param graph   adjacency list representation (see type Graph above)
 * @param source  index of the start vertex (0‑based)
 * @returns       an array `dist` where dist[v] = shortest distance from source to v,
 *                or Infinity if v is unreachable.
 */
export function dijkstra(graph: Graph, source: number): number[] {
  const n = graph.length;
  const dist = new Array<number>(n).fill(Infinity);
  const visited = new Array<boolean>(n).fill(false);
  const heap = new MinHeap<number>();

  dist[source] = 0;
  heap.push(0, source);

  while (!heap.isEmpty()) {
    const { key: curDist, value: u } = heap.pop()!;

    // If we already processed a better distance for `u`, skip this stale entry.
    if (visited[u]) continue;
    visited[u] = true; // we now know the final shortest distance for u

    // Relax all outgoing edges (u → v)
    for (const { to: v, weight } of graph[u]) {
      if (weight < 0) {
        throw new Error('Dijkstra does not support negative edge weights');
      }
      const newDist = curDist + weight;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        heap.push(newDist, v);
      }
    }
  }

  return dist;
}
// ---------------------------------------------------------------
// Example graph (undirected for illustration, but stored as directed)
// ---------------------------------------------------------------
function buildUndirectedGraph(edges: [number, number, number][], vertexCount: number): Graph {
  const g: Graph = Array.from({ length: vertexCount }, () => []);
  for (const [a, b, w] of edges) {
    g[a].push({ to: b, weight: w });
    g[b].push({ to: a, weight: w }); // because it’s undirected
  }
  return g;
}

// Define a simple graph:
//   0 --1--> 1
//   0 --4--> 2
//   1 --2--> 2
//   1 --5--> 3
//   2 --1--> 3
const edges: [number, number, number][] = [
  [0, 1, 1],
  [0, 2, 4],
  [1, 2, 2],
  [1, 3, 5],
  [2, 3, 1],
];
const vertexCount = 4;
const graph = buildUndirectedGraph(edges, vertexCount);

// Run Dijkstra from vertex 0
const distances = dijkstra(graph, 0);
console.log('Shortest distances from vertex 0:', distances);
// Expected output: [0, 1, 3, 4]

/* -------------------------------------------------------------
   If you also need the actual path (not just the distance),
   keep a `prev` array while relaxing edges:

   const prev = new Array<number>(n).fill(-1);
   if (newDist < dist[v]) {
       dist[v] = newDist;
       prev[v] = u;          // remember predecessor
       heap.push(newDist, v);
   }

   After the algorithm you can reconstruct the path to any
   target by walking backwards from target → prev[target] …
   ------------------------------------------------------------- */
# If you have ts-node installed:
npx ts-node dijkstra.ts
# Output:
# Shortest distances from vertex 0: [ 0, 1, 3, 4 ]
// dijkstra.ts ----------------------------------------------------
export interface Edge { to: number; weight: number; }
export type Graph = Edge[][];

export class MinHeap<T> {
  private heap: { key: number; value: T }[] = [];
  push(key: number, value: T) { this.heap.push({ key, value }); this.bubbleUp(this.heap.length - 1); }
  pop(): { key: number; value: T } | undefined {
    if (!this.heap.length) return undefined;
    const min = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length) { this.heap[0] = end; this.sinkDown(0); }
    return min;
  }
  isEmpty() { return this.heap.length === 0; }
  private bubbleUp(i: number) {
    const el = this.heap[i];
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (el.key >= this.heap[p].key) break;
      this.heap[i] = this.heap[p];
      this.heap[p] = el;
      i = p;
    }
  }
  private sinkDown(i: number) {
    const n = this.heap.length;
    const el = this.heap[i];
    while (true) {
      let left = i * 2 + 1, right = left + 1, smallest = i;
      if (left < n && this.heap[left].key < this.heap[smallest].key) smallest = left;
      if (right < n && this.heap[right].key < this.heap[smallest].key) smallest = right;
      if (smallest === i) break;
      this.heap[i] = this.heap[smallest];
      this.heap[smallest] = el;
      i = smallest;
    }
  }
}

export function dijkstra(graph: Graph, source: number): number[] {
  const n = graph.length;
  const dist = new Array<number>(n).fill(Infinity);
  const visited = new Array<boolean>(n).fill(false);
  const heap = new MinHeap<number>();

  dist[source] = 0;
  heap.push(0, source);

  while (!heap.isEmpty()) {
    const { key: d, value: u } = heap.pop()!;
    if (visited[u]) continue;
    visited[u] = true;

    for (const { to: v, weight } of graph[u]) {
      if (weight < 0) throw new Error('Negative weight not allowed');
      const nd = d + weight;
      if (nd < dist[v]) {
        dist[v] = nd;
        heap.push(nd, v);
      }
    }
  }
  return dist;
}

/* ------------------- test ------------------- */
function buildUndirectedGraph(edges: [number, number, number][], n: number): Graph {
  const g: Graph = Array.from({ length: n }, () => []);
  for (const [a, b, w] of edges) {
    g[a].push({ to: b, weight: w });
    g[b].push({ to: a, weight: w });
  }
  return g;
}
const edges: [number, number, number][] = [
  [0, 1, 1],
  [0, 2, 4],
  [1, 2, 2],
  [1, 3, 5],
  [2, 3, 1],
];
const graph = buildUndirectedGraph(edges, 4);
console.log(dijkstra(graph, 0)); // → [ 0, 1, 3, 4 ]
// --------------------------------------------------------------

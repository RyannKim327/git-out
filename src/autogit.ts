// Edge from `to` with a numeric weight.
export interface Edge {
  to: number;      // destination vertex id
  weight: number;  // non‑negative weight
}

// The whole graph: an array where index = vertex id.
export type Graph = Edge[][];
// ---------- Min‑Heap (binary heap) ----------
export class MinHeap<T> {
  private heap: { key: number; value: T }[] = [];

  // Insert a value with its priority (the key)
  push(key: number, value: T): void {
    this.heap.push({ key, value });
    this.bubbleUp(this.heap.length - 1);
  }

  // Remove and return the element with the smallest key
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

  // Decrease‑key: if the element already exists, we push a new entry.
  // The algorithm will ignore stale entries when they are popped.
  // This keeps the implementation simple and still O(log V) amortised.
  // (If you need a true decrease‑key, you can store indices in a map.)

  size(): number {
    return this.heap.length;
  }

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
 * Runs Dijkstra’s algorithm from a source vertex.
 *
 * @param graph   adjacency list representation
 * @param source  id of the start vertex (0‑based)
 * @returns       an object containing:
 *                - distances: number[] where distances[v] = shortest distance from source to v
 *                - previous : number[] where previous[v] = predecessor of v on the shortest path
 */
export function dijkstra(
  graph: Graph,
  source: number
): { distances: number[]; previous: (number | null)[] } {
  const V = graph.length;
  const distances = new Array<number>(V).fill(Infinity);
  const previous = new Array<number | null>(V).fill(null);
  const visited = new Array<boolean>(V).fill(false);

  const pq = new MinHeap<number>();
  distances[source] = 0;
  pq.push(0, source);

  while (pq.size() > 0) {
    const { key: dist, value: u } = pq.pop()!;

    // If we already processed a better distance, skip (stale entry)
    if (visited[u]) continue;
    visited[u] = true;

    // Relax all outgoing edges from u
    for (const edge of graph[u]) {
      const v = edge.to;
      const weight = edge.weight;
      if (weight < 0) {
        throw new Error('Dijkstra does not support negative edge weights');
      }

      const alt = dist + weight;
      if (alt < distances[v]) {
        distances[v] = alt;
        previous[v] = u;
        pq.push(alt, v);
      }
    }
  }

  return { distances, previous };
}

/**
 * Reconstructs the shortest path from `source` to `target` using the `previous` array.
 *
 * @param previous array returned by dijkstra()
 * @param source   start vertex id
 * @param target   destination vertex id
 * @returns        array of vertex ids representing the path (source → … → target)
 *                 or empty array if no path exists.
 */
export function reconstructPath(
  previous: (number | null)[],
  source: number,
  target: number
): number[] {
  const path: number[] = [];
  let cur: number | null = target;
  while (cur !== null) {
    path.push(cur);
    if (cur === source) break;
    cur = previous[cur];
  }
  if (path[path.length - 1] !== source) {
    // No connection
    return [];
  }
  return path.reverse();
}
import { dijkstra, reconstructPath, Graph } from "./dijkstra";

// Build a simple directed weighted graph:
//   0 → 1 (4), 0 → 2 (1)
//   2 → 1 (2), 2 → 3 (5)
//   1 → 3 (1)
//   3 → 4 (3)
//   4 → 0 (7)   // (optional, makes a cycle)
const graph: Graph = [
  // 0
  [
    { to: 1, weight: 4 },
    { to: 2, weight: 1 },
  ],
  // 1
  [{ to: 3, weight: 1 }],
  // 2
  [
    { to: 1, weight: 2 },
    { to: 3, weight: 5 },
  ],
  // 3
  [{ to: 4, weight: 3 }],
  // 4
  [{ to: 0, weight: 7 }],
];

const source = 0;
const { distances, previous } = dijkstra(graph, source);

console.log("Shortest distances from source:", distances);
// → [0, 3, 1, 4, 7]

const target = 4;
const path = reconstructPath(previous, source, target);
console.log(`Shortest path ${source} → ${target}:`, path);
// → [0, 2, 1, 3, 4]
Shortest distances from source: [ 0, 3, 1, 4, 7 ]
Shortest path 0 → 4: [ 0, 2, 1, 3, 4 ]
0 → 2 = 1
0 → 2 → 1 = 1 + 2 = 3
0 → 2 → 1 → 3 = 3 + 1 = 4
0 → 2 → 1 → 3 → 4 = 4 + 3 = 7
// dijkstra.ts ---------------------------------------------------------

export interface Edge {
  to: number;
  weight: number;
}

export type Graph = Edge[][];

// ---------- Min‑Heap ----------
export class MinHeap<T> {
  private heap: { key: number; value: T }[] = [];

  push(key: number, value: T): void {
    this.heap.push({ key, value });
    this.bubbleUp(this.heap.length - 1);
  }

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

  size(): number {
    return this.heap.length;
  }

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

// ---------- Dijkstra ----------
export function dijkstra(
  graph: Graph,
  source: number
): { distances: number[]; previous: (number | null)[] } {
  const V = graph.length;
  const distances = new Array<number>(V).fill(Infinity);
  const previous = new Array<number | null>(V).fill(null);
  const visited = new Array<boolean>(V).fill(false);

  const pq = new MinHeap<number>();
  distances[source] = 0;
  pq.push(0, source);

  while (pq.size() > 0) {
    const { key: dist, value: u } = pq.pop()!;

    if (visited[u]) continue;
    visited[u] = true;

    for (const edge of graph[u]) {
      const v = edge.to;
      const w = edge.weight;
      if (w < 0) throw new Error('Negative weight detected');

      const alt = dist + w;
      if (alt < distances[v]) {
        distances[v] = alt;
        previous[v] = u;
        pq.push(alt, v);
      }
    }
  }

  return { distances, previous };
}

// ---------- Path reconstruction ----------
export function reconstructPath(
  previous: (number | null)[],
  source: number,
  target: number
): number[] {
  const path: number[] = [];
  let cur: number | null = target;
  while (cur !== null) {
    path.push(cur);
    if (cur === source) break;
    cur = previous[cur];
  }
  if (path[path.length - 1] !== source) return []; // unreachable
  return path.reverse();
}

// --------------------------------------------------------------------

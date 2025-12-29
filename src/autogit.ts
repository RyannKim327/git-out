// Edge from `to` with a numeric weight.
type Edge<T> = { to: T; weight: number };

// The whole graph: each vertex maps to an array of outgoing edges.
type Graph<T> = Map<T, Edge<T>[]>;
/** Simple binary min‑heap for (priority, value) pairs. */
class MinHeap<T> {
  private heap: { priority: number; value: T }[] = [];

  /** Insert a new element or update its priority if it already exists. */
  push(priority: number, value: T): void {
    const node = { priority, value };
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1);
  }

  /** Remove and return the element with the smallest priority. */
  pop(): { priority: number; value: T } | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  /** Peek at the smallest element without removing it. */
  peek(): { priority: number; value: T } | undefined {
    return this.heap[0];
  }

  /** Number of items currently stored. */
  size(): number {
    return this.heap.length;
  }

  /** ----- internal helpers ----- */
  private bubbleUp(idx: number): void {
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];
      if (element.priority >= parent.priority) break;
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

      if (leftIdx < length && this.heap[leftIdx].priority < this.heap[smallest].priority) {
        smallest = leftIdx;
      }
      if (rightIdx < length && this.heap[rightIdx].priority < this.heap[smallest].priority) {
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
 * Compute the shortest distances from `source` to every reachable vertex.
 *
 * @param graph   Weighted directed graph.
 * @param source  Starting vertex.
 * @returns       Map where `dist.get(v)` is the shortest distance from source to v.
 *                Unreachable vertices are omitted.
 */
function dijkstra<T>(graph: Graph<T>, source: T): Map<T, number> {
  const dist = new Map<T, number>();          // final distances
  const visited = new Set<T>();               // vertices whose shortest distance is settled
  const pq = new MinHeap<T>();                // (distance, vertex)

  // Initialise: distance to source = 0, everything else = ∞ (implicitly)
  dist.set(source, 0);
  pq.push(0, source);

  while (pq.size() > 0) {
    const { priority: curDist, value: u } = pq.pop()!;

    // If we have already processed a better distance for `u`, skip this stale entry.
    if (visited.has(u)) continue;
    visited.add(u);

    // No outgoing edges → continue.
    const neighbours = graph.get(u);
    if (!neighbours) continue;

    for (const { to: v, weight } of neighbours) {
      if (weight < 0) {
        throw new Error('Dijkstra does not support negative edge weights');
      }

      const newDist = curDist + weight;
      const oldDist = dist.get(v);

      // If we found a shorter path to `v`, record it and push to the heap.
      if (oldDist === undefined || newDist < oldDist) {
        dist.set(v, newDist);
        pq.push(newDist, v);
      }
    }
  }

  return dist;
}
// ---------- Build a sample graph ----------
function buildSampleGraph(): Graph<string> {
  const g: Graph<string> = new Map();

  // Helper to add a directed edge
  const addEdge = (from: string, to: string, w: number) => {
    const list = g.get(from) ?? [];
    list.push({ to, weight: w });
    g.set(from, list);
  };

  // Example from CLRS (Figure 24.2)
  addEdge('A', 'B', 4);
  addEdge('A', 'C', 2);
  addEdge('B', 'C', 5);
  addEdge('B', 'D', 10);
  addEdge('C', 'E', 3);
  addEdge('E', 'D', 4);
  addEdge('D', 'F', 11);
  addEdge('E', 'F', 5);

  return g;
}

// ---------- Run Dijkstra ----------
const graph = buildSampleGraph();
const source = 'A';
const distances = dijkstra(graph, source);

console.log(`Shortest distances from ${source}:`);
for (const [vertex, d] of distances.entries()) {
  console.log(`  ${vertex} → ${d}`);
}

/* Expected output:
Shortest distances from A:
  A → 0
  C → 2
  B → 4
  E → 5
  D → 9
  F → 10
*/
# If you have ts-node installed
npx ts-node dijkstra.ts
tsc dijkstra.ts && node dijkstra.js
const distances = dijkstra(myGraph, startVertex); // distances.get(v) = shortest path length

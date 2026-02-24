// Edge between two nodes
interface Edge {
  to: string;      // target node id
  weight: number;  // edge weight
}

// Graph stored as an adjacency list
type Graph = Record<string, Edge[]>;

// Simple min‑heap priority queue
class MinHeap<T> {
  private content: { key: number; value: T }[] = [];

  // Insert a new element
  push(key: number, value: T): void {
    const node = { key, value };
    this.content.push(node);
    this.bubbleUp(this.content.length - 1);
  }

  // Remove the element with the smallest key
  pop(): T | undefined {
    if (this.content.length === 0) return undefined;
    const root = this.content[0].value;

    const last = this.content.pop()!;
    if (this.content.length) {
      this.content[0] = last;
      this.bubbleDown(0);
    }
    return root;
  }

  get size(): number { return this.content.length; }

  private bubbleUp(idx: number): void {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.content[parent].key <= this.content[idx].key) break;
      [this.content[parent], this.content[idx]] = [this.content[idx], this.content[parent]];
      idx = parent;
    }
  }

  private bubbleDown(idx: number): void {
    const length = this.content.length;
    while (true) {
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      let smallest = idx;

      if (left < length && this.content[left].key < this.content[smallest].key) {
        smallest = left;
      }
      if (right < length && this.content[right].key < this.content[smallest].key) {
        smallest = right;
      }
      if (smallest === idx) break;

      [this.content[idx], this.content[smallest]] = [this.content[smallest], this.content[idx]];
      idx = smallest;
    }
  }
}
/**
 * Computes the shortest‑path distances from `src` to every node in `graph`.
 * @param graph     adjacency list
 * @param src       origin node id
 * @returns        a map of node → distance; unreachable nodes have Infinity
 */
function dijkstra(graph: Graph, src: string): Record<string, number> {
  const distances: Record<string, number> = {};
  const visited = new Set<string>();

  // initialise all distances to Infinity
  for (const node in graph) distances[node] = Infinity;
  distances[src] = 0;

  const pq = new MinHeap<string>();
  pq.push(0, src);

  while (pq.size) {
    const u = pq.pop()!;                // node with lowest known distance
    const d = distances[u];

    if (visited.has(u)) continue; // we may have inserted u multiple times
    visited.add(u);

    for (const { to, weight } of graph[u]) {
      const alt = d + weight;
      if (alt < distances[to]) {
        distances[to] = alt;
        pq.push(alt, to);
      }
    }
  }

  return distances;
}
const graph: Graph = {
  A: [{ to: 'B', weight: 5 }, { to: 'C', weight: 2 }],
  B: [{ to: 'C', weight: 1 }, { to: 'D', weight: 3 }],
  C: [{ to: 'B', weight: 4 }, { to: 'D', weight: 6 }],
  D: [],
};

const result = dijkstra(graph, 'A');
console.log(result);
/* prints something like:
{ A: 0, B: 4, C: 2, D: 7 }
*/

// ----- Min‑Heap implementation ---------------------------------------
class MinHeap<T> {
  private items: Array<{key: number; value: T}> = [];

  private siftUp(idx: number) {
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.items[parent].key <= this.items[idx].key) break;
      [this.items[parent], this.items[idx]] = [this.items[idx], this.items[parent]];
      idx = parent;
    }
  }

  private siftDown(idx: number, size: number) {
    while (true) {
      const left = (idx << 1) + 1;
      const right = left + 1;
      let smallest = idx;

      if (left < size && this.items[left].key < this.items[smallest].key) smallest = left;
      if (right < size && this.items[right].key < this.items[smallest].key) smallest = right;

      if (smallest === idx) break;
      [this.items[smallest], this.items[idx]] = [this.items[idx], this.items[smallest]];
      idx = smallest;
    }
  }

  push(key: number, value: T) {
    this.items.push({key, value});
    this.siftUp(this.items.length - 1);
  }

  pop(): T | undefined {
    const size = this.items.length;
    if (!size) return undefined;
    const min = this.items[0].value;
    this.items[0] = this.items[size - 1];
    this.items.pop();
    this.siftDown(0, this.items.length);
    return min;
  }

  get size() {
    return this.items.length;
  }
}


// ----- Graph representation ------------------------------------------
type Edge = { to: number; weight: number };

class Graph {
  private adjacency: Edge[][] = [];

  constructor(private nodeCount: number) {
    this.adjacency = Array.from({length: nodeCount}, () => []);
  }

  addEdge(u: number, v: number, w: number, directed = false) {
    this.adjacency[u].push({to: v, weight: w});
    if (!directed) this.adjacency[v].push({to: u, weight: w});
  }

  getEdges(u: number): Edge[] {
    return this.adjacency[u];
  }
}


// ----- Dijkstra ---------------------------------------
function dijkstra(graph: Graph, start: number): number[] {
  const dist = Array(graph.adjacency.length).fill(Infinity);
  const visited = new Array(graph.adjacency.length).fill(false);
  const pq = new MinHeap<number>();

  dist[start] = 0;
  pq.push(0, start);

  while (pq.size) {
    const u = pq.pop() as number;      // current vertex
    if (visited[u]) continue;          // skip stale entry
    visited[u] = true;

    for (const {to: v, weight: w} of graph.getEdges(u)) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push(dist[v], v);
      }
    }
  }

  return dist; // distances from start to every vertex
}


// ----- Example usage ---------------------------------------
const g = new Graph(6);
g.addEdge(0, 1, 7);
g.addEdge(0, 2, 9);
g.addEdge(0, 5, 14);
g.addEdge(1, 2, 10);
g.addEdge(1, 3, 15);
g.addEdge(2, 3, 11);
g.addEdge(2, 5, 2);
g.addEdge(3, 4, 6);
g.addEdge(4, 5, 9);

const distances = dijkstra(g, 0);
console.log(distances); // shortest distance from vertex 0 to every other vertex

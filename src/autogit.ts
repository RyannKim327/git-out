// ------------- Types -------------
type Node = string | number;
type Edge = [Node, number];          // [neighbor, weight]
type Graph = Map<Node, Edge[]>;

// ------------- Result types -------------
interface DijkstraResult {
  dist: Map<Node, number>;          // shortest distance from start
  prev: Map<Node, Node | undefined>; // predecessor for path reconstruction
}

// ------------- Min-heap (binary) -------------
class MinHeap<T> {
  private data: { key: T; priority: number }[] = [];

  get length() { return this.data.length; }

  enqueue(key: T, priority: number) {
    this.data.push({ key, priority });
    this.bubbleUp(this.data.length - 1);
  }

  dequeue(): { key: T; priority: number } | undefined {
    if (this.data.length === 0) return undefined;
    const min = this.data[0];
    const end = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = end;
      this.bubbleDown(0);
    }
    return min;
  }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.data[parent].priority <= this.data[idx].priority) break;
      [this.data[parent], this.data[idx]] = [this.data[idx], this.data[parent]];
      idx = parent;
    }
  }

  private bubbleDown(idx: number) {
    const n = this.data.length;
    while (true) {
      let min = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      if (left < n && this.data[left].priority < this.data[min].priority) min = left;
      if (right < n && this.data[right].priority < this.data[min].priority) min = right;
      if (min === idx) break;
      [this.data[min], this.data[idx]] = [this.data[idx], this.data[min]];
      idx = min;
    }
  }
}

// ------------- Dijkstra -------------
function dijkstra(graph: Graph, start: Node): DijkstraResult {
  const dist = new Map<Node, number>();
  const prev = new Map<Node, Node | undefined>();
  const heap = new MinHeap<Node>();

  // init
  for (const v of graph.keys()) {
    dist.set(v, Infinity);
    prev.set(v, undefined);
  }
  dist.set(start, 0);
  heap.enqueue(start, 0);

  while (heap.length > 0) {
    const { key: u } = heap.dequeue()!;
    for (const [v, w] of graph.get(u) ?? []) {
      const alt = dist.get(u)! + w;
      if (alt < dist.get(v)!) {
        dist.set(v, alt);
        prev.set(v, u);
        heap.enqueue(v, alt); // allow duplicates; handled by dist check
      }
    }
  }
  return { dist, prev };
}

// ------------- Path reconstruction -------------
function buildPath(prev: Map<Node, Node | undefined>, target: Node): Node[] {
  const path: Node[] = [];
  let curr: Node | undefined = target;
  while (curr !== undefined) {
    path.unshift(curr);
    curr = prev.get(curr);
  }
  return path.length === 1 && path[0] !== target ? [] : path;
}

// ------------- Usage example -------------
if (import.meta.vitest === undefined) { // guard so tests can import this file
  const g: Graph = new Map([
    ['A', [['B', 4], ['C', 2]]],
    ['B', [['C', 1], ['D', 5]]],
    ['C', [['D', 8], ['E', 10]]],
    ['D', [['E', 2]]],
    ['E', []],
  ]);

  const { dist, prev } = dijkstra(g, 'A');
  console.log('Distance map:', [...dist.entries()]);
  console.log('Shortest path A→E:', buildPath(prev, 'E'));
}

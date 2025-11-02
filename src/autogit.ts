// ---------- types ----------
type Edge = { to: string; weight: number };

type Result = {
  distance: Map<string, number>;   // shortest distance from start
  previous: Map<string, string | null>; // predecessor for path reconstruction
};

// ---------- priority queue (binary heap) ----------
class MinHeap<T> {
  private items: T[] = [];
  constructor(private score: (t: T) => number) {}

  push(item: T): void {
    this.items.push(item);
    this.bubbleUp(this.items.length - 1);
  }
  pop(): T | undefined {
    if (this.items.length === 0) return undefined;
    const min = this.items[0];
    const end = this.items.pop()!;
    if (this.items.length) {
      this.items[0] = end;
      this.bubbleDown(0);
    }
    return min;
  }
  get length(): number { return this.items.length; }

  private bubbleUp(idx: number): void {
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.score(this.items[idx]) >= this.score(this.items[parent])) break;
      [this.items[idx], this.items[parent]] = [this.items[parent], this.items[idx]];
      idx = parent;
    }
  }
  private bubbleDown(idx: number): void {
    const n = this.items.length;
    while (true) {
      let left = (idx << 1) + 1;
      let right = left + 1;
      let smallest = idx;
      if (left < n && this.score(this.items[left]) < this.score(this.items[smallest]))
        smallest = left;
      if (right < n && this.score(this.items[right]) < this.score(this.items[smallest]))
        smallest = right;
      if (smallest === idx) break;
      [this.items[idx], this.items[smallest]] = [this.items[smallest], this.items[idx]];
      idx = smallest;
    }
  }
}

// ---------- Dijkstra ----------
export function dijkstra(
  graph: Map<string, Edge[]>,
  start: string
): Result {
  const distance = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const heap = new MinHeap<{ node: string; dist: number }>(x => x.dist);

  // init
  for (const node of graph.keys()) {
    distance.set(node, Infinity);
    previous.set(node, null);
  }
  distance.set(start, 0);
  heap.push({ node: start, dist: 0 });

  while (heap.length) {
    const { node: u, dist: d } = heap.pop()!;
    if (d > distance.get(u)!) continue; // stale entry

    for (const { to: v, weight } of graph.get(u) ?? []) {
      const alt = d + weight;
      if (alt < distance.get(v)!) {
        distance.set(v, alt);
        previous.set(v, u);
        heap.push({ node: v, dist: alt });
      }
    }
  }
  return { distance, previous };
}

// ---------- path reconstruction ----------
export function buildPath(
  previous: Map<string, string | null>,
  target: string
): string[] {
  const path: string[] = [];
  let curr: string | null = target;
  while (curr !== null) {
    path.unshift(curr);
    curr = previous.get(curr)!;
  }
  return path.length === 1 && path[0] !== target ? [] : path;
}
const g = new Map<string, Edge[]>();
g.set('A', [{ to: 'B', weight: 4 }, { to: 'C', weight: 2 }]);
g.set('B', [{ to: 'C', weight: 1 }, { to: 'D', weight: 5 }]);
g.set('C', [{ to: 'D', weight: 8 }, { to: 'E', weight 10 }]);
g.set('D', [{ to: 'E', weight: 2 }]);
g.set('E', []);

const { distance, previous } = dijkstra(g, 'A');
console.log('Distance to E:', distance.get('E')); // 9
console.log('Path to E:', buildPath(previous, 'E')); // ['A','C','D','E']

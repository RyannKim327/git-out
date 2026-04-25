// ---------- types ----------
export type Node = string | number | symbol;

export type Edge = {
  to: Node;
  cost: number;
};

export type Graph = Map<Node, Edge[]>;

// ---------- binary min‑heap ----------
class PriorityQueue<T> {
  private items: Array<[T, number]> = []; // [value, priority]

  private static swap(arr: any[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  private siftUp(idx: number) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.items[parent][1] <= this.items[idx][1]) break;
      PriorityQueue.swap(this.items, parent, idx);
      idx = parent;
    }
  }

  private siftDown(idx: number) {
    const length = this.items.length;
    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;

      if (left < length && this.items[left][1] < this.items[smallest][1])
        smallest = left;
      if (right < length && this.items[right][1] < this.items[smallest][1])
        smallest = right;

      if (smallest === idx) break;
      PriorityQueue.swap(this.items, idx, smallest);
      idx = smallest;
    }
  }

  enqueue(value: T, priority: number) {
    this.items.push([value, priority]);
    this.siftUp(this.items.length - 1);
  }

  dequeue(): T | undefined {
    if (!this.items.length) return undefined;
    const min = this.items[0][0];
    const last = this.items.pop()!;
    if (this.items.length) {
      this.items[0] = last;
      this.siftDown(0);
    }
    return min;
  }

  get size() {
    return this.items.length;
  }
}

// ---------- Dijkstra ----------
export function dijkstra(
  graph: Graph,
  start: Node,
  target?: Node
): { distances: Map<Node, number>; predecessors: Map<Node, Node | null> } {
  const distances = new Map<Node, number>();
  const predecessors = new Map<Node, Node | null>();
  const pq = new PriorityQueue<Node>();

  // init
  graph.forEach((_, node) => {
    distances.set(node, Infinity);
    predecessors.set(node, null);
  });
  distances.set(start, 0);
  pq.enqueue(start, 0);

  while (pq.size) {
    const u = pq.dequeue()!;
    const du = distances.get(u)!;

    // Stop early if we hit the target (optional)
    if (target !== undefined && u === target) break;

    const edges = graph.get(u) || [];
    for (const { to: v, cost } of edges) {
      const alt = du + cost;
      if (alt < distances.get(v)!) {
        distances.set(v, alt);
        predecessors.set(v, u);
        pq.enqueue(v, alt);
      }
    }
  }

  return { distances, predecessors };
}

// ---------- helper to rebuild a path ----------
export function reconstructPath(
  predecessors: Map<Node, Node | null>,
  start: Node,
  target: Node
): Node[] {
  const path: Node[] = [];
  let current: Node | null = target;

  while (current !== null) {
    path.unshift(current);
    if (current === start) break;
    current = predecessors.get(current) || null;
  }

  if (path[0] !== start) {
    throw new Error(`No path found from ${String(start)} to ${String(target)}`);
  }

  return path;
}
const g: Graph = new Map([
  ['A', [{ to: 'B', cost: 2 }, { to: 'C', cost: 5 }]],
  ['B', [{ to: 'C', cost: 1 }, { to: 'D', cost: 4 }]],
  ['C', [{ to: 'D', cost: 1 }]],
  ['D', []],
]);

const { distances, predecessors } = dijkstra(g, 'A', 'D');
console.log('Distance to D:', distances.get('D'));      // 4
console.log('Path:', reconstructPath(predecessors, 'A', 'D'));

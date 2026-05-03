// ------------------------------------------------------------
//  1️⃣  Types / data structures
// ------------------------------------------------------------
export type ID = string | number;

// Location on a grid (for the example)
export interface Point {
  x: number;
  y: number;
  toString(): string;           // stringify for use as Map keys
}

export class PointImpl implements Point {
  constructor(public x: number, public y: number) {}
  toString() { return `${this.x},${this.y}`; }

  // For the priority queue we need a score
  distanceTo(other: Point) {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y); // manhattan
  }
}

// Edge connects two nodes with a weight (default = 1)
export interface Edge<T> {
  from: T;
  to: T;
  weight: number;
  cost?: number;          // will be filled later
}

export type Graph<T> = Map<T, Edge<T>[]>; // adjacency list

// ------------------------------------------------------------
//  2️⃣  Binary‑heap priority queue (min‑heap)
// ------------------------------------------------------------
class HeapNode<T> {
  constructor(public key: number, public value: T) {}
}

export class PriorityQueue<T> {
  private heap: HeapNode<T>[] = [];

  get size() { return this.heap.length; }
  empty() { return this.size === 0; }

  push(key: number, value: T) {
    this.heap.push(new HeapNode(key, value));
    this.bubbleUp(this.size - 1);
  }
  pop(): HeapNode<T> | undefined {
    if (this.empty()) return;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (!this.empty()) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[p].key <= this.heap[i].key) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
  private bubbleDown(i: number) {
    const n = this.size;
    while (true) {
      let l = (i << 1) + 1, r = l + 1, smallest = i;
      if (l < n && this.heap[l].key < this.heap[smallest].key) smallest = l;
      if (r < n && this.heap[r].key < this.heap[smallest].key) smallest = r;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}

// ------------------------------------------------------------
//  3️⃣  AStar implementation
// ------------------------------------------------------------
export interface AStarOptions<T> {
  graph: Graph<T>;
  heuristic: (a: T, b: T) => number;
  start: T;
  goal: T;
}

export function aStar<T>(opts: AStarOptions<T>): { path: T[]; cost: number } | null {
  const { graph, heuristic, start, goal } = opts;

  const open = new PriorityQueue<T>();
  open.push(0, start);

  const cameFrom = new Map<T, T | null>();
  const gScore = new Map<T, number>();

  cameFrom.set(start, null);
  gScore.set(start, 0);

  while (!open.empty()) {
    const node = open.pop()!;
    const u = node.value;

    if (u === goal) {
      // reconstruct
      const path: T[] = [];
      let cur: T | null = u;
      while (cur !== null) {
        path.push(cur);
        cur = cameFrom.get(cur) ?? null;
      }
      path.reverse();
      return { path, cost: gScore.get(u)! };
    }

    for (const edge of graph.get(u) ?? []) {
      const v = edge.to;
      const tentativeG = gScore.get(u)! + edge.weight;

      if (!gScore.has(v) || tentativeG < gScore.get(v)!) {
        cameFrom.set(v, u);
        gScore.set(v, tentativeG);

        const f = tentativeG + heuristic(v, goal);
        open.push(f, v);
      }
    }
  }

  return null; // no path
}

// ------------------------------------------------------------
//  4️⃣  Example – 4×4 grid with obstacles
// ------------------------------------------------------------
function buildGridGraph(width: number, height: number, walls: Set<string>): Graph<Point> {
  const graph = new Map<Point, Edge<Point>[]>();

  const dirs = [
    [0, -1], [1, 0], [0, 1], [-1, 0],
  ];

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const p = new PointImpl(x, y);
      if (walls.has(p.toString())) continue;

      const neighbours: Edge<Point>[] = [];
      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const q = new PointImpl(nx, ny);
        if (walls.has(q.toString())) continue;
        neighbours.push({ from: p, to: q, weight: 1 });
      }
      graph.set(p, neighbours);
    }
  }

  return graph;
}

export async function main() {
  const width = 4, height = 4;
  const walls = new Set<string>([
    new PointImpl(1, 1).toString(),
    new PointImpl(2, 1).

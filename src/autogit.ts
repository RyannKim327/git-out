/** A* result: the optimal path + its total cost. */
export interface PathResult<T> {
  path: T[];
  cost: number;
}

/** A single node inside the open/closed set. */
interface Node<T> {
  data: T;
  g: number;      // cheapest cost from start → this node
  f: number;      // g + heuristic(this, goal)
  parent?: Node<T>;
}

/** Generic A* search. */
export function aStar<T>(
  start: T,
  goal: T,
  neighbours: (v: T) => Iterable<T>,
  cost: (a: T, b: T) => number,
  heuristic: (a: T, b: T) => number,
  equals: (a: T, b: T) => boolean = (a, b) => a === b
): PathResult<T> | null {
  const open = new BinaryHeap<Node<T>>((n) => n.f);
  const closed = new Set<string>();

  const startNode: Node<T> = { data: start, g: 0, f: heuristic(start, goal) };
  open.push(startNode);

  const key = (v: T) => JSON.stringify(v); // simple hashing; override if needed

  while (!open.empty()) {
    const current = open.pop()!;
    const ck = key(current.data);

    if (closed.has(ck)) continue;
    closed.add(ck);

    if (equals(current.data, goal)) {
      // reconstruct path
      const path: T[] = [];
      let n: Node<T> | undefined = current;
      while (n) {
        path.unshift(n.data);
        n = n.parent;
      }
      return { path, cost: current.g };
    }

    for (const nxt of neighbours(current.data)) {
      const nk = key(nxt);
      if (closed.has(nk)) continue;

      const tentativeG = current.g + cost(current.data, nxt);
      const neighbourNode: Node<T> = {
        data: nxt,
        g: tentativeG,
        f: tentativeG + heuristic(nxt, goal),
        parent: current,
      };
      open.push(neighbourNode);
    }
  }
  return null; // no path
}

/* ------------------------------------------------------------------ */
/* Minimal binary heap (priority queue)                                 */
/* ------------------------------------------------------------------ */
class BinaryHeap<T> {
  private items: T[] = [];
  constructor(private scoreFn: (t: T) => number) {}

  push(el: T) {
    this.items.push(el);
    this.bubbleUp(this.items.length - 1);
  }
  pop(): T | undefined {
    const result = this.items[0];
    const end = this.items.pop();
    if (this.items.length && end !== undefined) {
      this.items[0] = end;
      this.bubbleDown(0);
    }
    return result;
  }
  empty() { return !this.items.length; }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.scoreFn(this.items[parent]) <= this.scoreFn(this.items[idx])) break;
      [this.items[parent], this.items[idx]] = [this.items[idx], this.items[parent]];
      idx = parent;
    }
  }
  private bubbleDown(idx: number) {
    const length = this.items.length;
    while (true) {
      const left = (idx << 1) + 1;
      const right = left + 1;
      let smallest = idx;
      if (left < length && this.scoreFn(this.items[left]) < this.scoreFn(this.items[smallest]))
        smallest = left;
      if (right < length && this.scoreFn(this.items[right]) < this.scoreFn(this.items[smallest]))
        smallest = right;
      if (smallest === idx) break;
      [this.items[idx], this.items[smallest]] = [this.items[smallest], this.items[idx]];
      idx = smallest;
    }
  }
}
import { aStar } from './astar';

type Pos = { x: number; y: number };

function gridNeighbours(p: Pos): Pos[] {
  const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
  return dirs
    .map(d => ({ x: p.x + d.x, y: p.y + d.y }))
    .filter(v => v.x >= 0 && v.y >= 0 && v.x < 20 && v.y < 20); // stay inside 20×20
}

function manhattan(a: Pos, b: Pos) { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); }

const result = aStar(
  { x: 0, y: 0 },           // start
  { x: 19, y: 19 },         // goal
  gridNeighbours,
  () => 1,                   // uniform cost
  manhattan
);

if (result) {
  console.log('Path found, length:', result.path.length, 'cost:', result.cost);
  console.log(result.path.slice(0, 5), '...', result.path.slice(-3));
} else {
  console.log('No path');
}

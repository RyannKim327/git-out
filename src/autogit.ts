// A*.ts
export type Node<T> = T;
export type Edge<T> = { to: Node<T>; cost: number };

export interface AStarFuncs<T> {
  neighbours: (v: Node<T>) => Edge<T>[];
  heuristic: (a: Node<T>, b: Node<T>) => number;
  hash: (v: Node<T>) => string | number;        // unique id for hashing
  distance?: (a: Node<T>, b: Node<T>) => number; // defaults to heuristic
  isGoal: (v: Node<T>) => boolean;
}

export function aStar<T>(
  start: Node<T>,
  funcs: AStarFuncs<T>
): { path: Node<T>[]; cost: number } | null {
  const { neighbours, heuristic, hash, isGoal } = funcs;
  const dist = funcs.distance ?? heuristic;

  const open = new BinaryHeap<Node<T>>((a, b) => fScore.get(a)! - fScore.get(b)!);
  const gScore = new Map<string | number, number>();
  const fScore = new Map<string | number, number>();
  const cameFrom = new Map<string | number, Node<T>>();

  const h = (v: Node<T>) => heuristic(v, start); // heuristic to goal
  const id = (v: Node<T>) => hash(v);

  gScore.set(id(start), 0);
  fScore.set(id(start), h(start));
  open.push(start);

  while (!open.isEmpty()) {
    const current = open.pop()!;

    if (isGoal(current)) {
      // Reconstruct path
      const path: Node<T>[] = [];
      let tmp: Node<T> | undefined = current;
      while (tmp !== undefined) {
        path.unshift(tmp);
        tmp = cameFrom.get(id(tmp));
      }
      return { path, cost: gScore.get(id(current))! };
    }

    for (const { to, cost } of neighbours(current)) {
      const tentative = gScore.get(id(current))! + cost;
      const toId = id(to);
      if (tentative < (gScore.get(toId) ?? Infinity)) {
        cameFrom.set(toId, current);
        gScore.set(toId, tentative);
        fScore.set(toId, tentative + h(to));
        if (!open.contains(to)) open.push(to);
      }
    }
  }
  return null; // No path
}

/* ---------- Minimal binary heap (priority queue) ---------- */
class BinaryHeap<T> {
  private items: T[] = [];
  constructor(private compare: (a: T, b: T) => number) {}
  push(v: T) {
    this.items.push(v);
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
  isEmpty() { return !this.items.length; }
  contains(v: T) { return this.items.includes(v); }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.compare(this.items[idx], this.items[parent]) < 0) {
        [this.items[idx], this.items[parent]] = [this.items[parent], this.items[idx]];
        idx = parent;
      } else break;
    }
  }
  private bubbleDown(idx: number) {
    while (true) {
      let min = idx;
      const left = idx * 2 + 1;
      const right = left + 1;
      if (left < this.items.length && this.compare(this.items[left], this.items[min]) < 0) min = left;
      if (right < this.items.length && this.compare(this.items[right], this.items[min]) < 0) min = right;
      if (min !== idx) {
        [this.items[idx], this.items[min]] = [this.items[min], this.items[idx]];
        idx = min;
      } else break;
    }
  }
}
interface Vec2 { x: number; y: number }

const gridAStar = (
  start: Vec2,
  goal: Vec2,
  grid: number[][] // 0 = free, 1 = wall
) =>
  aStar(start, {
    neighbours: ({ x, y }) => {
      const dirs = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ];
      return dirs
        .map(d => ({ x: x + d.x, y: y + d.y }))
        .filter(p => grid[p.y]?.[p.x] === 0)
        .map(p => ({ to: p, cost: 1 }));
    },
    heuristic: (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y),
    hash: v => `${v.x},${v.y}`,
    isGoal: v => v.x === goal.x && v.y === goal.y,
  });

// Run
const result = gridAStar({ x: 0, y: 0 }, { x: 7, y: 7 }, [
  [0,0,0,0,0,0,0,0],
  [0,1,1,0,1,0,0,0],
  [0,0,0,0,1,0,1,0],
  [0,1,0,0,0,0,1,0],
  [0,1,0,1,1,0,0,0],
  [0,0,0,0,0,0,1,0],
  [0,1,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0],
]);

console.log(result?.path); // shortest path coordinates
console.log('cost:', result?.cost);

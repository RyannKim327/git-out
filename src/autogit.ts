npm i typescript @types/node  # if you don’t have them
export interface AStarNode {
  /** Unique identifier used for the internal visited set. */
  id: string;
}

export interface AStarAdapter<T extends AStarNode> {
  /** Return every neighbour that can be reached from `from`. */
  neighbours(from: T): T[];
  /** Cost of moving from `from` to `to`. Must be >= 0. */
  cost(from: T, to: T): number;
  /** Admissible heuristic: estimated cost from `node` to goal. Must never over-estimate. */
  heuristic(node: T, goal: T): number;
}

interface Entry<T> {
  node: T;
  g: number;      // best cost from start → node
  f: number;      // g + heuristic(node, goal)
  parent?: Entry<T>;
}

/**
 * A* search.  Returns the optimal path (including start and goal) or
 * undefined when no route exists.
 */
export function aStar<T extends AStarNode>(
  start: T,
  goal: T,
  adapter: AStarAdapter<T>
): T[] | undefined {
  const open = new BinaryHeap<Entry<T>>((a, b) => a.f - b.f);
  const best = new Map<string, number>(); // nodeId → best g

  const startEntry: Entry<T> = {
    node: start,
    g: 0,
    f: adapter.heuristic(start, goal),
  };
  open.push(startEntry);
  best.set(start.id, 0);

  while (!open.empty()) {
    const current = open.pop()!;
    if (current.node.id === goal.id) return reconstruct(current);

    for (const nb of adapter.neighbours(current.node)) {
      const tentativeG = current.g + adapter.cost(current.node, nb);
      const prevG = best.get(nb.id);
      if (prevG !== undefined && tentativeG >= prevG) continue;

      const next: Entry<T> = {
        node: nb,
        g: tentativeG,
        f: tentativeG + adapter.heuristic(nb, goal),
        parent: current,
      };
      best.set(nb.id, tentativeG);
      open.push(next);
    }
  }
  return undefined; // no path
}

function reconstruct<T>(entry: Entry<T>): T[] {
  const out: T[] = [];
  let cur: Entry<T> | undefined = entry;
  while (cur) {
    out.push(cur.node);
    cur = cur.parent;
  }
  return out.reverse();
}

/* ------------------------------------------------------------------ */
/* Tiny binary heap for the open set                                    */
/* ------------------------------------------------------------------ */
class BinaryHeap<T> {
  private items: T[] = [];
  constructor(private cmp: (a: T, b: T) => number) {}
  push(item: T) {
    this.items.push(item);
    this.bubbleUp(this.items.length - 1);
  }
  pop(): T | undefined {
    const result = this.items[0];
    const end = this.items.pop();
    if (this.items.length) {
      this.items[0] = end!;
      this.bubbleDown(0);
    }
    return result;
  }
  empty() { return this.items.length === 0; }
  private bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.cmp(this.items[idx], this.items[parent]) >= 0) break;
      [this.items[idx], this.items[parent]] = [this.items[parent], this.items[idx]];
      idx = parent;
    }
  }
  private bubbleDown(idx: number) {
    const len = this.items.length;
    const halfLen = len >> 1;
    while (idx < halfLen) {
      let child = (idx << 1) + 1;
      const right = child + 1;
      if (right < len && this.cmp(this.items[right], this.items[child]) < 0) child = right;
      if (this.cmp(this.items[idx], this.items[child]) <= 0) break;
      [this.items[idx], this.items[child]] = [this.items[child], this.items[idx]];
      idx = child;
    }
  }
}
import { aStar, AStarNode, AStarAdapter } from './aStar';

class Tile implements AStarNode {
  constructor(public x: number, public y: number) {}
  get id() { return `${this.x},${this.y}`; }
}

class GridAdapter implements AStarAdapter<Tile> {
  constructor(
    private width: number,
    private height: number,
    private blocked: Set<string>
  ) {}

  neighbours(t: Tile): Tile[] {
    const { x, y } = t;
    const res: Tile[] = [];
    const add = (nx: number, ny: number) => {
      if (nx >= 0 && ny >= 0 && nx < this.width && ny < this.height)
        if (!this.blocked.has(`${nx},${ny}`)) res.push(new Tile(nx, ny));
    };
    add(x + 1, y);
    add(x - 1, y);
    add(x, y + 1);
    add(x, y - 1);
    return res;
  }

  cost() { return 1; } // uniform cost
  heuristic(a: Tile, b: Tile) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan
  }
}

/* ---------------- run ---------------- */
const adapter = new GridAdapter(20, 20, new Set(['2,2', '2,3', '2,4']));
const path = aStar(new Tile(0, 0), new Tile(5, 5), adapter);
console.log(path?.map(t => `(${t.x},${t.y})`).join(' -> '));

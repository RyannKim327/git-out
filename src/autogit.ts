// astar.ts
export interface AstarNode<T> {
  id: string;                 // must be unique
  data: T;                    // whatever payload you need
  neighbours(): AstarNode<T>[];
  cost(to: AstarNode<T>): number; // positive edge weight
}

export interface PathResult<T> {
  path: AstarNode<T>[];
  cost: number;
}

/**
 * A* search.
 * @param start       Start node
 * @param goal        Goal node
 * @param heuristic   Admissible heuristic h(n) estimating cost from n to goal
 */
export function aStar<T>(
  start: AstarNode<T>,
  goal: AstarNode<T>,
  heuristic: (n: AstarNode<T>) => number
): PathResult<T> | null {
  type Node = AstarNode<T>;

  const open = new Heap<Node>((a, b) => (fScore.get(a) ?? Infinity) - (fScore.get(b) ?? Infinity));
  const gScore = new Map<string, number>();   // cheapest cost from start
  const fScore = new Map<string, number>(); // gScore + heuristic
  const cameFrom = new Map<string, string>();

  gScore.set(start.id, 0);
  fScore.set(start.id, heuristic(start));
  open.push(start);

  while (!open.isEmpty()) {
    const current = open.pop()!;

    if (current.id === goal.id) {
      // Reconstruct path
      const path: Node[] = [];
      let id: string | undefined = goal.id;
      while (id) {
        // lookup node by id (simple linear scan – replace by Map if needed)
        const node = [start, goal, ...open.items()].find(n => n.id === id)!;
        path.unshift(node);
        id = cameFrom.get(id);
      }
      return { path, cost: gScore.get(goal.id)! };
    }

    for (const nb of current.neighbours()) {
      const tentative = gScore.get(current.id)! + current.cost(nb);
      const nbOldG = gScore.get(nb.id) ?? Infinity;

      if (tentative < nbOldG) {
        cameFrom.set(nb.id, current.id);
        gScore.set(nb.id, tentative);
        fScore.set(nb.id, tentative + heuristic(nb));

        if (!open.contains(nb)) open.push(nb);
      }
    }
  }
  return null; // no path
}

/* ---------- Minimal binary heap priority queue ---------- */
class Heap<T> {
  private arr: T[] = [];
  constructor(private cmp: (a: T, b: T) => number) {}
  push(item: T) {
    this.arr.push(item);
    this.bubbleUp(this.arr.length - 1);
  }
  pop(): T | undefined {
    if (this.arr.length === 0) return undefined;
    const top = this.arr[0];
    const last = this.arr.pop()!;
    if (this.arr.length > 0) {
      this.arr[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }
  isEmpty() { return this.arr.length === 0; }
  contains(item: T) { return this.arr.includes(item); }
  items() { return this.arr.slice(); }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.cmp(this.arr[idx], this.arr[parent]) < 0) {
        [this.arr[idx], this.arr[parent]] = [this.arr[parent], this.arr[idx]];
        idx = parent;
      } else break;
    }
  }
  private bubbleDown(idx: number) {
    while (true) {
      let min = idx;
      const left = idx * 2 + 1;
      const right = left + 1;
      if (left < this.arr.length && this.cmp(this.arr[left], this.arr[min]) < 0) min = left;
      if (right < this.arr.length && this.cmp(this.arr[right], this.arr[min]) < 0) min = right;
      if (min !== idx) {
        [this.arr[idx], this.arr[min]] = [this.arr[min], this.arr[idx]];
        idx = min;
      } else break;
    }
  }
}
class GridNode implements AstarNode<{ x: number; y: number }> {
  id: string;
  constructor(public data: { x: number; y: number }) {
    this.id = `${data.x},${data.y}`;
  }
  neighbours(): GridNode[] {
    const { x, y } = this.data;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    return dirs
      .map(([dx, dy]) => new GridNode({ x: x + dx, y: y + dy }))
      .filter(n => n.data.x >= 0 && n.data.y >= 0 && n.data.x < 20 && n.data.y < 20); // stay inside 20×20
  }
  cost(): number { return 1; } // uniform cost
}

const start = new GridNode({ x: 0, y: 0 });
const goal  = new GridNode({ x: 19, y: 19 });
const heuristic = (n: GridNode) => {
  const dx = Math.abs(n.data.x - goal.data.x);
  const dy = Math.abs(n.data.y - goal.data.y);
  return dx + dy; // Manhattan distance
};

const result = aStar(start, goal, heuristic);
if (result) {
  console.log('Path length:', result.path.length);
  console.log('Cost:', result.cost);
} else {
  console.log('No path found');
}

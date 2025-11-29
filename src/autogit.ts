// astar.ts
export interface AStarNode {
  /** Unique identifier used for `Set`/`Map` lookups. */
  readonly id: string;
}

export interface AStarFuncs<T extends AStarNode> {
  /** All direct successors of `node`. */
  neighbors(node: T): T[];
  /** Positive edge weight between two adjacent nodes. */
  cost(a: T, b: T): number;
  /** Admissible heuristic (must never overestimate). */
  heuristic(a: T, goal: T): number;
}

/**
 * A* search.
 * @param start  Start node.
 * @param goal   Goal node.
 * @param funcs  Implementation of neighbours, cost, heuristic.
 * @returns      Array of nodes from start to goal (inclusive) or `null`.
 */
export function aStar<T extends AStarNode>(
  start: T,
  goal: T,
  funcs: AStarFuncs<T>
): T[] | null {
  type Node = T;
  const { neighbors, cost, heuristic } = funcs;

  // open-set implemented as a binary heap (min-heap) ordered by fScore
  const open = new BinaryHeap<Node>((n) => fScore.get(n)!);
  const openHas = new Set<string>();          // mirror set for O(1) lookup
  const closed = new Set<string>();

  // cheapest cost from start to a given node
  const gScore = new Map<string, number>();
  // best predecessor for reconstruction
  const cameFrom = new Map<string, Node>();

  gScore.set(start.id, 0);
  fScore.set(start.id, heuristic(start, goal));
  open.push(start);
  openHas.add(start.id);

  while (!open.empty()) {
    const current = open.pop()!;
    openHas.delete(current.id);

    if (current.id === goal.id) {
      return reconstructPath(cameFrom, current);
    }

    closed.add(current.id);

    for (const neighbor of neighbors(current)) {
      if (closed.has(neighbor.id)) continue;

      const tentative = gScore.get(current.id)! + cost(current, neighbor);

      if (!openHas.has(neighbor.id)) {
        open.push(neighbor);
        openHas.add(neighbor.id);
      } else if (tentative >= (gScore.get(neighbor.id) ?? Infinity)) {
        continue; // not a better path
      }

      // best path so far
      cameFrom.set(neighbor.id, current);
      gScore.set(neighbor.id, tentative);
      fScore.set(neighbor.id, tentative + heuristic(neighbor, goal));
    }
  }

  return null; // no path

  /* ---------- helpers ---------- */
  const fScore = new Map<string, number>(); // f = g + h

  function reconstructPath(map: Map<string, Node>, current: Node): Node[] {
    const path: Node[] = [current];
    while (map.has(current.id)) {
      current = map.get(current.id)!;
      path.unshift(current);
    }
    return path;
  }
}

/* ------------------------------------------------------------------ */
/* Tiny binary heap (can be replaced by any priority-queue lib)        */
/* ------------------------------------------------------------------ */
class BinaryHeap<T> {
  private arr: T[] = [];
  constructor(private score: (t: T) => number) {}

  push(t: T) {
    this.arr.push(t);
    this.bubbleUp(this.arr.length - 1);
  }
  pop(): T {
    const top = this.arr[0];
    const end = this.arr.pop()!;
    if (this.arr.length) {
      this.arr[0] = end;
      this.bubbleDown(0);
    }
    return top;
  }
  empty() { return this.arr.length === 0; }

  private bubbleUp(idx: number) {
    const elt = this.arr[idx];
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.score(elt) >= this.score(this.arr[parent])) break;
      this.arr[idx] = this.arr[parent];
      idx = parent;
    }
    this.arr[idx] = elt;
  }
  private bubbleDown(idx: number) {
    const elt = this.arr[idx];
    const len = this.arr.length;
    while (true) {
      let swap = null;
      const left = (idx << 1) + 1;
      const right = left + 1;
      if (left < len && this.score(this.arr[left]) < this.score(elt)) swap = left;
      if (right < len && this.score(this.arr[right]) < this.score(swap === null ? elt : this.arr[swap]!)) swap = right;
      if (swap === null) break;
      this.arr[idx] = this.arr[swap];
      idx = swap;
    }
    this.arr[idx] = elt;
  }
}
import { aStar, AStarNode, AStarFuncs } from './astar';

class GridNode implements AStarNode {
  constructor(public readonly id: string, public x: number, public y: number) {}
  static key(x: number, y: number) { return `${x},${y}`; }
}

const GRID_FUNCS: AStarFuncs<GridNode> = {
  neighbors: (n) => {
    const deltas = [[1,0],[-1,0],[0,1],[0,-1]];
    const out: GridNode[] = [];
    for (const [dx,dy] of deltas) {
      const nx = n.x + dx, ny = n.y + dy;
      if (nx < 0 || ny < 0 || nx >= 20 || ny >= 20) continue; // stay inside 20×20
      out.push(new GridNode(GridNode.key(nx,ny), nx, ny));
    }
    return out;
  },
  cost: () => 1, // uniform cost
  heuristic: (a, goal) => Math.abs(a.x - goal.x) + Math.abs(a.y - goal.y),
};

const start = new GridNode('0,0', 0, 0);
const goal  = new GridNode('19,19', 19, 19);
const path = aStar(start, goal, GRID_FUNCS);
console.log(path?.map(n => `(${n.x},${n.y})`).join(' -> '));
$ npx tsc astar.ts grid.ts && node grid.js
(0,0) -> (1,0) -> ... -> (19,19)

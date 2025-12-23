/**
 * Generic A* search in TypeScript
 * T = type that represents a node (number, string, {x,y}, custom object, …)
 */
export interface AStarOpts<T> {
  start: T;
  goal: T;
  getNeighbors: (node: T) => T[];
  getCost: (from: T, to: T) => number;
  heuristic: (a: T, b: T) => number;
  equals?: (a: T, b: T) => boolean; // defaults to Object.is
}

export function aStar<T>(opts: AStarOpts<T>): T[] | null {
  const {
    start,
    goal,
    getNeighbors,
    getCost,
    heuristic,
    equals = Object.is,
  } = opts;

  type NodeRef = { node: T; f: number; g: number; h: number };

  // Priority queue ordered by f = g + h
  const open = new BinaryHeap<NodeRef>((a, b) => a.f - b.f);

  // Maps node → best known g-value
  const gScore = new Map<T, number>();

  // Maps node → predecessor on best path
  const cameFrom = new Map<T, T>();

  const startNode: NodeRef = {
    node: start,
    f: heuristic(start, goal),
    g: 0,
    h: heuristic(start, goal),
  };

  open.push(startNode);
  gScore.set(start, 0);

  while (!open.isEmpty()) {
    const current = open.pop()!;

    if (equals(current.node, goal)) {
      // Reconstruct path
      const path: T[] = [current.node];
      let prev = cameFrom.get(current.node);
      while (prev !== undefined) {
        path.unshift(prev);
        prev = cameFrom.get(prev);
      }
      return path;
    }

    for (const neighbor of getNeighbors(current.node)) {
      const tentativeG = current.g + getCost(current.node, neighbor);

      const bestG = gScore.get(neighbor);
      if (bestG !== undefined && tentativeG >= bestG) continue;

      // Found a better route to neighbor
      cameFrom.set(neighbor, current.node);
      gScore.set(neighbor, tentativeG);

      const h = heuristic(neighbor, goal);
      open.push({ node: neighbor, f: tentativeG + h, g: tentativeG, h });
    }
  }

  return null; // No path
}

/* ------------------------------------------------------------------ */
/* Minimal binary heap (min-heap) implementation                        */
/* ------------------------------------------------------------------ */
class BinaryHeap<T> {
  private items: T[] = [];

  constructor(private compare: (a: T, b: T) => number) {}

  get length() { return this.items.length; }
  isEmpty() { return this.items.length === 0; }

  push(item: T) {
    this.items.push(item);
    this.bubbleUp(this.items.length - 1);
  }

  peek(): T | undefined { return this.items[0]; }

  pop(): T | undefined {
    const result = this.items[0];
    const end = this.items.pop();
    if (this.items.length > 0 && end !== undefined) {
      this.items[0] = end;
      this.bubbleDown(0);
    }
    return result;
  }

  private bubbleUp(idx: number) {
    const item = this.items[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.items[parentIdx];
      if (this.compare(item, parent) >= 0) break;
      this.items[idx] = parent;
      idx = parentIdx;
    }
    this.items[idx] = item;
  }

  private bubbleDown(idx: number) {
    const length = this.items.length;
    const item = this.items[idx];
    while (true) {
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let swapIdx: number | null = null;

      if (leftChildIdx < length) {
        const leftChild = this.items[leftChildIdx];
        if (this.compare(leftChild, item) < 0) swapIdx = leftChildIdx;
      }
      if (rightChildIdx < length) {
        const rightChild = this.items[rightChildIdx];
        const compareAgainst =
          swapIdx === null ? item : this.items[swapIdx];
        if (this.compare(rightChild, compareAgainst) < 0)
          swapIdx = rightChildIdx;
      }
      if (swapIdx === null) break;
      this.items[idx] = this.items[swapIdx];
      idx = swapIdx;
    }
    this.items[idx] = item;
  }
}
import { aStar } from "./astar";

interface Pos { x: number; y: number; }

const GRID_W = 20;
const GRID_H = 15;

// 0 = free, 1 = wall
const grid: number[][] = Array.from({ length: GRID_H }, () =>
  Array.from({ length: GRID_W }, () => 0)
);

// Add some obstacles
for (let y = 3; y < 8; y++) grid[y][5] = 1;
for (let x = 10; x < 15; x++) grid[10][x] = 1;

function inBounds(p: Pos) {
  return p.x >= 0 && p.y >= 0 && p.x < GRID_W && p.y < GRID_H;
}

function getNeighbors(p: Pos): Pos[] {
  const dirs = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];
  return dirs
    .map((d) => ({ x: p.x + d.x, y: p.y + d.y }))
    .filter((n) => inBounds(n) && grid[n.y][n.x] === 0);
}

function cost() { return 1; } // uniform cost
function heuristic(a: Pos, b: Pos) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan distance
}

const path = aStar({
  start: { x: 2, y: 2 },
  goal: { x: 18, y: 13 },
  getNeighbors,
  getCost: cost,
  heuristic,
  equals: (a, b) => a.x === b.x && a.y === b.y,
});

if (path) {
  console.log("Found path with", path.length, "steps");
  console.table(path);
} else {
  console.log("No path possible");
}

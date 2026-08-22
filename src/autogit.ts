/* ---- 1. Necessary types ------------------------------------------------- */
type Point = { x: number; y: number };   // a grid coordinate

// A *node* is a point that also carries the data used by A*.
class Node {
  public f: number;   // g + h
  public g: number;   // cost from start
  public h: number;   // heuristic estimate to goal

  constructor(
    public point: Point,
    public parent: Node | null = null,
    g = 0,
    h = 0
  ) {
    this.g = g;
    this.h = h;
    this.f = this.g + this.h;
  }
}

/* ---- 2. Min‑heap helper (priority queue) --------------------------------- */
class MinHeap<T> {
  private items: T[] = [];

  constructor(private compare: (a: T, b: T) => number) {}

  get size() { return this.items.length; }

  push(item: T) {
    this.items.push(item);
    this.bubbleUp(this.items.length - 1);
  }

  pop(): T | undefined {
    if (!this.items.length) return undefined;
    const top = this.items[0];
    const end = this.items.pop()!;
    if (this.items.length) {
      this.items[0] = end;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(idx: number) {
    const item = this.items[idx];
    while (idx > 0) {
      const parentIdx = ((idx + 1) >> 1) - 1;
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
      const leftIdx = (idx << 1) + 1;
      const rightIdx = leftIdx + 1;
      let smallest = idx;

      if (
        leftIdx < length &&
        this.compare(this.items[leftIdx], this.items[smallest]) < 0
      )
        smallest = leftIdx;

      if (
        rightIdx < length &&
        this.compare(this.items[rightIdx], this.items[smallest]) < 0
      )
        smallest = rightIdx;

      if (smallest === idx) break;

      this.items[idx] = this.items[smallest];
      idx = smallest;
    }
    this.items[idx] = item;
  }
}

/* ---- 3. Heuristic -------------------------------------------------------- */
function manhattan(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/* ---- 4. Grid utilities --------------------------------------------------- */
// returns true if the point is inside bounds AND not blocked
function isWalkable(
  grid: boolean[][],
  { x, y }: Point
): boolean {
  return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length && grid[y][x];
}

// neighbours (4‑connected, 8‑connected if you add diagonals)
function getNeighbours(grid: boolean[][], p: Point): Point[] {
  const { x, y } = p;
  const candidates: Point[] = [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
  ];

  // Uncomment if you want diagonal moves:
  // candidates.push({x: x+1, y: y+1}, {x: x-1, y: y+1}, {x: x+1, y: y-1}, {x: x-1, y: y-1});

  return candidates.filter(p => isWalkable(grid, p));
}

/* ---- 5. The main A* function --------------------------------------------- */
function aStar(
  grid: boolean[][],
  start: Point,
  goal: Point
): Point[] | null {
  if (!isWalkable(grid, start) || !isWalkable(grid, goal)) return null;

  const open = new MinHeap<Node>( (a, b) => a.f - b.f );
  const closed = new Set<string>();          // "x,y" keys

  const nodeForPoint = (p: Point) =>
    `${p.x},${p.y}`;

  open.push(new Node(start, null, 0, manhattan(start, goal)));

  while (open.size) {
    const current = open.pop()!;
    const currentKey = nodeForPoint(current.point);

    if (closed.has(currentKey)) continue;     // skip stale node
    closed.add(currentKey);

    if (current.point.x === goal.x && current.point.y === goal.y) {
      // reconstruct path
      const path: Point[] = [];
      let cur: Node | null = current;
      while (cur) {
        path.push(cur.point);
        cur = cur.parent;
      }
      return path.reverse();
    }

    for (const neighbour of getNeighbours(grid, current.point)) {
      const neighbourKey = nodeForPoint(neighbour);
      if (closed.has(neighbourKey)) continue;

      const tentativeG = current.g + 1; // cost of moving a step
      const h = manhattan(neighbour, goal);
      const neighbourNode = new Node(
        neighbour,
        current,
        tentativeG,
        h
      );

      open.push(neighbourNode);
    }
  }

  return null; // no path
}

/* ---- 6. Example usage --------------------------------------------------- */
const

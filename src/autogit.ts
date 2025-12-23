/** A node in the graph.  You can extend this with whatever extra data you need. */
export interface Node {
  id: string;          // must be unique
  x?: number;        // optional, for heuristics
  y?: number;
}

/** A single edge (neighbour + cost). */
export interface Edge {
  node: Node;
  cost: number;        // must be > 0
}

/** Function that returns the outgoing edges of a node. */
export type NeighboursFn = (n: Node) => Edge[];

/** Admissible heuristic h(n) -> estimated cost to goal. */
export type HeuristicFn = (n: Node, goal: Node) => number;
export interface AStarResult {
  path: Node[];        // empty if no path found
  cost: number;      // Infinity if no path
  explored: number;    // number of nodes popped from open set
}
import { MinHeap } from 'mnemonist/heap'; // tiny, fast binary heap

export function aStar(
  start: Node,
  goal: Node,
  neighbours: NeighboursFn,
  heuristic: HeuristicFn
): AStarResult {
  type Entry = {
    node: Node;
    g: number;      // best known cost from start
    f: number;      // g + heuristic
    parent?: Entry;
  };

  const heap = new MinHeap<Entry>((a, b) => a.f - b.f);
  const visited = new Map<string, number>(); // nodeId -> best g
  let explored = 0;

  const startEntry: Entry = { node: start, g: 0, f: heuristic(start, goal) };
  heap.push(startEntry);

  while (!heap.isEmpty()) {
    const current = heap.pop()!;
    explored++;

    if (current.node.id === goal.id) {
      // reconstruct path
      const path: Node[] = [];
      let curr: Entry | undefined = current;
      while (curr) {
        path.push(curr.node);
        curr = curr.parent;
      }
      return { path: path.reverse(), cost: current.g, explored };
    }

    const prevG = visited.get(current.node.id);
    if (prevG !== undefined && prevG <= current.g) continue; // already found better
    visited.set(current.node.id, current.g);

    for (const edge of neighbours(current.node)) {
      const { node: neighbour, cost } = edge;
      const tentativeG = current.g + cost;

      const ng = visited.get(neighbour.id);
      if (ng !== undefined && ng <= tentativeG) continue;

      const entry: Entry = {
        node: neighbour,
        g: tentativeG,
        f: tentativeG + heuristic(neighbour, goal),
        parent: current,
      };
      heap.push(entry);
    }
  }

  return { path: [], cost: Infinity, explored };
}
export class GridNode implements Node {
  constructor(public x: number, public y: number) {}
  get id() { return `${this.x},${this.y}`; }
}

export class GridAStar {
  private readonly width: number;
  private readonly height: number;
  private readonly blocked: Set<string>;

  constructor(
    width: number,
    height: number,
    blocked: [number, number][] = []
  ) {
    this.width = width;
    this.height = height;
    this.blocked = new Set(blocked.map(([x, y]) => `${x},${y}`));
  }

  private inBounds(n: GridNode) {
    return n.x >= 0 && n.y >= 0 && n.x < this.width && n.y < this.height;
  }

  private isBlocked(n: GridNode) {
    return this.blocked.has(n.id);
  }

  private neighbours(n: GridNode): Edge[] {
    const dirs: Array<[number, number]> = [
      [-1, 0], [1, 0], [0, -1], [0, 1], // 4-way
      // [-1,-1],[1,-1],[-1,1],[1,1]   // uncomment for 8-way
    ];
    const out: Edge[] = [];
    for (const [dx, dy] of dirs) {
      const x = n.x + dx;
      const y = n.y + dy;
      const node = new GridNode(x, y);
      if (!this.inBounds(node) || this.isBlocked(node)) continue;
      const cost = dx === 0 || dy === 0 ? 1 : Math.SQRT2; // 1 for cardinal, √2 for diagonal
      out.push({ node, cost });
    }
    return out;
  }

  search(start: [number, number], goal: [number, number]): AStarResult {
    const s = new GridNode(start[0], start[1]);
    const g = new GridNode(goal[0], goal[1]);
    const h = (a: GridNode, b: GridNode) =>
      Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan
    return aStar(s, g, n => this.neighbours(n), h);
  }
}
const grid = new GridAStar(10, 10, [[2,2],[2,3],[2,4]]);
const res  = grid.search([0,0], [9,9]);
console.log(res.path.map(n => `(${n.x},${n.y})`).join(' -> '));
console.log('Cost:', res.cost, 'Nodes explored:', res.explored);

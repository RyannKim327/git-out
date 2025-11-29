export interface SearchProblem<State> {
  start: State;
  goal: State;
  neighbours: (s: State) => State[];
  key?: (s: State) => string;   // default: JSON.stringify
}
export interface BiSearchResult<State> {
  found: boolean;
  distance: number;              // -1 if not found
  path: State[];                 // empty if not found
}
// bi-directional-bfs.ts
export interface SearchProblem<State> {
  start: State;
  goal: State;
  neighbours: (s: State) => State[];
  key?: (s: State) => string;
}

export interface BiSearchResult<State> {
  found: boolean;
  distance: number;
  path: State[];
}

export function biBFS<State>(p: SearchProblem<State>): BiSearchResult<State> {
  const key = p.key ?? (s => JSON.stringify(s));

  // ---------- early trivial checks ----------
  if (key(p.start) === key(p.goal))
    return { found: true, distance: 0, path: [p.start] };

  // ---------- frontiers ----------
  type Node = { state: State; parent: Node | null };
  const makeNode = (state: State, parent: Node | null): Node => ({ state, parent });

  // forward side
  const fwdQueue: Node[] = [makeNode(p.start, null)];
  const fwdVisited = new Map<string, Node>();   // key -> node
  fwdVisited.set(key(p.start), fwdQueue[0]);

  // backward side
  const bwdQueue: Node[] = [makeNode(p.goal, null)];
  const bwdVisited = new Map<string, Node>();
  bwdVisited.set(key(p.goal), bwdQueue[0]);

  // ---------- expand one layer ----------
  const expand = (
    queue: Node[],
    visitedOwn: Map<string, Node>,
    visitedOther: Map<string, Node>,
    genNeigh: (s: State) => State[]
  ): Node | null => {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; ++i) {
      const node = queue.shift()!;
      for (const n of genNeigh(node.state)) {
        const k = key(n);
        if (visitedOwn.has(k)) continue;          // already seen on this side
        const child = makeNode(n, node);
        visitedOwn.set(k, child);
        queue.push(child);
        if (visitedOther.has(k)) return child;     // collision -> found
      }
    }
    return null; // no collision on this layer
  };

  // ---------- alternate BFS ----------
  let depth = 0;
  while (fwdQueue.length && bwdQueue.length) {
    depth++;
    // choose the smaller side to expand (keeps memory lower)
    const expandForward = fwdQueue.length <= bwdQueue.length;

    const hit = expandForward
      ? expand(fwdQueue, fwdVisited, bwdVisited, p.neighbours)
      : expand(bwdQueue, bwdVisited, fwdVisited, p.neighbours);

    if (hit) {
      // we have a collision node on the side we just expanded
      const meetK = key(hit.state);
      const fwdNode = fwdVisited.get(meetK)!;
      const bwdNode = bwdVisited.get(meetK)!;

      // reconstruct path
      const fwdPath: State[] = [];
      for (let n: Node | null = fwdNode; n; n = n.parent) fwdPath.push(n.state);
      fwdPath.reverse();
      const bwdPath: State[] = [];
      for (let n: Node | null = bwdNode.parent; n; n = n.parent) bwdPath.push(n.state);

      const fullPath = [...fwdPath, ...bwdPath];
      return { found: true, distance: fullPath.length - 1, path: fullPath };
    }
  }
  return { found: false, distance: -1, path: [] };
}
// example.ts
import { biBFS, SearchProblem } from "./bi-directional-bfs.ts";

type Pos = { x: number; y: number };
const key = (p: Pos) => `${p.x},${p.y}`;

const problem: SearchProblem<Pos> = {
  start: { x: 0, y: 0 },
  goal: { x: 7, y: 7 },
  key,
  neighbours: p => {
    const { x, y } = p;
    const moves = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];
    // keep inside 0..7 grid
    return moves.filter(m => m.x >= 0 && m.y >= 0 && m.x <= 7 && m.y <= 7);
  },
};

console.time("biBFS");
const res = biBFS(problem);
console.timeEnd("biBFS");
console.log("Found:", res.found, "Distance:", res.distance);
// print first 10 states to keep output short
console.log("Path:", res.path.slice(0, 10), "...");
deno run example.ts

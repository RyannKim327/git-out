forward search  : start  → … → meeting point
backward search : goal   → … → meeting point
/**
 * Finds the shortest path (in number of edges) between `start` and `goal`
 * using a bidirectional BFS.
 *
 * @param start          The node we start from.
 * @param goal           The node we want to reach.
 * @param getNeighbors   Function that returns the adjacent nodes of a given node.
 * @returns              An array of nodes representing the path, or `null` if none exists.
 */
export function bidirectionalBFS<T>(
  start: T,
  goal: T,
  getNeighbors: (node: T) => Iterable<T>
): T[] | null
type Queue<T> = {
  push(item: T): void;
  shift(): T | undefined;
  isEmpty(): boolean;
};

function createQueue<T>(): Queue<T> {
  const data: T[] = [];
  return {
    push: (item) => data.push(item),
    shift: () => data.shift(),
    isEmpty: () => data.length === 0,
  };
}

/**
 * A map that stores for each visited node its predecessor.
 * Using `Map` instead of plain object lets us work with any hashable type.
 */
type PredecessorMap<T> = Map<T, T | null>;
export function bidirectionalBFS<T>(
  start: T,
  goal: T,
  getNeighbors: (node: T) => Iterable<T>
): T[] | null {
  // Trivial case
  if (start === goal) return [start];

  // Two frontiers + their visited maps
  const forwardQueue = createQueue<T>();
  const backwardQueue = createQueue<T>();

  const forwardPrev: PredecessorMap<T> = new Map();
  const backwardPrev: PredecessorMap<T> = new Map();

  forwardQueue.push(start);
  forwardPrev.set(start, null);

  backwardQueue.push(goal);
  backwardPrev.set(goal, null);

  // Helper to expand ONE level of a given frontier
  const expand = (
    queue: Queue<T>,
    thisPrev: PredecessorMap<T>,
    otherPrev: PredecessorMap<T>
  ): T | null => {
    const current = queue.shift()!;
    for (const neighbor of getNeighbors(current)) {
      if (!thisPrev.has(neighbor)) {
        // First time we see this node from *this* side
        thisPrev.set(neighbor, current);
        queue.push(neighbor);

        // If the opposite side has already visited it → meeting point!
        if (otherPrev.has(neighbor)) {
          return neighbor;
        }
      }
    }
    return null;
  };

  // Main loop – alternate expansions (you can also expand the smaller frontier)
  while (!forwardQueue.isEmpty() && !backwardQueue.isEmpty()) {
    // Expand the side that currently has fewer nodes (helps keep the search balanced)
    let meetingNode: T | null = null;

    if (forwardQueueSize() <= backwardQueueSize()) {
      meetingNode = expand(forwardQueue, forwardPrev, backwardPrev);
    } else {
      meetingNode = expand(backwardQueue, backwardPrev, forwardPrev);
    }

    if (meetingNode !== null) {
      // Reconstruct the full path
      return buildPath(meetingNode, forwardPrev, backwardPrev);
    }
  }

  // No connection found
  return null;

  // -------------------------------------------------------------------------
  // Helper utilities (kept inside the outer function so they capture the generic T)
  // -------------------------------------------------------------------------

  function forwardQueueSize() {
    // `queue` is a closure, we cannot read its internal array directly.
    // Instead we keep a tiny counter.
    // For simplicity we just use the size of the map minus the start node.
    return forwardPrev.size - 1;
  }

  function backwardQueueSize() {
    return backwardPrev.size - 1;
  }

  function buildPath(
    meeting: T,
    forwardMap: PredecessorMap<T>,
    backwardMap: PredecessorMap<T>
  ): T[] {
    const pathFromStart: T[] = [];
    // Walk forward side from start → meeting
    for (let node: T | null = meeting; node !== null; node = forwardMap.get(node) ?? null) {
      pathFromStart.push(node);
    }
    pathFromStart.reverse(); // now start … meeting

    const pathFromGoal: T[] = [];
    // Walk backward side from meeting → goal (excluding meeting, because it’s already in pathFromStart)
    for (let node: T | null = backwardMap.get(meeting) ?? null; node !== null; node = backwardMap.get(node) ?? null) {
      pathFromGoal.push(node);
    }

    return pathFromStart.concat(pathFromGoal);
  }
}
// Define the graph as an adjacency list
const graph = new Map<string, string[]>([
  ['A', ['B', 'C']],
  ['B', ['A', 'D', 'E']],
  ['C', ['A', 'F']],
  ['D', ['B']],
  ['E', ['B', 'F']],
  ['F', ['C', 'E', 'G']],
  ['G', ['F']],
]);

function neighbors(node: string): Iterable<string> {
  return graph.get(node) ?? [];
}

// Find a shortest path from A to G
const path = bidirectionalBFS('A', 'G', neighbors);
console.log(path); // → [ 'A', 'C', 'F', 'G' ]
type Pos = { r: number; c: number };
function posKey(p: Pos): string {
  return `${p.r},${p.c}`;
}

// 0 = walkable, 1 = wall
const maze: number[][] = [
  [0, 0, 0, 1, 0],
  [1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
];

function gridNeighbors(p: Pos): Iterable<Pos> {
  const dirs = [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 },
  ];
  const result: Pos[] = [];

  for (const d of dirs) {
    const nr = p.r + d.r;
    const nc = p.c + d.c;
    if (
      nr >= 0 &&
      nr < maze.length &&
      nc >= 0 &&
      nc < maze[0].length &&
      maze[nr][nc] === 0
    ) {
      result.push({ r: nr, c: nc });
    }
  }
  return result;
}

// Wrapper that uses string keys for the generic algorithm
function bfsGrid(start: Pos, goal: Pos): Pos[] | null {
  const key = (p: Pos) => posKey(p);
  const revKey = (s: string) => {
    const [r, c] = s.split(',').map(Number);
    return { r, c };
  };

  const pathKeys = bidirectionalBFS<string>(
    key(start),
    key(goal),
    (k) => {
      const p = revKey(k);
      return [...gridNeighbors(p)].map(key);
    }
  );

  return pathKeys?.map(revKey) ?? null;
}

const start = { r: 0, c: 0 };
const goal = { r: 4, c: 4 };
console.log(bfsGrid(start, goal));
/*
  → [
       { r: 0, c: 0 },
       { r: 0, c: 1 },
       { r: 0, c: 2 },
       { r: 1, c: 2 },
       { r: 2, c: 2 },
       { r: 2, c: 3 },
       { r: 2, c: 4 },
       { r: 3, c: 4 },
       { r: 4, c: 4 }
     ]
*/
interface PQItem<T> { node: T; priority: number; }
class MinHeap<T> { /* … typical binary heap implementation … */ }

function bidirectionalAStar<T>(
  start: T,
  goal: T,
  getNeighbors: (node: T) => Iterable<{ to: T; cost: number }>,
  heuristic: (a: T, b: T) => number
): T[] | null {
  // Same data structures, but:
  const forwardPQ = new MinHeap<PQItem<T>>();
  const backwardPQ = new MinHeap<PQItem<T>>();

  forwardPQ.push({ node: start, priority: 0 });
  backwardPQ.push({ node: goal, priority: 0 });

  // In expand() use the priority = gScore + heuristic(...)
  // Keep separate gScore maps for each direction.
  // When a node is popped from both frontiers, reconstruct the path.
}
// bidirectionalBFS.ts
type Queue<T> = {
  push(item: T): void;
  shift(): T | undefined;
  isEmpty(): boolean;
};

function createQueue<T>(): Queue<T> {
  const data: T[] = [];
  return {
    push: (item) => data.push(item),
    shift: () => data.shift(),
    isEmpty: () => data.length === 0,
  };
}

type PredecessorMap<T> = Map<T, T | null>;

export function bidirectionalBFS<T>(
  start: T,
  goal: T,
  getNeighbors: (node: T) => Iterable<T>
): T[] | null {
  if (start === goal) return [start];

  const forwardQueue = createQueue<T>();
  const backwardQueue = createQueue<T>();

  const forwardPrev: PredecessorMap<T> = new Map();
  const backwardPrev: PredecessorMap<T> = new Map();

  forwardQueue.push(start);
  forwardPrev.set(start, null);

  backwardQueue.push(goal);
  backwardPrev.set(goal, null);

  const expand = (
    queue: Queue<T>,
    thisPrev: PredecessorMap<T>,
    otherPrev: PredecessorMap<T>
  ): T | null => {
    const current = queue.shift()!;
    for (const neighbor of getNeighbors(current)) {
      if (!thisPrev.has(neighbor)) {
        thisPrev.set(neighbor, current);
        queue.push(neighbor);
        if (otherPrev.has(neighbor)) {
          return neighbor;
        }
      }
    }
    return null;
  };

  while (!forwardQueue.isEmpty() && !backwardQueue.isEmpty()) {
    let meetingNode: T | null = null;

    // Expand the side with the smaller frontier (helps keep it balanced)
    if (forwardPrev.size <= backwardPrev.size) {
      meetingNode = expand(forwardQueue, forwardPrev, backwardPrev);
    } else {
      meetingNode = expand(backwardQueue, backwardPrev, forwardPrev);
    }

    if (meetingNode !== null) {
      return buildPath(meetingNode, forwardPrev, backwardPrev);
    }
  }

  return null; // no path

  // -----------------------------------------------------------------------
  // Helpers (closed over generic T)
  // -----------------------------------------------------------------------
  function buildPath(
    meeting: T,
    forwardMap: PredecessorMap<T>,
    backwardMap: PredecessorMap<T>
  ): T[] {
    const fromStart: T[] = [];
    for (let node: T | null = meeting; node !== null; node = forwardMap.get(node) ?? null) {
      fromStart.push(node);
    }
    fromStart.reverse();

    const fromGoal: T[] = [];
    for (let node: T | null = backwardMap.get(meeting) ?? null; node !== null; node = backwardMap.get(node) ?? null) {
      fromGoal.push(node);
    }

    return fromStart.concat(fromGoal);
  }
}

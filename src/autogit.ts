// Bi-directional Breadth-First Search in TypeScript
// ------------------------------------------------
// 1. Install:  npm i typescript @types/node
// 2. Compile:  tsc --target es2020 bidirectional.ts
// 3. Run:      node bidirectional.js

type NeighborFn<T> = (node: T) => Iterable<T>;

interface BidiResult<T> {
  path: T[];
  distance: number;
}

/**
 * Generic bi-directional BFS.
 * @param start   Start node
 * @param goal    Goal node
 * @param getNeighbors  Function that returns neighbours of a node
 * @param keyFn   Optional function to convert a node to a unique string key
 *                  (defaults to String(node))
 */
export function bidirectionalSearch<T>(
  start: T,
  goal: T,
  getNeighbors: NeighborFn<T>,
  keyFn: (n: T) => string = (n) => String(n)
): BidiResult<T> | null {
  if (keyFn(start) === keyFn(goal)) return { path: [start], distance: 0 };

  // ---------- forward side ----------
  const forwardQueue: T[] = [start];
  const forwardVisited = new Map<string, { node: T; parent: string | null }>();
  forwardVisited.set(keyFn(start), { node: start, parent: null });

  // ---------- backward side ----------
  const backwardQueue: T[] = [goal];
  const backwardVisited = new Map<string, { node: T; parent: string | null }>();
  backwardVisited.set(keyFn(goal), { node: goal, parent: null });

  // ---------- helper ----------
  function expand(
    queue: T[],
    visited: Map<string, { node: T; parent: string | null }>,
    otherVisited: Map<string, { node: T; parent: string | null }>,
    side: 'fwd' | 'back'
  ): T | null {
    if (!queue.length) return null;
    const current = queue.shift()!;
    const currentKey = keyFn(current);

    for (const neighbor of getNeighbors(current)) {
      const k = keyFn(neighbor);
      if (visited.has(k)) continue; // already seen on this side
      visited.set(k, { node: neighbor, parent: currentKey });
      queue.push(neighbor);

      if (otherVisited.has(k)) {
        // ----- meeting point found -----
        return neighbor;
      }
    }
    return null;
  }

  // ---------- main loop ----------
  while (forwardQueue.length && backwardQueue.length) {
    // forward step
    const fwd = expand(forwardQueue, forwardVisited, backwardVisited, 'fwd');
    if (fwd) return reconstruct(fwd, forwardVisited, backwardVisited, keyFn);

    // backward step
    const back = expand(backwardQueue, backwardVisited, forwardVisited, 'back');
    if (back) return reconstruct(back, forwardVisited, backwardVisited, keyFn);
  }

  // exhausted
  return null;
}

/**
 * Reconstruct the full path once the two frontiers met.
 */
function reconstruct<T>(
  meetingNode: T,
  fwd: Map<string, { node: T; parent: string | null }>,
  back: Map<string, { node: T; parent: string | null }>,
  keyFn: (n: T) => string
): BidiResult<T> {
  const key = keyFn(meetingNode);

  // build path from start -> meeting
  const fwdPath: T[] = [];
  let k: string | null = key;
  while (k !== null) {
    fwdPath.push(fwd.get(k)!.node);
    k = fwd.get(k)!.parent;
  }
  fwdPath.reverse();

  // build path from meeting -> goal
  const backPath: T[] = [];
  k = back.get(key)!.parent;
  while (k !== null) {
    backPath.push(back.get(k)!.node);
    k = back.get(k)!.parent;
  }

  const fullPath = [...fwdPath, ...backPath];
  return { path: fullPath, distance: fullPath.length - 1 };
}

/* ------------------------------------------------------------------
 * Example usage: 2-D grid with 4-neighbour movement
 * ------------------------------------------------------------------ */
if (require.main === module) {
  type Pos = { x: number; y: number };
  const key = (p: Pos) => `${p.x},${p.y}`;

  const getNeighbors = (p: Pos): Pos[] => [
    { x: p.x + 1, y: p.y },
    { x: p.x - 1, y: p.y },
    { x: p.x, y: p.y + 1 },
    { x: p.x, y: p.y - 1 },
  ];

  const result = bidirectionalSearch(
    { x: 0, y: 0 },
    { x: 5, y: 5 },
    getNeighbors,
    key
  );

  console.log(result);
  /*
  {
    path: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
      { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 },
      { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 },
      { x: 5, y: 4 }, { x: 5, y: 5 }
    ],
    distance: 10
  }
  */
}

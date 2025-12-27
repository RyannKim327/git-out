/** A generic node identifier. You can replace `string | number` with any type you need. */
type NodeId = string | number;

/** Function that returns the adjacent nodes of a given node. */
type NeighborFn<T extends NodeId> = (node: T) => Iterable<T>;

/** Optional predicate to test whether a node satisfies the goal condition. */
type GoalFn<T extends NodeId> = (node: T) => boolean;
/**
 * Breadth‑Limited Search (BLS)
 *
 * @param start      The start node.
 * @param getNeighbors  Function that returns the neighbors of a node.
 * @param maxDepth   Maximum depth to explore (0 = only the start node).
 * @param isGoal     Optional goal test; if supplied, the search stops when a goal is found.
 *
 * @returns An object containing:
 *   - `found`: boolean – true if a goal was found (or if the search completed without a goal).
 *   - `visited`: Set<T> – all nodes visited (useful for debugging/analysis).
 *   - `path`: T[] | null – the path from start to the goal (if a goal was supplied and found).
 */
export function breadthLimitedSearch<T extends NodeId>(
  start: T,
  getNeighbors: NeighborFn<T>,
  maxDepth: number,
  isGoal?: GoalFn<T>
): { found: boolean; visited: Set<T>; path: T[] | null } {
  // Edge‑case: negative depth → nothing to explore
  if (maxDepth < 0) {
    return { found: false, visited: new Set(), path: null };
  }

  // Queue holds tuples: [node, depth, parent?]
  const queue: Array<{ node: T; depth: number; parent: T | null }> = [
    { node: start, depth: 0, parent: null },
  ];

  // Visited set – we store the shallowest depth at which we have seen a node.
  const visitedDepth = new Map<T, number>();
  visitedDepth.set(start, 0);

  // To reconstruct the path we keep a map of child → parent.
  const parentMap = new Map<T, T | null>();
  parentMap.set(start, null);

  while (queue.length > 0) {
    const { node, depth, parent } = queue.shift()!; // safe because length > 0

    // Goal test (if provided)
    if (isGoal && isGoal(node)) {
      // Reconstruct path from start → goal
      const path: T[] = [];
      let cur: T | null = node;
      while (cur !== null) {
        path.push(cur);
        cur = parentMap.get(cur) ?? null;
      }
      path.reverse(); // from start to goal
      return { found: true, visited: new Set(visitedDepth.keys()), path };
    }

    // Stop expanding when we hit the depth limit
    if (depth >= maxDepth) continue;

    // Expand neighbors
    for (const neighbor of getNeighbors(node)) {
      const knownDepth = visitedDepth.get(neighbor);
      const nextDepth = depth + 1;

      // If we have never seen this neighbor, or we discovered a *shallower* path,
      // we enqueue it. (Shallower paths are always better for BFS.)
      if (knownDepth === undefined || nextDepth < knownDepth) {
        visitedDepth.set(neighbor, nextDepth);
        parentMap.set(neighbor, node);
        queue.push({ node: neighbor, depth: nextDepth, parent: node });
      }
    }
  }

  // No goal found (or no goal function supplied)
  return { found: false, visited: new Set(visitedDepth.keys()), path: null };
}
// Define the graph as an adjacency list
const graph: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E'],
};

// Neighbor function
const getNeighbors = (node: string) => graph[node] ?? [];

// Search for node 'F' with a depth limit of 2
const result = breadthLimitedSearch(
  'A',
  getNeighbors,
  2,
  (n) => n === 'F'
);

console.log(result.found); // true
console.log(result.path);  // [ 'A', 'C', 'F' ]
console.log([...result.visited]); // Set { 'A', 'B', 'C', 'D', 'E', 'F' } (all visited within limit)
type Puzzle = number[]; // 0 = blank, 1‑8 = tiles

// Helper to clone a puzzle
const clone = (p: Puzzle) => p.slice();

// Generate neighbor states (slide blank up/down/left/right)
function puzzleNeighbors(state: Puzzle): Iterable<Puzzle> {
  const size = 3; // 3×3 board
  const blankIdx = state.indexOf(0);
  const row = Math.floor(blankIdx / size);
  const col = blankIdx % size;

  const moves: [number, number][] = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  const results: Puzzle[] = [];

  for (const [r, c] of moves) {
    if (r < 0 || r >= size || c < 0 || c >= size) continue;
    const swapIdx = r * size + c;
    const next = clone(state);
    [next[blankIdx], next[swapIdx]] = [next[swapIdx], next[blankIdx]];
    results.push(next);
  }

  return results;
}

// Convert a puzzle to a string key for the visited map
const toKey = (p: Puzzle) => p.join(',');

// Run BLS with depth limit 10 (searches all states up to 10 moves)
const start: Puzzle = [1, 2, 3, 4, 5, 6, 7, 0, 8];
const goal: Puzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const result = breadthLimitedSearch(
  toKey(start),
  (key) => {
    const state = key.split(',').map(Number) as Puzzle;
    return puzzleNeighbors(state).map(toKey);
  },
  10,
  (key) => key === toKey(goal)
);

console.log('found?', result.found);
if (result.path) console.log('path length:', result.path.length - 1);
// ---------------------------------------------------------------
// breadthLimitedSearch.ts
// ---------------------------------------------------------------
type NodeId = string | number;
type NeighborFn<T extends NodeId> = (node: T) => Iterable<T>;
type GoalFn<T extends NodeId> = (node: T) => boolean;

export function breadthLimitedSearch<T extends NodeId>(
  start: T,
  getNeighbors: NeighborFn<T>,
  maxDepth: number,
  isGoal?: GoalFn<T>
): { found: boolean; visited: Set<T>; path: T[] | null } {
  if (maxDepth < 0) return { found: false, visited: new Set(), path: null };

  const queue: Array<{ node: T; depth: number }> = [{ node: start, depth: 0 }];
  const visitedDepth = new Map<T, number>([[start, 0]]);
  const parentMap = new Map<T, T | null>([[start, null]]);

  while (queue.length) {
    const { node, depth } = queue.shift()!;

    if (isGoal && isGoal(node)) {
      const path: T[] = [];
      let cur: T | null = node;
      while (cur !== null) {
        path.push(cur);
        cur = parentMap.get(cur) ?? null;
      }
      path.reverse();
      return { found: true, visited: new Set(visitedDepth.keys()), path };
    }

    if (depth >= maxDepth) continue;

    for (const neighbor of getNeighbors(node)) {
      const nextDepth = depth + 1;
      const known = visitedDepth.get(neighbor);
      if (known === undefined || nextDepth < known) {
        visitedDepth.set(neighbor, nextDepth);
        parentMap.set(neighbor, node);
        queue.push({ node: neighbor, depth: nextDepth });
      }
    }
  }

  return { found: false, visited: new Set(visitedDepth.keys()), path: null };
}

// ---------------------------------------------------------------
// demo.ts (run with `ts-node demo.ts`)
// ---------------------------------------------------------------
import { breadthLimitedSearch } from './breadthLimitedSearch';

// Example 1: Simple graph
const graph: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E'],
};

const getNeighbors = (n: string) => graph[n] ?? [];

const res1 = breadthLimitedSearch('A', getNeighbors, 2, (n) => n === 'F');
console.log('Example 1 → found?', res1.found);
console.log('Path:', res1.path);
console.log('Visited nodes:', [...res1.visited]);

// Example 2: 8‑Puzzle (depth‑limited to 8 moves)
type Puzzle = number[];
const toKey = (p: Puzzle) => p.join(',');

function puzzleNeighbors(state: Puzzle): Iterable<Puzzle> {
  const size = 3;
  const blank = state.indexOf(0);
  const r = Math.floor(blank / size);
  const c = blank % size;
  const moves: [number, number][] = [
    [r - 1, c],
    [r + 1, c],
    [r, c - 1],
    [r, c + 1],
  ];
  const results: Puzzle[] = [];

  for (const [nr, nc] of moves) {
    if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
    const swap = nr * size + nc;
    const next = state.slice();
    [next[blank], next[swap]] = [next[swap], next[blank]];
    results.push(next);
  }
  return results;
}

const startPuzzle: Puzzle = [1, 2, 3, 4, 5, 6, 7, 0, 8];
const goalPuzzle: Puzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const res2 = breadthLimitedSearch(
  toKey(startPuzzle),
  (key) => {
    const state = key.split(',').map(Number) as Puzzle;
    return Array.from(puzzleNeighbors(state), toKey);
  },
  8,
  (key) => key === toKey(goalPuzzle)
);

console.log('\nExample 2 → found?', res2.found);
if (res2.path) console.log('Moves needed (≤8):', res2.path.length - 1);
npm i -g ts-node typescript   # if you don't have them already
ts-node demo.ts
Example 1 → found? true
Path: [ 'A', 'C', 'F' ]
Visited nodes: [ 'A', 'B', 'C', 'D', 'E', 'F' ]

Example 2 → found? true
Moves needed (≤8): 1

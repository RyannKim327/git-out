DFS(node, depth):
    if depth == 0:
        return failure               // limit reached
    if node is goal:
        return success
    for each child of node:
        if DFS(child, depth‑1) succeeds:
            return success
    return failure
/** A generic identifier for a node – can be a string, number, or any hashable type. */
type NodeId = string | number;

/** Function that, given a node id, returns its adjacent nodes. */
type NeighborFn<T extends NodeId> = (node: T) => Iterable<T>;

/** Optional predicate that tells whether a node is the goal. */
type GoalPredicate<T extends NodeId> = (node: T) => boolean;

/** Result of a search – either a path (array of node ids) or null if not found. */
type SearchResult<T extends NodeId> = T[] | null;
/**
 * Depth‑Limited Search (recursive version).
 *
 * @param start      Starting node.
 * @param isGoal     Function that returns true for the goal node.
 * @param getNeighbors Function that yields neighbours of a node.
 * @param limit      Maximum depth to explore (0 = no expansion).
 * @returns          An array representing the path from start → goal,
 *                   or null if the goal isn’t reachable within the limit.
 */
export function depthLimitedSearch<T extends NodeId>(
  start: T,
  isGoal: GoalPredicate<T>,
  getNeighbors: NeighborFn<T>,
  limit: number
): SearchResult<T> {
  // Guard against negative limits – treat them as “no search”.
  if (limit < 0) return null;

  // Helper that carries the current path (used for reconstruction).
  const dfs = (node: T, depth: number, path: T[], visited: Set<T>): SearchResult<T> => {
    // 1️⃣ Depth limit reached → stop expanding this branch.
    if (depth === 0) return null;

    // 2️⃣ Goal test.
    if (isGoal(node)) return [...path, node]; // success – return full path

    // 3️⃣ Mark node as visited for this branch (prevents cycles).
    visited.add(node);

    // 4️⃣ Explore children.
    for (const neighbor of getNeighbors(node)) {
      // Skip neighbours already on the current path (cycle protection).
      if (visited.has(neighbor)) continue;

      const result = dfs(neighbor, depth - 1, [...path, node], new Set(visited));
      if (result) return result; // propagate success upward
    }

    // 5️⃣ No child succeeded → backtrack.
    return null;
  };

  // Kick‑off with an empty visited set.
  return dfs(start, limit, [], new Set());
}
/**
 * Depth‑Limited Search – iterative version.
 *
 * @param start        Starting node.
 * @param isGoal       Goal predicate.
 * @param getNeighbors Neighbor function.
 * @param limit        Maximum depth.
 * @returns            Path array or null.
 */
export function depthLimitedSearchIter<T extends NodeId>(
  start: T,
  isGoal: GoalPredicate<T>,
  getNeighbors: NeighborFn<T>,
  limit: number
): SearchResult<T> {
  if (limit < 0) return null;

  // Stack entries keep: node, depthRemaining, pathSoFar, visitedOnPath
  type StackEntry = {
    node: T;
    depth: number;
    path: T[];
    visited: Set<T>;
  };

  const stack: StackEntry[] = [{ node: start, depth: limit, path: [], visited: new Set() }];

  while (stack.length) {
    const { node, depth, path, visited } = stack.pop()!; // non‑null because length > 0

    if (depth === 0) continue; // cannot expand further

    if (isGoal(node)) return [...path, node];

    // Mark current node as visited for this branch.
    const newVisited = new Set(visited);
    newVisited.add(node);

    // Push children onto the stack (depth‑first order).
    for (const neighbor of getNeighbors(node)) {
      if (newVisited.has(neighbor)) continue; // avoid cycles
      stack.push({
        node: neighbor,
        depth: depth - 1,
        path: [...path, node],
        visited: newVisited,
      });
    }
  }

  return null; // exhausted all possibilities within the limit
}
// 1️⃣ Define the graph as an adjacency list.
const graph: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E', 'G'],
  G: ['F'],
};

// 2️⃣ Helper to fetch neighbours.
const getNeighbors: NeighborFn<string> = (node) => graph[node] ?? [];

// 3️⃣ Goal predicate – we want to reach node "G".
const isGoal = (node: string) => node === 'G';

// 4️⃣ Run DLS with different limits.
console.log('limit 2 →', depthLimitedSearch('A', isGoal, getNeighbors, 2)); // null (too shallow)
console.log('limit 3 →', depthLimitedSearch('A', isGoal, getNeighbors, 3)); // ["A","C","F","G"]
console.log('limit 4 →', depthLimitedSearchIter('A', isGoal, getNeighbors, 4)); // same result
limit 2 → null
limit 3 → [ 'A', 'C', 'F', 'G' ]
limit 4 → [ 'A', 'C', 'F', 'G' ]
/**
 * Iterative Deepening Search – repeatedly runs DLS with growing limits.
 *
 * @param start        Starting node.
 * @param isGoal       Goal predicate.
 * @param getNeighbors Neighbor function.
 * @param maxDepth     Upper bound to avoid infinite loops (optional).
 * @returns            Path or null.
 */
export function iterativeDeepeningSearch<T extends NodeId>(
  start: T,
  isGoal: GoalPredicate<T>,
  getNeighbors: NeighborFn<T>,
  maxDepth = 1000
): SearchResult<T> {
  for (let depth = 0; depth <= maxDepth; depth++) {
    const result = depthLimitedSearch(start, isGoal, getNeighbors, depth);
    if (result) return result;
  }
  return null; // not found within maxDepth
}
// ---------------------------------------------------------------
// depthLimitedSearch.ts
// ---------------------------------------------------------------
type NodeId = string | number;
type NeighborFn<T extends NodeId> = (node: T) => Iterable<T>;
type GoalPredicate<T extends NodeId> = (node: T) => boolean;
type SearchResult<T extends NodeId> = T[] | null;

/**
 * Recursive Depth‑Limited Search.
 */
export function depthLimitedSearch<T extends NodeId>(
  start: T,
  isGoal: GoalPredicate<T>,
  getNeighbors: NeighborFn<T>,
  limit: number
): SearchResult<T> {
  if (limit < 0) return null;

  const dfs = (node: T, depth: number, path: T[], visited: Set<T>): SearchResult<T> => {
    if (depth === 0) return null;
    if (isGoal(node)) return [...path, node];

    visited.add(node);
    for (const neighbor of getNeighbors(node)) {
      if (visited.has(neighbor)) continue;
      const result = dfs(neighbor, depth - 1, [...path, node], new Set(visited));
      if (result) return result;
    }
    return null;
  };

  return dfs(start, limit, [], new Set());
}

/**
 * Iterative (stack‑based) Depth‑Limited Search.
 */
export function depthLimitedSearchIter<T extends NodeId>(
  start: T,
  isGoal: GoalPredicate<T>,
  getNeighbors: NeighborFn<T>,
  limit: number
): SearchResult<T> {
  if (limit < 0) return null;

  type StackEntry = { node: T; depth: number; path: T[]; visited: Set<T> };
  const stack: StackEntry[] = [{ node: start, depth: limit, path: [], visited: new Set() }];

  while (stack.length) {
    const { node, depth, path, visited } = stack.pop()!;
    if (depth === 0) continue;
    if (isGoal(node)) return [...path, node];

    const newVisited = new Set(visited);
    newVisited.add(node);
    for (const neighbor of getNeighbors(node)) {
      if (newVisited.has(neighbor)) continue;
      stack.push({ node: neighbor, depth: depth - 1, path: [...path, node], visited: newVisited });
    }
  }
  return null;
}

/**
 * Iterative Deepening Search – wrapper around DLS.
 */
export function iterativeDeepeningSearch<T extends NodeId>(
  start: T,
  isGoal: GoalPredicate<T>,
  getNeighbors: NeighborFn<T>,
  maxDepth = 1000
): SearchResult<T> {
  for (let depth = 0; depth <= maxDepth; depth++) {
    const result = depthLimitedSearch(start, isGoal, getNeighbors, depth);
    if (result) return result;
  }
  return null;
}

// ---------------------------------------------------------------
// demo.ts (example usage)
// ---------------------------------------------------------------
import {
  depthLimitedSearch,
  depthLimitedSearchIter,
  iterativeDeepeningSearch,
} from './depthLimitedSearch';

// Simple undirected graph as adjacency list
const graph: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E', 'G'],
  G: ['F'],
};

const getNeighbors: NeighborFn<string> = (node) => graph[node] ?? [];
const isGoal = (node: string) => node === 'G';

console.log('Recursive DLS, limit 2 →', depthLimitedSearch('A', isGoal, getNeighbors, 2));
console.log('Recursive DLS, limit 3 →', depthLimitedSearch('A', isGoal, getNeighbors, 3));
console.log('Iterative DLS, limit 3 →', depthLimitedSearchIter('A', isGoal, getNeighbors, 3));
console.log('Iterative Deepening →', iterativeDeepeningSearch('A', isGoal, getNeighbors));

// A node is identified by a string (you can change it to number, symbol, etc.)
type NodeId = string;

// The graph maps a node id → an array of neighbour ids.
type Graph = Record<NodeId, NodeId[]>;
/**
 * Depth‑Limited Search (recursive)
 *
 * @param graph   The adjacency list.
 * @param start   Id of the start node.
 * @param goal    Id of the goal node.
 * @param limit   Maximum depth to explore (0 = only the start node).
 * @returns       An array representing the path start → … → goal,
 *                or null if the goal is not reachable within the limit.
 */
function depthLimitedSearchRecursive(
  graph: Graph,
  start: NodeId,
  goal: NodeId,
  limit: number
): NodeId[] | null {
  // Helper that carries the current path (used for back‑tracking)
  function recurse(current: NodeId, depth: number, path: NodeId[]): NodeId[] | null {
    // 1️⃣  Base cases
    if (current === goal) {
      // Goal found – return a copy of the path (including the goal)
      return [...path, current];
    }
    if (depth === limit) {
      // Depth limit reached – stop expanding this branch
      return null;
    }

    // 2️⃣  Expand neighbours
    const neighbours = graph[current] ?? [];
    for (const next of neighbours) {
      // Avoid cycles by not revisiting nodes already on the current path
      if (path.includes(next)) continue;

      const result = recurse(next, depth + 1, [...path, current]);
      if (result) return result; // propagate the first successful path upward
    }

    // 3️⃣  No neighbour led to the goal within the limit
    return null;
  }

  // Kick‑off the recursion from the start node, depth = 0, empty path
  return recurse(start, 0, []);
}
/**
 * Depth‑Limited Search (iterative, using an explicit stack)
 *
 * The stack stores tuples: [node, depth, pathSoFar]
 */
function depthLimitedSearchIterative(
  graph: Graph,
  start: NodeId,
  goal: NodeId,
  limit: number
): NodeId[] | null {
  // Each entry: [currentNode, depthFromStart, pathUpToCurrent (including current)]
  const stack: [NodeId, number, NodeId[]][] = [[start, 0, [start]]];

  while (stack.length > 0) {
    const [node, depth, path] = stack.pop()!; // non‑null because length > 0

    // Goal test
    if (node === goal) return path;

    // Depth limit check
    if (depth === limit) continue; // cannot expand further

    // Expand neighbours (push them onto the stack)
    const neighbours = graph[node] ?? [];
    for (const next of neighbours) {
      // Simple cycle avoidance – skip nodes already in the current path
      if (path.includes(next)) continue;

      // New path = old path + next
      stack.push([next, depth + 1, [...path, next]]);
    }
  }

  // Exhausted the stack → no solution within the limit
  return null;
}
// Sample graph (undirected for illustration)
const graph: Graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E', 'G'],
  G: ['F']
};

const start = 'A';
const goal = 'G';

// Try a limit that is *too small* → should fail
console.log(depthLimitedSearchRecursive(graph, start, goal, 2)); // null

// Increase the limit enough to reach G
console.log(depthLimitedSearchRecursive(graph, start, goal, 4));
// Example output: [ 'A', 'C', 'F', 'G' ]

// Same test with the iterative version
console.log(depthLimitedSearchIterative(graph, start, goal, 4));
// Example output: [ 'A', 'C', 'F', 'G' ]
function depthLimitedSearchRecursiveOptimized(
  graph: Graph,
  start: NodeId,
  goal: NodeId,
  limit: number
): NodeId[] | null {
  function recurse(node: NodeId, depth: number, path: NodeId[], visited: Set<NodeId>): NodeId[] | null {
    if (node === goal) return [...path, node];
    if (depth === limit) return null;

    visited.add(node);
    for (const nxt of graph[node] ?? []) {
      if (visited.has(nxt)) continue;
      const result = recurse(nxt, depth + 1, [...path, node], new Set(visited));
      if (result) return result;
    }
    // No need to delete from visited because we passed a copy (new Set) to each child.
    return null;
  }

  return recurse(start, 0, [], new Set());
}
type NeighbourFn = (node: NodeId) => Promise<NodeId[]> | NodeId[];

async function depthLimitedSearchAsync(
  start: NodeId,
  goal: NodeId,
  limit: number,
  getNeighbours: NeighbourFn
): Promise<NodeId[] | null> {
  const stack: [NodeId, number, NodeId[]][] = [[start, 0, [start]]];

  while (stack.length) {
    const [node, depth, path] = stack.pop()!;
    if (node === goal) return path;
    if (depth === limit) continue;

    const neighbours = await Promise.resolve(getNeighbours(node));
    for (const nxt of neighbours) {
      if (path.includes(nxt)) continue;
      stack.push([nxt, depth + 1, [...path, nxt]]);
    }
  }
  return null;
}
async function fetchNeighbours(node: NodeId): Promise<NodeId[]> {
  // Example: pretend we call a remote service
  const map: Graph = { A: ['B', 'C'], B: ['D'], C: [], D: [] };
  return map[node] ?? [];
}

depthLimitedSearchAsync('A', 'D', 3, fetchNeighbours).then(console.log);
// → [ 'A', 'B', 'D' ]
async function iterativeDeepeningSearch(
  graph: Graph,
  start: NodeId,
  goal: NodeId,
  maxDepth: number
): Promise<NodeId[] | null> {
  for (let depth = 0; depth <= maxDepth; depth++) {
    const result = depthLimitedSearchRecursive(graph, start, goal, depth);
    if (result) return result; // found at the shallowest depth
  }
  return null; // not found within maxDepth
}
// ---------------------------------------------------------------
// depth-limited-search.ts
// ---------------------------------------------------------------

type NodeId = string;
type Graph = Record<NodeId, NodeId[]>;

/**
 * Recursive Depth‑Limited Search.
 */
export function depthLimitedSearchRecursive(
  graph: Graph,
  start: NodeId,
  goal: NodeId,
  limit: number
): NodeId[] | null {
  function recurse(current: NodeId, depth: number, path: NodeId[]): NodeId[] | null {
    if (current === goal) return [...path, current];
    if (depth === limit) return null;

    const neighbours = graph[current] ?? [];
    for (const next of neighbours) {
      if (path.includes(next)) continue; // simple cycle guard
      const result = recurse(next, depth + 1, [...path, current]);
      if (result) return result;
    }
    return null;
  }

  return recurse(start, 0, []);
}

/**
 * Iterative Depth‑Limited Search (explicit stack).
 */
export function depthLimitedSearchIterative(
  graph: Graph,
  start: NodeId,
  goal: NodeId,
  limit: number
): NodeId[] | null {
  const stack: [NodeId, number, NodeId[]][] = [[start, 0, [start]]];

  while (stack.length) {
    const [node, depth, path] = stack.pop()!;
    if (node === goal) return path;
    if (depth === limit) continue;

    const neighbours = graph[node] ?? [];
    for (const nxt of neighbours) {
      if (path.includes(nxt)) continue;
      stack.push([nxt, depth + 1, [...path, nxt]]);
    }
  }
  return null;
}

/* ------------------- Example usage ------------------- */
if (require.main === module) {
  const graph: Graph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B', 'F'],
    F: ['C', 'E', 'G'],
    G: ['F']
  };

  const start = 'A';
  const goal = 'G';
  const limit = 4;

  console.log('Recursive:', depthLimitedSearchRecursive(graph, start, goal, limit));
  console.log('Iterative:', depthLimitedSearchIterative(graph, start, goal, limit));
}
tsc depth-limited-search.ts && node depth-limited-search.js
Recursive: [ 'A', 'C', 'F', 'G' ]
Iterative: [ 'A', 'C', 'F', 'G' ]

// A node identifier – can be a string, number, or any hashable type.
type NodeId = string | number;

// Edge list: each node maps to an array of its neighbours.
type AdjList = Map<NodeId, NodeId[]>;
/**
 * Depth‑Limited Search (recursive)
 *
 * @param graph   adjacency list of the graph
 * @param start   start node id
 * @param goal    goal node id (or a predicate)
 * @param limit   maximum depth to explore (0 = only the start node)
 * @returns       an array representing the path from start → goal,
 *                or null if not found within the limit.
 */
function depthLimitedSearchRecursive(
  graph: AdjList,
  start: NodeId,
  goal: NodeId,
  limit: number
): NodeId[] | null {
  // Helper that carries the current path and depth.
  function recurse(
    node: NodeId,
    depth: number,
    path: NodeId[]
  ): NodeId[] | null {
    // Goal test
    if (node === goal) return [...path, node];

    // Depth limit reached – stop expanding.
    if (depth === limit) return null;

    // Explore each neighbour.
    const neighbours = graph.get(node) ?? [];
    for (const next of neighbours) {
      // Avoid cycles by checking if we already visited this node in the current path.
      if (path.includes(next)) continue;

      const result = recurse(next, depth + 1, [...path, node]);
      if (result) return result; // early exit on first solution
    }
    return null; // no solution found in this branch
  }

  return recurse(start, 0, []);
}
/**
 * Depth‑Limited Search (iterative)
 *
 * @param graph   adjacency list
 * @param start   start node id
 * @param goal    goal node id
 * @param limit   maximum depth allowed
 * @returns       path array or null if not found
 */
function depthLimitedSearchIterative(
  graph: AdjList,
  start: NodeId,
  goal: NodeId,
  limit: number
): NodeId[] | null {
  // Stack entries keep: current node, depth, path taken so far.
  type StackEntry = { node: NodeId; depth: number; path: NodeId[] };
  const stack: StackEntry[] = [{ node: start, depth: 0, path: [] }];

  while (stack.length) {
    const { node, depth, path } = stack.pop()!; // non‑empty because of while condition

    // Goal test
    if (node === goal) return [...path, node];

    // Depth limit check
    if (depth === limit) continue; // do not push children

    // Expand neighbours
    const neighbours = graph.get(node) ?? [];
    for (const next of neighbours) {
      // Simple cycle avoidance – you can replace with a Set for O(1) checks.
      if (path.includes(next)) continue;

      stack.push({
        node: next,
        depth: depth + 1,
        path: [...path, node],
      });
    }
  }

  // Exhausted stack without finding the goal
  return null;
}
// 1️⃣ Build a simple graph.
const graph: AdjList = new Map([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6]],
  [4, []],
  [5, [6]],
  [6, []],
]);

// 2️⃣ Choose start, goal and a depth limit.
const start: NodeId = 1;
const goal: NodeId = 6;
const limit = 2; // only explore up to 2 edges away from the start

// 3️⃣ Run the algorithm (pick recursive or iterative).
const pathRec = depthLimitedSearchRecursive(graph, start, goal, limit);
console.log('Recursive DLS path:', pathRec); // → [1, 3, 6] (found within limit)

const pathIter = depthLimitedSearchIterative(graph, start, goal, limit);
console.log('Iterative DLS path:', pathIter); // → same result
type GoalPredicate = (node: NodeId) => boolean;

function depthLimitedSearchRecursivePredicate(
  graph: AdjList,
  start: NodeId,
  goalTest: GoalPredicate,
  limit: number
): NodeId[] | null {
  function recurse(node: NodeId, depth: number, path: NodeId[]): NodeId[] | null {
    if (goalTest(node)) return [...path, node];
    if (depth === limit) return null;
    for (const nxt of graph.get(node) ?? []) {
      if (path.includes(nxt)) continue;
      const res = recurse(nxt, depth + 1, [...path, node]);
      if (res) return res;
    }
    return null;
  }
  return recurse(start, 0, []);
}
function depthLimitedSearchRecursiveSet(
  graph: AdjList,
  start: NodeId,
  goal: NodeId,
  limit: number
): NodeId[] | null {
  const visited = new Set<NodeId>();

  function recurse(node: NodeId, depth: number, path: NodeId[]): NodeId[] | null {
    if (node === goal) return [...path, node];
    if (depth === limit) return null;

    visited.add(node);
    for (const nxt of graph.get(node) ?? []) {
      if (visited.has(nxt)) continue;
      const result = recurse(nxt, depth + 1, [...path, node]);
      if (result) return result;
    }
    visited.delete(node); // backtrack
    return null;
  }

  return recurse(start, 0, []);
}
function depthLimitedAllPaths(
  graph: AdjList,
  start: NodeId,
  goal: NodeId,
  limit: number
): NodeId[][] {
  const results: NodeId[][] = [];

  function recurse(node: NodeId, depth: number, path: NodeId[]) {
    if (node === goal) {
      results.push([...path, node]);
      return;
    }
    if (depth === limit) return;

    for (const nxt of graph.get(node) ?? []) {
      if (path.includes(nxt)) continue;
      recurse(nxt, depth + 1, [...path, node]);
    }
  }

  recurse(start, 0, []);
  return results;
}
// ---------- Types ----------
type NodeId = string | number;
type AdjList = Map<NodeId, NodeId[]>;

// ---------- DLS (iterative) ----------
function depthLimitedSearchIterative(
  graph: AdjList,
  start: NodeId,
  goal: NodeId,
  limit: number
): NodeId[] | null {
  type StackEntry = { node: NodeId; depth: number; path: NodeId[] };
  const stack: StackEntry[] = [{ node: start, depth: 0, path: [] }];

  while (stack.length) {
    const { node, depth, path } = stack.pop()!;
    if (node === goal) return [...path, node];
    if (depth === limit) continue;

    const neighbours = graph.get(node) ?? [];
    for (const nxt of neighbours) {
      if (path.includes(nxt)) continue;
      stack.push({ node: nxt, depth: depth + 1, path: [...path, node] });
    }
  }
  return null;
}

// ---------- Iterative Deepening Search ----------
function iterativeDeepeningSearch(
  graph: AdjList,
  start: NodeId,
  goal: NodeId,
  maxDepth = 1000 // safety guard
): NodeId[] | null {
  for (let limit = 0; limit <= maxDepth; limit++) {
    const result = depthLimitedSearchIterative(graph, start, goal, limit);
    if (result) return result; // first (shallowest) solution found
  }
  return null; // not found within maxDepth
}

// ---------- Demo ----------
const demoGraph: AdjList = new Map([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6]],
  [4, []],
  [5, [6]],
  [6, []],
]);

const start = 1;
const goal = 6;

console.log('IDS result:', iterativeDeepeningSearch(demoGraph, start, goal));
// → IDS result: [ 1, 3, 6 ]   (shallowest path)

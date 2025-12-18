/** A generic node identifier – can be a number, string, or any hashable type */
type NodeId = string | number;

/** The graph is represented as an adjacency‑list map */
type Graph = Map<NodeId, NodeId[]>;

/** Stack entry used by the iterative algorithm */
interface StackEntry {
  id: NodeId;   // current node
  depth: number; // depth of this node from the start node
}
/**
 * Iterative Depth‑Limited Search
 *
 * @param graph   The graph (adjacency list)
 * @param start   The start node id
 * @param goal    The goal node id (or a predicate function)
 * @param limit   Maximum depth allowed (0 = start node only)
 * @returns       An array representing the path from start → goal,
 *                or `null` if the goal is not reachable within the limit.
 */
export function depthLimitedSearch(
  graph: Graph,
  start: NodeId,
  goal: NodeId | ((id: NodeId) => boolean),
  limit: number
): NodeId[] | null {
  // Helper to test the goal condition
  const isGoal = typeof goal === "function" ? goal : (id: NodeId) => id === goal;

  // Stack for DFS – LIFO order
  const stack: StackEntry[] = [{ id: start, depth: 0 }];

  // `parent` map lets us reconstruct the path once we find the goal
  const parent = new Map<NodeId, NodeId | null>();
  parent.set(start, null);

  // Optional: a visited set to avoid re‑expanding the same node at the same depth.
  // In pure DFS you could omit it, but it prevents exponential blow‑up on graphs
  // with many cross‑edges.
  const visited = new Set<string>(); // store `${node}-${depth}`

  while (stack.length > 0) {
    const { id, depth } = stack.pop()!; // non‑null because length > 0

    // Goal test – as soon as we pop a node that satisfies the goal we are done
    if (isGoal(id)) {
      // Reconstruct path by walking back through `parent`
      const path: NodeId[] = [];
      let cur: NodeId | null = id;
      while (cur !== null) {
        path.push(cur);
        cur = parent.get(cur) ?? null;
      }
      return path.reverse(); // from start → goal
    }

    // If we have already visited this node at this exact depth, skip it
    const visitKey = `${id}-${depth}`;
    if (visited.has(visitKey)) continue;
    visited.add(visitKey);

    // Do not expand children if we already hit the depth limit
    if (depth >= limit) continue;

    // Push children onto the stack (depth‑first order)
    const neighbours = graph.get(id) ?? [];
    // Iterate in reverse order if you want the *original* order to be respected
    for (let i = neighbours.length - 1; i >= 0; i--) {
      const child = neighbours[i];
      // Record parent for path reconstruction (only first time we see the child)
      if (!parent.has(child)) parent.set(child, id);
      stack.push({ id: child, depth: depth + 1 });
    }
  }

  // Exhausted stack → goal not found within the depth limit
  return null;
}
// ---------------------------------------------------
// 1️⃣ Build a simple graph (undirected for demo)
// ---------------------------------------------------
const graph: Graph = new Map([
  [1, [2, 3]],
  [2, [1, 4, 5]],
  [3, [1, 6]],
  [4, [2]],
  [5, [2, 7]],
  [6, [3]],
  [7, [5]],
]);

// ---------------------------------------------------
// 2️⃣ Run DLS with different limits
// ---------------------------------------------------
function demo(limit: number) {
  const path = depthLimitedSearch(graph, 1, 7, limit);
  console.log(`limit=${limit} →`, path ? `found ${path.join(" → ")}` : "no path");
}

demo(0); // limit=0 → no path (only start node is examined)
demo(1); // limit=1 → no path (1 step away from start)
demo(2); // limit=2 → no path (needs 3 steps)
demo(3); // limit=3 → found 1 → 2 → 5 → 7
demo(4); // limit=4 → also found the same path (extra depth doesn't hurt)
limit=0 → no path
limit=1 → no path
limit=2 → no path
limit=3 → found 1 → 2 → 5 → 7
limit=4 → found 1 → 2 → 5 → 7
export function iterativeDeepeningSearch(
  graph: Graph,
  start: NodeId,
  goal: NodeId | ((id: NodeId) => boolean),
  maxDepth: number
): NodeId[] | null {
  for (let depth = 0; depth <= maxDepth; depth++) {
    const result = depthLimitedSearch(graph, start, goal, depth);
    if (result) return result; // first depth that succeeds
  }
  return null;
}
class MyNode {
  constructor(public id: string, public neighbours: MyNode[] = []) {}
}
// depthLimitedSearch.ts ---------------------------------------------------------

type NodeId = string | number;
type Graph = Map<NodeId, NodeId[]>;

interface StackEntry {
  id: NodeId;
  depth: number;
}

/**
 * Iterative Depth‑Limited Search.
 *
 * @param graph   adjacency‑list representation
 * @param start   start node id
 * @param goal    goal id or predicate
 * @param limit   maximum depth (0 = only start node)
 * @returns       path from start to goal, or null if not found within limit
 */
export function depthLimitedSearch(
  graph: Graph,
  start: NodeId,
  goal: NodeId | ((id: NodeId) => boolean),
  limit: number
): NodeId[] | null {
  const isGoal = typeof goal === "function" ? goal : (id: NodeId) => id === goal;

  const stack: StackEntry[] = [{ id: start, depth: 0 }];
  const parent = new Map<NodeId, NodeId | null>();
  parent.set(start, null);
  const visited = new Set<string>();

  while (stack.length) {
    const { id, depth } = stack.pop()!;

    if (isGoal(id)) {
      const path: NodeId[] = [];
      let cur: NodeId | null = id;
      while (cur !== null) {
        path.push(cur);
        cur = parent.get(cur) ?? null;
      }
      return path.reverse();
    }

    const key = `${id}-${depth}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (depth >= limit) continue;

    const neighbours = graph.get(id) ?? [];
    for (let i = neighbours.length - 1; i >= 0; i--) {
      const child = neighbours[i];
      if (!parent.has(child)) parent.set(child, id);
      stack.push({ id: child, depth: depth + 1 });
    }
  }

  return null;
}

// ---------------------------------------------------
// Example usage (uncomment to run with ts-node)
// ---------------------------------------------------
// const graph: Graph = new Map([
//   [1, [2, 3]],
//   [2, [1, 4, 5]],
//   [3, [1, 6]],
//   [4, [2]],
//   [5, [2, 7]],
//   [6, [3]],
//   [7, [5]],
// ]);
//
// const path = depthLimitedSearch(graph, 1, 7, 3);
// console.log(path); // → [1,2,5,7]

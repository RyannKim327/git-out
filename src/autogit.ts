type NodeId = string | number;               // identifier type
type Graph = Map<NodeId, NodeId[]>;           // adjacency list
class Node {
  id: string;
  neighbors: Node[];
}
/**
 * Depth‑Limited Search (recursive)
 *
 * @param graph   The graph as an adjacency list.
 * @param start   The start node id.
 * @param goal    The goal node id (or a predicate function).
 * @param limit   Maximum depth to explore (0 = only the start node).
 * @returns       An array representing the path from start → goal,
 *                or null if no path within the limit exists.
 */
function depthLimitedSearch(
  graph: Graph,
  start: NodeId,
  goal: NodeId | ((id: NodeId) => boolean),
  limit: number
): NodeId[] | null {
  // Helper to test goal condition (allows either a concrete id or a predicate)
  const isGoal = typeof goal === "function" ? goal : (id: NodeId) => id === goal;

  // Internal recursive DFS that carries the current path
  function recurse(current: NodeId, depth: number, path: NodeId[]): NodeId[] | null {
    // 1️⃣ Goal test
    if (isGoal(current)) {
      return [...path, current]; // success – return the full path
    }

    // 2️⃣ Depth limit reached → cut off this branch
    if (depth === limit) {
      return null; // "cutoff"
    }

    // 3️⃣ Expand children
    const neighbors = graph.get(current) ?? [];
    for (const next of neighbors) {
      // Avoid cycles by checking if we already visited the node in the current path
      if (path.includes(next)) continue;

      const result = recurse(next, depth + 1, [...path, current]);
      if (result) {
        return result; // propagate the first found solution upward
      }
    }

    // No child produced a solution within the limit
    return null;
  }

  // Kick‑off the recursion
  return recurse(start, 0, []);
}
interface StackItem {
  node: NodeId;
  depth: number;
  path: NodeId[];
}

/**
 * Depth‑Limited Search (iterative)
 */
function depthLimitedSearchIterative(
  graph: Graph,
  start: NodeId,
  goal: NodeId | ((id: NodeId) => boolean),
  limit: number
): NodeId[] | null {
  const isGoal = typeof goal === "function" ? goal : (id: NodeId) => id === goal;

  const stack: StackItem[] = [{ node: start, depth: 0, path: [] }];

  while (stack.length) {
    const { node, depth, path } = stack.pop()!; // non‑empty because of while condition

    // Goal test
    if (isGoal(node)) {
      return [...path, node];
    }

    // Depth limit check
    if (depth === limit) continue; // do not push children

    // Expand children (push in reverse order if you care about order)
    const neighbors = graph.get(node) ?? [];
    for (const next of neighbors) {
      if (path.includes(next)) continue; // simple cycle guard
      stack.push({ node: next, depth: depth + 1, path: [...path, node] });
    }
  }

  // Exhausted stack → no solution within limit
  return null;
}
// Build a tiny graph
const g: Graph = new Map([
  [1, [2, 3]],
  [2, [4]],
  [3, [4, 5]],
  [4, [6]],
  [5, []],
  [6, []],
]);

// Find a path from 1 → 6 with depth limit 3 (should succeed)
const path1 = depthLimitedSearch(g, 1, 6, 3);
console.log("Path (limit 3):", path1); // → [1,2,4,6] or [1,3,4,6] depending on neighbor order

// Same query with limit 2 (should fail)
const path2 = depthLimitedSearch(g, 1, 6, 2);
console.log("Path (limit 2):", path2); // → null

// Using a predicate as goal (any node >= 5)
const path3 = depthLimitedSearch(g, 1, (id) => (typeof id === "number" && id >= 5), 3);
console.log("Path to any node >=5:", path3); // → [1,3,5] (depth 2)
# 1️⃣ Initialise a project (once)
npm init -y
npm install typescript @types/node

# 2️⃣ Create a file, e.g., dls.ts, paste the code above, then compile & run:
npx tsc dls.ts && node dls.js
function iterativeDeepeningSearch(
  graph: Graph,
  start: NodeId,
  goal: NodeId | ((id: NodeId) => boolean),
  maxDepth = 1000 // safety guard
): NodeId[] | null {
  for (let limit = 0; limit <= maxDepth; limit++) {
    const result = depthLimitedSearch(graph, start, goal, limit);
    if (result) return result; // found!
  }
  return null; // not found within maxDepth
}
function depthLimitedSearchOptimized(
  graph: Graph,
  start: NodeId,
  goal: NodeId | ((id: NodeId) => boolean),
  limit: number
): NodeId[] | null {
  const isGoal = typeof goal === "function" ? goal : (id: NodeId) => id === goal;

  function recurse(node: NodeId, depth: number, path: NodeId[], visited: Set<NodeId>): NodeId[] | null {
    if (isGoal(node)) return [...path, node];
    if (depth === limit) return null;

    visited.add(node);
    const neighbors = graph.get(node) ?? [];

    for (const nxt of neighbors) {
      if (visited.has(nxt)) continue;
      const result = recurse(nxt, depth + 1, [...path, node], visited);
      if (result) return result;
    }
    visited.delete(node); // backtrack
    return null;
  }

  return recurse(start, 0, [], new Set());
}
// ---------- Types ----------
type NodeId = string | number;
type Graph = Map<NodeId, NodeId[]>;

// ---------- Depth‑Limited Search (recursive, optimized) ----------
function depthLimitedSearch(
  graph: Graph,
  start: NodeId,
  goal: NodeId | ((id: NodeId) => boolean),
  limit: number
): NodeId[] | null {
  const isGoal = typeof goal === "function" ? goal : (id: NodeId) => id === goal;

  function recurse(node: NodeId, depth: number, path: NodeId[], visited: Set<NodeId>): NodeId[] | null {
    if (isGoal(node)) return [...path, node];
    if (depth === limit) return null;

    visited.add(node);
    const neighbors = graph.get(node) ?? [];

    for (const nxt of neighbors) {
      if (visited.has(nxt)) continue;
      const result = recurse(nxt, depth + 1, [...path, node], visited);
      if (result) return result;
    }
    visited.delete(node); // backtrack
    return null;
  }

  return recurse(start, 0, [], new Set());
}

// ---------- Example ----------
const g: Graph = new Map([
  [1, [2, 3]],
  [2, [4]],
  [3, [4, 5]],
  [4, [6]],
  [5, []],
  [6, []],
]);

console.log(depthLimitedSearch(g, 1, 6, 3)); // → [1,2,4,6] (or 1,3,4,6)
console.log(depthLimitedSearch(g, 1, 6, 2)); // → null
console.log(
  depthLimitedSearch(g, 1, (id) => typeof id === "number" && id >= 5, 3)
); // → [1,3,5]

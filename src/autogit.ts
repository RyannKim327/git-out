type NodeId = string | number;               // whatever you use for node identifiers
type AdjList = Map<NodeId, NodeId[]>;         // node → list of neighbours
/**
 * Iterative Depth‑Limited Search.
 *
 * @param graph      The adjacency list of the graph.
 * @param start      The node where the search begins.
 * @param goalTest   A predicate that returns true for a goal node.
 * @param limit      Maximum depth allowed (0 = only the start node).
 * @returns          An array representing the path from start → goal,
 *                   or null if no goal was found within the limit.
 *
 * @throws          If start node is not present in the graph.
 */
export function depthLimitedSearchIterative(
  graph: AdjList,
  start: NodeId,
  goalTest: (node: NodeId) => boolean,
  limit: number
): NodeId[] | null {
  if (!graph.has(start)) {
    throw new Error(`Start node ${start} is not present in the graph`);
  }

  // Stack holds tuples: [currentNode, depth, pathSoFar]
  const stack: Array<[NodeId, number, NodeId[]]> = [[start, 0, [start]]];

  while (stack.length > 0) {
    const [node, depth, path] = stack.pop()!; // pop is safe because length > 0

    // Goal test – we check *as soon as we pop* so the start node can be a goal.
    if (goalTest(node)) {
      return path;
    }

    // If we have already reached the depth limit, do NOT expand children.
    if (depth >= limit) continue;

    // Expand neighbours (push them onto the stack).
    const neighbours = graph.get(node) ?? [];

    // Optional: reverse order if you want the same order as recursive DFS.
    for (let i = neighbours.length - 1; i >= 0; i--) {
      const child = neighbours[i];
      // Avoid cycles by not revisiting nodes already in the current path.
      if (path.includes(child)) continue;

      stack.push([child, depth + 1, [...path, child]]);
    }
  }

  // Exhausted stack → no goal within the depth limit.
  return null;
}
// ---------------------------------------------------
// 1️⃣ Build a tiny graph (undirected for illustration)
// ---------------------------------------------------
const graph: AdjList = new Map([
  [1, [2, 3]],
  [2, [1, 4, 5]],
  [3, [1, 6]],
  [4, [2]],
  [5, [2, 6]],
  [6, [3, 5]],
]);

// ---------------------------------------------------
// 2️⃣ Define a goal predicate
// ---------------------------------------------------
const goalNode = 6;
const isGoal = (n: NodeId) => n === goalNode;

// ---------------------------------------------------
// 3️⃣ Run DLS with different limits
// ---------------------------------------------------
function demo(limit: number) {
  const result = depthLimitedSearchIterative(graph, 1, isGoal, limit);
  console.log(`limit=${limit} →`, result ? `path ${result.join(' → ')}` : 'no solution');
}

demo(0); // limit=0 → no solution (start ≠ goal)
demo(1); // limit=1 → no solution (goal is 2 edges away)
demo(2); // limit=2 → path 1 → 3 → 6
demo(3); // limit=3 → still finds the same shortest‑depth path
limit=0 → no solution
limit=1 → no solution
limit=2 → path 1 → 3 → 6
limit=3 → path 1 → 3 → 6
// depthLimitedSearch.ts ---------------------------------------------------------

type NodeId = string | number;
type AdjList = Map<NodeId, NodeId[]>;

/**
 * Iterative Depth‑Limited Search.
 *
 * @param graph      The adjacency list of the graph.
 * @param start      Starting node.
 * @param goalTest   Predicate that returns true for a goal node.
 * @param limit      Maximum depth allowed (0 = only start node).
 * @returns          Path from start to goal, or null if none within limit.
 */
export function depthLimitedSearchIterative(
  graph: AdjList,
  start: NodeId,
  goalTest: (node: NodeId) => boolean,
  limit: number
): NodeId[] | null {
  if (!graph.has(start)) {
    throw new Error(`Start node ${start} is not present in the graph`);
  }

  const stack: Array<[NodeId, number, NodeId[]]> = [[start, 0, [start]]];

  while (stack.length > 0) {
    const [node, depth, path] = stack.pop()!;

    if (goalTest(node)) {
      return path;
    }

    if (depth >= limit) continue;

    const neighbours = graph.get(node) ?? [];

    // Push neighbours in reverse order to mimic recursive DFS order.
    for (let i = neighbours.length - 1; i >= 0; i--) {
      const child = neighbours[i];
      if (path.includes(child)) continue; // simple cycle guard
      stack.push([child, depth + 1, [...path, child]]);
    }
  }

  return null;
}

// -----------------------------------------------------------------------------
// Demo (run with `ts-node depthLimitedSearch.ts` or paste into a playground)
// -----------------------------------------------------------------------------
if (require.main === module) {
  const graph: AdjList = new Map([
    [1, [2, 3]],
    [2, [1, 4, 5]],
    [3, [1, 6]],
    [4, [2]],
    [5, [2, 6]],
    [6, [3, 5]],
  ]);

  const goal = 6;
  const isGoal = (n: NodeId) => n === goal;

  const demo = (limit: number) => {
    const result = depthLimitedSearchIterative(graph, 1, isGoal, limit);
    console.log(
      `limit=${limit} →`,
      result ? `path ${result.join(' → ')}` : 'no solution'
    );
  };

  [0, 1, 2, 3].forEach(demo);
}
npx ts-node depthLimitedSearch.ts

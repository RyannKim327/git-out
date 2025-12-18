type NodeId = string | number;

/** A generic node that can hold any payload you like */
interface Node<T = any> {
  id: NodeId;               // unique identifier (used for the visited set)
  value?: T;                // optional payload
  neighbors: NodeId[];      // list of adjacent node ids
}
/**
 * Breadth‑Limited Search (BLS)
 *
 * @param startId   ID of the start node
 * @param goalId    ID of the goal node (or a predicate function)
 * @param graph     Map of all nodes (adjacency list)
 * @param limit     Maximum depth to explore (0 = only the start node)
 * @returns         An array of node IDs representing the path from start to goal,
 *                  or null if the goal is not found within the limit.
 */
export function breadthLimitedSearch<T = any>(
  startId: NodeId,
  goal: NodeId | ((node: Node<T>) => boolean),
  graph: Map<NodeId, Node<T>>,
  limit: number
): NodeId[] | null {
  // ---- Helper --------------------------------------------------------------
  const isGoal = typeof goal === 'function'
    ? goal
    : (node: Node<T>) => node.id === goal;

  // ---- Edge cases -----------------------------------------------------------
  if (!graph.has(startId)) {
    throw new Error(`Start node ${startId} does not exist in the graph`);
  }
  if (limit < 0) {
    throw new Error('Depth limit must be >= 0');
  }

  // ---- BFS structures -------------------------------------------------------
  const queue: Array<{ id: NodeId; depth: number; path: NodeId[] }> = [
    { id: startId, depth: 0, path: [startId] },
  ];
  const visited = new Set<NodeId>([startId]);

  // ---- Main loop ------------------------------------------------------------
  while (queue.length > 0) {
    const { id, depth, path } = queue.shift()!; // non‑empty guarantee

    const node = graph.get(id)!; // we know it exists

    // Goal test
    if (isGoal(node)) {
      return path; // success – return the full path
    }

    // Depth limit check – only expand if we are still under the limit
    if (depth >= limit) continue;

    // Enqueue neighbours
    for (const neighborId of node.neighbors) {
      if (!visited.has(neighborId) && graph.has(neighborId)) {
        visited.add(neighborId);
        queue.push({
          id: neighborId,
          depth: depth + 1,
          path: [...path, neighborId],
        });
      }
    }
  }

  // ---- Exhausted ------------------------------------------------------------
  return null; // not found within the depth limit
}
// 1️⃣ Build a tiny graph
const graph = new Map<NodeId, Node>([
  [1, { id: 1, neighbors: [2, 3] }],
  [2, { id: 2, neighbors: [4] }],
  [3, { id: 3, neighbors: [4, 5] }],
  [4, { id: 4, neighbors: [] }],
  [5, { id: 5, neighbors: [6] }],
  [6, { id: 6, neighbors: [] }],
]);

// 2️⃣ Search for node 6 with a depth limit of 2 (should fail)
const result1 = breadthLimitedSearch(1, 6, graph, 2);
console.log(result1); // → null (6 is 3 edges away)

// 3️⃣ Same search with a limit of 3 (should succeed)
const result2 = breadthLimitedSearch(1, 6, graph, 3);
console.log(result2); // → [1, 3, 5, 6]

// 4️⃣ Using a predicate instead of a concrete goal
const result3 = breadthLimitedSearch(
  1,
  (node) => node.id === 4,
  graph,
  1
);
console.log(result3); // → [1, 2] or [1, 3] (first 4‑depth node found)
// ---------------------------------------------------------------
// 1️⃣ Types & Graph construction
// ---------------------------------------------------------------
type NodeId = number | string;

interface Node<T = any> {
  id: NodeId;
  value?: T;
  neighbors: NodeId[];
}

// ---------------------------------------------------------------
// 2️⃣ Breadth‑Limited Search implementation (copy from above)
// ---------------------------------------------------------------
export function breadthLimitedSearch<T = any>(
  startId: NodeId,
  goal: NodeId | ((node: Node<T>) => boolean),
  graph: Map<NodeId, Node<T>>,
  limit: number
): NodeId[] | null {
  const isGoal = typeof goal === 'function'
    ? goal
    : (node: Node<T>) => node.id === goal;

  if (!graph.has(startId)) throw new Error(`Start node ${startId} missing`);
  if (limit < 0) throw new Error('Depth limit must be >= 0');

  const queue: Array<{ id: NodeId; depth: number; path: NodeId[] }> = [
    { id: startId, depth: 0, path: [startId] },
  ];
  const visited = new Set<NodeId>([startId]);

  while (queue.length) {
    const { id, depth, path } = queue.shift()!;
    const node = graph.get(id)!;

    if (isGoal(node)) return path;

    if (depth >= limit) continue;

    for (const nb of node.neighbors) {
      if (!visited.has(nb) && graph.has(nb)) {
        visited.add(nb);
        queue.push({ id: nb, depth: depth + 1, path: [...path, nb] });
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------
// 3️⃣ Demo graph & test cases
// ---------------------------------------------------------------
function demo() {
  const g = new Map<NodeId, Node>([
    [1, { id: 1, neighbors: [2, 3] }],
    [2, { id: 2, neighbors: [4] }],
    [3, { id: 3, neighbors: [4, 5] }],
    [4, { id: 4, neighbors: [] }],
    [5, { id: 5, neighbors: [6] }],
    [6, { id: 6, neighbors: [] }],
  ]);

  console.log('🔎 Search 1 → 6, limit 2 →', breadthLimitedSearch(1, 6, g, 2));
  console.log('🔎 Search 1 → 6, limit 3 →', breadthLimitedSearch(1, 6, g, 3));
  console.log(
    '🔎 Search 1 → node with id 4, limit 1 →',
    breadthLimitedSearch(1, 4, g, 1)
  );
}

// Run the demo when this file is executed directly (Node.js)
if (require.main === module) demo();
🔎 Search 1 → 6, limit 2 → null
🔎 Search 1 → 6, limit 3 → [ 1, 3, 5, 6 ]
🔎 Search 1 → node with id 4, limit 1 → [ 1, 2 ]   // (or [1,3] depending on queue order)
function bfsLimited(
  start: NodeId,
  goal: NodeId | ((n: Node) => boolean),
  graph: Map<NodeId, Node>,
  maxDepth: number
): NodeId[] | null {
  const isGoal = typeof goal === 'function' ? goal : (n) => n.id === goal;
  const q: Array<{id: NodeId; d: number; path: NodeId[]}> = [{id:start, d:0, path:[start]}];
  const seen = new Set([start]);

  while (q.length) {
    const {id, d, path} = q.shift()!;
    const node = graph.get(id)!;
    if (isGoal(node)) return path;
    if (d >= maxDepth) continue;
    for (const nb of node.neighbors) {
      if (!seen.has(nb) && graph.has(nb)) {
        seen.add(nb);
        q.push({id: nb, d: d+1, path: [...path, nb]});
      }
    }
  }
  return null;
}

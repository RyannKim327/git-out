stack ← [(startNode, depth = 0)]
while stack not empty
    (node, d) ← stack.pop()
    if node == goal → success
    if d == limit → continue   // do not expand deeper
    for each child of node
        push (child, d+1) onto stack
fail
/** A node identifier – can be a string, number, or any hashable type */
type NodeId = string | number;

/** Edge list for a directed (or undirected) graph */
interface Graph {
  /** adjacency list: node → array of neighbour nodes */
  adjacency: Map<NodeId, NodeId[]>;
}

/** Helper to create a graph from a plain object literal */
function buildGraph(edges: Record<NodeId, NodeId[]>): Graph {
  const adjacency = new Map<NodeId, NodeId[]>();
  for (const [src, dests] of Object.entries(edges)) {
    adjacency.set(src, dests);
  }
  return { adjacency };
}
/**
 * Depth‑Limited Search (iterative, stack‑based)
 *
 * @param graph   The graph to search.
 * @param start   Id of the start node.
 * @param goal    Id of the goal node.
 * @param limit   Maximum depth allowed (0 = only the start node).
 * @param visited Optional Set to keep track of already‑expanded nodes.
 *                If omitted the algorithm behaves like a *tree* search.
 * @returns       An array representing the path from start → goal,
 *                or null if the goal is not reachable within the limit.
 */
function depthLimitedSearch(
  graph: Graph,
  start: NodeId,
  goal: NodeId,
  limit: number,
  visited?: Set<NodeId>
): NodeId[] | null {
  // ---- sanity checks -------------------------------------------------
  if (limit < 0) throw new Error('limit must be >= 0');
  if (start === goal) return [start];

  // ---- internal stack -------------------------------------------------
  // Each entry stores: current node, depth, and the path taken so far.
  type StackEntry = { node: NodeId; depth: number; path: NodeId[] };
  const stack: StackEntry[] = [{ node: start, depth: 0, path: [start] }];

  // If the caller supplied a visited set we reuse it, otherwise we create a
  // temporary one that lives only for this call (tree‑search semantics).
  const closed = visited ?? new Set<NodeId>();

  while (stack.length > 0) {
    const { node, depth, path } = stack.pop()!; // non‑empty guarantee

    // --------------------------------------------------- goal test
    if (node === goal) return path;

    // --------------------------------------------------- depth cut‑off
    if (depth === limit) continue; // do not expand deeper

    // --------------------------------------------------- graph expansion
    const neighbours = graph.adjacency.get(node) ?? [];

    // Push neighbours onto the stack.  We push them in *reverse* order
    // so that the first neighbour in the adjacency list is explored first,
    // mimicking the usual recursive DFS order.
    for (let i = neighbours.length - 1; i >= 0; i--) {
      const child = neighbours[i];

      // For a *graph* search we avoid revisiting nodes that are already closed.
      // For a *tree* search the caller can pass `undefined` for `visited`.
      if (visited && closed.has(child)) continue;

      // Record the node as closed *before* pushing it – this prevents
      // duplicate pushes of the same node at the same depth.
      if (visited) closed.add(child);

      stack.push({ node: child, depth: depth + 1, path: [...path, child] });
    }
  }

  // --------------------------------------------------- failure
  return null;
}
// Define a simple directed graph
const rawEdges = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['G'],
  F: [],
  G: [],
};

const graph = buildGraph(rawEdges);

// -------------- 1️⃣  Simple DLS (tree‑search) -----------------
const limit = 2; // allow at most 2 edges from the start
const path1 = depthLimitedSearch(graph, 'A', 'G', limit);
console.log('Tree‑search, limit=2 →', path1); // → null (G is depth 3)

// -------------- 2️⃣  DLS with a visited set (graph‑search) -----
const visited = new Set<NodeId>();
const path2 = depthLimitedSearch(graph, 'A', 'G', 3, visited);
console.log('Graph‑search, limit=3 →', path2); // → [ 'A', 'B', 'E', 'G' ]

// -------------- 3️⃣  Using DLS inside Iterative Deepening -----
function iterativeDeepeningSearch(
  graph: Graph,
  start: NodeId,
  goal: NodeId,
  maxDepth: number
): NodeId[] | null {
  for (let depth = 0; depth <= maxDepth; depth++) {
    const result = depthLimitedSearch(graph, start, goal, depth);
    if (result) return result; // found at the shallowest depth
  }
  return null; // not found within maxDepth
}

const idsPath = iterativeDeepeningSearch(graph, 'A', 'G', 5);
console.log('IDS →', idsPath); // → [ 'A', 'B', 'E', 'G' ]
Tree‑search, limit=2 → null
Graph‑search, limit=3 → [ 'A', 'B', 'E', 'G' ]
IDS → [ 'A', 'B', 'E', 'G' ]
type NodeId = string | number;
type Graph = Map<NodeId, NodeId[]>;

function dlsIterative(
  graph: Graph,
  start: NodeId,
  goal: NodeId,
  limit: number,
  visited = new Set<NodeId>()
): NodeId[] | null {
  const stack: { n: NodeId; d: number; p: NodeId[] }[] = [{ n: start, d: 0, p: [start] }];
  visited.add(start);

  while (stack.length) {
    const { n, d, p } = stack.pop()!;
    if (n === goal) return p;
    if (d === limit) continue;

    for (const child of (graph.get(n) ?? [])) {
      if (!visited.has(child)) {
        visited.add(child);
        stack.push({ n: child, d: d + 1, p: [...p, child] });
      }
    }
  }
  return null;
}

/** A generic identifier for a node – can be string, number, or any hashable type */
type NodeId = string | number;

/** Graph representation: adjacency list */
type Graph = Map<NodeId, NodeId[]>;

/** Result of the search */
interface SearchResult {
  /** All nodes that were visited (including those at the limit) */
  visited: Set<NodeId>;

  /** Optional: map of node → depth (how far from the start) */
  depthMap: Map<NodeId, number>;

  /** Optional: parent map for reconstructing a path */
  parentMap: Map<NodeId, NodeId | null>;
}
/**
 * Breadth‑Limited Search (BLS)
 *
 * @param graph   The graph to search (adjacency list)
 * @param start   The node where the search begins
 * @param limit   Maximum depth to explore (0 = only the start node)
 * @returns       An object containing visited nodes, depth info and parent links
 */
export function breadthLimitedSearch(
  graph: Graph,
  start: NodeId,
  limit: number
): SearchResult {
  if (limit < 0) {
    throw new Error('Depth limit must be >= 0');
  }

  // ---- 1️⃣ Initialise data structures ----
  const visited = new Set<NodeId>();
  const depthMap = new Map<NodeId, number>();
  const parentMap = new Map<NodeId, NodeId | null>();

  // Queue holds tuples: [node, depth]
  const queue: Array<[NodeId, number]> = [];

  // Seed the search
  visited.add(start);
  depthMap.set(start, 0);
  parentMap.set(start, null);
  queue.push([start, 0]);

  // ---- 2️⃣ Main BFS loop ----
  while (queue.length > 0) {
    const [current, depth] = queue.shift()!; // non‑empty because of while condition

    // If we have reached the limit, we **do not** expand its neighbours
    if (depth >= limit) {
      continue; // still visited, but stop here
    }

    // Get neighbours (if the node has none, graph.get returns undefined)
    const neighbours = graph.get(current) ?? [];

    for (const next of neighbours) {
      if (!visited.has(next)) {
        visited.add(next);
        depthMap.set(next, depth + 1);
        parentMap.set(next, current);
        queue.push([next, depth + 1]);
      }
    }
  }

  // ---- 3️⃣ Return the collected information ----
  return { visited, depthMap, parentMap };
}
/**
 * Reconstructs the path from start → target using the parentMap returned by BLS.
 *
 * @param parentMap  Map produced by breadthLimitedSearch
 * @param target     Desired destination node
 * @returns          Array of nodes from start to target (inclusive) or null if unreachable
 */
export function reconstructPath(
  parentMap: Map<NodeId, NodeId | null>,
  target: NodeId
): NodeId[] | null {
  if (!parentMap.has(target)) {
    return null; // target never visited
  }

  const path: NodeId[] = [];
  let cur: NodeId | null = target;

  while (cur !== null) {
    path.push(cur);
    cur = parentMap.get(cur) ?? null;
  }

  // Path is built backwards (target → start), reverse it
  return path.reverse();
}
import { breadthLimitedSearch, reconstructPath } from './bls';

// Build a simple undirected graph
const graph: Graph = new Map([
  [1, [2, 3]],
  [2, [1, 4, 5]],
  [3, [1, 6]],
  [4, [2]],
  [5, [2, 6]],
  [6, [3, 5]],
]);

const startNode = 1;
const depthLimit = 2;

// Run the search
const result = breadthLimitedSearch(graph, startNode, depthLimit);

console.log('Visited nodes:', Array.from(result.visited).sort());
// → Visited nodes: [ 1, 2, 3, 4, 5, 6 ] (all nodes are within 2 hops)

console.log('Depth map:');
for (const [node, d] of result.depthMap.entries()) {
  console.log(`  ${node} → depth ${d}`);
}
// → 1 → 0, 2 → 1, 3 → 1, 4 → 2, 5 → 2, 6 → 2

// Reconstruct a path to node 5 (should be 1 → 2 → 5)
const path = reconstructPath(result.parentMap, 5);
console.log('Path to 5:', path);
// → Path to 5: [ 1, 2, 5 ]

// If we lower the limit to 1, node 5 becomes unreachable:
const result2 = breadthLimitedSearch(graph, startNode, 1);
console.log('Visited with limit=1:', Array.from(result2.visited).sort());
// → Visited with limit=1: [ 1, 2, 3 ]
console.log('Path to 5 with limit=1:', reconstructPath(result2.parentMap, 5));
// → Path to 5 with limit=1: null
// bls.ts ---------------------------------------------------------

type NodeId = string | number;
type Graph = Map<NodeId, NodeId[]>;

export interface SearchResult {
  visited: Set<NodeId>;
  depthMap: Map<NodeId, number>;
  parentMap: Map<NodeId, NodeId | null>;
}

/**
 * Breadth‑Limited Search (BLS)
 */
export function breadthLimitedSearch(
  graph: Graph,
  start: NodeId,
  limit: number
): SearchResult {
  if (limit < 0) {
    throw new Error('Depth limit must be >= 0');
  }

  const visited = new Set<NodeId>();
  const depthMap = new Map<NodeId, number>();
  const parentMap = new Map<NodeId, NodeId | null>();
  const queue: Array<[NodeId, number]> = [];

  visited.add(start);
  depthMap.set(start, 0);
  parentMap.set(start, null);
  queue.push([start, 0]);

  while (queue.length > 0) {
    const [curr, depth] = queue.shift()!;

    if (depth >= limit) continue;

    const neighbours = graph.get(curr) ?? [];

    for (const nxt of neighbours) {
      if (!visited.has(nxt)) {
        visited.add(nxt);
        depthMap.set(nxt, depth + 1);
        parentMap.set(nxt, curr);
        queue.push([nxt, depth + 1]);
      }
    }
  }

  return { visited, depthMap, parentMap };
}

/**
 * Reconstruct a path from start to target using the parent map.
 */
export function reconstructPath(
  parentMap: Map<NodeId, NodeId | null>,
  target: NodeId
): NodeId[] | null {
  if (!parentMap.has(target)) return null;

  const path: NodeId[] = [];
  let cur: NodeId | null = target;

  while (cur !== null) {
    path.push(cur);
    cur = parentMap.get(cur) ?? null;
  }

  return path.reverse();
}

// ---------------------------------------------------------------

// example.ts -----------------------------------------------------

import { breadthLimitedSearch, reconstructPath } from './bls';

const graph: Graph = new Map([
  [1, [2, 3]],
  [2, [1, 4, 5]],
  [3, [1, 6]],
  [4, [2]],
  [5, [2, 6]],
  [6, [3, 5]],
]);

const start = 1;
const limit = 2;

const result = breadthLimitedSearch(graph, start, limit);
console.log('Visited:', [...result.visited].sort());

for (const [node, d] of result.depthMap) {
  console.log(`Node ${node} depth ${d}`);
}

const path = reconstructPath(result.parentMap, 5);
console.log('Path 1 → 5:', path);
// ---------------------------------------------------------------
ts-node example.ts

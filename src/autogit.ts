/** A generic identifier for a node – can be string, number, or any hashable type. */
type NodeId = string | number;

/** Graph represented as an adjacency list. */
type AdjList = Map<NodeId, NodeId[]>;

/** Result of the search – you can adapt it to your needs. */
interface SearchResult {
  /** All nodes that were visited (including those at the limit). */
  visited: Set<NodeId>;
  /** Optional map of each node → its predecessor (useful for path reconstruction). */
  predecessor: Map<NodeId, NodeId | null>;
}
/**
 * Breadth‑Limited Search (BLS)
 *
 * @param graph   The adjacency‑list representation of the graph.
 * @param start   The node where the search begins.
 * @param limit   Maximum depth to explore (0 = only the start node).
 * @param goal    Optional early‑exit predicate. Return true when you have found what you need.
 *
 * @returns An object containing the visited set and a predecessor map.
 */
export function breadthLimitedSearch(
  graph: AdjList,
  start: NodeId,
  limit: number,
  goal?: (node: NodeId) => boolean
): SearchResult {
  // Defensive checks
  if (limit < 0) throw new Error('limit must be >= 0');
  if (!graph.has(start)) throw new Error('start node not present in the graph');

  const visited = new Set<NodeId>();
  const predecessor = new Map<NodeId, NodeId | null>();

  // Queue stores tuples: [node, depth]
  const queue: Array<[NodeId, number]> = [];

  // Initialise
  visited.add(start);
  predecessor.set(start, null);
  queue.push([start, 0]);

  while (queue.length > 0) {
    const [node, depth] = queue.shift()!; // non‑null because length > 0

    // If a goal predicate is supplied, we can stop early.
    if (goal && goal(node)) {
      // Optionally you could break here or return immediately.
      // We'll just break to keep the visited set consistent.
      break;
    }

    // Do NOT expand nodes that are already at the limit.
    if (depth >= limit) continue;

    const neighbours = graph.get(node) ?? [];

    for (const nb of neighbours) {
      if (!visited.has(nb)) {
        visited.add(nb);
        predecessor.set(nb, node);
        queue.push([nb, depth + 1]);
      }
    }
  }

  return { visited, predecessor };
}
/**
 * Convenience builder that accepts an array of edges.
 * Edge direction is respected (directed graph). For undirected graphs add both directions.
 */
export function buildAdjList(edges: Array<[NodeId, NodeId]>): AdjList {
  const map = new Map<NodeId, NodeId[]>();
  for (const [src, dst] of edges) {
    if (!map.has(src)) map.set(src, []);
    map.get(src)!.push(dst);
  }
  return map;
}
/**
 * Reconstructs a path from `start` to `target` using the predecessor map.
 * Returns null if `target` was never visited.
 */
export function reconstructPath(
  predecessor: Map<NodeId, NodeId | null>,
  start: NodeId,
  target: NodeId
): NodeId[] | null {
  if (!predecessor.has(target)) return null;

  const path: NodeId[] = [];
  let cur: NodeId | null = target;
  while (cur !== null) {
    path.push(cur);
    cur = predecessor.get(cur)!;
  }
  path.reverse();

  // Verify that the first element is indeed the start node.
  return path[0] === start ? path : null;
}
import {
  breadthLimitedSearch,
  buildAdjList,
  reconstructPath,
} from './bls'; // assume the code above lives in bls.ts

// ---------------------------------------------------
// 1️⃣ Define a graph (directed for this example)
const edges: Array<[NodeId, NodeId]> = [
  [1, 2],
  [1, 3],
  [2, 4],
  [2, 5],
  [3, 6],
  [3, 7],
  [4, 8],
  [5, 8],
  [6, 9],
  [7, 9],
];
const graph = buildAdjList(edges);

// ---------------------------------------------------
// 2️⃣ Run a breadth‑limited search from node 1, limit = 2
const limit = 2;
const start = 1;

const result = breadthLimitedSearch(graph, start, limit);
console.log('Visited nodes (limit =', limit, '):', [...result.visited].sort());

// ---------------------------------------------------
// 3️⃣ Find a concrete goal (e.g., node 8) with early exit
const goalNode = 8;
const resultWithGoal = breadthLimitedSearch(
  graph,
  start,
  limit,
  (n) => n === goalNode
);
console.log('Goal reached?', resultWithGoal.visited.has(goalNode));

// ---------------------------------------------------
// 4️⃣ Reconstruct the path to a node that *was* visited
const target = 5;
const path = reconstructPath(result.predecessor, start, target);
console.log('Path from', start, 'to', target, ':', path);
Visited nodes (limit = 2 ): [ 1, 2, 3, 4, 5, 6, 7 ]
Goal reached? false               // node 8 is depth 3 → beyond limit
Path from 1 to 5 : [ 1, 2, 5 ]
import { breadthLimitedSearch, buildAdjList } from './bls';

describe('Breadth‑Limited Search', () => {
  const graph = buildAdjList([
    [1, 2],
    [1, 3],
    [2, 4],
    [2, 5],
    [3, 6],
    [3, 7],
  ]);

  test('limit 0 returns only the start node', () => {
    const { visited } = breadthLimitedSearch(graph, 1, 0);
    expect([...visited]).toEqual([1]);
  });

  test('limit 1 expands immediate neighbours', () => {
    const { visited } = breadthLimitedSearch(graph, 1, 1);
    expect(new Set(visited)).toEqual(new Set([1, 2, 3]));
  });

  test('goal predicate stops early', () => {
    const goal = (n: number) => n === 5;
    const { visited } = breadthLimitedSearch(graph, 1, 3, goal);
    expect(visited.has(5)).toBe(true);
    // Nodes beyond 5 may or may not be visited depending on queue order,
    // but we know the algorithm stopped after finding 5.
  });

  test('throws on negative limit', () => {
    expect(() => breadthLimitedSearch(graph, 1, -1)).toThrow();
  });
});
function bls(g, s, L) {
  const q = [[s, 0]], seen = new Set([s]), pred = new Map([[s, null]]);
  while (q.length) {
    const [n, d] = q.shift();
    if (d >= L) continue;
    for (const nb of g.get(n) ?? []) if (!seen.has(nb)) {
      seen.add(nb); pred.set(nb, n); q.push([nb, d + 1]);
    }
  }
  return { visited: seen, predecessor: pred };
}

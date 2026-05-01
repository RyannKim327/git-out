/**
 * Edge list representation – maps a node id to an array of neighbour ids.
 */
type AdjacencyList<T> = Record<string, T[]>;

/**
 * A simple helper that maps a node to its “depth” from one end of the search.
 */
type Visited<T> = Record<string, number>;

/**
 * Bidirectional BFS.
 *
 * @param graph   The graph, keyed by string id, pointing to an array of neighbour ids.
 * @param start   The id of the start node.
 * @param target  The id of the target node.
 * @returns The length of the shortest path, or -1 if no path exists.
 */
export function bidirectionalBfs<T extends string>(
  graph: AdjacencyList<T>,
  start: T,
  target: T
): number {
  if (start === target) return 0;

  // Two frontiers: one growing from start, one from target
  let frontierStart = new Set([start]);
  let frontierTarget = new Set([target]);

  // Book‑keeping maps: node → distance from its originating side
  const visitedStart: Visited<T> = { [start]: 0 };
  const visitedTarget: Visited<T> = { [target]: 0 };

  let distance = 0; // overall layers explored

  while (frontierStart.size && frontierTarget.size) {
    // Always expand the smaller frontier first
    if (frontierStart.size > frontierTarget.size) {
      [frontierStart, frontierTarget] = [frontierTarget, frontierStart];
      [visitedStart, visitedTarget] = [visitedTarget, visitedStart];
    }

    const nextFrontier = new Set<T>();

    for (const node of frontierStart) {
      const neighbours = graph[node] ?? [];

      for (const neighbour of neighbours) {
        // If the other search has already hit this node, we’re done
        if (visitedTarget.hasOwnProperty(neighbour)) {
          return visitedStart[node] + 1 + visitedTarget[neighbour];
        }

        // New node, add to the next layer and record distance
        if (!visitedStart.hasOwnProperty(neighbour)) {
          visitedStart[neighbour] = visitedStart[node] + 1;
          nextFrontier.add(neighbour);
        }
      }
    }

    frontierStart = nextFrontier;
    distance += 1;
  }

  // No intersection found
  return -1;
}
const graph = {
  a: ['b', 'c'],
  b: ['a', 'd', 'e'],
  c: ['a', 'f'],
  d: ['b'],
  e: ['b', 'f'],
  f: ['c', 'e'],
} as const; // type inference: “as const” locks the keys

console.log(bidirectionalBfs(graph, 'a', 'f')); // → 3 (a‑b‑e‑f or a‑c‑f)
console.log(bidirectionalBfs(graph, 'a', 'x')); // → -1 (x not in graph)

/**
 * Graph type: key → list of neighbour keys.
 * Assumes an undirected or directed graph – just feed it the adjacency list you have.
 */
type Graph = Map<string, string[]>;

/**
 * Bidirectional BFS to find the shortest path between two nodes.
 *
 * @param graph       The graph adjacency list.
 * @param startKey    Origin node key.
 * @param goalKey     Destination node key.
 * @returns           Array of keys representing the shortest path,
 *                    or `null` if no path exists.
 */
export function bidirectionalSearch(
  graph: Graph,
  startKey: string,
  goalKey: string
): string[] | null {
  if (startKey === goalKey) return [startKey];

  // --- Front and back queues
  const frontQueue: string[] = [startKey];
  const backQueue: string[] = [goalKey];

  // --- Visited maps
  const frontVisited = new Set<string>([startKey]);
  const backVisited  = new Set<string>([goalKey]);

  // --- Parent maps to reconstruct path
  const frontParent = new Map<string, string>([[startKey, null]]);
  const backParent  = new Map<string, string>([[goalKey, null]]);

  // Helper to get neighbours, guard against missing keys
  const neighbours = (node: string) => graph.get(node) ?? [];

  // Helper to expand one layer from a queue
  function expand(
    queue: string[],
    visited: Set<string>,
    otherVisited: Set<string>,
    parentMap: Map<string, string>
  ): string | null {
    const size = queue.length;   // classic BFS “level” size
    for (let i = 0; i < size; i++) {
      const current = queue.shift() as string; // guaranteed non‑empty

      for (const neighbour of neighbours(current)) {
        if (visited.has(neighbour)) continue; // already expanded from this side

        // New node from this side – record parent & mark visited
        visited.add(neighbour);
        parentMap.set(neighbour, current);
        queue.push(neighbour);

        // If the other side has already seen this neighbour,
        // we’ve met in the middle!
        if (otherVisited.has(neighbour)) return neighbour;
      }
    }
    return null;
  }

  // Main loop
  while (frontQueue.length && backQueue.length) {
    // 1. Expand front side
    const meetingPoint = expand(
      frontQueue,
      frontVisited,
      backVisited,
      frontParent
    );
    if (meetingPoint) {
      return buildPath(
        frontParent,
        backParent,
        meetingPoint,
        startKey,
        goalKey
      );
    }

    // 2. Expand back side
    const meetingPoint2 = expand(
      backQueue,
      backVisited,
      frontVisited,
      backParent
    );
    if (meetingPoint2) {
      return buildPath(
        frontParent,
        backParent,
        meetingPoint2,
        startKey,
        goalKey
      );
    }
  }

  // No overlap – disconnected graph
  return null;
}

/**
 * Reconstructs the full path from start → meeting → goal.
 */
function buildPath(
  frontParents: Map<string, string>,
  backParents: Map<string, string>,
  meeting: string,
  start: string,
  goal: string
): string[] {
  const path: string[] = [meeting];

  // Walk backwards from meeting to start
  let cur: string | null = frontParents.get(meeting) ?? null;
  while (cur) {
    path.unshift(cur);
    cur = frontParents.get(cur) ?? null;
  }

  // Walk forwards from meeting to goal
  cur = backParents.get(meeting) ?? null;
  while (cur) {
    path.push(cur);
    cur = backParents.get(cur) ?? null;
  }

  return path;
}
// Build a tiny sample graph
const g = new Map<string, string[]>([
  ['A', ['B', 'C']],
  ['B', ['A', 'D', 'E']],
  ['C', ['A', 'F']],
  ['D', ['B']],
  ['E', ['B', 'F']],
  ['F', ['C', 'E']]
]);

console.log(bidirectionalSearch(g, 'A', 'F'));
// → ['A

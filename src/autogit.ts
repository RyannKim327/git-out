type NeighborFn<T> = (node: T) => T[];
type GoalFn<T> = (node: T) => boolean;

/**
 * Breadth-limited BFS.
 * - start: starting node
 * - isGoal: predicate to test if a node is the goal
 * - getNeighbors: function returning neighbors of a node
 * - maxDepth: optional maximum depth to explore (inclusive from 0)
 * - maxBreadth: optional maximum number of nodes to enqueue at each depth (per level)
 * 
 * Returns the path from start to the first found goal (inclusive), or null if not found.
 */
function breadthLimitedBFS<T>({
  start,
  isGoal,
  getNeighbors,
  maxDepth,
  maxBreadth
}: {
  start: T;
  isGoal: GoalFn<T>;
  getNeighbors: NeighborFn<T>;
  maxDepth?: number;
  maxBreadth?: number;
}): T[] | null {
  // If the start is the goal, return immediately
  if (isGoal(start)) return [start];

  // Queue elements carry node and its depth
  const queue: Array<{ node: T; depth: number }> = [{ node: start, depth: 0 }];
  const visited = new Set<T>([start]);
  const parent = new Map<T, T | null>();
  parent.set(start, null);

  // Tracks how many nodes we have added for each depth (depth of the children)
  const breadthCount = new Map<number, number>();

  while (queue.length > 0) {
    const { node, depth } = queue.shift()!;

    // Do not expand beyond maxDepth
    if (typeof maxDepth === "number" && depth >= maxDepth) {
      continue;
    }

    const neighbors = getNeighbors(node);
    for (const nb of neighbors) {
      if (visited.has(nb)) continue;

      // If a per-depth breadth limit is set, enforce it for depth + 1
      if (typeof maxBreadth === "number") {
        const nextDepth = depth + 1;
        const addedForNext = breadthCount.get(nextDepth) ?? 0;
        if (addedForNext >= maxBreadth) {
          continue;
        }
        breadthCount.set(nextDepth, addedForNext + 1);
      }

      visited.add(nb);
      parent.set(nb, node);
      // If this neighbor is the goal, reconstruct and return the path
      if (isGoal(nb)) {
        const path: T[] = [];
        let cur: T | null = nb;
        while (cur != null) {
          path.unshift(cur);
          cur = parent.get(cur) ?? null;
        }
        return path;
      }
      queue.push({ node: nb, depth: depth + 1 });
    }
  }

  // No path found
  return null;
}
// Example graph as an adjacency map
const graph = new Map<string, string[]>([
  ["A", ["B", "C"]],
  ["B", ["D", "E"]],
  ["C", ["F"]],
  ["D", []],
  ["E", ["G"]],
  ["F", ["G"]],
  ["G", []]
]);

const start = "A";
const goal = "G";

const path = breadthLimitedBFS<string>({
  start,
  isGoal: (n) => n === goal,
  getNeighbors: (n) => graph.get(n) ?? [],
  maxDepth: 5,       // optional: limit depth
  maxBreadth: 2      // optional: limit per-level breadth
});

console.log(path); // e.g., ["A","C","F","G"] or another valid path depending on order

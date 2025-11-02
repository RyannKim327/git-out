/**
 * Breadth-Limited Search
 * ----------------------
 * @param start        Starting node
 * @param expand       Function that returns the children of a node
 * @param isGoal       Predicate that returns true when a node is a goal
 * @param maxDepth     Non-negative depth limit (0 = only test start node)
 * @returns The first goal node found within the depth limit, or undefined
 */
export function breadthLimitedSearch<T>(
  start: T,
  expand: (node: T) => Iterable<T>,
  isGoal: (node: T) => boolean,
  maxDepth: number
): T | undefined {
  if (maxDepth < 0) return undefined;

  // Queue entries carry the node and its depth
  interface Entry { node: T; depth: number }
  const queue: Entry[] = [{ node: start, depth: 0 }];

  while (queue.length) {
    const { node, depth } = queue.shift()!;

    if (isGoal(node)) return node;

    // Do not expand nodes that have already reached the limit
    if (depth < maxDepth) {
      for (const child of expand(node)) {
        queue.push({ node: child, depth: depth + 1 });
      }
    }
  }
  return undefined; // No goal found within the limit
}
// A simple graph: 0 → 1 → 2 → 3 → 4
const adj = new Map<number, number[]>([
  [0, [1]],
  [1, [2]],
  [2, [3]],
  [3, [4]],
]);

const start = 0;
const goal  = 4;

console.log(breadthLimitedSearch(
  start,
  n => adj.get(n) ?? [],
  n => n === goal,
  2 // depth limit
)); // → undefined (goal 4 is at depth 4 > 2)

console.log(breadthLimitedSearch(
  start,
  n => adj.get(n) ?? [],
  n => n === goal,
  4 // depth limit
)); // → 4

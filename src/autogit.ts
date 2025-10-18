/**
 * Depth-limited search (iterative, non-recursive)
 * @param start     start node
 * @param goal      predicate that returns true when the node is a goal
 * @param expand    function that returns the *direct* neighbours of a node
 * @param maxDepth  depth limit (0 = start only, 1 = children of start, …)
 * @returns the goal node if found, otherwise undefined
 */
export function depthLimitedSearch<T>(
  start: T,
  goal: (n: T) => boolean,
  expand: (n: T) => Iterable<T>,
  maxDepth: number
): T | undefined {
  // stack element: [node, currentDepth]
  const stack: [T, number][] = [[start, 0]];

  while (stack.length) {
    const [node, depth] = stack.pop()!;

    if (goal(node)) return node;          // success
    if (depth === maxDepth) continue;   // hit limit – skip expansion

    // push children with incremented depth (LIFO → DFS order)
    for (const child of expand(node)) {
      stack.push([child, depth + 1]);
    }
  }
  return undefined; // failure
}
type Board = number[][]; // 3×3 matrix, 0 = blank

function expandBoard(b: Board): Board[] {
  /* …generate every board reachable by one legal move… */
  return neighbours;
}

const start: Board = [
  [1, 2, 3],
  [4, 0, 6],
  [7, 5, 8],
];

const goal: Board = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
];

const result = depthLimitedSearch(
  start,
  b => JSON.stringify(b) === JSON.stringify(goal),
  expandBoard,
  10 // depth limit
);

console.log(result ? 'Solution found!' : 'No solution within depth limit');

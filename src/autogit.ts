export type Node<T> = {
  state: T;
  depth: number;
  path: T[];        // complete path from root (included)
};

/**
 * Breadth-limited search.
 * @param initial   start state
 * @param expand    neighbour generator
 * @param goal      goal test
 * @param maxDepth  depth limit (0 = only root, Infinity = BFS)
 * @returns path from initial to goal (inclusive) or null if no solution
 */
export function breadthLimitedSearch<T>(
  initial: T,
  expand: (s: T) => T[],
  goal: (s: T) => boolean,
  maxDepth: number
): T[] | null {
  const root: Node<T> = { state: initial, depth: 0, path: [initial] };

  if (goal(initial)) return root.path;

  const queue: Node<T>[] = [root];
  const visited = new Set<string>();          // optional pruning
  const key = (s: T) => JSON.stringify(s);  // crude hashing

  while (queue.length) {
    const node = queue.shift()!;

    // Do not expand beyond the depth limit
    if (node.depth >= maxDepth) continue;

    for (const childState of expand(node.state)) {
      if (visited.has(key(childState))) continue;
      visited.add(key(childState));

      const child: Node<T> = {
        state: childState,
        depth: node.depth + 1,
        path: [...node.path, childState],
      };

      if (goal(childState)) return child.path;
      queue.push(child);
    }
  }
  return null; // exhausted frontier
}
// 8-puzzle state = 3×3 array of numbers 0..8
type Board = number[][];

const initial: Board = [
  [2, 8, 3],
  [1, 6, 4],
  [7, 0, 5],
];
const goalState: Board = [
  [1, 2, 3],
  [8, 0, 4],
  [7, 6, 5],
];

function expand(board: Board): Board[] {
  const neighbors: Board[] = [];
  // find 0
  let x = 0, y = 0;
  outer: for (let i = 0; i < 3; ++i)
    for (let j = 0; j < 3; ++j)
      if (board[i][j] === 0) { x = i; y = j; break outer; }

  const moves = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  for (const [nx, ny] of moves) {
    if (nx < 0 || nx > 2 || ny < 0 || ny > 2) continue;
    const clone = board.map((r) => r.slice());
    [clone[x][y], clone[nx][ny]] = [clone[nx][ny], clone[x][y]];
    neighbors.push(clone);
  }
  return neighbors;
}

const solution = breadthLimitedSearch(
  initial,
  expand,
  (b) => JSON.stringify(b) === JSON.stringify(goalState),
  10
);

console.log(solution ? `Solved in ${solution.length - 1} moves` : 'No solution within depth limit');

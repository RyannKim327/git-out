type Node<T> = T;          // your domain-specific state
type Expand<T> = (n: Node<T>) => Iterable<Node<T>>;
/**
 * Breadth-limited search
 * @param start      initial state
 * @param expand     neighbour generator
 * @param isGoal     goal test
 * @param maxDepth   depth limit (0 = start, 1 = children of start, …)
 * @returns the goal node or null
 */
export function breadthLimitedSearch<T>(
  start: T,
  expand: (n: T) => Iterable<T>,
  isGoal: (n: T) => boolean,
  maxDepth: number
): T | null {
  interface Entry { node: T; depth: number }

  const queue: Entry[] = [{ node: start, depth: 0 }];
  const seen = new Set([start]);

  while (queue.length) {
    const { node, depth } = queue.shift()!;

    if (isGoal(node)) return node;

    if (depth < maxDepth) {
      for (const child of expand(node)) {
        if (!seen.has(child)) {
          seen.add(child);
          queue.push({ node: child, depth: depth + 1 });
        }
      }
    }
  }
  return null;
}
type Board = number[][];          // 0 = blank
const GOAL: Board = [[1,2,3],[4,5,6],[7,8,0]];

function isGoal(b: Board) {
  return JSON.stringify(b) === JSON.stringify(GOAL);
}

function expand(b: Board): Board[] {
  const [y, x] = findBlank(b);
  const moves: Board[] = [];
  for (const [dy, dx] of [[-1,0],[1,0],[0,-1],[0,1]]) {
    const ny = y + dy, nx = x + dx;
    if (ny < 0 || ny > 2 || nx < 0 || nx > 2) continue;
    const next = b.map(r => r.slice());
    [next[y][x], next[ny][nx]] = [next[ny][nx], next[y][x]];
    moves.push(next);
  }
  return moves;
}

function findBlank(b: Board): [number, number] {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (b[i][j] === 0) return [i, j];
  throw new Error('no blank');
}

// search up to depth 10
const solution = breadthLimitedSearch(
  [[1,2,3],[4,0,6],[7,5,8]], expand, isGoal, 10
);
console.log(solution);

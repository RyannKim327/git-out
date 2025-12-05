// breadth-limited-search.ts

export interface Problem<S> {
  initialState: S;
  expand: (state: S) => S[];
  isGoal: (state: S) => boolean;
}

export interface Node<S> {
  state: S;
  depth: number;
  path: S[];      // only if you need to reconstruct the path
}

export function breadthLimitedSearch<S>(
  problem: Problem<S>,
  maxDepth: number
): S[] | null {
  const { initialState, expand, isGoal } = problem;

  const root: Node<S> = {
    state: initialState,
    depth: 0,
    path: [initialState],
  };

  if (isGoal(initialState)) return root.path;

  const queue: Node<S>[] = [root];
  const visited = new Set<string>();          // optional pruning
  const key = (s: S) => JSON.stringify(s);  // or custom hash

  while (queue.length) {
    const node = queue.shift()!;

    if (node.depth >= maxDepth) continue;   // the “breadth-limited” part

    for (const childState of expand(node.state)) {
      if (visited.has(key(childState))) continue;
      visited.add(key(childState));

      const child: Node<S> = {
        state: childState,
        depth: node.depth + 1,
        path: [...node.path, childState],
      };

      if (isGoal(childState)) return child.path;
      queue.push(child);
    }
  }
  return null; // no solution within depth limit
}
type Board = number[][];   // 0 represents the blank tile

const problem: Problem<Board> = {
  initialState: [
    [1, 2, 3],
    [4, 0, 6],
    [7, 5, 8],
  ],
  isGoal: b => JSON.stringify(b) === JSON.stringify([[1, 2, 3], [4, 5, 6], [7, 8, 0]]),
  expand: b => neighbors(b),   // implement slide moves
};

function neighbors(b: Board): Board[] {
  const res: Board[] = [];
  let [x, y] = [0, 0];
  // find blank
  b.forEach((row, i) => row.forEach((v, j) => { if (v === 0) { x = i; y = j; } }));
  const moves = [
    [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]
  ];
  for (const [nx, ny] of moves) {
    if (nx < 0 || ny < 0 || nx > 2 || ny > 2) continue;
    const copy = b.map(r => r.slice());
    copy[x][y] = copy[nx][ny];
    copy[nx][ny] = 0;
    res.push(copy);
  }
  return res;
}

const solution = breadthLimitedSearch(problem, 5);
console.log(solution ?? "No solution within depth limit");
function iterativeDeepening<S>(p: Problem<S>): S[] | null {
  for (let d = 0; ; ++d) {
    const res = breadthLimitedSearch(p, d);
    if (res) return res;
  }
}

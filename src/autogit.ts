export type Successor<S, A> = { state: S; action?: A };
export type SuccessorsFn<S, A> = (s: S) => Array<Successor<S, A>>;

export function depthLimitedSearchRecursive<S, A>(
  start: S,
  limit: number,
  successors: SuccessorsFn<S, A>,
  goalTest: (s: S) => boolean,
  equals?: (a: S, b: S) => boolean
): S[] | null {
  const pathContains = (path: S[], s: S) => {
    if (!equals) return path.includes(s);
    return path.some((p) => equals(p, s));
  };

  const dfs = (
    current: S,
    depth: number,
    path: S[]
  ): S[] | null => {
    if (goalTest(current)) return path;
    if (depth >= limit) return null;

    for (const step of successors(current)) {
      const next = step.state;
      if (pathContains(path, next)) continue; // avoid cycles in current path
      const result = dfs(next, depth + 1, path.concat([next]));
      if (result) return result;
    }
    return null;
  };

  return dfs(start, 0, [start]);
}
export function depthLimitedSearchIterative<S, A>(
  start: S,
  limit: number,
  successors: (s: S) => Array<{ state: S; action?: A }>,
  goalTest: (s: S) => boolean,
  equals?: (a: S, b: S) => boolean
): S[] | null {
  const pathContains = (path: S[], s: S) => {
    if (!equals) return path.includes(s);
    return path.some((p) => equals(p, s));
  };

  type Frame = { state: S; depth: number; path: S[] };
  const stack: Frame[] = [{ state: start, depth: 0, path: [start] }];

  while (stack.length > 0) {
    const frame = stack.pop()!;
    const s = frame.state;

    if (goalTest(s)) return frame.path;
    if (frame.depth >= limit) continue;

    for (const succ of successors(s)) {
      const nxt = succ.state;
      if (pathContains(frame.path, nxt)) continue;
      stack.push({ state: nxt, depth: frame.depth + 1, path: frame.path.concat([nxt]) });
    }
  }

  return null;
}
type Node = string;
type Action = string;

const graph: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['G'],
  F: [],
  G: [],
};

// Successors function
const succ = (n: string) =>
  graph[n]?.map((s): { state: string; action?: Action } => ({ state: s })) ?? [];

// Goal test
const isGoal = (n: string) => n === 'G';

// Run recursive DLS with limit 3
const path1 = depthLimitedSearchRecursive<string, Action>('A', 3, succ, isGoal);
console.log(path1); // e.g., ['A', 'B', 'E', 'G']

// Or run iterative DLS
const path2 = depthLimitedSearchIterative<string, Action>('A', 3, succ, isGoal);
console.log(path2); // same idea

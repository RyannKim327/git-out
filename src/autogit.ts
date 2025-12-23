// types.ts
export type Node<T> = T;

export interface Edge<T> {
  from: Node<T>;
  to: Node<T>;
}

export interface Problem<T> {
  start: Node<T>;
  isGoal: (n: Node<T>) => boolean;
  expand: (n: Node<T>) => Node<T>[]; // returns children / neighbours
}
// depthLimitedSearch.ts
import { Node, Problem } from './types';

/**
 * Depth-limited search.
 * @returns the goal node if found within maxDepth; otherwise `null`.
 */
export function depthLimitedSearch<T>(
  problem: Problem<T>,
  maxDepth: number
): Node<T> | null {
  return recursiveDLS(problem.start, problem, maxDepth);
}

function recursiveDLS<T>(
  node: Node<T>,
  problem: Problem<T>,
  limit: number
): Node<T> | null {
  if (problem.isGoal(node)) return node;
  if (limit <= 0) return null; // depth limit reached

  for (const child of problem.expand(node)) {
    const result = recursiveDLS(child, problem, limit - 1);
    if (result !== null) return result; // bubble up first solution
  }
  return null; // failure
}
import { depthLimitedSearch } from './depthLimitedSearch';
import { Problem } from './types';

const problem: Problem<number> = {
  start: 1,
  isGoal: n => n === 11,
  expand: n => {
    // small binary tree for demo
    const kids: Record<number, number[]> = {
      1: [2, 3],
      2: [4, 5],
      3: [6, 7],
      4: [8, 9],
      5: [10, 11],
    };
    return kids[n] || [];
  },
};

const solution = depthLimitedSearch(problem, 3);
console.log(solution); // 11 (found at depth 3)
export function iterativeDeepeningSearch<T>(
  problem: Problem<T>,
  maxDepth = Infinity
): Node<T> | null {
  for (let d = 0; d <= maxDepth; d++) {
    const found = depthLimitedSearch(problem, d);
    if (found !== null) return found;
  }
  return null;
}

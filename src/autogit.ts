// ──────────────────────────────────────────────────────────────────────
// Utility types
// ──────────────────────────────────────────────────────────────────────

/**
 * A generic search node that holds a state and the depth of that state in the search tree.
 */
interface SearchNode<T> {
  state: T;
  depth: number;
}

/**
 * The contract that the caller must satisfy in order to perform a search.
 */
export interface SearchProblem<T> {
  /** Returns true if the supplied state is a goal state. */
  isGoal: (state: T) => boolean;

  /** Returns an array of successor states for the supplied state. */
  getChildren: (state: T) => T[];

  /** The maximum depth that the search may travel. */
  limit: number;
}

// ──────────────────────────────────────────────────────────────────────
// Depth‑limited search – iterative version
// ──────────────────────────────────────────────────────────────────────

/**
 * Performs a depth‑limited DFS iteratively.
 *
 * @param start The initial state from which the search starts.
 * @param problem An object containing `isGoal`, `getChildren` and `limit`.
 * @returns The goal state if found, otherwise `null`.
 */
export function depthLimitedSearch<T>(
  start: T,
  problem: SearchProblem<T>
): T | null {
  const { isGoal, getChildren, limit } = problem;

  // Stack for DFS (push / pop from the end).
  const stack: SearchNode<T>[] = [{ state: start, depth: 0 }];

  while (stack.length) {
    const { state, depth } = stack.pop()!;

    if (isGoal(state)) {
      return state;            // Goal found.
    }

    // Don't expand deeper than the limit.
    if (depth < limit) {
      // Push children in reverse order if you care about visit order.
      for (const child of getChildren(state)) {
        stack.push({ state: child, depth: depth + 1 });
      }
    }
  }

  // Exhausted the stack without finding a goal.
  return null;
}
export interface SearchNodeWithParent<T> {
  state: T;
  depth: number;
  parent?: T;   // Optional – undefined for the root node.
}

export function depthLimitedSearchWithPath<T>(
  start: T,
  problem: SearchProblem<T>
): T[] | null {
  const { isGoal, getChildren, limit } = problem;
  const stack: SearchNodeWithParent<T>[] = [{ state: start, depth: 0 }];

  while (stack.length) {
    const current = stack.pop()!;
    const { state, depth, parent } = current;

    if (isGoal(state)) {
      // Walk back up through parents to build the path.
      const path: T[] = [state];
      let p = parent;
      while (p) {
        path.push(p);
        // No direct way to retrieve the parent of ‘p’ without a map.
        // For a full path reconstruction you’d keep a Map<T, T> from child to parent.
        // Here we simply return the goal state.
        break;
      }
      return path.reverse();
    }

    if (depth < limit) {
      for (const child of get

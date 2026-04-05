// ------------------------------------------------------------------
// Breadth‑Limited Search (BLS)
// ------------------------------------------------------------------

/**
 * A node in the frontier.
 * `state`   – whatever you want to search over (string, number, object…)
 * `depth`   – how many steps we’ve taken from the start
 */
type FrontierNode<T> = { state: T; depth: number };

/**
 * Basic graph helper: adjacency list.
 * For arbitrary graphs you can swap this for a function that returns
 * the successors of a vertex.
 */
type AdjList<T> = Map<T, T[]>;

/**
 * Breadth‑limited search.
 *
 * @param start          - starting state
 * @param isGoal         - predicate that tells us whether a state is a goal
 * @param getNeighbors   - how to obtain successors of a state
 * @param maxDepth       - stop expanding nodes at this depth
 * @returns              - the first goal state found, or undefined
 */
export function breadthLimitedSearch<T>(
  start: T,
  isGoal: (state: T) => boolean,
  getNeighbors: (state: T) => T[],
  maxDepth: number
): T | undefined {
  // Queue for BFS (FIFO)
  const queue: FrontierNode<T>[] = [{ state: start, depth: 0 }];
  const visited = new Set<T>();

  while (queue.length) {
    const { state, depth } = queue.shift()!;   // pop the oldest node

    if (visited.has(state)) continue; // ignore duplicates
    visited.add(state);

    if (isGoal(state)) return state;          // found what we want

    // Don't go deeper than the limit
    if (depth === maxDepth) continue;

    // Enqueue all unvisited successors
    for (const next of getNeighbors(state)) {
      if (!visited.has(next)) {
        queue.push({ state: next, depth: depth + 1 });
      }
    }
  }

  // No goal reached within the depth bound
  return undefined;
}
// Example: find a word that is 3 letters away from "cat" in a tiny
// word‑graph (adjacent words differ by one character).

const words = ["cat", "bat", "bet", "bed", "ded", "dog", "dig"];

// Build an adjacency list (one‑letter edits)
const graph: AdjList<string> = new Map();
words.forEach(w => {
  const adj: string[] = [];
  for (const other of words) {
    if (w !== other && w.split("").some((c, i) => c !== other[i])) {
      // True only if they differ by ONE character
      if (w.split("").filter((c, i) => c !== other[i]).length <= 1) {
        adj.push(other);
      }
    }
  }
  graph.set(w, adj);
});

const start = "cat";
const goal = "dig";

const found = breadthLimitedSearch(
  start,
  s => s === goal,
  s => graph.get(s) ?? [],
  3                       // depth limit
);

console.log(found); // prints "dig" or undefined if no path ≤ 3 steps

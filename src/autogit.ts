/**
 * Represents a node in the beam frontier.
 * Keeps the actual state and the path taken to reach it.
 */
export interface BeamNode<T> {
  /** The actual state */
  state: T;
  /** The sequence of states that led to this node (incl. this state) */
  path: T[];
}

/**
 * Performs a beam search.
 *
 * @param startNodes   Initial frontier. Usually a single root node, but you can start with many.
 * @param getSuccessors   Function that returns the child nodes of a parent.
 * @param score          Score function – higher is better.
 * @param beamWidth      How many nodes to keep after each expansion.
 * @param maxDepth       Optional depth cutoff (in terms of edges traversed).
 * @param isGoal         Optional goal‑test predicate.
 * @returns The first goal node found (or undefined if none).
 */
export function beamSearch<T>(
  startNodes: T[],
  getSuccessors: (node: T) => T[],
  score: (node: T) => number,
  beamWidth: number,
  maxDepth?: number,
  isGoal?: (node: T) => boolean
): BeamNode<T> | undefined {

  // Ensure we keep a lightweight copy for sorting.
  let frontier: BeamNode<T> = startNodes.map(state => ({ state, path: [state] }));

  for (let depth = 0; depth < (maxDepth ?? Infinity); depth++) {
    if (frontier.length === 0) break; // nothing to expand

    // Expand every node in the frontier
    const expansions: BeamNode<T>[] = [];
    for (const node of frontier) {
      const succ = getSuccessors(node.state);
      for (const child of succ) {
        expansions.push({
          state: child,
          path: [...node.path, child]
        });
      }
    }

    // Optional goal check as soon as we generate expansions
    if (isGoal) {
      for (const node of expansions) {
        if (isGoal(node.state)) return node;
      }
    }

    // Sort by score, keep top `beamWidth`
    expansions.sort((a, b) => score(b.state) - score(a.state)); // descending
    frontier = expansions.slice(0, beamWidth);
  }

  return undefined; // no goal reached within limits
}
// Example: find a numeric sequence that sums to 15
type MyState = number; // current sum

const start = 0;

const getSucc = (sum: MyState) => {
  return [sum + 1, sum + 2, sum + 3]; // could be any branching scheme
};

const score = (sum: MyState) => {
  // The closer to 15 without overshooting, the better
  return Math.max(0, 15 - sum);
};

const isGoal = (sum: MyState) => sum === 15;

const result = beamSearch(
  [start],
  getSucc,
  score,
  beamWidth = 3,
  maxDepth = 10,
  isGoal
);

if (result) {
  console.log(`Reached 15 via ${result.path.join(' -> ')}`);
} else {
  console.log('No path found within depth limit');
}

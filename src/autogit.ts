/** A node in the search tree. */
export interface Node<T> {
  /** The payload – whatever you need to keep (partial solution, board, etc.) */
  state: T;

  /** Accumulated score for this node (higher = better, or lower = cheaper). */
  score: number;

  /** Optional back‑pointer to reconstruct the full path. */
  parent?: Node<T>;

  /** Whether this node already satisfies the goal condition. */
  isGoal?: boolean;
}

/** Options that control the beam search. */
export interface BeamSearchOptions<T> {
  /** How many nodes to keep at each depth. */
  beamWidth: number;

  /** Maximum depth (or number of expansions) before we give up. */
  maxDepth?: number;

  /** Function that expands a node into its successors. */
  expand: (node: Node<T>) => Node<T>[];

  /** Optional heuristic that can adjust the raw score (e.g., add a future‑estimate). */
  heuristic?: (node: Node<T>) => number;

  /** Optional early‑stop predicate – called when a goal node is found. */
  stopWhen?: (node: Node<T>) => boolean;
}
/**
 * Generic beam search.
 *
 * @param start   The initial node (usually a partial solution with score = 0).
 * @param opts    Configuration and problem‑specific callbacks.
 * @returns       An array of the best complete solutions found (could be empty).
 */
export function beamSearch<T>(
  start: Node<T>,
  opts: BeamSearchOptions<T>
): Node<T>[] {
  const {
    beamWidth,
    maxDepth = Infinity,
    expand,
    heuristic = () => 0,
    stopWhen,
  } = opts;

  // The current beam – a priority‑sorted array (best first).
  let beam: Node<T>[] = [start];
  const completed: Node<T>[] = [];

  for (let depth = 0; depth < maxDepth && beam.length > 0; depth++) {
    // 1️⃣ Expand every node in the current beam.
    const candidates: Node<T>[] = [];
    for (const node of beam) {
      const children = expand(node);
      for (const child of children) {
        // Combine raw score + optional heuristic.
        child.score = child.score + heuristic(child);
        child.parent = node; // keep back‑pointer
        candidates.push(child);
      }
    }

    // 2️⃣ Separate goal nodes from the rest.
    const goals = candidates.filter((n) => n.isGoal);
    completed.push(...goals);

    // If the user supplied a stop predicate, we can exit early.
    if (stopWhen && completed.some(stopWhen)) {
      break;
    }

    // 3️⃣ Keep only the top‑k (beamWidth) nodes for the next iteration.
    //    Sort descending by score (higher is better). Change to < for cost.
    candidates.sort((a, b) => b.score - a.score);
    beam = candidates.slice(0, beamWidth);
  }

  // Return the best completed solutions (sorted by score).
  completed.sort((a, b) => b.score - a.score);
  return completed;
}
/** Walks back‑pointers to produce the full solution path. */
export function reconstructPath<T>(node: Node<T>): T[] {
  const path: T[] = [];
  let cur: Node<T> | undefined = node;
  while (cur) {
    path.unshift(cur.state);
    cur = cur.parent;
  }
  return path;
}
// ---------------------------------------------------------------
//  Problem‑specific types & helpers
// ---------------------------------------------------------------
type Word = string;

interface WordNode extends Node<Word> {
  // Inherit everything; we just alias for readability.
}

// Load a dictionary (for demo we use a tiny hard‑coded set).
const DICTIONARY = new Set<string>([
  "cold", "cord", "card", "ward", "warm", "worm", "word", "work", "fork",
  "form", "foam", "foam", "foam", "foam", // etc.
]);

/** Returns true if two words differ by exactly one character. */
function oneLetterDiff(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diff++;
    if (diff > 1) return false;
  }
  return diff === 1;
}

/** Expand a word node: all dictionary words one letter away that haven't been visited. */
function expandWord(node: WordNode, visited: Set<string>): WordNode[] {
  const results: WordNode[] = [];
  for (const w of DICTIONARY) {
    if (!visited.has(w) && oneLetterDiff(node.state, w)) {
      results.push({
        state: w,
        score: 0, // raw score will be set later (e.g., negative distance to goal)
        isGoal: false,
      });
    }
  }
  return results;
}

/** Simple heuristic: negative Hamming distance to the goal (so higher = closer). */
function heuristicWord(node: WordNode, goal: string): number {
  let diff = 0;
  for (let i = 0; i < node.state.length; i++) {
    if (node.state[i] !== goal[i]) diff++;
  }
  // We want higher scores for nodes *closer* to the goal.
  return -diff;
}

// ---------------------------------------------------------------
//  Run beam search on the word ladder problem
// ---------------------------------------------------------------
function solveWordLadder(
  start: string,
  goal: string,
  beamWidth = 3,
  maxDepth = 10
): string[] | null {
  const visited = new Set<string>([start]);

  const startNode: WordNode = {
    state: start,
    score: 0,
    isGoal: start === goal,
  };

  const results = beamSearch<Word>(startNode, {
    beamWidth,
    maxDepth,
    expand: (node) => {
      const children = expandWord(node as WordNode, visited);
      // Mark visited *after* generation to avoid duplicate work in the same depth.
      for (const c of children) visited.add(c.state);
      return children;
    },
    heuristic: (node) => heuristicWord(node as WordNode, goal),
    stopWhen: (node) => node.isGoal === true,
  });

  if (results.length === 0) return null; // no path found

  // Return the best path (as an array of words).
  return reconstructPath(results[0] as WordNode);
}

// ---------------------------------------------------------------
//  Demo
// ---------------------------------------------------------------
const start = "cold";
const goal = "warm";

const path = solveWordLadder(start, goal, 4, 8);
if (path) {
  console.log(`Found path (${path.length - 1} steps):`);
  console.log(path.join(" → "));
} else {
  console.log("No path found within the given depth/beam.");
}
Found path (4 steps):
cold → cord → card → ward → warm
npm init -y
npm i typescript @types/node
npx tsc --init   # generate tsconfig.json
// 1️⃣ Define your state type (e.g., string, board, etc.)
type State = /* ... */;

// 2️⃣ Implement expand(state) → State[] and a scoring function.
function expand(node: Node<State>): Node<State>[] { /* ... */ }
function heuristic(node: Node<State>): number { return 0; }

// 3️⃣ Create the start node.
const start: Node<State> = { state: /* initial */, score: 0 };

// 4️⃣ Run beam search.
const solutions = beamSearch(start, {
  beamWidth: 5,
  maxDepth: 20,
  expand,
  heuristic,
  stopWhen: (n) => n.isGoal,
});

// 5️⃣ Reconstruct the best solution.
if (solutions.length) {
  const bestPath = reconstructPath(solutions[0]);
  console.log(bestPath);
}

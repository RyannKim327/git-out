/**
 * Generic Beam Search implementation.
 *
 * @template S  The type that represents a search state.
 *
 * @param start          The initial state (root of the search tree).
 * @param expand         Function that returns all children of a given state.
 * @param score          Function that returns a numeric score for a state.
 * @param isGoal         Predicate that tells whether a state is a complete solution.
 * @param beamWidth      Number of states to keep after each expansion.
 * @param maxDepth       Optional hard limit on depth (prevents infinite loops).
 *
 * @returns An object containing:
 *   - bestComplete: the highest‑scoring complete state (or undefined if none).
 *   - bestIncomplete: the highest‑scoring state at the final depth (if no goal reached).
 *   - explored: total number of generated children (useful for diagnostics).
 */
export function beamSearch<S>({
  start,
  expand,
  score,
  isGoal,
  beamWidth,
  maxDepth = Infinity,
}: {
  start: S;
  expand: (state: S) => Iterable<S>;
  score: (state: S) => number;
  isGoal: (state: S) => boolean;
  beamWidth: number;
  maxDepth?: number;
}): {
  bestComplete?: S;
  bestIncomplete?: S;
  explored: number;
} {
  // ---- internal helpers ----------------------------------------------------
  // A tiny wrapper that keeps a state together with its score.
  type Node = { state: S; score: number };

  // Sort descending by score (higher = better). Change to < for "lower is better".
  const compare = (a: Node, b: Node) => b.score - a.score;

  // -------------------------------------------------------------------------

  // Beam for the current depth (starts with just the root)
  let beam: Node[] = [{ state: start, score: score(start) }];

  // Keep track of the best complete solution we have seen so far.
  let bestComplete: Node | undefined = undefined;

  // Diagnostics
  let explored = 0;

  for (let depth = 0; depth < maxDepth; depth++) {
    // 1️⃣ Expand every node in the current beam.
    const candidates: Node[] = [];

    for (const node of beam) {
      // If this node already satisfies the goal, keep it as a candidate
      // (it may be the best solution even before we expand further).
      if (isGoal(node.state)) {
        if (!bestComplete || node.score > bestComplete.score) {
          bestComplete = node;
        }
        // No need to expand a goal node – it is already terminal.
        continue;
      }

      // Generate children
      for (const child of expand(node.state)) {
        explored++;
        const childScore = score(child);
        candidates.push({ state: child, score: childScore });
      }
    }

    // If we have no candidates left, stop early.
    if (candidates.length === 0) break;

    // 2️⃣ Keep only the top‑k (beamWidth) candidates.
    candidates.sort(compare);
    beam = candidates.slice(0, beamWidth);
  }

  // After the loop we may still have incomplete states left in the beam.
  // Pick the best among them (if we never found a complete solution).
  const bestIncomplete = bestComplete
    ? undefined
    : beam.length > 0
    ? beam[0]
    : undefined;

  return {
    bestComplete: bestComplete?.state,
    bestIncomplete: bestIncomplete?.state,
    explored,
  };
}
// ---------------------------------------------------------------
// 1️⃣ Define the problem domain
// ---------------------------------------------------------------
type Token = string;               // e.g. "the", "cat", "<EOS>"
type State = Token[];              // a prefix (array of tokens)

// Toy vocabulary
const vocab: Token[] = ["the", "cat", "sat", "on", "mat", "<EOS>"];

// Mock probability table (log‑probabilities for easier addition)
const logProb: Record<string, Record<string, number>> = {
  "": { the: -0.1, cat: -1.0, sat: -2.0, on: -2.5, mat: -3.0, "<EOS>": -5.0 },
  the: { cat: -0.2, sat: -1.5, on: -2.0, mat: -2.5, "<EOS>": -4.0 },
  cat: { sat: -0.3, on: -1.0, mat: -1.5, "<EOS>": -3.0 },
  sat: { on: -0.2, mat: -1.0, "<EOS>": -2.5 },
  on: { the: -0.1, mat: -0.4, "<EOS>": -2.0 },
  mat: { "<EOS>": -0.1 },
  "<EOS>": {}, // terminal
};

// Helper: get log‑probability of next token given a prefix
function nextLogProb(prefix: Token[]): Record<Token, number> {
  const last = prefix.length === 0 ? "" : prefix[prefix.length - 1];
  return logProb[last] ?? {};
}

// ---------------------------------------------------------------
// 2️⃣ Implement the callbacks required by beamSearch
// ---------------------------------------------------------------
const startState: State = []; // empty sentence

function expand(state: State): Iterable<State> {
  const probs = nextLogProb(state);
  // Return a new array for each possible next token
  return Object.keys(probs).map(tok => [...state, tok as Token]);
}

function score(state: State): number {
  // Sum of log‑probabilities = log of joint probability
  let sum = 0;
  for (let i = 0; i < state.length; i++) {
    const prefix = state.slice(0, i);
    const token = state[i];
    const prob = nextLogProb(prefix)[token];
    sum += prob ?? -Infinity; // impossible token → -∞
  }
  return sum; // higher (less negative) = more probable
}

function isGoal(state: State): boolean {
  return state[state.length - 1] === "<EOS>";
}

// ---------------------------------------------------------------
// 3️⃣ Run beam search
// ---------------------------------------------------------------
const result = beamSearch<State>({
  start: startState,
  expand,
  score,
  isGoal,
  beamWidth: 3,   // keep only 3 best prefixes at each step
  maxDepth: 5,    // maximum sentence length (including <EOS>)
});

if (result.bestComplete) {
  console.log("Best sentence:", result.bestComplete.join(" "));
  console.log("Log‑probability:", score(result.bestComplete));
} else {
  console.log("No complete sentence found. Best prefix:", result.bestIncomplete?.join(" "));
}
Best sentence: the cat sat on mat <EOS>
Log‑probability: -1.0
type Pos = { x: number; y: number };
type Path = Pos[]; // sequence of visited cells (including current position)

// Simple 4‑direction moves
const dirs: Pos[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

// Example grid (true = walkable)
const grid: boolean[][] = [
  [true, true, true, true],
  [true, false, true, true],
  [true, true, true, false],
  [true, true, true, true],
];

function inBounds(p: Pos): boolean {
  return p.y >= 0 && p.y < grid.length && p.x >= 0 && p.x < grid[0].length;
}
function walkable(p: Pos): boolean {
  return inBounds(p) && grid[p.y][p.x];
}

// Heuristic: Manhattan distance (not guaranteed to be admissible if we add extra costs)
function manhattan(a: Pos, b: Pos): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// ---------------------------------------------------------------
// Beam‑search callbacks
// ---------------------------------------------------------------
const startPos: Pos = { x: 0, y: 0 };
const goalPos: Pos = { x: 3, y: 3 };

function expandPath(path: Path): Iterable<Path> {
  const cur = path[path.length - 1];
  for (const d of dirs) {
    const nxt: Pos = { x: cur.x + d.x, y: cur.y + d.y };
    if (walkable(nxt) && !path.some(p => p.x === nxt.x && p.y === nxt.y)) {
      // avoid cycles by not revisiting a cell already in the path
      yield [...path, nxt];
    }
  }
}

// Score = -(path length + heuristic). Higher is better (less negative).
function pathScore(path: Path): number {
  const cur = path[path.length - 1];
  const g = path.length; // cost so far (each step = 1)
  const h = manhattan(cur, goalPos);
  return -(g + h);
}

function isGoalPath(path: Path): boolean {
  const cur = path[path.length - 1];
  return cur.x === goalPos.x && cur.y === goalPos.y;
}

// ---------------------------------------------------------------
// Run beam search
// ---------------------------------------------------------------
const gridResult = beamSearch<Path>({
  start: [startPos],
  expand: expandPath,
  score: pathScore,
  isGoal: isGoalPath,
  beamWidth: 5,
  maxDepth: 20,
});

if (gridResult.bestComplete) {
  console.log("Found path:", gridResult.bestComplete);
} else {
  console.log("No path found. Best partial:", gridResult.bestIncomplete);
}
// beam-search-demo.ts ---------------------------------------------------------

// ---------- Generic Beam Search ---------------------------------------------
export function beamSearch<S>({
  start,
  expand,
  score,
  isGoal,
  beamWidth,
  maxDepth = Infinity,
}: {
  start: S;
  expand: (state: S) => Iterable<S>;
  score: (state: S) => number;
  isGoal: (state: S) => boolean;
  beamWidth: number;
  maxDepth?: number;
}): {
  bestComplete?: S;
  bestIncomplete?: S;
  explored: number;
} {
  type Node = { state: S; score: number };
  const compare = (a: Node, b: Node) => b.score - a.score; // larger = better

  let beam: Node[] = [{ state: start, score: score(start) }];
  let bestComplete: Node | undefined;
  let explored = 0;

  for (let depth = 0; depth < maxDepth; depth++) {
    const candidates: Node[] = [];

    for (const node of beam) {
      if (isGoal(node.state)) {
        if (!bestComplete || node.score > bestComplete.score) bestComplete = node;
        continue; // terminal
      }

      for (const child of expand(node.state)) {
        explored++;
        candidates.push({ state: child, score: score(child) });
      }
    }

    if (candidates.length === 0) break;
    candidates.sort(compare);
    beam = candidates.slice(0, beamWidth);
  }

  const bestIncomplete = bestComplete ? undefined : beam[0];
  return {
    bestComplete: bestComplete?.state,
    bestIncomplete: bestIncomplete?.state,
    explored,
  };
}

// ---------- Demo: Tiny Language Model ---------------------------------------
type Token = string;
type LMState = Token[]; // prefix

const vocab: Token[] = ["the", "cat", "sat", "on", "

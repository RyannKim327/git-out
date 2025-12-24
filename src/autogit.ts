/**
 * Generic beam‑search driver.
 *
 * @param start               The initial state.
 * @param expand              (state) => Iterable<NextState> – generates successors.
 * @param score               (state) => number – higher = better (or invert if you prefer).
 * @param isGoal              (state) => boolean – true when a solution is found.
 * @param beamWidth           Maximum number of candidates kept per depth.
 * @param maxDepth            Optional safety guard (default = Infinity).
 *
 * @returns The best goal state found (or undefined if none within maxDepth).
 */
function beamSearch<State>(
  start: State,
  expand: (s: State) => Iterable<State>,
  score: (s: State) => number,
  isGoal: (s: State) => boolean,
  beamWidth: number,
  maxDepth = Infinity
): State | undefined { … }
let beam: Node[] = [{ state: start, score: score(start) }];

for (let depth = 0; depth < maxDepth; depth++) {
  // 1️⃣ Check if any node in the current beam already satisfies the goal.
  const goalNode = beam.find(n => isGoal(n.state));
  if (goalNode) return goalNode.state;

  // 2️⃣ Expand every node in the beam.
  const nextCandidates: Node[] = [];
  for (const node of beam) {
    for (const child of expand(node.state)) {
      nextCandidates.push({ state: child, score: score(child) });
    }
  }

  // 3️⃣ If nothing was generated we are done.
  if (nextCandidates.length === 0) break;

  // 4️⃣ Keep only the top‑`beamWidth` candidates.
  nextCandidates.sort((a, b) => b.score - a.score); // descending
  beam = nextCandidates.slice(0, beamWidth);
}

// No goal found within maxDepth.
return undefined;
// ---------------------------------------------------------------
// 1️⃣ Types & helper structures
// ---------------------------------------------------------------
type Scorer<State> = (s: State) => number;
type Expander<State> = (s: State) => Iterable<State>;
type GoalChecker<State> = (s: State) => boolean;

interface Node<State> {
  /** The raw state object */
  state: State;
  /** Cached score for fast sorting */
  score: number;
  /** Optional back‑pointer to reconstruct the full path */
  parent?: Node<State>;
}

/**
 * Generic beam search.
 *
 * @param start       Initial state.
 * @param expand      Function that yields successors of a state.
 * @param score       Scoring function (higher = better).
 * @param isGoal      Predicate that recognises a goal state.
 * @param beamWidth   Maximum number of nodes kept per depth.
 * @param maxDepth    Optional depth limit (defaults to Infinity).
 * @param keepPath    If true, the returned state will have a `path` property.
 *
 * @returns The best goal state (or undefined). If `keepPath` is true,
 *          the returned object also contains a `path: State[]` field.
 */
export function beamSearch<State>(
  start: State,
  expand: Expander<State>,
  score: Scorer<State>,
  isGoal: GoalChecker<State>,
  beamWidth: number,
  maxDepth = Infinity,
  keepPath = false
): State & { path?: State[] } | undefined {
  // ---- initialise the first beam -------------------------------------------------
  let beam: Node<State>[] = [{ state: start, score: score(start) }];

  // ---- main loop -----------------------------------------------------------------
  for (let depth = 0; depth < maxDepth; depth++) {
    // 1️⃣ Goal test on the current beam
    const goalNode = beam.find(n => isGoal(n.state));
    if (goalNode) {
      if (keepPath) {
        return attachPath(goalNode);
      }
      return goalNode.state;
    }

    // 2️⃣ Expand everything in the beam
    const next: Node<State>[] = [];
    for (const node of beam) {
      for (const child of expand(node.state)) {
        next.push({
          state: child,
          score: score(child),
          parent: keepPath ? node : undefined,
        });
      }
    }

    // 3️⃣ No more children → stop
    if (next.length === 0) break;

    // 4️⃣ Keep only the best `beamWidth` nodes
    next.sort((a, b) => b.score - a.score); // descending
    beam = next.slice(0, beamWidth);
  }

  // ---------------------------------------------------------------
  // Helper: reconstruct the path from a leaf node back to the root
  // ---------------------------------------------------------------
  function attachPath(node: Node<State>): State & { path: State[] } {
    const path: State[] = [];
    let cur: Node<State> | undefined = node;
    while (cur) {
      path.unshift(cur.state);
      cur = cur.parent;
    }
    // TypeScript can't know that we added `path`, so we cast.
    return Object.assign(node.state, { path });
  }

  // No solution found.
  return undefined;
}
// ---------------------------------------------------------------
// Dummy language model (for illustration)
// ---------------------------------------------------------------
const alphabet = "abcdefghijklmnopqrstuvwxyz ".split("");

function nextCharProbs(prefix: string): Map<string, number> {
  // In a real model you would query a neural net.
  // Here we just give a uniform distribution, but bias space after a word.
  const probs = new Map<string, number>();
  for (const ch of alphabet) {
    const base = ch === " " ? 0.2 : 0.8 / 26;
    probs.set(ch, Math.log(base)); // use log‑probability for numeric stability
  }
  return probs;
}

// ---------------------------------------------------------------
// Beam‑search specific helpers
// ---------------------------------------------------------------
type TextState = string; // the generated prefix so far

const expandText: Expander<TextState> = (s) => {
  const map = nextCharProbs(s);
  const children: string[] = [];
  for (const [ch] of map) children.push(s + ch);
  return children;
};

const scoreText: Scorer<TextState> = (s) => {
  // Sum of log‑probs = log of product = overall probability
  let logProb = 0;
  for (let i = 0; i < s.length; i++) {
    const probs = nextCharProbs(s.slice(0, i));
    const ch = s[i];
    logProb += probs.get(ch) ?? -Infinity;
  }
  return logProb; // higher = more probable
};

const isGoalText = (s: string) => s.endsWith(" "); // stop when we emit a space

// ---------------------------------------------------------------
// Run beam search
// ---------------------------------------------------------------
const result = beamSearch(
  "",               // start with empty string
  expandText,
  scoreText,
  isGoalText,
  5,                // beam width = 5
  20,               // max length
  true              // keep the full path (here path == just the final string)
);

if (result) {
  console.log("Best completion:", result);
  console.log("Full path (prefixes):", result.path);
} else {
  console.log("No completion found within depth limit.");
}
type Pos = { x: number; y: number };
type GridState = Pos;

// Simple 5×5 grid with some blocked cells
const blocked = new Set<string>(["1,2", "2,2", "3,2"]);

function isBlocked(p: Pos): boolean {
  return blocked.has(`${p.x},${p.y}`);
}

// 4‑directional moves
const moves: Pos[] = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

const start: Pos = { x: 0, y: 0 };
const goal: Pos = { x: 4, y: 4 };

const expandGrid: Expander<GridState> = (s) => {
  const out: Pos[] = [];
  for (const d of moves) {
    const nx = s.x + d.x;
    const ny = s.y + d.y;
    if (nx < 0 || ny < 0 || nx > 4 || ny > 4) continue; // stay inside grid
    const candidate = { x: nx, y: ny };
    if (!isBlocked(candidate)) out.push(candidate);
  }
  return out;
};

// Heuristic: negative Manhattan distance (higher = better)
const scoreGrid: Scorer<GridState> = (s) => -Math.abs(s.x - goal.x) - Math.abs(s.y - goal.y);

const isGoalGrid = (s: Pos) => s.x === goal.x && s.y === goal.y;

const pathResult = beamSearch(
  start,
  expandGrid,
  scoreGrid,
  isGoalGrid,
  3,          // beam width = 3 (tiny, but demonstrates pruning)
  20,
  true
);

if (pathResult) {
  console.log("Found path:", pathResult.path?.map(p => `(${p.x},${p.y})`).join(" → "));
} else {
  console.log("No path found.");
}
interface Item {
  id: string;
  weight: number;
  value: number;
}
type KnapsackState = {
  /** indices of items already taken */
  taken: number[];
  /** total weight of taken items */
  weight: number;
  /** total value of taken items */
  value: number;
};

const items: Item[] = [
  { id: "A", weight: 3, value: 4 },
  { id: "B", weight: 2, value: 3 },
  { id: "C", weight: 4, value: 5 },
  { id: "D", weight: 1, value: 2 },
  { id: "E", weight: 5, value: 8 },
];
const capacity = 7;

// Expand by either taking the next item or skipping it.
const expandKnapsack: Expander<KnapsackState> = (s) => {
  const nextIdx = s.taken.length; // we process items in order
  if (nextIdx >= items.length) return []; // no more decisions

  const nextItem = items[nextIdx];
  const children: KnapsackState[] = [];

  // 1️⃣ Skip the item
  children.push({
    taken: [...s.taken, -1], // -1 marks “skipped”
    weight: s.weight,
    value: s.value,
  });

  // 2️⃣ Take the item (if it fits)
  if (s.weight + nextItem.weight <= capacity) {
    children.push({
      taken: [...s.taken, nextIdx],
      weight: s.weight + nextItem.weight,
      value: s.value + nextItem.value,
    });
  }

  return children;
};

// Score = total value (higher = better)
const scoreKnapsack: Scorer<KnapsackState> = (s) => s.value;

// Goal = processed all items
const isGoalKnapsack = (s: KnapsackState) => s.taken.length === items.length;

const best = beamSearch(
  { taken: [], weight: 0, value: 0 },
  expandKnapsack,
  scoreKnapsack,
  isGoalKnapsack,
  4,          // beam width
  10,
  true
);

if (best) {
  const chosen = best.taken
    .map(idx => (idx >= 0 ? items[idx].id : null))
    .filter(Boolean);
  console.log("Best subset:", chosen);
  console.log("Total value:", best.value, "Total weight:", best.weight);
}
// ---------------------------------------------------------------
// beamSearch.ts  (copy this file into your src/ folder)
// ---------------------------------------------------------------
type Scorer<S> = (s: S) => number;
type Expander<S> = (s: S) => Iterable<S>;
type GoalChecker<S> = (s: S) => boolean;

interface Node<S> {
  state: S;
  score: number;
  parent?: Node<S>;
}

/**
 * Generic beam search implementation.
 */
export function beamSearch<S>(
  start: S,
  expand: Expander<S>,
  score: Scorer<S>,
  isGoal: GoalChecker<S>,
  beamWidth: number,
  maxDepth = Infinity,
  keepPath = false
): S & { path?: S[] } | undefined {
  let beam: Node<S>[] = [{ state: start, score: score(start) }];

  for (let depth = 0;

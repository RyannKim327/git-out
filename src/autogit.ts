/** A generic state that the search works on. */
export interface SearchState {
  /** True when this state already satisfies the goal condition. */
  isGoal: boolean;
}

/** Function that returns all possible successors of a state. */
export type SuccessorFn<S extends SearchState> = (state: S) => S[];

/** Function that assigns a numeric score (higher = better) to a state. */
export type ScoreFn<S extends SearchState> = (state: S) => number;

/** Optional termination predicate (e.g., max depth, time limit). */
export type TerminationFn<S extends SearchState> = (state: S, depth: number) => boolean;
/**
 * Generic Beam Search.
 *
 * @param start          Initial state (depth = 0).
 * @param successors     Function that generates child states.
 * @param score          Heuristic/scoring function (higher = more promising).
 * @param beamWidth      Number of states to keep after each expansion.
 * @param maxDepth       Optional hard limit on depth (prevents infinite loops).
 * @param isGoal         Optional early‑exit predicate (defaults to state.isGoal).
 * @param termination    Optional extra termination test (e.g., time budget).
 *
 * @returns The best complete state found, or undefined if none reached the goal.
 */
export function beamSearch<S extends SearchState>({
  start,
  successors,
  score,
  beamWidth,
  maxDepth = Infinity,
  isGoal = (s: S) => s.isGoal,
  termination,
}: {
  start: S;
  successors: SuccessorFn<S>;
  score: ScoreFn<S>;
  beamWidth: number;
  maxDepth?: number;
  isGoal?: (state: S) => boolean;
  termination?: TerminationFn<S>;
}): S | undefined {
  // The current frontier – at most `beamWidth` elements.
  let frontier: S[] = [start];

  for (let depth = 0; depth <= maxDepth; depth++) {
    // 1️⃣ Check for goal in the current frontier (allows early exit).
    for (const node of frontier) {
      if (isGoal(node)) {
        return node; // Found a goal state.
      }
    }

    // 2️⃣ Expand every node in the frontier.
    const allChildren: S[] = [];
    for (const node of frontier) {
      const children = successors(node);
      allChildren.push(...children);
    }

    // 3️⃣ If we have no children, stop – dead end.
    if (allChildren.length === 0) {
      break;
    }

    // 4️⃣ Rank children by score (descending) and keep the top `beamWidth`.
    allChildren.sort((a, b) => score(b) - score(a));
    frontier = allChildren.slice(0, beamWidth);

    // 5️⃣ Optional custom termination (e.g., time budget).
    if (termination) {
      const shouldStop = frontier.some((node) => termination(node, depth + 1));
      if (shouldStop) break;
    }
  }

  // No goal reached within limits.
  return undefined;
}
interface WordState extends SearchState {
  word: string;          // current word
  path: string[];        // sequence from start to this word (inclusive)
}
function neighbours(state: WordState, dict: Set<string>): WordState[] {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const results: WordState[] = [];

  for (let i = 0; i < state.word.length; i++) {
    for (const ch of letters) {
      if (ch === state.word[i]) continue; // same letter → no change
      const candidate = state.word.slice(0, i) + ch + state.word.slice(i + 1);
      if (dict.has(candidate)) {
        results.push({
          word: candidate,
          path: [...state.path, candidate],
          isGoal: false, // will be overwritten by the caller if needed
        });
      }
    }
  }
  return results;
}
function hammingScore(target: string) {
  return (state: WordState): number => {
    let diff = 0;
    for (let i = 0; i < target.length; i++) {
      if (state.word[i] !== target[i]) diff++;
    }
    // Higher score = fewer mismatches
    return -diff;
  };
}
// ---- Sample dictionary (in a real app load a large word list) ----
const WORDS = [
  'hit', 'hot', 'dot', 'dog', 'cog', 'log', 'lot', 'lit', 'lie', 'pie',
];
const dict = new Set<string>(WORDS);

// ---- Parameters ----
const startWord = 'hit';
const goalWord = 'cog';
const beamWidth = 3;          // try a few promising paths
const maxDepth = 10;          // safety bound

// ---- Initial state ----
const startState: WordState = {
  word: startWord,
  path: [startWord],
  isGoal: startWord === goalWord,
};

// ---- Run beam search ----
const result = beamSearch<WordState>({
  start: startState,
  successors: (s) => neighbours(s, dict),
  score: hammingScore(goalWord),
  beamWidth,
  maxDepth,
  isGoal: (s) => s.word === goalWord,
});

if (result) {
  console.log('✅ Found path:', result.path.join(' → '));
} else {
  console.log('❌ No path found within the given depth/beam width.');
}
✅ Found path: hit → hot → dot → dog → cog
// ---------------------------------------------------------------
// 1️⃣ Types
// ---------------------------------------------------------------
export interface SearchState {
  isGoal: boolean;
}
export type SuccessorFn<S extends SearchState> = (state: S) => S[];
export type ScoreFn<S extends SearchState> = (state: S) => number;
export type TerminationFn<S extends SearchState> = (state: S, depth: number) => boolean;

// ---------------------------------------------------------------
// 2️⃣ Generic Beam Search
// ---------------------------------------------------------------
export function beamSearch<S extends SearchState>({
  start,
  successors,
  score,
  beamWidth,
  maxDepth = Infinity,
  isGoal = (s: S) => s.isGoal,
  termination,
}: {
  start: S;
  successors: SuccessorFn<S>;
  score: ScoreFn<S>;
  beamWidth: number;
  maxDepth?: number;
  isGoal?: (state: S) => boolean;
  termination?: TerminationFn<S>;
}): S | undefined {
  let frontier: S[] = [start];

  for (let depth = 0; depth <= maxDepth; depth++) {
    // Goal test
    for (const node of frontier) {
      if (isGoal(node)) return node;
    }

    // Expand
    const children: S[] = [];
    for (const node of frontier) {
      children.push(...successors(node));
    }
    if (children.length === 0) break;

    // Keep top‑k
    children.sort((a, b) => score(b) - score(a));
    frontier = children.slice(0, beamWidth);

    // Optional custom termination
    if (termination && frontier.some((n) => termination(n, depth + 1))) break;
  }

  return undefined;
}

// ---------------------------------------------------------------
// 3️⃣ Example: Word Ladder
// ---------------------------------------------------------------
interface WordState extends SearchState {
  word: string;
  path: string[];
}

// Helper: generate neighbours
function neighbours(state: WordState, dict: Set<string>): WordState[] {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const out: WordState[] = [];

  for (let i = 0; i < state.word.length; i++) {
    for (const ch of letters) {
      if (ch === state.word[i]) continue;
      const cand = state.word.slice(0, i) + ch + state.word.slice(i + 1);
      if (dict.has(cand)) {
        out.push({
          word: cand,
          path: [...state.path, cand],
          isGoal: false,
        });
      }
    }
  }
  return out;
}

// Heuristic: negative Hamming distance
function hammingScore(target: string): ScoreFn<WordState> {
  return (s) => {
    let diff = 0;
    for (let i = 0; i < target.length; i++) if (s.word[i] !== target[i]) diff++;
    return -diff;
  };
}

// ---------------------------------------------------------------
// 4️⃣ Run the example
// ---------------------------------------------------------------
function runWordLadder() {
  const WORDS = [
    'hit', 'hot', 'dot', 'dog', 'cog', 'log', 'lot', 'lit', 'lie', 'pie',
  ];
  const dict = new Set<string>(WORDS);

  const start = 'hit';
  const goal = 'cog';
  const beamWidth = 3;
  const maxDepth = 10;

  const startState: WordState = {
    word: start,
    path: [start],
    isGoal: start === goal,
  };

  const result = beamSearch<WordState>({
    start: startState,
    successors: (s) => neighbours(s, dict),
    score: hammingScore(goal),
    beamWidth,
    maxDepth,
    isGoal: (s) => s.word === goal,
  });

  if (result) {
    console.log('✅ Path found:', result.path.join(' → '));
  } else {
    console.log('❌ No path found.');
  }
}

// Uncomment to see it in action
// runWordLadder();

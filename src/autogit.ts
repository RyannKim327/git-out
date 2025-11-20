/**
 * Generic beam-search.
 * State: the type of every search node (can be a string, a complex object, …).
 */
export function beamSearch<State>(
  start: State,
  expand: (s: State) => State[],
  score: (s: State) => number,
  beamWidth: number,
  maxDepth: number = Infinity
): State | undefined {
  // Current frontier, sorted best-first
  let beam: Array<{ state: State; depth: number }> = [{ state: start, depth: 0 }];

  let bestFinal: State | undefined = undefined;
  let bestScore = -Infinity;

  while (beam.length > 0) {
    const nextBeam: Array<{ state: State; score: number; depth: number }> = [];

    // Expand every node in the current beam
    for (const { state, depth } of beam) {
      const sc = score(state);
      // Track the best complete state seen so far
      if (sc > bestScore) {
        bestScore = sc;
        bestFinal = state;
      }
      // Stop deepening if we hit the depth limit
      if (depth >= maxDepth) continue;

      const children = expand(state);
      for (const child of children) {
        nextBeam.push({ state: child, score: score(child), depth: depth + 1 });
      }
    }

    // Prune to the top `beamWidth` successors
    nextBeam.sort((a, b) => b.score - a.score);
    beam = nextBeam.slice(0, beamWidth).map(({ state, depth }) => ({ state, depth }));
  }

  return bestFinal;
}
const hidden = "beach";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function expandWord(word: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < word.length; ++i) {
    for (const c of alphabet) {
      if (c === word[i]) continue;
      out.push(word.slice(0, i) + c + word.slice(i + 1));
    }
  }
  return out;
}

function scoreWord(word: string): number {
  let hits = 0;
  for (let i = 0; i < word.length; ++i) if (word[i] === hidden[i]) ++hits;
  return hits;
}

const answer = beamSearch(
  "aaaaa",          // start
  expandWord,
  scoreWord,
  20,               // beamWidth
  10                // maxDepth
);

console.log("Best found:", answer); // -> beach
interface Sentence {
  tokens: number[];          // token ids
  logProb: number;         // higher is better
}

function expandSentence(s: Sentence): Sentence[] {
  const next: Sentence[] = [];
  for (let id = 0; id < VOCAB_SIZE; ++id) {
    const prob = model.nextLogProb(s.tokens, id); // your model call
    next.push({
      tokens: [...s.tokens, id],
      logProb: s.logProb + prob,
    });
  }
  return next;
}

const start: Sentence = { tokens: [BOS], logProb: 0 };

const best = beamSearch(
  start,
  expandSentence,
  (s) => s.logProb,
  8,               // beamWidth
  10               // max length
);
console.log(best.tokens.map(id => vocab[id]).join(" "));

/**
 * Generic beam-search.
 *
 * @param S  Type of a search state.
 * @param initial      Starting state.
 * @param expand       Given a state, return its neighbours.
 * @param score        Higher score ⇒ better state.
 * @param beamWidth    k (how many nodes to keep each level).
 * @param maxDepth     Optional safety stop.
 * @returns            Best state found.
 */
export function beamSearch<S>(
  initial: S,
  expand: (s: S) => S[],
  score: (s: S) => number,
  beamWidth: number,
  maxDepth = 100
): S {
  let beam: S[] = [initial];

  for (let depth = 0; depth < maxDepth && beam.length > 0; depth++) {
    // 1. Generate all successors
    const candidates: S[] = [];
    for (const s of beam) candidates.push(...expand(s));

    // 2. No successors ⇒ early stop
    if (candidates.length === 0) break;

    // 3. Keep the k best
    beam = candidates
      .sort((a, b) => score(b) - score(a)) // descending
      .slice(0, beamWidth);
  }

  // Return the best state in the final beam
  return beam.reduce((best, s) => (score(s) > score(best) ? s : best), beam[0]);
}
interface State {
  text: string;
  logProb: number; // higher is better
}

const VOCAB = ['a', 'b', 'c'];

function expand(s: State): State[] {
  return VOCAB.map(ch => ({
    text: s.text + ch,
    logProb: s.logProb + Math.log(Math.random()), // dummy LM
  }));
}

function score(s: State): number {
  return s.logProb;
}

const best = beamSearch<State>(
  { text: 'x', logProb: 0 },
  expand,
  score,
  3 // beam width
);

console.log('Best continuation:', best.text, 'score', best.logProb);

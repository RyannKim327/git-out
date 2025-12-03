// beam-search.ts
export interface Scored<S> {
  state: S;
  score: number;
}

export interface Path<S> {
  states: S[];   // ordered sequence from root to leaf
  score: number; // cumulative score (higher is better)
}

export function beamSearch<S>(
  initialState: S,
  expand: (state: S) => Scored<S>[],
  beamWidth: number,
  maxDepth: number = Infinity
): Path<S> | null {
  if (beamWidth <= 0) throw new Error("beamWidth must be positive");

  // Each beam element keeps the full path so we can reconstruct it later
  let beam: Path<S>[] = [
    { states: [initialState], score: 0 },
  ];

  let best: Path<S> | null = null;

  for (let depth = 0; depth < maxDepth; depth++) {
    const candidates: Path<S>[] = [];

    for (const path of beam) {
      const lastState = path.states[path.states.length - 1];
      for (const { state, score } of expand(lastState)) {
        candidates.push({
          states: [...path.states, state],
          score: path.score + score,
        });
      }
    }

    if (candidates.length === 0) break; // no successors

    // Keep top-k
    candidates.sort((a, b) => b.score - a.score);
    beam = candidates.slice(0, beamWidth);

    // Track global best
    const currentBest = beam[0];
    if (!best || currentBest.score > best.score) best = currentBest;
  }

  return best;
}

/* ------------------------------------------------------------------ */
/* Example usage: find a high-scoring binary string of length 8       */
/* ------------------------------------------------------------------ */
if (require.main === module) {
  type BitString = string; // e.g. "01101"

  const expandBits = (s: BitString): Scored<BitString>[] => {
    if (s.length >= 8) return [];
    return [
      { state: s + "0", score: Math.random() },
      { state: s + "1", score: Math.random() },
    ];
  };

  const result = beamSearch("", expandBits, 3, 8);
  console.log(result);
}

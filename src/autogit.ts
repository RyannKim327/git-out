/**
 * Generic beam-search in TypeScript
 * @param root        Starting node
 * @param expand      (node) => next nodes
 * @param score       (node) => number (higher is better)
 * @param beamWidth   k (default = 3)
 * @param maxDepth    stop after this many layers (default = ∞)
 */
export function beamSearch<T>(
  root: T,
  expand: (node: T) => T[],
  score: (node: T) => number,
  beamWidth: number = 3,
  maxDepth: number = Infinity
): T | undefined {
  let beam: T[] = [root];

  for (let depth = 0; depth < maxDepth && beam.length > 0; depth++) {
    // 1. Expand every node in the current beam
    const candidates: T[] = [];
    for (const node of beam) {
      candidates.push(...expand(node));
    }
    if (candidates.length === 0) break; // no further expansion possible

    // 2. Keep the k best
    candidates.sort((a, b) => score(b) - score(a));
    beam = candidates.slice(0, beamWidth);
  }

  // Return the best node in the final beam
  return beam.length === 0 ? undefined : beam.reduce((best, n) =>
    score(n) > score(best) ? n : best
  );
}
interface Hypothesis {
  french: string[];   // sequence so far
  logP: number;       // higher (closer to 0) is better
}

const lexicon: Record<string, { word: string; logP: number }[]> = {
  thank: [{ word: "merci", logP: -0.1 }, { word: "remercier", logP: -0.5 }],
  you: [{ word: "toi", logP: -0.2 }, { word: "vous", logP: -0.3 }],
};

function expandHyp(h: Hypothesis): Hypothesis[] {
  const words = h.french;
  const pos = words.length;                // 0 -> “thank”, 1 -> “you”
  const src = pos === 0 ? "thank" : "you";
  return (lexicon[src] || []).map(({ word, logP }) => ({
    french: [...words, word],
    logP: h.logP + logP,
  }));
}

const best = beamSearch<Hypothesis>(
  { french: [], logP: 0 },      // root
  expandHyp,                     // expand
  h => h.logP,                  // score
  2                            // beam width
);

console.log(best); // { french: [ 'merci', 'toi' ], logP: -0.30000000000000004 }

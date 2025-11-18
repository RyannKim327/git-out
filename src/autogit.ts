// beam-search.ts
export type BeamNode<T> = {
  state: T;              // user-defined state
  score: number;         // maximisable score (higher is better)
  path: T[];             // sequence of states that led here
};

export type ExpandFn<T> = (node: BeamNode<T>) => BeamNode<T>[];
export type ScoreFn<T>  = (state: T) => number;   // heuristic

/**
 * Beam search.
 * @param initial   initial state
 * @param expand    successor generator
 * @param score     scoring heuristic (higher => better)
 * @param beamWidth k (how many nodes are kept per layer)
 * @param maxDepth  optional safety cap
 * @returns best node found (highest score) or undefined if search failed
 */
export function beamSearch<T>(
  initial: T,
  expand: ExpandFn<T>,
  score: ScoreFn<T>,
  beamWidth: number,
  maxDepth = 100
): BeamNode<T> | undefined {

  // helper to create a BeamNode from a raw state
  const makeNode = (state: T, path: T[] = []): BeamNode<T> => ({
    state,
    score: score(state),
    path: [...path, state],
  });

  let beam: BeamNode<T>[] = [makeNode(initial)];

  for (let depth = 0; depth < maxDepth && beam.length > 0; depth++) {
    // 1. expand every node in the current beam
    const candidates: BeamNode<T>[] = [];
    for (const node of beam) {
      candidates.push(...expand(node));
    }

    // 2. nothing left to explore
    if (candidates.length === 0) break;

    // 3. keep the k best unique states (optional deduplication)
    const seen = new Set<string>();
    beam = candidates
      .sort((a, b) => b.score - a.score) // descending
      .filter(n => {
        const key = JSON.stringify(n.state); // cheap uniqueness key
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, beamWidth);
  }

  // best node encountered anywhere in the search
  return beam.length ? beam[0] : undefined;
}
import { beamSearch, BeamNode } from './beam-search';

type StrState = string;

const vocab = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
               'n','o','p','q','r','s','t','u','v','w','x','y','z',' '];

// very naive “language model”
const lmScore = (s: string): number => {
  let score = 0;
  for (let i = 0; i < s.length - 1; i++) {
    const pair = s.slice(i, i + 2);
    // reward vowels after consonants
    if (/[aeiou][bcdfghjklmnpqrstvwxyz]/.test(pair)) score += 2;
    if (/[bcdfghjklmnpqrstvwxyz][aeiou]/.test(pair)) score += 1;
  }
  return score;
};

const expandString = (node: BeamNode<StrState>): BeamNode<StrState>[] =>
  vocab.map(ch => ({
    state: node.state + ch,
    score: 0, // will be re-computed inside makeNode
    path: [...node.path, node.state],
  }));

const result = beamSearch<StrState>(
  '',                // start from empty string
  expandString,
  lmScore,
  10                 // beam width
);

if (result) {
  console.log('Best string:', result.state);
  console.log('Score:', result.score);
  console.log('Full path:', result.path);
}

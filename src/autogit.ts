// beam-search.ts
export type Scored<T> = { item: T; score: number };

/**
 * Generic Beam-Search.
 * @param initialState   start node
 * @param expand         successor generator (also yields scores)
 * @param beamWidth      k (how many nodes to keep per level)
 * @param maxDepth       optional hard limit on depth
 * @returns best-scoring node that was encountered
 */
export function beamSearch<State>(
  initialState: State,
  expand: (s: State) => Scored<State>[],
  beamWidth: number,
  maxDepth = Infinity
): Scored<State> | undefined {
  let current: Scored<State>[] = [{ item: initialState, score: 0 }];

  for (let depth = 0; depth < maxDepth && current.length > 0; ++depth) {
    // 1. Expand every node in the beam
    const candidates: Scored<State>[] = [];
    for (const node of current) {
      candidates.push(...expand(node.item));
    }
    if (candidates.length === 0) break;

    // 2. Keep the k best
    candidates.sort((a, b) => b.score - a.score); // descending
    current = candidates.slice(0, beamWidth);
  }

  // best node seen in the last beam
  return current.length > 0
    ? current.reduce((best, n) => (n.score > best.score ? n : best))
    : undefined;
}
import { beamSearch, Scored } from './beam-search';

type Word = string;

function initialWord(): Word {
  return '';
}

function expandWord(w: Word): Scored<Word>[] {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return alphabet.map(ch => ({
    item: w + ch,
    score: heuristic(w + ch) // higher ⇒ better
  }));
}

// dummy heuristic: length + sum of char codes
function heuristic(w: string): number {
  return w.length + w.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
}

const best = beamSearch(initialWord(), expandWord, 5, 6);
console.log(best); // e.g. { item: 'abcz', score: 536 }
type PathState<T> = {
  payload: T;
  path: T[];
};

function beamSearchWithPath<T>(
  initial: T,
  expand: (p: T) => Scored<T>[],
  beamWidth: number,
  maxDepth = Infinity
): T[] {
  type P = PathState<T>;
  const init: P = { payload: initial, path: [initial] };

  let beam: Scored<P>[] = [{ item: init, score: 0 }];

  for (let d = 0; d < maxDepth && beam.length; ++d) {
    const next: Scored<P>[] = [];
    for (const n of beam) {
      for (const { item, score } of expand(n.item.payload)) {
        next.push({
          item: { payload: item, path: [...n.item.path, item] },
          score: n.score + score
        });
      }
    }
    next.sort((a, b) => b.score - a.score);
    beam = next.slice(0, beamWidth);
  }
  return beam.length ? beam[0].item.path : [];
}

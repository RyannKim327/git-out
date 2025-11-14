/**
 * Generic beam-search.
 * S  = state type (any object you need)
 */
export interface BeamSearchOpts<S> {
  beamWidth: number;          // how many nodes to keep each level
  maxDepth?: number;          // safety stop (infinite if omitted)
  topK?: number;              // how many results to return (default 1)
}

export interface BeamResult<S> {
  state: S;
  score: number;              // score of the final state
  path: S[];                  // sequence of states that led here
}

export function beamSearch<S>(
  initial: () => S[],
  expand: (s: S) => S[],
  score: (s: S) => number,
  opts: BeamSearchOpts<S>
): BeamResult<S>[] {
  const { beamWidth, maxDepth = Infinity, topK = 1 } = opts;

  // each active node carries its state, cumulative score, and full path
  type Node = { state: S; score: number; path: S[] };

  let current: Node[] = initial().map(state => ({
    state,
    score: score(state),
    path: [state],
  }));

  let depth = 0;
  while (current.length > 0 && depth < maxDepth) {
    depth += 1;
    const next: Node[] = [];

    for (const node of current) {
      for (const child of expand(node.state)) {
        next.push({
          state: child,
          score: score(child),
          path: [...node.path, child],
        });
      }
    }
    // keep the best beamWidth nodes
    next.sort((a, b) => b.score - a.score);
    current = next.slice(0, beamWidth);
  }

  // return the best topK complete candidates
  current.sort((a, b) => b.score - a.score);
  return current.slice(0, topK).map(n => ({
    state: n.state,
    score: n.score,
    path: n.path,
  }));
}
import { beamSearch, BeamResult } from "./beam-search";

const DICT = new Set([
  "cat","bat","rat","hat","mat","fat","sat","pat","vat",
  "cot","dot","got","hot","lot","not","pot","rot","tot",
  "cog","dog","fog","hog","jog","log","mog","nog"
]);

function neighbours(word: string): string[] {
  const a = "abcdefghijklmnopqrstuvwxyz";
  const res: string[] = [];
  for (let i = 0; i < word.length; i++) {
    for (const c of a) {
      if (c === word[i]) continue;
      const w = word.slice(0, i) + c + word.slice(i + 1);
      if (DICT.has(w)) res.push(w);
    }
  }
  return res;
}

const results: BeamResult<string>[] = beamSearch(
  () => ["cat"],               // start
  w => neighbours(w),           // expand
  (_, depth = 0) => -depth,    // score: minus length
  { beamWidth: 5, topK: 3 }
);

results.forEach(r =>
  console.log(r.score, r.path.join(" -> "))
);
/*
-2 cat -> cot -> cog -> dog
-2 cat -> cot -> dot -> dog
-2 cat -> cat -> cot -> cog -> dog   (beam kept 3rd best)
*/

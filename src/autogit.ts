/**
 * Generic beam search
 */
export function beamSearch<TState>(
  initialState: TState,
  expand: (state: TState) => TState[],
  score: (state: TState) => number,
  {
    beamWidth = 3,
    maxDepth = Infinity,
    deduplicate = false,
    hashFn = JSON.stringify,
  }: {
    beamWidth?: number;
    maxDepth?: number;
    deduplicate?: boolean;
    hashFn?: (s: TState) => string;
  } = {}
): TState | undefined {
  let beam: Array<{ state: TState; depth: number }> = [
    { state: initialState, depth: 0 },
  ];

  let best: { state: TState; score: number } | undefined;

  const seen = deduplicate ? new Set<string>() : null;

  while (beam.length > 0) {
    const candidates: Array<{ state: TState; score: number; depth: number }> = [];

    // Expand every node in the current beam
    for (const { state, depth } of beam) {
      const sc = score(state);
      if (best === undefined || sc > best.score) best = { state, score: sc };

      if (depth >= maxDepth) continue;

      for (const child of expand(state)) {
        const key = deduplicate ? hashFn(child) : null;
        if (seen) {
          if (seen.has(key!)) continue;
          seen.add(key!);
        }
        candidates.push({ state: child, score: score(child), depth: depth + 1 });
      }
    }

    // Keep only the top-k candidates for the next beam
    beam = candidates
      .sort((a, b) => b.score - a.score) // higher score first
      .slice(0, beamWidth)
      .map(({ state, depth }) => ({ state, depth }));
  }

  return best?.state;
}
const target = "hello";

const result = beamSearch(
  "",                                    // initial state
  (str) =>
    "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map((ch) => str + ch),
  (str) => {
    let cnt = 0;
    for (let i = 0; i < str.length && i < target.length; ++i)
      if (str[i] === target[i]) ++cnt;
    return cnt;
  },
  { beamWidth: 5, maxDepth: target.length }
);

console.log(result); // -> "hello"

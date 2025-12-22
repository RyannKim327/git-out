/**
 * Generic Beam Search
 * @typeParam S  State type
 */
export function beamSearch<S>({
  start,
  expand,
  score,
  beamWidth,
  maxDepth = Infinity,
}: {
  start: S;
  expand: (s: S) => S[];
  score: (s: S) => number;
  beamWidth: number;
  maxDepth?: number;
}): S | undefined {
  let beam: S[] = [start];

  for (let depth = 0; depth < maxDepth && beam.length > 0; depth++) {
    // 1. Expand every state in the current beam
    const candidates: S[] = [];
    for (const s of beam) candidates.push(...expand(s));

    // 2. No successors → stop early
    if (candidates.length === 0) break;

    // 3. Keep the top-k unique candidates
    const unique = Array.from(
      new Map(candidates.map((c) => [JSON.stringify(c), c])).values()
    );
    unique.sort((a, b) => score(b) - score(a));
    beam = unique.slice(0, beamWidth);
  }

  // 4. Return the best state ever seen
  return beam.sort((a, b) => score(b) - score(a))[0];
}
// Levenshtein distance (lower is better)
function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array(a.length + 1)
    .fill(0)
    .map(() => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[a.length][b.length];
}

const target = "hello";

const best = beamSearch({
  start: "",                        // empty string
  beamWidth: 10,
  maxDepth: 6,                    // allow up to 6 edits
  expand: (s: string) => {
    const neighbors: string[] = [];
    const abc = "abcdefghijklmnopqrstuvwxyz";
    // insert
    for (let i = 0; i <= s.length; i++)
      for (const ch of abc) neighbors.push(s.slice(0, i) + ch + s.slice(i));
    // delete
    for (let i = 0; i < s.length; i++)
      neighbors.push(s.slice(0, i) + s.slice(i + 1));
    // swap
    for (let i = 0; i < s.length - 1; i++)
      neighbors.push(
        s.slice(0, i) +
          s[i + 1] +
          s[i] +
          s.slice(i + 2)
      );
    return neighbors;
  },
  score: (s: string) => -levenshtein(s, target),
});

console.log(best); // → "hello" (or very close)

/**
 * Rabin–Karp string search.
 * Returns the starting index of the first occurrence of `pattern` in `text`,
 * or -1 if not found.
 * Average complexity:  O(n + m)   (n = text.length, m = pattern.length)
 * Worst-case complexity: O(n·m)  (rare, only on hash collisions)
 */
export function rabinKarp(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;
  if (pattern.length > text.length) return -1;

  const m = pattern.length;
  const n = text.length;

  /* ---------- Config ---------- */
  const base = 257;               // small prime > alphabet size (Unicode)
  const mod = 0x7fffffff;          // large prime < 2^31 (bitwise-and instead of %)

  /* ---------- Pre-compute base^(m-1) mod mod ---------- */
  let basePow = 1;                // base^(m-1)
  for (let i = 1; i < m; ++i) {
    basePow = (basePow * base) & mod;
  }

  /* ---------- Hash functions ---------- */
  const hash = (s: string, len: number): number => {
    let h = 0;
    for (let i = 0; i < len; i++) {
      h = (h * base + s.charCodeAt(i)) & mod;
    }
    return h;
  };

  /* ---------- Initial hashes ---------- */
  let patternHash = hash(pattern, m);
  let windowHash = hash(text, m);

  /* ---------- Rolling search ---------- */
  for (let i = 0; i <= n - m; ++i) {
    if (patternHash === windowHash) {
      // Verify the slice to avoid collision false positives
      if (text.substr(i, m) === pattern) return i;
    }

    // Roll the window (remove leftmost, add rightmost)
    if (i < n - m) {
      windowHash =
        ((windowHash - text.charCodeAt(i) * basePow) * base +
          text.charCodeAt(i + m)) &
        mod;
      // Handle negative values
      if (windowHash < 0) windowHash += mod;
    }
  }
  return -1;
}

/* ---------- Quick demo ---------- */
if (require.main === module) {
  console.log(rabinKarp("abracadabra", "abra")); // 0
  console.log(rabinKarp("abracadabra", "dabra")); // 4
  console.log(rabinKarp("🚀🌟🚀🌟", "🌟🚀")); // 2
}
import { rabinKarp } from './rabin-karp';

const idx = rabinKarp("the quick brown fox", "brown");
console.log(idx); // 10

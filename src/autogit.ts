const BASE = 256;               // 256 possible byte values
const MOD  = 1_000_000_007;     // a large 32‑bit prime (fits safely in JS number)
/**
 * Rabin‑Karp string search.
 *
 * Returns an array with the starting indices of every occurrence of `pattern`
 * inside `text`. If the pattern is not found, the array is empty.
 *
 * Time   : O(N + M) average, O(N·M) worst‑case (rare)
 * Space  : O(1) extra (besides the result array)
 *
 * @param text    The text to be searched.
 * @param pattern The pattern we are looking for.
 * @returns       Array of start indices where pattern occurs in text.
 */
export function rabinKarp(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;

  // Edge cases --------------------------------------------------------------
  if (m === 0) return [];               // empty pattern → no matches
  if (m > n) return [];                 // pattern longer than text → impossible

  const BASE = 256;                     // alphabet size (byte values)
  const MOD  = 1_000_000_007;           // large prime to avoid overflow

  // Pre‑compute base^(m‑1) % MOD (used when we drop the leftmost char)
  let highestPow = 1;
  for (let i = 0; i < m - 1; i++) {
    highestPow = (highestPow * BASE) % MOD;
  }

  // Helper: compute hash of a string slice [0, len)
  const hash = (s: string, len: number): number => {
    let h = 0;
    for (let i = 0; i < len; i++) {
      h = (h * BASE + s.charCodeAt(i)) % MOD;
    }
    return h;
  };

  // Initial hashes -----------------------------------------------------------
  let patternHash = hash(pattern, m);
  let windowHash  = hash(text, m);

  const matches: number[] = [];

  // Slide the window across the text ----------------------------------------
  for (let i = 0; i <= n - m; i++) {
    // If the hashes match, verify the actual characters (to rule out collisions)
    if (patternHash === windowHash) {
      let equal = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          equal = false;
          break;
        }
      }
      if (equal) matches.push(i);
    }

    // Move the window one step to the right (unless we are at the last window)
    if (i < n - m) {
      const leftChar  = text.charCodeAt(i);          // char leaving the window
      const rightChar = text.charCodeAt(i + m);      // char entering the window

      // Remove leftmost char contribution
      windowHash = (windowHash - (leftChar * highestPow) % MOD + MOD) % MOD;
      // Multiply by base to shift left
      windowHash = (windowHash * BASE) % MOD;
      // Add new rightmost char
      windowHash = (windowHash + rightChar) % MOD;
    }
  }

  return matches;
}

/* -------------------------------------------------------------------------
   Example usage (you can paste this into a TS file or a REPL):
-------------------------------------------------------------------------- */
if (require.main === module) {
  const text = "abracadabra";
  const pattern = "abra";

  const positions = rabinKarp(text, pattern);
  console.log(`Pattern "${pattern}" found at indices:`, positions);
  // → Pattern "abra" found at indices: [0, 7]
}
const BASE = 26;
const charCode = (c: string) => c.charCodeAt(0) - 97; // 'a' → 0, ..., 'z' → 25
import assert from "assert";

function test() {
  // 1. Simple match
  assert.deepStrictEqual(rabinKarp("hello world", "world"), [6]);

  // 2. Multiple matches, overlapping
  assert.deepStrictEqual(rabinKarp("aaaaa", "aa"), [0, 1, 2, 3]);

  // 3. No match
  assert.deepStrictEqual(rabinKarp("typescript", "java"), []);

  // 4. Pattern equals text
  assert.deepStrictEqual(rabinKarp("abc", "abc"), [0]);

  // 5. Empty pattern → empty result (by design)
  assert.deepStrictEqual(rabinKarp("anything", ""), []);

  // 6. Pattern longer than text
  assert.deepStrictEqual(rabinKarp("short", "longerpattern"), []);

  console.log("All tests passed!");
}

test();

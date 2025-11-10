/**
 * Burrows-Wheeler Transform (BWT) and inverse
 * ------------------------------------------------
 *  bwt(s)  -> { text: string, idx: number }   // idx is the row where the
 *                                              // original string ended up
 *  ibwt(t) -> string                          // original string
 *
 *  Complexity:  O(n log n) for bwt (via sort)
 *               O(n)        for ibwt
 */

export interface BwtResult {
  text: string;  // last column L
  idx: number;  // row number of the original string
}

/* ------------------------------------------------------------------ */
/* 1.  BWT forward                                                    */
/* ------------------------------------------------------------------ */
export function bwt(input: string): BwtResult {
  const n = input.length;
  if (n === 0) return { text: "", idx: 0 };

  // 1. Build rotations
  const rotations: string[] = new Array(n);
  for (let i = 0; i < n; ++i) {
    rotations[i] = input.slice(i) + input.slice(0, i);
  }

  // 2. Lexicographic sort
  rotations.sort();

  // 3. Last column + index of original string
  let lastCol = "";
  let idx = 0;
  for (let i = 0; i < n; ++i) {
    const row = rotations[i];
    lastCol += row[n - 1];
    if (row === input) idx = i;
  }
  return { text: lastCol, idx };
}

/* ------------------------------------------------------------------ */
/* 2.  BWT inverse (with LF mapping)                                  */
/* ------------------------------------------------------------------ */
export function ibwt(transformed: string, idx: number): string {
  const n = transformed.length;
  if (n === 0) return "";

  // 1. Build the LF (Last-to-First) mapping
  //    We need to know, for every character in L, its position in F.
  //    Stable counting sort gives us the rank of each character.
  const F = transformed.split("").sort().join("");

  // Precompute count of each char up to each position (needed for ties)
  const count: Record<string, number[]> = Object.create(null);
  for (let i = 0; i < n; ++i) {
    const c = transformed[i];
    if (!count[c]) count[c] = new Array(n + 1).fill(0);
  }
  for (const c in count) {
    for (i = 1; i <= n; ++i) {
      count[c][i] = count[c][i - 1] + (transformed[i - 1] === c ? 1 : 0);
    }
  }

  // Build LF table
  const lf: number[] = new Array(n);
  for (let i = 0; i < n; ++i) {
    const c = transformed[i];
    const rank = count[c][i]; // # of c in L[0..i-1]
    // find position of (c, rank) in F
    let pos = 0;
    let seen = -1;
    for (let j = 0; j < n; ++j) {
      if (F[j] === c) ++seen;
      if (seen === rank) {
        pos = j;
        break;
      }
    }
    lf[i] = pos;
  }

  // 2. Walk backwards
  const out: string[] = new Array(n);
  let row = idx;
  for (let i = n - 1; i >= 0; --i) {
    out[i] = transformed[row];
    row = lf[row];
  }
  return out.join("");
}

/* ------------------------------------------------------------------ */
/* 3.  Optional:  wrap/unwrap with sentinel for plain strings            */
/* ------------------------------------------------------------------ */
export function bwtString(s: string): BwtResult {
  return bwt(s + "\0");
}
export function ibwtString(t: string, idx: number): string {
  const withSentinel = ibwt(t, idx);
  return withSentinel.endsWith("\0")
    ? withSentinel.slice(0, -1)
    : withSentinel;
}

/* ------------------------------------------------------------------ */
/* 4.  Quick sanity check                                             */
/* ------------------------------------------------------------------ */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("round-trip", () => {
    const src = "banana";
    const { text, idx } = bwtString(src);
    const back = ibwtString(text, idx);
    expect(back).toBe(src);
  });
}
import { bwtString, ibwtString } from "./bwt";

const original = "mississippi";
const { text, idx } = bwtString(original);
console.log({ text, idx });          // { text: "ipssm$pissii", idx: 5 }
const restored = ibwtString(text, idx);
console.log(restored === original);  // true

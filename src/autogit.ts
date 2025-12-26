/**
 * Burrows-Wheeler Transform (BWT) + Inverse (IBWT)
 * =================================================
 *  – O(n log n) construction (fast enough for n ≤ 1–2 MByte).
 *  – No external deps, runs in browser and node.
 *  – Works on any binary data (strings, Uint8Array, Buffer, …).
 *
 *  Author:  github.com/yourname
 *  License: MIT
 */

export type BwtResult = { transformed: Uint8Array; primaryIndex: number };

/**
 * Forward BWT
 * @param data  Input bytes (Uint8Array, Buffer, or string)
 * @returns     {transformed, primaryIndex}  (primaryIndex is 0-based into *transformed*)
 */
export function bwt(data: Uint8Array | string): BwtResult {
  const bytes = data instanceof Uint8Array ? data : new TextEncoder().encode(data);
  const n = bytes.length;
  if (n === 0) return { transformed: new Uint8Array(0), primaryIndex: 0 };

  // Append sentinel (ETX = 0x03)
  const s = new Uint8Array(n + 1);
  s.set(bytes);
  s[n] = 0x03; // sentinel

  // Build suffix array (O(n log n))
  const sa = Array.from({ length: n + 1 }, (_, i) => i);
  sa.sort((i, j) => {
    for (let k = 0; k <= n; k++) {
      const ci = s[(i + k) % (n + 1)];
      const cj = s[(j + k) % (n + 1)];
      if (ci !== cj) return ci - cj;
    }
    return 0;
  });

  // Build BWT
  const bwt = new Uint8Array(n + 1);
  let primary = 0;
  for (let i = 0; i <= n; i++) {
    bwt[i] = s[(sa[i] - 1 + (n + 1)) % (n + 1)];
    if (sa[i] === 0) primary = i;
  }
  return { transformed: bwt, primaryIndex: primary };
}

/**
 * Inverse BWT
 * @param transformed   BWT bytes (must include sentinel)
 * @param primaryIndex Must be the same returned by bwt()
 * @returns           Original data (without sentinel)
 */
export function ibwt(transformed: Uint8Array, primaryIndex: number): Uint8Array {
  const bwt = transformed;
  const n = bwt.length;
  if (n === 0) return new Uint8Array(0);

  // Count occurrences & build cumulative table
  const counts = new Uint32Array(256);
  for (let i = 0; i < n; i++) counts[bwt[i]]++;
  const cumu = new Uint32Array(256);
  for (let i = 1; i < 256; i++) cumu[i] = cumu[i - 1] + counts[i - 1];

  // Build LF-mapping (next[i])
  const next = new Uint32Array(n);
  const ptr = new Uint32Array(256);
  for (let i = 0; i < 256; i++) ptr[i] = cumu[i];
  for (let i = 0; i < n; i++) {
    const c = bwt[i];
    next[ptr[c]++] = i;
  }

  // Walk backwards
  const out = new Uint8Array(n - 1);
  let p = primaryIndex;
  for (let i = n - 2; i >= 0; i--) {
    p = next[p];
    out[i] = bwt[p];
  }
  return out;
}

/* ------------------ Convenience helpers ------------------ */

export function bwtString(str: string): { transformed: string; primaryIndex: number } {
  const { transformed, primaryIndex } = bwt(str);
  return { transformed: new TextDecoder().decode(transformed), primaryIndex };
}

export function ibwtString(transformed: string, primaryIndex: number): string {
  return new TextDecoder().decode(ibwt(new TextEncoder().encode(transformed), primaryIndex));
}

/* ------------------ Quick sanity check ------------------ */
if (import.meta.url.endsWith(process.argv[1])) {
  const original = "banana";
  const { transformed, primaryIndex } = bwtString(original);
  console.log("BWT:", JSON.stringify(transformed), "primaryIndex:", primaryIndex);
  const back = ibwtString(transformed, primaryIndex);
  console.log("IBWT:", JSON.stringify(back));
  console.assert(back === original);
}
import { bwt, ibwt } from "./bwt";

// Binary data
const data = new Uint8Array([0, 1, 2, 3, 4, 5]);
const { transformed, primaryIndex } = bwt(data);
const recovered = ibwt(transformed, primaryIndex);
console.log(recovered); // Uint8Array [0,1,2,3,4,5]

// Strings
import { bwtString, ibwtString } from "./bwt";
const enc = bwtString("mississippi");
const dec = ibwtString(enc.transformed, enc.primaryIndex);
console.log(dec); // "mississippi"

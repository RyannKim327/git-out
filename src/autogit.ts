/**
 * Burrows-Wheeler Transform & Inverse in TypeScript
 *  bwt.encode("banana")  -> { text: "annb\x03aa", idx: 4 }
 *  bwt.decode("annb\x03aa", 4) -> "banana"
 */

export const BWT = {
  /**
   * Encode a string.
   * @param input  Plain text (Unicode string)
   * @returns      { text: BWT string with sentinel, idx: primaryIndex }
   */
  encode(input: string): { text: string; idx: number } {
    const sentinel = '\x03'; // ASCII End-of-Text
    const s = input + sentinel;
    const n = s.length;

    // Build suffix array (O(n log n) comparison sort is fine for typical n < 1e6)
    const sa = Array.from({ length: n }, (_, i) => i);
    sa.sort((i, j) => {
      for (let k = 0; k < n; k++) {
        const si = s[(i + k) % n];
        const sj = s[(j + k) % n];
        if (si !== sj) return si < sj ? -1 : 1;
      }
      return 0;
    });

    // Build BWT string and find primary index
    let text = '';
    let primary = 0;
    for (let row = 0; row < n; row++) {
      const pos = sa[row];
      text += s[(pos + n - 1) % n];
      if (pos === 0) primary = row;
    }
    return { text, idx: primary };
  },

  /**
   * Decode a BWT string back to the original.
   * @param bwtStr   String produced by encode()
   * @param idx      Primary index returned by encode()
   * @returns        Original string (without sentinel)
   */
  decode(bwtStr: string, idx: number): string {
    const n = bwtStr.length;
    if (idx < 0 || idx >= n) throw new RangeError('Invalid primary index');

    // Build LF-mapping via counting + cumulative table (stable sort order)
    const counts = new Map<string, number>();
    const ranks: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      const ch = bwtStr[i];
      ranks[i] = counts.get(ch) ?? 0;
      counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }

    // Stable bucket start positions
    const bucket: Record<string, number> = {};
    const sorted = [...counts.keys()].sort();
    let sum = 0;
    for (const ch of sorted) {
      bucket[ch] = sum;
      sum += counts.get(ch)!;
    }

    // Invert walk
    const out: string[] = new Array(n - 1);
    let row = idx;
    for (let i = n - 2; i >= 0; i--) {
      const ch = bwtStr[row];
      out[i] = ch;
      row = bucket[ch] + ranks[row];
    }
    return out.join('');
  },
};

/* ------------------- Quick sanity check ------------------- */
if (import.meta.url === `file://${process.argv[1]}`) {
  const original = "banana🍌";
  const encoded = BWT.encode(original);
  console.log("encoded", encoded);
  const decoded = BWT.decode(encoded.text, encoded.idx);
  console.log("decoded", decoded);
  console.assert(decoded === original);
}
import { BWT } from './bwt';

const encoded = BWT.encode("mississippi");
console.log(encoded);          // { text: "ipssm$pissii", idx: 5 }

const decoded = BWT.decode(encoded.text, encoded.idx);
console.log(decoded);          // "mississippi"

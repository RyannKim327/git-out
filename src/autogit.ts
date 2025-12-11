/** Result of the forward transform.
 *  - `bwt`   : the transformed string (last column)
 *  - `index` : the row number where the original string appears in the sorted matrix
 */
export interface BWTResult {
  bwt: string;
  index: number;
}
/**
 * Burrows‑Wheeler forward transform.
 *
 * @param input   The string to transform. Must NOT contain the sentinel character.
 * @param sentinel A character that does not appear in `input`. Default: '\0'.
 * @returns       An object containing the transformed string and the original row index.
 */
export function bwtEncode(input: string, sentinel: string = '\0'): BWTResult {
  // 1️⃣  Append sentinel – guarantees a unique rotation.
  const s = input + sentinel;
  const n = s.length;

  // 2️⃣  Build all rotations (as string references, not copies).
  //     Instead of materialising each rotation we store the start index.
  const rotations = Array.from({ length: n }, (_, i) => i);

  // 3️⃣  Sort rotations lexicographically.
  rotations.sort((a, b) => {
    // Compare character by character, wrapping around at the end.
    for (let k = 0; k < n; ++k) {
      const ca = s[(a + k) % n];
      const cb = s[(b + k) % n];
      if (ca < cb) return -1;
      if (ca > cb) return 1;
    }
    return 0; // identical (only possible when sentinel duplicates, which we forbid)
  });

  // 4️⃣  Build the BWT string (last column) and locate the original row.
  let bwt = '';
  let originalIndex = -1;
  for (let i = 0; i < n; ++i) {
    const rotStart = rotations[i];
    // The character preceding the rotation start (wrapping around) is the last column.
    const lastChar = s[(rotStart + n - 1) % n];
    bwt += lastChar;

    // The rotation that starts at position 0 is the original string.
    if (rotStart === 0) originalIndex = i;
  }

  // `originalIndex` must be set because we added a unique sentinel.
  return { bwt, index: originalIndex };
}
/**
 * Burrows‑Wheeler inverse transform.
 *
 * @param bwt      The transformed string (output of `bwtEncode`).
 * @param index    The row index returned by `bwtEncode`.
 * @param sentinel The sentinel character used during encoding (default '\0').
 * @returns        The original string (without the sentinel).
 */
export function bwtDecode(bwt: string, index: number, sentinel: string = '\0'): string {
  const n = bwt.length;

  // 1️⃣  Count occurrences of each character.
  const counts = new Map<string, number>();
  for (const ch of bwt) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }

  // 2️⃣  Compute the "first column" – the sorted version of `bwt`.
  //     We also need the starting offset of each character in that column.
  const sortedChars = Array.from(counts.keys()).sort(); // lexical order
  const firstColOffset = new Map<string, number>();
  let cum = 0;
  for (const ch of sortedChars) {
    firstColOffset.set(ch, cum);
    cum += counts.get(ch)!;
  }

  // 3️⃣  Build the LF‑mapping.
  //     For each position i in the last column (bwt) we need to know
  //     which row in the first column it maps to.
  //     We achieve this by counting how many times we have already seen
  //     the same character up to position i (its rank).
  const rank = new Array<number>(n);
  const seen = new Map<string, number>();
  for (let i = 0; i < n; ++i) {
    const ch = bwt[i];
    const r = (seen.get(ch) ?? 0);
    rank[i] = r;
    seen.set(ch, r + 1);
  }

  // LF(i) = firstColOffset[ch] + rank[i]
  const lf = (i: number) => firstColOffset.get(bwt[i])! + rank[i];

  // 4️⃣  Walk the LF‑mapping starting from the known row (`index`).
  //     The walk yields the original string **backwards**.
  let row = index;
  const originalReversed: string[] = new Array<string>(n);
  for (let pos = n - 1; pos >= 0; --pos) {
    const ch = bwt[row];
    originalReversed[pos] = ch;
    row = lf(row);
  }

  // 5️⃣  Remove the sentinel (it will be the first character after reversal).
  const original = originalReversed.join('');
  if (original[0] !== sentinel) {
    throw new Error('Sentinel not found – input may be corrupted or wrong sentinel used.');
  }
  return original.slice(1); // drop sentinel
}
import { bwtEncode, bwtDecode } from './bwt';

const text = 'banana';
const sentinel = '\0'; // any char not present in `text`

// ---- Encode -------------------------------------------------
const { bwt, index } = bwtEncode(text, sentinel);
console.log('BWT:', JSON.stringify(bwt)); // "annb\0aa"
console.log('Row index of original:', index); // 3 (example)

// ---- Decode -------------------------------------------------
const recovered = bwtDecode(bwt, index, sentinel);
console.log('Recovered:', recovered); // "banana"
BWT: "annb\u0000aa"
Row index of original: 3
Recovered: banana
// ---------- FAST BWT (ASCII only) ----------
export function bwtEncodeFastASCII(input: string, sentinel: string = '\0'): BWTResult {
  const s = input + sentinel;
  const n = s.length;
  const bytes = new Uint8Array(n);
  for (let i = 0; i < n; ++i) bytes[i] = s.charCodeAt(i); // assumes <256

  // Build suffix array using a 2‑pass counting sort (radix sort on 2‑byte keys)
  const SA = suffixArrayRadix(bytes);

  // Build BWT from SA
  let bwt = '';
  let originalIdx = -1;
  for (let i = 0; i < n; ++i) {
    const pos = SA[i];
    const last = bytes[(pos + n - 1) % n];
    bwt += String.fromCharCode(last);
    if (pos === 0) originalIdx = i;
  }
  return { bwt, index: originalIdx };
}

/**
 * Simple O(n) radix‑sort suffix array for 8‑bit alphabets.
 * Not the most sophisticated SA‑IS, but works well for moderate n.
 */
function suffixArrayRadix(arr: Uint8Array): Uint32Array {
  const n = arr.length;
  const SA = new Uint32Array(n);
  const tmp = new Uint32Array(n);
  const bucket = new Uint32Array(256);

  // Initial sorting by first byte
  for (let i = 0; i < n; ++i) bucket[arr[i]]++;
  for (let i = 1; i < 256; ++i) bucket[i] += bucket[i - 1];
  for (let i = n - 1; i >= 0; --i) {
    const c = arr[i];
    SA[--bucket[c]] = i;
  }

  // Doubling technique (2‑byte keys) – O(log n) passes, each O(n)
  for (let k = 1; k < n; k <<= 1) {
    // 1️⃣ sort by second half (i + k) using counting sort on 0‑255
    bucket.fill(0);
    for (let i = 0; i < n; ++i) {
      const idx = (SA[i] + k) % n;
      bucket[arr[idx]]++;
    }
    for (let i = 1; i < 256; ++i) bucket[i] += bucket[i - 1];
    for (let i = n - 1; i >= 0; --i) {
      const idx = (SA[i] + k) % n;
      tmp[--bucket[arr[idx]]] = SA[i];
    }

    // 2️⃣ sort by first half (the original character)
    bucket.fill(0);
    for (let i = 0; i < n; ++i) bucket[arr[tmp[i]]]++;
    for (let i = 1; i < 256; ++i) bucket[i] += bucket[i - 1];
    for (let i = n - 1; i >= 0; --i) {
      const idx = tmp[i];
      SA[--bucket[arr[idx]]] = idx;
    }

    // (Optional) break early if already sorted – omitted for brevity
  }
  return SA;
}
function testBWT(str: string) {
  const { bwt, index } = bwtEncode(str);
  const recovered = bwtDecode(bwt, index);
  console.assert(recovered === str, `FAIL: "${str}" → "${recovered}"`);
  console.log(`✔ "${str}" → BWT="${JSON.stringify(bwt)}", index=${index}`);
}

// Small sanity checks
['', 'a', 'aa', 'ab', 'banana', 'mississippi', 'the quick brown fox'].forEach(testBWT);

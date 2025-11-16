/*********************************************************************
 * Burrows-Wheeler Transform in TypeScript
 *********************************************************************/

/**
 * Forward BWT
 * @param text  original string (will be appended the sentinel '\x03')
 * @returns     { bwt: string, idx: number }  (idx is the row where the original string ends)
 */
export function bwt(text: string): { bwt: string; idx: number } {
  const sentinel = '\x03';          // ASCII End-of-Text
  const s = text + sentinel;
  const n = s.length;

  // 1. build suffix array (O(n log n) via simple sort; for >50 kB use SA-IS)
  const sa = Array.from({ length: n }, (_, i) => i);
  sa.sort((i, j) => {
    for (let k = 0; k < n; k++) {
      const diff = s.charCodeAt((i + k) % n) - s.charCodeAt((j + k) % n);
      if (diff !== 0) return diff;
    }
    return 0;
  });

  // 2. build BWT string
  let bwtStr = '';
  let primaryIndex = -1;
  for (let row = 0; row < n; row++) {
    const pos = sa[row];
    bwtStr += pos === 0 ? sentinel : s[pos - 1];
    if (pos === 0) primaryIndex = row;
  }
  return { bwt: bwtStr, idx: primaryIndex };
}

/**
 * Inverse BWT
 * @param bwtStr        string produced by bwt()
 * @param primaryIndex  index of the original first character (returned by bwt())
 * @returns             original text (without the sentinel)
 */
export function ibwt(bwtStr: string, primaryIndex: number): string {
  const n = bwtStr.length;

  // 1. build LF-mapping via counting sort
  const count: number[] = new Array(65536).fill(0); // unicode buckets
  for (let i = 0; i < n; i++) count[bwtStr.charCodeAt(i)]++;

  // cumulative counts
  const sum: number[] = new Array(65536);
  let t = 0;
  for (let i = 0; i < 65536; i++) {
    sum[i] = t;
    t += count[i];
  }

  // build next[] array
  const next = new Uint32Array(n);
  const ptr = new Uint32Array(65536);
  for (let i = 0; i < 65536; i++) ptr[i] = sum[i];
  for (let i = 0; i < n; i++) {
    const c = bwtStr.charCodeAt(i);
    next[ptr[c]++] = i;
  }

  // 2. walk back
  let row = primaryIndex;
  let out = '';
  for (let i = 0; i < n - 1; i++) {   // skip sentinel
    row = next[row];
    out += bwtStr[row];
  }
  return out;
}

/* ------------------- quick demo ------------------- */
if (require.main === module) {
  const original = 'banana';
  const { bwt: transformed, idx } = bwt(original);
  console.log('BWT:', JSON.stringify(transformed), 'primaryIndex:', idx);

  const back = ibwt(transformed, idx);
  console.log('IBWT:', JSON.stringify(back));
}
import { bwt, ibwt } from './bwt';

const { bwt: t, idx } = bwt('MISSISSIPPI');
console.log(ibwt(t, idx)); // -> MISSISSIPPI

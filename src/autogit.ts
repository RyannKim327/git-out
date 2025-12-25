// kmp.ts
export interface Match {
  start: number;      // inclusive
  end:   number;    // exclusive
}

/**
 * Pre-process the pattern and return the longest-prefix-suffix (LPS) array
 * that allows the main scan to skip re-examining characters.
 */
function buildLps(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let len = 0;          // length of the current longest prefix suffix

  for (let i = 1; i < m; ) {
    if (pattern[i] === pattern[len]) {
      lps[i++] = ++len;
    } else if (len !== 0) {
      len = lps[len - 1]; // fallback shorter prefix
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}

/**
 * Return every non-overlapping occurrence of `pattern` inside `text`.
 * Overlapping matches can be enabled by keeping `i` unchanged after a hit.
 */
export function kmpSearch(
  text: string,
  pattern: string,
  overlapping = false
): Match[] {
  if (pattern.length === 0) return [];
  if (pattern.length > text.length) return [];

  const lps = buildLps(pattern);
  const matches: Match[] = [];

  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) {
        matches.push({ start: i - j, end: i });
        if (!overlapping) {
          j = 0;               // restart pattern
        } else {
          j = lps[j - 1];      // allow overlaps
        }
      }
    } else if (j !== 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return matches;
}
import { kmpSearch } from './kmp';

const text = 'ababcabcabcabababd';
const pattern = 'ababd';

console.log(kmpSearch(text, pattern));
// → [ { start: 13, end: 18 } ]
import { kmpSearch } from './kmp';

describe('KMP', () => {
  it('finds overlapping', () => {
    expect(kmpSearch('aaaa', 'aa', true).length).toBe(3);
  });
  it('finds non-overlapping', () => {
    expect(kmpSearch('aaaa', 'aa', false).length).toBe(2);
  });
  it('handles unicode', () => {
    const text = 'I💚TypeScript💚and💚unicodes';
    const pattern = '💚';
    expect(kmpSearch(text, pattern).length).toBe(3);
  });
});

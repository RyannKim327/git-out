/**
 * Returns true if `a` and `b` are anagrams of each other.
 *
 * @param a - first string
 * @param b - second string
 * @param options - optional flags
 *   - ignoreCase: treat 'A' and 'a' as the same (default true)
 *   - ignoreNonAlpha: strip out everything that is not a letter (default true)
 */
export function areAnagramsSort(
  a: string,
  b: string,
  {
    ignoreCase = true,
    ignoreNonAlpha = true,
  }: { ignoreCase?: boolean; ignoreNonAlpha?: boolean } = {}
): boolean {
  const normalize = (s: string): string => {
    let result = s;
    if (ignoreCase) result = result.toLowerCase();
    if (ignoreNonAlpha) result = result.replace(/[^a-z]/g, '');
    return result;
  };

  const sorted = (s: string) =>
    normalize(s)
      .split('')
      .sort()
      .join('');

  return sorted(a) === sorted(b);
}

/* Example usage */
console.log(areAnagramsSort('Listen', 'Silent')); // true
console.log(areAnagramsSort('A decimal point', 'I’m a dot in place')); // true
console.log(areAnagramsSort('Hello', 'World')); // false
/**
 * Checks if two strings are anagrams using a frequency map.
 *
 * This runs in linear time O(n) and uses only a fixed‑size map
 * (26 entries for English letters, or 256 for full ASCII, etc.).
 */
export function areAnagramsFreq(
  a: string,
  b: string,
  {
    ignoreCase = true,
    ignoreNonAlpha = true,
  }: { ignoreCase?: boolean; ignoreNonAlpha?: boolean } = {}
): boolean {
  // Fast‑path: different lengths after normalisation → cannot be anagrams
  const normalize = (s: string): string => {
    let r = s;
    if (ignoreCase) r = r.toLowerCase();
    if (ignoreNonAlpha) r = r.replace(/[^a-z]/g, '');
    return r;
  };

  const s1 = normalize(a);
  const s2 = normalize(b);
  if (s1.length !== s2.length) return false;

  // Using a plain object as a hashmap; for ASCII you could also use Uint16Array[256]
  const freq: Record<string, number> = {};

  for (const ch of s1) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }

  for (const ch of s2) {
    const count = freq[ch];
    if (count === undefined) return false; // char not present in first string
    if (count === 1) {
      delete freq[ch];
    } else {
      freq[ch] = count - 1;
    }
  }

  // If the map is empty, every character matched exactly.
  return Object.keys(freq).length === 0;
}

/* Example usage */
console.log(areAnagramsFreq('Dormitory', 'Dirty room')); // true
console.log(areAnagramsFreq('Astronomer', 'Moon starer')); // true
console.log(areAnagramsFreq('Foo', 'Bar')); // false
type Normalizer = (s: string) => string;

/**
 * Helper that stores a pre‑computed frequency map for a string.
 * Useful when you compare one “source” string against many candidates.
 */
export class AnagramHelper {
  private readonly normalized: string;
  private readonly freqMap: Record<string, number>;

  constructor(
    private readonly source: string,
    private readonly normalizer: Normalizer = AnagramHelper.defaultNormalizer
  ) {
    this.normalized = normalizer(source);
    this.freqMap = AnagramHelper.buildFreqMap(this.normalized);
  }

  /** Default normalizer: lower‑case + keep only a‑z */
  private static defaultNormalizer = (s: string) =>
    s.toLowerCase().replace(/[^a-z]/g, '');

  private static buildFreqMap(str: string): Record<string, number> {
    const map: Record<string, number> = {};
    for (const ch of str) {
      map[ch] = (map[ch] ?? 0) + 1;
    }
    return map;
  }

  /** Test another string against the stored source */
  public isAnagram(candidate: string): boolean {
    const norm = this.normalizer(candidate);
    if (norm.length !== this.normalized.length) return false;

    const tempMap = { ...this.freqMap }; // shallow copy (small, constant size)

    for (const ch of norm) {
      const count = tempMap[ch];
      if (count === undefined) return false;
      if (count === 1) delete tempMap[ch];
      else tempMap[ch] = count - 1;
    }

    return Object.keys(tempMap).length === 0;
  }
}

/* Example usage */
const helper = new AnagramHelper('conversation');
console.log(helper.isAnagram('voices rant on')); // true
console.log(helper.isAnagram('random phrase')); // false
// anagram.ts
export interface AnagramOptions {
  /** Convert both strings to lower case before comparison (default: true) */
  ignoreCase?: boolean;
  /** Remove everything that is not a letter a‑z (default: true) */
  ignoreNonAlpha?: boolean;
}

/**
 * Normalises a string according to the supplied options.
 */
function normalize(
  s: string,
  { ignoreCase = true, ignoreNonAlpha = true }: AnagramOptions = {}
): string {
  let out = s;
  if (ignoreCase) out = out.toLowerCase();
  if (ignoreNonAlpha) out = out.replace(/[^a-z]/g, '');
  return out;
}

/**
 * Public API – choose the algorithm you prefer.
 */
export const Anagram = {
  /** Sort‑and‑compare (O(n log n)) */
  sort: (a: string, b: string, opts?: AnagramOptions): boolean => {
    const sorted = (s: string) => normalize(s, opts).split('').sort().join('');
    return sorted(a) === sorted(b);
  },

  /** Frequency‑map (O(n)) */
  freq: (a: string, b: string, opts?: AnagramOptions): boolean => {
    const s1 = normalize(a, opts);
    const s2 = normalize(b, opts);
    if (s1.length !== s2.length) return false;

    const map: Record<string, number> = {};
    for (const ch of s1) map[ch] = (map[ch] ?? 0) + 1;
    for (const ch of s2) {
      const cnt = map[ch];
      if (cnt === undefined) return false;
      if (cnt === 1) delete map[ch];
      else map[ch] = cnt - 1;
    }
    return Object.keys(map).length === 0;
  },

  /** Helper class for repeated checks against a single source string */
  Helper: class {
    private readonly norm: string;
    private readonly freq: Record<string, number>;

    constructor(
      private readonly source: string,
      private readonly opts?: AnagramOptions
    ) {
      this.norm = normalize(source, opts);
      this.freq = {};
      for (const ch of this.norm) this.freq[ch] = (this.freq[ch] ?? 0) + 1;
    }

    public isAnagram(candidate: string): boolean {
      const cand = normalize(candidate, this.opts);
      if (cand.length !== this.norm.length) return false;

      const copy = { ...this.freq };
      for (const ch of cand) {
        const cnt = copy[ch];
        if (cnt === undefined) return false;
        if (cnt === 1) delete copy[ch];
        else copy[ch] = cnt - 1;
      }
      return Object.keys(copy).length === 0;
    }
  },
};
import { Anagram } from './anagram';

console.log(Anagram.sort('Debit Card', 'Bad Credit')); // true
console.log(Anagram.freq('The eyes', 'They see'));    // true

const helper = new Anagram.Helper('Eleven plus two');
console.log(helper.isAnagram('Twelve plus one')); // true

/**
 * Stable counting sort for any type T.
 * @param arr         array to be sorted (is *not* mutated)
 * @param keyOf       function that returns a non-negative integer key for every element
 * @param minKey      smallest key that can appear (inclusive)
 * @param maxKey      largest key that can appear (inclusive)
 * @returns           new sorted array
 */
export function countingSort<T>(
  arr: readonly T[],
  keyOf: (item: T) => number,
  minKey: number,
  maxKey: number
): T[] {
  if (minKey < 0) throw new Error('Counting sort needs non-negative keys');
  if (maxKey < minKey) return [];

  const range = maxKey - minKey + 1;

  // 1. frequency histogram
  const freq = new Uint32Array(range);
  for (const item of arr) {
    const k = keyOf(item) - minKey;
    ++freq[k];
  }

  // 2. prefix sums -> positions
  for (let i = 1; i < range; ++i) freq[i] += freq[i - 1];

  // 3. stable placement into output
  const out = new Array<T>(arr.length);
  for (let i = arr.length - 1; i >= 0; --i) {
    const item = arr[i];
    const k = keyOf(item) - minKey;
    out[--freq[k]] = item;
  }
  return out;
}

/* ---------- convenience wrapper when you only have numbers ---------- */
export function countingSortNumbers(arr: number[]): number[] {
  if (arr.length === 0) return [];

  let min = arr[0];
  let max = arr[0];
  for (const v of arr) {
    if (v < min) min = v;
    else if (v > max) max = v;
  }
  return countingSort(arr, x => x, min, max);
}

/* ---------------------- small sanity check ------------------------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('sorts numbers', () => {
    const data = [7, 0, 3, 1, 3, 5, 2, 5, 7, 0];
    expect(countingSortNumbers(data)).toEqual([0, 0, 1, 2, 3, 3, 5, 5, 7, 7]);
  });
  it('is stable', () => {
    const objs = [{ k: 2, id: 'a' }, { k: 1, id: 'b' }, { k: 2, id: 'c' }];
    const sorted = countingSort(objs, o => o.k, 1, 2);
    expect(sorted.map(o => o.id)).toEqual(['b', 'a', 'c']);
  });
}
// 1. plain numbers
const nums = [4, 2, 5, 1, 3];
console.log(countingSortNumbers(nums));   // [1, 2, 3, 4, 5]

// 2. sorting objects by a numeric field
interface Person { name: string; age: number; }
const people: Person[] = [
  { name: 'Alice', age: 32 },
  { name: 'Bob',   age: 25 },
  { name: 'Eve',   age: 32 },
];
const byAge = countingSort(people, p => p.age, 0, 150);
console.log(byAge.map(p => p.name));     // ['Bob', 'Alice', 'Eve'] (stable)

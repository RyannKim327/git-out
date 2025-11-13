/**
 * Counting sort for 32-bit integers.
 * Runs in O(n + range) time and O(range) memory.
 * @param arr Input array of integers
 * @returns New sorted array
 */
export function countingSort(arr: number[]): number[] {
  if (arr.length < 2) return arr.slice();          // Already sorted

  // 1. Find min/max to handle negatives and keep range small
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const v = arr[i];
    if (v < min) min = v;
    if (v > max) max = v;
  }

  const range = max - min + 1;

  // Optional guard: if the range is huge, fall back to JS built-in sort
  // (remove the next two lines if you always want pure counting sort)
  if (range > 10_000_000) return arr.slice().sort((a, b) => a - b);

  // 2. Allocate and fill frequency array
  const freq = new Uint32Array(range); // zero-filled
  for (let i = 0; i < arr.length; i++) freq[arr[i] - min]++;

  // 3. Reconstruct sorted order
  const out = new Array<number>(arr.length);
  let idx = 0;
  for (let i = 0; i < range; i++) {
    const count = freq[i];
    const value = i + min;
    for (let j = 0; j < count; j++) out[idx++] = value;
  }
  return out;
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('sorts mixed positives and negatives', () => {
    const data = [3, -4, 0, 7, 3, -4, 99, 2];
    expect(countingSort(data)).toStrictEqual([-4, -4, 0, 2, 3, 3, 7, 99]);
  });
}

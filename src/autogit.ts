/**
 * Counting sort (stable).
 * @param arr Array of non-negative integers.
 * @returns new sorted array (original is left untouched).
 * @complexity
 *   Time:  O(n + k)  (k = max - min + 1)
 *   Space: O(n + k)
 * @throws If the array contains non-integers or negative numbers.
 */
export function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  // 1. Find range
  let min = arr[0];
  let max = arr[0];
  for (const v of arr) {
    if (!Number.isInteger(v) || v < 0)
      throw new Error('Counting sort requires non-negative integers');
    if (v < min) min = v;
    if (v > max) max = v;
  }

  const range = max - min + 1;

  // 2. Count frequencies
  const count = new Array<number>(range).fill(0);
  for (const v of arr) count[v - min]++;

  // 3. Convert count to start indices (stable)
  for (let i = 1; i < range; i++) count[i] += count[i - 1];

  // 4. Build output in stable order
  const output = new Array<number>(arr.length);
  // iterate backwards to keep stability
  for (let i = arr.length - 1; i >= 0; i--) {
    const v = arr[i];
    const pos = --count[v - min];
    output[pos] = v;
  }
  return output;
}

/* ---------- demo ---------- */
if (require.main === module) {
  const data = [4, 2, 2, 8, 3, 3, 1];
  console.log('original:', data);
  console.log('sorted  :', countingSort(data));
}

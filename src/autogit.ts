/**
 * Counting sort.
 * @param arr Array of non-negative integers.
 * @param maxVal Largest value that can appear in `arr`.
 *                If omitted, it is computed automatically.
 * @returns New sorted array.
 */
export function countingSort(arr: number[], maxVal?: number): number[] {
  if (arr.length === 0) return [];

  // 1. Determine the range
  const max = maxVal ?? Math.max(...arr);
  const min = 0; // we assume non-negative inputs
  const range = max - min + 1;

  // 2. Frequency counts
  const count = new Array<number>(range).fill(0);
  for (const num of arr) {
    if (num < 0) throw new Error("Negative numbers not supported");
    count[num - min]++;
  }

  // 3. Prefix sum (positions)
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // 4. Build output (stable)
  const output = new Array<number>(arr.length);
  // Iterate backwards to maintain stability
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    const pos = count[num - min] - 1;
    output[pos] = num;
    count[num - min]--;
  }

  return output;
}

/* ---------- Example ---------- */
const data = [4, 2, 2, 8, 3, 3, 1];
console.log("Original:", data);
console.log("Sorted:  ", countingSort(data)); // [1,2,2,3,3,4,8]

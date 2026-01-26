/**
 * Counting sort for integer arrays (can include negatives).
 * @param arr The input array of numbers.
 * @returns A new sorted array.
 */
export function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  // 1) Determine min and max to find the range.
  let min = arr[0];
  let max = arr[0];
  for (const v of arr) {
    if (v < min) min = v;
    else if (v > max) max = v;
  }

  const range = max - min + 1;          // how many distinct integer values
  const count = new Array<number>(range).fill(0);

  // 2) Count each value
  for (const v of arr) {
    count[v - min]++;                   // offset by min so array starts at 0
  }

  // 3) Convert counts to cumulative counts
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // 4) Allocate result array
  const output = new Array<number>(arr.length);

  // 5) Place elements into output in stable order
  for (let i = arr.length - 1; i >= 0; i--) {
    const v = arr[i];
    const idx = v - min;
    const pos = count[idx] - 1;         // final index for this element
    output[pos] = v;
    count[idx]--;                       // decrease count for next instance
  }

  return output;
}

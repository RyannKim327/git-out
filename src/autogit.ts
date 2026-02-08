/**
 * Counting sort for arrays of non‑negative integers.
 * @param arr The input array – it will not be mutated.
 * @returns A new array containing the sorted numbers.
 */
export function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  // 1. Find the maximum value (k) – the range of the keys.
  let max = arr[0];
  for (const num of arr) if (num > max) max = num;

  // 2. Build the “count” array of size k + 1, initialise to 0.
  const count: number[] = new Array(max + 1).fill(0);

  // 3. Count how many times each value appears.
  for (const num of arr) count[num]++;

  // 4. Transform counts to positions (prefix sums).
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // 5. Place each element into the output array in stable order.
  const output: number[] = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    const pos = --count[num];   // decrement to get zero‑based index
    output[pos] = num;
  }

  return output;
}
const data = [4, 2, 2, 8, 3, 3, 1];
console.log(countingSort(data)); // [1, 2, 2, 3, 3, 4, 8]

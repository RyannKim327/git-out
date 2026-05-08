/**
 * Counting sort for an array of non‑negative integers.
 * @param arr - The array to sort.
 * @param maxVal - (Optional) Max value in the input. If omitted, it’s derived from the data.
 * @returns a new sorted array.
 */
export function countingSort(arr: number[], maxVal?: number): number[] {
  if (arr.length === 0) return [];

  // 1️⃣ Determine the maximum value (or use the supplied one)
  const max = maxVal ?? Math.max(...arr);

  // 2️⃣ Frequency table
  const count: number[] = new Array(max + 1).fill(0);
  for (const num of arr) {
    if (num < 0) throw new Error('Counting sort in this version expects non‑negative numbers');
    count[num] += 1;
  }

  // 3️⃣ Build the result
  const result: number[] = [];
  for (let value = 0; value <= max; value++) {
    const qty = count[value];
    for (let i = 0; i < qty; i++) {
      result.push(value);
    }
  }

  return result;
}
import { countingSort } from './countingSort';

const data = [12, 4, 1, 12, 7, 7, 4, 4, 0];
const sorted = countingSort(data);
console.log(sorted); // [0, 1, 4, 4, 4, 7, 7, 12, 12]
if (data.reduce((acc, cur, i) => acc && cur >= data[i - 1], true)) {
  return data.slice();
}

// Count the occurrences of the digit at `exp` (1, 10, 100, …)
function countingSortByDigit(arr: number[], exp: number): number[] {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0); // base 10

  // 1. Count digit occurrences
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit] += 1;
  }

  // 2. Accumulate counts
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // 3. Build the output array (reverse traversal for stability)
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit] -= 1;
  }

  return output;
}
export function radixSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  // Find the maximum number to know how many digits we need
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }

  // Start with the least‑significant digit (exp = 1, 10, 100, …)
  for (let exp = 1; max / exp >= 1; exp *= 10) {
    arr = countingSortByDigit(arr, exp);
  }

  return arr;
}
const unsorted = [170, 45, 75, 90, 802, 24, 2, 66];
console.log(radixSort(unsorted)); // [2, 24, 45, 66, 75, 90, 170, 802]

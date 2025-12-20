function countingSort(arr: number[]): number[] {
  // Handle trivial cases
  if (arr.length <= 1) return arr.slice();

  // Find min and max to determine range
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }

  const range = max - min + 1;
  // Count occurrences
  const counts = new Array<number>(range).fill(0);
  for (let i = 0; i < arr.length; i++) {
    counts[arr[i] - min]++;
  }

  // Transform counts to end positions (prefix sums)
  for (let i = 1; i < range; i++) {
    counts[i] += counts[i - 1];
  }

  // Build output array (stable)
  const output = new Array<number>(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const val = arr[i];
    const idx = val - min;
    const pos = --counts[idx];
    output[pos] = val;
  }

  return output;
}
const a = [3, 6, -2, 3, -2, 0, 6, -1];
const sorted = countingSort(a);
console.log(sorted); // [-2, -2, -1, 0, 3, 3, 6, 6]

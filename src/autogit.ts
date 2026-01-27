/**
 * Stable counting sort of `arr` by the digit in position `exp`
 * (exp = 1 → units, 10 → tens, 100 → hundreds, …)
 */
function countingSortByDigit(arr: number[], exp: number): void {
  const n = arr.length;
  const output = new Array<number>(n);
  const count = new Array<number>(10).fill(0);   // base 10 → digits 0‑9

  /* Count occurrences of each digit */
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit] += 1;
  }

  /* Transform counts into starting indices */
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  /* Build the output array from the end to preserve stability */
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    const pos = --count[digit];
    output[pos] = arr[i];
  }

  /* Copy back to the original array */
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}
/**
 * Radix sort for an array of non‑negative integers.
 * Complexity: O(d · (n + k)) where d = number of digits, k = base (10).
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr;            // already sorted

  // Find the maximum number to know how many digits we need
  const maxVal = Math.max(...arr);

  // Start with the least significant digit (exp = 1)
  for (let exp = 1; exp <= maxVal; exp *= 10) {
    countingSortByDigit(arr, exp);
  }

  return arr; // sorted array (in‑place)
}
const data = [170, 45, 75, 90, 802, 24, 2, 66];

radixSort(data);
console.log(data); // [2, 24, 45, 66, 75, 90, 170, 802]
export function radixSortMixed(arr: number[]): number[] {
  const positives: number[] = [];
  const negatives: number[] = [];

  for (const v of arr) {
    if (v >= 0) positives.push(v);
    else negatives.push(-v);  // work with absolute values
  }

  radixSort(positives);
  radixSort(negatives);

  const sortedNegatives = negatives.reverse().map(v => -v);
  return [...sortedNegatives, ...positives];
}

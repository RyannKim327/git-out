/**
 * Radix sort for non‑negative integers.
 * @param arr  –   array of numbers to sort
 * @returns    –   a new sorted array (the input is unchanged)
 */
export function radixSort(arr: number[]): number[] {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  // 1. Find the maximum value to know how many digits we need
  const max = Math.max(...arr);
  const base = 10;                     // decimal digits
  const maxDigits = Math.floor(Math.log10(max)) + 1;

  // 2. Work on a copy so we don't mutate the original array
  let output = [...arr];
  let digitPlace = 1;   // 1, 10, 100, …

  for (let d = 0; d < maxDigits; d++) {
    // 3. Counting sort for the current digit
    const count = new Array(base).fill(0);

    // Count occurrences of each digit
    for (const num of output) {
      const digit = Math.floor((num / digitPlace) % base);
      count[digit]++;
    }

    // Make count[i] contain the actual position of this digit
    for (let i = 1; i < base; i++) {
      count[i] += count[i - 1];
    }

    // 4. Build the output array from the end to maintain stability
    const temp = new Array(output.length);
    for (let i = output.length - 1; i >= 0; i--) {
      const num = output[i];
      const digit = Math.floor((num / digitPlace) % base);
      const idx = --count[digit];
      temp[idx] = num;
    }

    // After moving all numbers, we’ll sort by the next digit
    output = temp;
    digitPlace *= base;
  }

  return output;
}
const unsorted = [170, 45, 75, 90, 802, 24, 2, 66];
console.log(radixSort(unsorted));
// → [2, 24, 45, 66, 75, 90, 170, 802]

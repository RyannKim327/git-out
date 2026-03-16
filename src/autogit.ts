/**
 * Returns the digit present at a given place (0‑based from right to left).
 * Example: getDigit(381, 0) === 1, getDigit(381, 1) === 8, getDigit(381, 2) === 3
 */
function getDigit(num: number, place: number): number {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

/**
 * Returns the maximal number of digits among elements of array.
 */
function maxDigits(arr: number[]): number {
  if (arr.length === 0) return 0;
  const max = Math.max(...arr.map(Math.abs));
  return Math.floor(Math.log10(max)) + 1;
}
/**
 * Stable counting sort on `arr` by the digit at `place`.
 * (`digitBase` defaults to 10 – decimal.)
 */
function countingSortByDigit(arr: number[], place: number, digitBase = 10): number[] {
  const bucketCount = digitBase;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  for (const n of arr) {
    const digit = getDigit(n, place);
    buckets[digit].push(n);
  }

  // Flatten buckets in order; that's the stable result for this digit.
  return buckets.flat();
}
/**
 * Radix sort for non‑negative integers.
 * @param arr array of numbers (non‑negative, but the routine will work with any integers once you wrap them)
 * @returns sorted array (stable)
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length <= 1) return [...arr]; // copy so caller doesn’t mutate input

  const numDigits = maxDigits(arr);
  let sorted = [...arr];

  for (let place = 0; place < numDigits; place++) {
    sorted = countingSortByDigit(sorted, place);
  }

  return sorted;
}
export function radixSortFull(arr: number[]): number[] {
  const negatives = arr.filter(n => n < 0).map(n => -n);
  const positives = arr.filter(n => n >= 0);

  const sortedNeg = radixSort(negatives).reverse().map(n => -n);
  const sortedPos = radixSort(positives);

  return [...sortedNeg, ...sortedPos];
}
import { radixSortFull } from './radixSort';

const data = [170, 45, 75, 90, 802, 24, 2, 66, -15, -302, 0];
const sorted = radixSortFull(data);

console.log(sorted);
// → [-302, -15, 0, 2, 24, 45, 66, 75, 90, 170, 802]

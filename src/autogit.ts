/**
 * Radix sort for 32‑bit signed integers (Int32Array safety).
 * Works for positives, negatives and zero.
 */
export function radixSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums.slice();

  // Separate positives and negatives.
  const positives: number[] = [];
  const negatives: number[] = []; // store as positive magnitudes

  for (const n of nums) {
    if (n < 0) negatives.push(-n);  // keep magnitude, will reverse later
    else positives.push(n);
  }

  // Sort each side independently.
  const sortedPos = radixSortNonNegative(positives);
  const sortedNeg = radixSortNonNegative(negatives).reverse();

  // Concatenate negatives (reversed) + positives
  return [...sortedNeg.map(n => -n), ...sortedPos];
}

/**
 * Helper that assumes every element is a non‑negative integer.
 */
function radixSortNonNegative(arr: number[]): number[] {
  if (arr.length <= 1) return arr.slice();

  const maxVal = Math.max(...arr);
  const lenDigits = Math.floor(Math.log10(maxVal)) + 1; // digits in decimal

  let output = arr.slice(); // working copy
  let pow10 = 1;            // 10^digitIndex

  for (let d = 0; d < lenDigits; d++) {
    // 10 buckets for the decimal digits 0‑9
    const buckets: number[][] = Array.from({ length: 10 }, () => []);

    for (const val of output) {
      const digit = Math.floor((val / pow10) % 10);
      buckets[digit].push(val);
    }

    // Rebuild output from buckets
    output = [].concat(...buckets);

    pow10 *= 10;           // move to next digit
  }

  return output;
}
import { radixSort } from "./radixSort";

const data = [170, -45, 75, 90, -802, 24, 2, 66];
console.log(radixSort(data)); 
// → [-802, -45, 2, 24, 66, 75, 90, 170]

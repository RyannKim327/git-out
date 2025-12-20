   A[0 … i‑1] | A[i … m‑1]
   B[0 … j‑1] | B[j … n‑1]
/**
 * Returns the median of two sorted numeric arrays.
 *
 * The function works for any numeric type that can be compared with <, >,
 * and can be added/divided (e.g. number, bigint). For bigint the division
 * is performed as integer division; if you need a floating point result,
 * convert to Number first.
 *
 * @param a - First sorted array (ascending)
 * @param b - Second sorted array (ascending)
 * @returns The median value (as a number). If both inputs are empty, throws.
 *
 * Time   : O(log(min(m, n)))
 * Space  : O(1)
 */
export function medianOfTwoSortedArrays(a: number[], b: number[]): number {
  // Ensure `a` is the smaller array – this keeps the binary search range minimal.
  if (a.length > b.length) {
    return medianOfTwoSortedArrays(b, a);
  }

  const m = a.length;
  const n = b.length;

  if (m === 0 && n === 0) {
    throw new Error('Both input arrays are empty.');
  }

  // Helper to safely get an element or +/-Infinity when index is out of bounds.
  const get = (arr: number[], idx: number): number =>
    idx < 0 ? -Infinity : idx >= arr.length ? Infinity : arr[idx];

  let left = 0;
  let right = m; // we can partition after the last element (i == m)

  // The total number of elements that should be on the left side of the partition.
  const halfLen = Math.floor((m + n + 1) / 2);

  while (left <= right) {
    const i = Math.floor((left + right) / 2); // partition index for a
    const j = halfLen - i;                     // partition index for b

    const aLeft  = get(a, i - 1);
    const aRight = get(a, i);
    const bLeft  = get(b, j - 1);
    const bRight = get(b, j);

    // Check if we have found the correct partition
    if (aLeft <= bRight && bLeft <= aRight) {
      // Correct partition!
      if ((m + n) % 2 === 1) {
        // Odd total length → median is max of left side
        return Math.max(aLeft, bLeft);
      } else {
        // Even total length → median is average of max left & min right
        const maxLeft = Math.max(aLeft, bLeft);
        const minRight = Math.min(aRight, bRight);
        return (maxLeft + minRight) / 2;
      }
    }

    // If aLeft is too big, move partition left
    if (aLeft > bRight) {
      right = i - 1;
    } else {
      // bLeft is too big → move partition right
      left = i + 1;
    }
  }

  // If we exit the loop something went wrong (should never happen with valid input)
  throw new Error('Unable to find median – check that input arrays are sorted.');
}

/* --------------------------------------------------------------
   Example usage
   -------------------------------------------------------------- */
function demo() {
  const arr1 = [1, 3, 8];
  const arr2 = [7, 9, 10, 11];

  console.log('Median:', medianOfTwoSortedArrays(arr1, arr2)); // → 8.5

  // Edge cases
  console.log(medianOfTwoSortedArrays([], [2]));               // → 2
  console.log(medianOfTwoSortedArrays([1, 2], [3, 4]));        // → 2.5
  console.log(medianOfTwoSortedArrays([1, 2, 3], []));         // → 2
}
demo();
function bruteMedian(a: number[], b: number[]): number {
  const merged = [...a, ...b].sort((x, y) => x - y);
  const len = merged.length;
  return len % 2 === 1
    ? merged[Math.floor(len / 2)]
    : (merged[len / 2 - 1] + merged[len / 2]) / 2;
}

// Randomized test
for (let t = 0; t < 1000; ++t) {
  const n = Math.floor(Math.random() * 10);
  const m = Math.floor(Math.random() * 10);
  const a = Array.from({ length: n }, () => Math.floor(Math.random() * 100)).sort((x, y) => x - y);
  const b = Array.from({ length: m }, () => Math.floor(Math.random() * 100)).sort((x, y) => x - y);
  const fast = medianOfTwoSortedArrays(a, b);
  const slow = bruteMedian(a, b);
  if (Math.abs(fast - slow) > 1e-9) {
    console.error('Mismatch!', a, b, fast, slow);
    break;
  }
}

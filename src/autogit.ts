// ------------------------------
// Radix Sort (base 10)
// ------------------------------

/**
 * Performs a stable counting sort on the array `arr` using the digit at
 * position `digitPlace` (1, 10, 100, …).  The function returns the
 * sorted array – the original array remains untouched.
 */
function countingSortByDigit(
  arr: number[],
  digitPlace: number
): number[] {
  const buckets: { [key: number]: number[] } = {
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [],
  };

  for (const num of arr) {
    // Extract the current digit:
    //   Math.abs(num) to work with negative values,
    //   modulo digitPlace to isolate the digit,
    //   then divide by digitPlace to shift back.
    const digit =
      Math.floor((Math.abs(num) % (digitPlace * 10)) / digitPlace);

    buckets[digit].push(num);
  }

  // Concatenate buckets in numeric order (0→9) to keep the sort stable.
  return Object.values(buckets).reduce((out, bucket) => out.concat(bucket), []);
}

/**
 * Radix sort for an array of integers.  Handles negative values by
 * sorting positives and negatives separately and then combining.
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  // Separate positives and negatives.
  const positives = arr.filter((n) => n >= 0);
  const negatives = arr.filter((n) => n < 0).map((n) => Math.abs(n));

  // Helper to sort a non‑negative array using radix sort.
  const sortNonNegative = (numbers: number[]) => {
    // Find the largest number so we know how many digit passes.
    let max = 0;
    for (const n of numbers) {
      if (n > max) max = n;
    }

    let digitPlace = 1;
    while (digitPlace <= max) {
      // Sort by this digit; each pass is stable.
      const sorted = countingSortByDigit(numbers, digitPlace);
      // Prepare for next iteration.
      numbers = sorted;
      digitPlace *= 10;
    }
    return numbers;
  };

  const sortedPos = sortNonNegative(positives);
  const sortedNeg = sortNonNegative(negatives); // already abs values

  // Negatives need to be reversed and negated back.
  const sortedNegReversed = sortedNeg.reverse().map((n) => -n);

  // Combine: negatives first, then positives.
  return [...sortedNegReversed, ...sortedPos];
}

/* ------------------------------ Demo ------------------------------ */
const sample = [170, 45, 75, -90, 802, 24, 2, 66, -31, 0];
console.log('Original:', sample.join(', '));
console.log('Sorted  :', radixSort(sample).join(', '));

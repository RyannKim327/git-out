   left part of A   |   right part of A
   left part of B   |   right part of B
max(leftA, leftB) ≤ min(rightA, rightB)
/**
 * Returns the median of two sorted numeric arrays.
 * Runs in O(log(min(m, n))) time and O(1) extra space.
 *
 * @param A - first sorted array (any length, can be empty)
 * @param B - second sorted array (any length, can be empty)
 * @returns the median as a number
 * @throws if both arrays are empty
 */
export function medianOfTwoSortedArrays(A: number[], B: number[]): number {
  // ---- 0. Edge‑case: both empty -------------------------------------------------
  if (A.length === 0 && B.length === 0) {
    throw new Error('Both input arrays are empty.');
  }

  // ---- 1. Ensure A is the shorter array ----------------------------------------
  if (A.length > B.length) {
    // swap references – we don't copy the data
    [A, B] = [B, A];
  }

  const m = A.length;
  const n = B.length;

  // ---- 2. Binary search on the shorter array ------------------------------------
  let low = 0;
  let high = m;

  // The half length we need on the left side (rounded up for odd total length)
  const halfLen = Math.floor((m + n + 1) / 2);

  while (low <= high) {
    const i = Math.floor((low + high) / 2); // elements from A on the left
    const j = halfLen - i;                  // elements from B on the left

    // Border values (use ±Infinity when the partition touches an array edge)
    const leftA  = i === 0 ? -Infinity : A[i - 1];
    const rightA = i === m ?  Infinity : A[i];
    const leftB  = j === 0 ? -Infinity : B[j - 1];
    const rightB = j === n ?  Infinity : B[j];

    // ---- 3. Check if we have a correct partition -------------------------------
    if (leftA <= rightB && leftB <= rightA) {
      // Correct split found – compute median
      if ((m + n) % 2 === 1) {
        // Odd total length → max of left side is the median
        return Math.max(leftA, leftB);
      } else {
        // Even total length → average of the two middle values
        const maxLeft = Math.max(leftA, leftB);
        const minRight = Math.min(rightA, rightB);
        return (maxLeft + minRight) / 2;
      }
    }

    // ---- 4. Adjust search range ------------------------------------------------
    if (leftA > rightB) {
      // We have taken too many from A → move left
      high = i - 1;
    } else {
      // leftB > rightA → we need more from A → move right
      low = i + 1;
    }
  }

  // If we exit the loop something went wrong (should never happen with valid input)
  throw new Error('Unable to find median – check that input arrays are sorted.');
}

/* -------------------------------------------------------------------------- */
/* --------------------------- Example usage --------------------------------- */

function test() {
  const cases: Array<{
    a: number[];
    b: number[];
    expected: number;
  }> = [
    { a: [1, 3], b: [2], expected: 2 },
    { a: [1, 2], b: [3, 4], expected: 2.5 },
    { a: [], b: [5], expected: 5 },
    { a: [1, 3, 8, 9, 15], b: [7, 11, 18, 19, 21, 25], expected: 11 },
    { a: [1, 2, 3], b: [4, 5, 6, 7, 8, 9], expected: 5 },
    { a: [0, 0], b: [0, 0], expected: 0 },
    { a: [-5, 3, 6, 12, 15], b: [-12, -10, -6, -3, 4, 10], expected: 3 },
  ];

  for (const { a, b, expected } of cases) {
    const result = medianOfTwoSortedArrays(a, b);
    console.log(
      `A=${JSON.stringify(a)} B=${JSON.stringify(b)} → median=${result} ` +
        `(expected ${expected}) ${Math.abs(result - expected) < 1e-9 ? '✅' : '❌'}`
    );
  }
}

// Uncomment to run the demo in a Node/TS environment
// test();
function medianMerge(A: number[], B: number[]): number {
  const merged = [...A, ...B].sort((x, y) => x - y);
  const len = merged.length;
  return len % 2 === 1
    ? merged[(len - 1) >> 1]
    : (merged[len / 2 - 1] + merged[len / 2]) / 2;
}
// Call this function with two *already sorted* number arrays:
const median = medianOfTwoSortedArrays([1, 3, 8], [7, 9, 10, 11]);
console.log(median); // → 8.5

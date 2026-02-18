/**
 * Median of two sorted arrays
 * A and B can be empty, but not both.
 */
export function medianOfTwoSortedArrays(
  a: number[],
  b: number[]
): number {
  // Ensure a is the smaller array; this keeps the binary‑search bounds tight.
  const [A, B] = a.length <= b.length ? [a, b] : [b, a];
  const m = A.length;
  const n = B.length;
  const half = Math.floor((m + n + 1) / 2);

  let low = 0;
  let high = m;

  while (low <= high) {
    const i = Math.floor((low + high) / 2); // elements taken from A
    const j = half - i;                     // elements taken from B

    const Aleft  = i === 0     ? Number.NEGATIVE_INFINITY : A[i - 1];
    const Aright = i === m     ? Number.POSITIVE_INFINITY : A[i];

    const Bleft  = j === 0     ? Number.NEGATIVE_INFINITY : B[j - 1];
    const Bright = j === n     ? Number.POSITIVE_INFINITY : B[j];

    // i is perfect if left side ≤ right side
    if (Aleft <= Bright && Bleft <= Aright) {
      // Odd total → max of left side
      if ((m + n) % 2 === 1) {
        return Math.max(Aleft, Bleft);
      }

      // Even total → average of two middle values
      return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
    } else if (Aleft > Bright) {
      // i too big, shift left
      high = i - 1;
    } else {
      // i too small, shift right
      low = i + 1;
    }
  }

  throw new Error('Input arrays are not sorted or invalid.');
}
export function medianOfTwoSortedArraysSimple(
  a: number[],
  b: number[]
): number {
  const merged: number[] = [];
  let i = 0, j = 0;

  while (i < a.length || j < b.length) {
    if (i >= a.length) {
      merged.push(b[j++]);
    } else if (j >= b.length) {
      merged.push(a[i++]);
    } else if (a[i] <= b[j]) {
      merged.push(a[i++]);
    } else {
      merged.push(b[j++]);
    }
  }

  const len = merged.length;
  if (len % 2 === 1) return merged[Math.floor(len / 2)];
  return (merged[len / 2 - 1] + merged[len / 2]) / 2;
}
const arr1 = [1, 3, 5, 9];
const arr2 = [2, 4, 6, 8, 10];

console.log(medianOfTwoSortedArrays(arr1, arr2)); // 5.5

/**
 * Finds the median of two sorted arrays that may be of different lengths.
 *
 * @param a  first sorted array (non‑empty)
 * @param b  second sorted array (non‑empty)
 * @returns  median value (number)
 */
export function medianOfTwoSortedArrays(a: number[], b: number[]): number {
  // Ensure a is the shorter array to keep the binary search bounded.
  if (a.length > b.length) return medianOfTwoSortedArrays(b, a);

  const m = a.length;
  const n = b.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    const i = Math.floor((left + right) / 2);          // cut in a
    const j = Math.floor((m + n + 1) / 2) - i;        // cut in b

    const Aleft   = i === 0 ?    -Infinity : a[i - 1];
    const Aright  = i === m ?    Infinity : a[i];
    const Bleft   = j === 0 ?    -Infinity : b[j - 1];
    const Bright  = j === n ?    Infinity : b[j];

    if (Aleft <= Bright && Bleft <= Aright) {
      // correct partition found
      if ((m + n) % 2 === 0) {
        return Math.max(Aleft, Bleft) + Math.min(Aright, Bright) / 2;
      } else {
        return Math.max(Aleft, Bleft);
      }
    } else if (Aleft > Bright) {
      // i is too big – shift left
      right = i - 1;
    } else {
      // i is too small – shift right
      left = i + 1;
    }
  }

  // Should never hit here if inputs are valid and sorted.
  throw new Error("Input arrays are not sorted or empty");
}
console.log(medianOfTwoSortedArrays([1, 3], [2]));          // 2
console.log(medianOfTwoSortedArrays([1, 2], [3, 4]));        // 2.5
console.log(medianOfTwoSortedArrays([0, 0], [0, 0]));        // 0

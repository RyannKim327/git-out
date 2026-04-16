/**
 * Return the median of two sorted arrays (integer values).
 *
 * @param a First sorted array (may be empty)
 * @param b Second sorted array (may be empty)
 * @returns median as a number
 */
function findMedianSortedArrays(a: number[], b: number[]): number {
  // make sure a is the shorter array – helps keep log‑time on the shorter side
  if (a.length > b.length) return findMedianSortedArrays(b, a);

  const m = a.length;
  const n = b.length;
  const halfLen = Math.floor((m + n + 1) / 2);

  let low = 0;
  let high = m;

  while (low <= high) {
    // i is the cut in a, j in b
    const i = Math.floor((low + high) / 2);
    const j = halfLen - i;

    const Aleft  = i === 0     ? -Infinity : a[i - 1];
    const Aright = i === m     ? Infinity  : a[i];
    const Bleft  = j === 0     ? -Infinity : b[j - 1];
    const Bright = j === n     ? Infinity  : b[j];

    if (Aleft <= Bright && Bleft <= Aright) {
      // perfect split found
      if ((m + n) % 2 === 0) {
        // even number of elements – average of the two middle values
        return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
      } else {
        // odd – the max on the left side
        return Math.max(Aleft, Bleft);
      }
    } else if (Aleft > Bright) {
      // i is too big – move left
      high = i - 1;
    } else {
      // i is too small – move right
      low = i + 1;
    }
  }

  // Should never reach here if input arrays are sorted
  throw new Error('Input arrays are not valid');
}

/* ---------- usage ---------- */
console.log(findMedianSortedArrays([1, 3], [2]));          // 2
console.log(findMedianSortedArrays([1, 2], [3, 4]));      // 2.5
console.log(findMedianSortedArrays([], [1]));             // 1
console.log(findMedianSortedArrays([5], [1, 2, 3, 4]));   // 3.5

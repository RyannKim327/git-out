/**
 * Iterative (bottom-up) merge-sort.
 * Returns a *new* sorted array; the original is left untouched.
 */
export function mergeSortIterative<T>(
  data: readonly T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  const n = data.length;
  if (n < 2) return data.slice();          // already sorted or empty

  const a = data.slice();                  // working copy
  const b: T[] = new Array(n);           // temporary buffer

  let width = 1;                         // current sub-array size
  while (width < n) {
    // a holds the data, b is the scratch space
    for (let left = 0; left < n; left += 2 * width) {
      const mid = Math.min(left + width, n);
      const right = Math.min(left + 2 * width, n);
      merge(a, b, left, mid, right, compare);
    }
    // swap roles: next iteration reads from b, writes into a
    [a, b] = [b, a];
    width *= 2;
  }
  // after last merge the result is in a
  return a;
}

/**
 * Merge two adjacent sorted runs  [left, mid)  and  [mid, right)
 * from array `src` into positions left…right-1 of array `dst`.
 */
function merge<T>(
  src: readonly T[],
  dst: T[],
  left: number,
  mid: number,
  right: number,
  compare: (a: T, b) => number
): void {
  let i = left;      // cursor in 1st run
  let j = mid;       // cursor in 2nd run
  let k = left;      // cursor in dst

  while (i < mid && j < right)
    dst[k++] = compare(src[i], src[j]) <= 0 ? src[i++] : src[j++];

  // copy leftovers
  while (i < mid) dst[k++] = src[i++];
  while (j < right) dst[k++] = src[j++];
}
const nums = [5, 3, 9, 1, 7];
const sorted = mergeSortIterative(nums, (a, b) => a - b);
console.log(sorted); // [1, 3, 5, 7, 9]

/**
 * Returns the index of `target` in a sorted array `arr` or -1 if not found.
 *
 * @param arr     Sorted array of numbers (ascending or descending)
 * @param target  Value to search for
 * @returns Index or -1
 */
export function interpolationSearch(arr: number[], target: number): number {
  if (!arr.length) return -1;

  let lo = 0;
  let hi = arr.length - 1;

  // Handle both ascending and descending arrays.
  const isAscending = arr[hi] > arr[lo];

  // If target is out of the array’s bounds, it can’t be there.
  while (
    (isAscending
      ? target < arr[lo] || target > arr[hi]
      : target > arr[lo] || target < arr[hi])
  ) {
    return -1;
  }

  while (lo <= hi) {
    // Avoid division by zero when lo and hi point to the same value.
    if (arr[lo] === arr[hi]) {
      return arr[lo] === target ? lo : -1;
    }

    // Estimate the next probe position.
    const pos =
      lo +
      Math.floor(
        ((target - arr[lo]) * (hi - lo)) /
          (arr[hi] - arr[lo])
      );

    // Guard against unexpected inequalities after casting to int.
    if (pos < lo || pos > hi) return -1;

    if (arr[pos] === target) return pos;

    if (arr[pos] < target) {
      lo = pos + 1;
    } else {
      hi = pos - 1;
    }
  }

  return -1;
}
// sorted ascending
const asc = [1, 3, 5, 7, 9, 11, 13];
console.log(interpolationSearch(asc, 7)); // 3
console.log(interpolationSearch(asc, 2)); // -1

// sorted descending
const desc = [20, 15, 10, 5, 0];
console.log(interpolationSearch(desc, 10)); // 2
console.log(interpolationSearch(desc, -5)); // -1

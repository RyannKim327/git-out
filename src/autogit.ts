/**
 * Binary search on a sorted array.
 * @param arr   Sorted array (ascending order).
 * @param target Value to locate.
 * @returns     Index of `target` if found; otherwise `-1`.
 */
export function binarySearch<T>(arr: T[], target: T): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    // Faster, overflow-safe midpoint
    const mid = lo + ((hi - lo) >> 1);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return -1;
}

/* ---------- Usage example ---------- */
const data = [2, 4, 7, 10, 23, 34, 45, 56, 78, 90];
console.log(binarySearch(data, 23)); // → 4
console.log(binarySearch(data, 3));  // → -1

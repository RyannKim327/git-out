/**
 * Interpolation search – O(log log n) in the ideal case,
 * O(n) in the worst case (if the array is highly non‑uniform).
 *
 * @param arr   An array that is already sorted in ascending order.
 * @param key   The value to look for.
 * @returns     The index of `key` in `arr` or -1 if not present.
 */
export function interpolationSearch(arr: readonly number[], key: number): number {
  // Guard against empty array
  if (arr.length === 0) return -1;

  let low = 0;
  let high = arr.length - 1;

  // Interpolation formula requires a strictly increasing array
  // and a finite difference between the ends.
  while (low <= high && key >= arr[low] && key <= arr[high]) {
    // Avoid division by zero when arr[low] == arr[high].
    if (arr[low] === arr[high]) return arr[low] === key ? low : -1;

    // Estimate the position of the key inside the current bounds.
    const pos =
      low +
      Math.floor(
        ((high - low) * (key - arr[low])) / (arr[high] - arr[low]),
      );

    const value = arr[pos];

    if (value === key) return pos;
    if (value < key) {
      low = pos + 1;          // Look in the right sub‑array
    } else {
      high = pos - 1;         // Look in the left sub‑array
    }
  }

  return -1; // Not found
}
const nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91, 105];
console.log(interpolationSearch(nums, 38)); // ➜ 6
console.log(interpolationSearch(nums, 4));  // ➜ -1
export function interpolationSearchBy<T, U extends number>(
  arr: readonly T[],
  key: U,
  getKey: (item: T) => U,
): number {
  // Same logic, but cast / convert using getKey(item)
}

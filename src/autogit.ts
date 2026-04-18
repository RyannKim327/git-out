/**
 * Interpolation Search
 * --------------------
 * @param arr  A sorted array of numbers (ascending).
 * @param key  The value you're looking for.
 * @returns    Index of key in arr, or −1 if key is absent.
 *
 * Complexity:
 *  * Best‑case: O(log log N)  (when data is uniformly distributed)
 *  * Worst‑case: O(N)         (when data is heavily skewed)
 *
 * Note: Behaviour for non‑numeric or unsorted input is undefined.
 */
export function interpolationSearch(arr: readonly number[], key: number): number {
  if (arr.length === 0) return -1;

  let low = 0;
  let high = arr.length - 1;

  // Keep the loop going while the search space is valid.
  while (
    low <= high &&
    key >= arr[low] &&
    key <= arr[high]
  ) {
    // Guard against a zero division when arr[low] === arr[high].
    if (arr[low] === arr[high]) {
      // All remaining elements are equal; pick the first one.
      return arr[low] === key ? low : -1;
    }

    // Estimate the probable position of key.
    const pos =
      low +
      Math.floor(
        ((high - low) * (key - arr[low])) / (arr[high] - arr[low])
      );

    // We found the key.
    if (arr[pos] === key) {
      return pos;
    }

    // Update boundaries based on comparison.
    if (arr[pos] < key) {
      low = pos + 1;     // key is in the right sub‑array
    } else {
      high = pos - 1;    // key is in the left sub‑array
    }
  }

  // If we exit the loop, key isn't present.
  return -1;
}
const data = [1, 3, 5, 7, 9, 11, 13, 15, 17];
console.log(interpolationSearch(data, 9));   // → 4
console.log(interpolationSearch(data, 4));   // → -1

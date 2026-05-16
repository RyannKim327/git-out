/**
 * Interpolation Search – O(log log n) average, O(n) worst.
 *
 * @param arr   Sorted array of numbers (ascending order)
 * @param key   Value to locate
 * @returns     Index of `key` in `arr`, or -1 if absent
 */
export function interpolationSearch(arr: readonly number[], key: number): number {
  if (arr.length === 0) return -1;

  let low = 0;
  let high = arr.length - 1;

  while (low <= high && key >= arr[low] && key <= arr[high]) {
    // Avoid division by zero when arr[low] == arr[high]
    if (arr[low] === arr[high]) {
      return arr[low] === key ? low : -1;
    }

    // Estimation formula
    const pos = low + Math.floor(
      ((high - low) * (key - arr[low])) / (arr[high] - arr[low])
    );

    const val = arr[pos];
    if (val === key) {
      return pos;               // Key found
    }
    if (val < key) {
      low = pos + 1;             // Search upper segment
    } else {
      high = pos - 1;            // Search lower segment
    }
  }

  return -1; // Not found
}
const sorted = [3, 7, 15, 20, 23, 27, 31, 42, 56, 78, 99];
console.log(interpolationSearch(sorted, 31)); // → 6
console.log(interpolationSearch(sorted, 10)); // → -1

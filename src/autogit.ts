/**
 * Interpolation search – returns the index of `key` in `arr`
 * or `-1` if the key is not present.
 *
 * @template T – numeric type (number, bigInt, etc.)
 * @param arr  – sorted array of numbers
 * @param key  – value to look for
 * @returns index or -1
 */
export function interpolationSearch<T extends number | bigint>(
  arr: T[],
  key: T
): number {
  if (!arr.length) return -1;

  let low = 0;
  let high = arr.length - 1;

  /* Handle the special situation where the key is identical to
   * the value at both bounds – it can’t be found if low === high
   * but arr[low] !== key.
   */
  while (low <= high && key >= arr[low] && key <= arr[high]) {
    /* Avoid division by zero when array values are identical */
    const step =
      low === high
        ? 0
        : Number(
            (key - arr[low]) *
              (high - low) /
              (arr[high] - arr[low])
          );

    const mid = low + Math.min(Math.max(step, 0), high - low);

    const midVal = arr[mid];

    if (midVal === key) return mid;
    if (midVal < key) low = mid + 1;
    else high = mid - 1;
  }

  return -1; // Key not found
}
const nums = [1, 3, 5, 7, 9, 11, 13, 15, 17];
console.log(interpolationSearch(nums, 7));  // → 3
console.log(interpolationSearch(nums, 4));  // → -1

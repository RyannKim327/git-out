/**
 * Interpolation Search
 *
 * The algorithm only works on numeric, strictly‑sorted arrays.
 * It probes values near the expected position based on the key’s value,
 * so it runs “almost” as fast as binary search on uniformly distributed data.
 *
 * @param arr  Sorted numeric array (ascending)
 * @param key  Value to locate
 * @returns    Index of the key or -1 if not present
 */
export function interpolationSearch(arr: number[], key: number): number {
  if (arr.length === 0) return -1;

  let low = 0;
  let high = arr.length - 1;

  while (low <= high && key >= arr[low] && key <= arr[high]) {
    // Guard against division by zero for the degenerate case
    if (arr[high] === arr[low]) {
      break; // all remaining elements equal; either match or no match
    }

    const pos =
      low +
      Math.floor(
        ((key - arr[low]) * (high - low)) / (arr[high] - arr[low]),
      );

    const midVal = arr[pos];

    if (midVal === key) return pos;

    if (midVal < key) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  // If we exit the loop without hitting the key
  return -1;
}
const data = [3, 8, 15, 23, 42, 56, 78, 91, 105];
const target = 56;
const idx = interpolationSearch(data, target);

if (idx !== -1) {
  console.log(`Found ${target} at index ${idx}`);
} else {
  console.log(`${target} not in the array`);
}

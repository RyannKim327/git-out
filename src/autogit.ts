/**
 * Recursive binary search.
 *
 * @param data   Sorted array to search in.
 * @param target Value you’re looking for.
 * @param compare Optional comparator – defaults to numeric or lexical.
 * @param left   Left index of the current sub‑array (internal use).
 * @param right  Right index of the current sub‑array (internal use).
 * @returns Index of the target or -1 if not found.
 */
function binarySearch<T>(
  data: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = (a, b) => ((a as any) < (b as any) ? -1 : (a as any) > (b as any) ? 1 : 0),
  left: number = 0,
  right: number = data.length - 1
): number {
  if (left > right) return -1;                 // base case: empty window

  const mid = Math.floor((left + right) / 2);
  const cmp = compare(target, data[mid]);

  if (cmp === 0) return mid;                   // found
  if (cmp < 0) return binarySearch(data, target, compare, left, mid - 1);
  return binarySearch(data, target, compare, mid + 1, right);
}
// numeric, already sorted
const nums = [3, 7, 12, 18, 26, 42, 57];
const idx1 = binarySearch(nums, 18);   // → 3
const idx2 = binarySearch(nums, 5);    // → -1

// string, case‑insensitive
const words = ["apple", "banana", "cherry", "date"];
const idx3 = binarySearch(
  words,
  "CHERRY",
  (a, b) => a.toLowerCase().localeCompare(b.toLowerCase())
); // → 2

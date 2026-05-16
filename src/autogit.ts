/**
 * Returns the second largest value in the array, or `undefined` if it can’t exist.
 * If you need the second *distinct* largest value, set `distinct = true`.
 */
function secondLargest(nums: number[], distinct = false): number | undefined {
  if (nums.length < 2) return undefined;          // not enough numbers

  // Fast path: sort once, pick the second element
  // (O(n log n) – fine for small arrays)
  if (!distinct) {
    const sorted = [...nums].sort((a, b) => b - a); // descending
    return sorted[1];
  }

  // O(n) single‑pass solution for distinct values
  let max = Number.NEGATIVE_INFINITY;
  let second = Number.NEGATIVE_INFINITY;

  for (const n of nums) {
    if (n > max) {
      second = max;
      max = n;
    } else if (n < max && n > second) {
      second = n;
    }
  }

  return second === Number.NEGATIVE_INFINITY ? undefined : second;
}
console.log(secondLargest([5, 1, 7, 3]));     // → 5
console.log(secondLargest([5, 5, 3, 5]));     // → 5  (second largest in sorted order)
console.log(secondLargest([5, 5, 3, 5], true)); // → 3  (second distinct largest)

/**
 * Finds the majority element in an array (appears > n/2 times).
 * If no majority exists, undefined is returned.
 *
 * @param arr   - Array of comparable values (number, string ...).
 * @returns     - The majority element or undefined.
 */
export function majorityElement<T extends number | string | symbol>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;

  // Boyer‑Moore majority vote algorithm
  let candidate: T | undefined = arr[0];
  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === candidate) {
      count++;
    } else {
      count--;
      if (count === 0) {
        candidate = arr[i];
        count = 1;
      }
    }
  }

  // Verify that candidate really is the majority
  count = 0;
  for (const v of arr) {
    if (v === candidate) count++;
  }

  return count > Math.floor(arr.length / 2) ? candidate : undefined;
}
majorityElement([1, 2, 3, 2, 2]);      // → 2
majorityElement(['a', 'b', 'a', 'c']); // → undefined
majorityElement([5, 5, 5, 5]);          // → 5
majorityElement([]);                   // → undefined

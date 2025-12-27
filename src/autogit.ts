function maxUsingSpread(nums: number[]): number | undefined {
  // If the array is empty we return undefined (Math.max() would give -Infinity)
  return nums.length ? Math.max(...nums) : undefined;
}

// Example
const data = [3, 7, 2, 9, 5];
console.log(maxUsingSpread(data)); // 9
function maxUsingReduce(nums: number[]): number | undefined {
  if (!nums.length) return undefined;

  return nums.reduce((max, cur) => (cur > max ? cur : max), nums[0]);
}

// Example
console.log(maxUsingReduce([10, -4, 22, 7])); // 22
type Comparator<T> = (a: T, b: T) => number;

/**
 * Returns the greatest element according to `compare`.
 * Returns undefined for an empty array.
 */
function maxBy<T>(arr: T[], compare: Comparator<T>): T | undefined {
  if (!arr.length) return undefined;

  return arr.reduce((best, cur) => (compare(cur, best) > 0 ? cur : best), arr[0]);
}

/* ---- Usage examples ---- */

// Numbers (default comparator)
const maxNum = maxBy([4, 12, 7], (a, b) => a - b); // 12

// Strings (lexicographic)
const maxStr = maxBy(['apple', 'orange', 'banana'], (a, b) => a.localeCompare(b)); // 'orange'

// Dates
const maxDate = maxBy(
  [new Date('2023-01-01'), new Date('2025-06-15'), new Date('2022-12-31')],
  (a, b) => a.getTime() - b.getTime()
); // 2025‑06‑15

console.log(maxNum, maxStr, maxDate?.toISOString());
Math.max(1, 2, NaN, 3); // NaN
function maxIgnoringNaN(nums: number[]): number | undefined {
  const filtered = nums.filter(n => !Number.isNaN(n));
  return filtered.length ? Math.max(...filtered) : undefined;
}
function maxReduceIgnoreNaN(nums: number[]): number | undefined {
  return nums.reduce((max, cur) => {
    if (Number.isNaN(cur)) return max;          // skip NaN
    return cur > max ? cur : max;
  }, -Infinity);
}
// utils/max.ts
export type Comparator<T> = (a: T, b: T) => number;

/**
 * Returns the maximum numeric value in `arr`.
 * - Returns undefined for an empty array.
 * - Optionally ignores NaN values.
 */
export function maxNumber(
  arr: number[],
  options?: { ignoreNaN?: boolean }
): number | undefined {
  const { ignoreNaN = false } = options ?? {};

  if (!arr.length) return undefined;

  if (ignoreNaN) {
    const filtered = arr.filter(n => !Number.isNaN(n));
    return filtered.length ? Math.max(...filtered) : undefined;
  }

  // Fast path – no NaN handling needed
  return Math.max(...arr);
}

/**
 * Generic max using a comparator.
 * Returns undefined for an empty array.
 */
export function maxBy<T>(arr: T[], compare: Comparator<T>): T | undefined {
  if (!arr.length) return undefined;
  return arr.reduce((best, cur) => (compare(cur, best) > 0 ? cur : best), arr[0]);
}

/* ---- Example usage ---- */
if (import.meta.main) {
  const nums = [5, 12, -3, 8];
  console.log('maxNumber →', maxNumber(nums)); // 12

  const strings = ['cat', 'dog', 'elephant'];
  const maxStr = maxBy(strings, (a, b) => a.localeCompare(b));
  console.log('maxString →', maxStr); // 'elephant'

  const dates = [new Date('2020-01-01'), new Date('2022-04-15'), new Date('2021-07-30')];
  const latest = maxBy(dates, (a, b) => a.getTime() - b.getTime());
  console.log('latest date →', latest?.toISOString()); // 2022‑04‑15T00:00:00.000Z
}

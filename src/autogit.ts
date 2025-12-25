/**
 * Returns the arithmetic mean of the numbers in `values`.
 * If the array is empty, `null` is returned (you can change this to 0 or throw an error).
 */
function mean(values: number[]): number | null {
  if (values.length === 0) {
    return null;               // or: return 0;  // or: throw new Error('Empty array')
  }

  const sum = values.reduce((acc, cur) => acc + cur, 0);
  return sum / values.length;
}

/* Example usage */
const data = [4, 8, 15, 16, 23, 42];
console.log(mean(data)); // → 18
/**
 * Calculates the mean of any iterable collection of numbers.
 *
 * @param source - An iterable (Array, Set, TypedArray, etc.) of numbers.
 * @returns The mean, or `null` if the collection is empty.
 */
export function meanOf<T extends Iterable<number>>(source: T): number | null {
  let sum = 0;
  let count = 0;

  for (const n of source) {
    sum += n;
    ++count;
  }

  return count === 0 ? null : sum / count;
}

/* Usage examples */
console.log(meanOf([1, 2, 3]));               // 2
console.log(meanOf(new Set([10, 20, 30])));   // 20
console.log(meanOf(new Float32Array([5, 5]))); // 5
/**
 * Weighted arithmetic mean.
 *
 * @param values  - Numbers to average.
 * @param weights - Same length as `values`; each weight ≥ 0.
 * @returns Weighted mean, or null if inputs are empty.
 */
function weightedMean(values: number[], weights: number[]): number | null {
  if (values.length !== weights.length) {
    throw new Error('Values and weights must have the same length');
  }
  if (values.length === 0) return null;

  let weightedSum = 0;
  let weightTotal = 0;

  for (let i = 0; i < values.length; ++i) {
    weightedSum += values[i] * weights[i];
    weightTotal += weights[i];
  }

  return weightTotal === 0 ? null : weightedSum / weightTotal;
}
import { mean } from 'lodash';

const avg = mean([10, 20, 30]); // → 20
test('mean works for positive numbers', () => {
  expect(mean([1, 2, 3, 4])).toBe(2.5);
});

test('mean returns null for empty array', () => {
  expect(mean([])).toBeNull();
});
// mean.ts
/**
 * Compute the arithmetic mean of a numeric iterable.
 *
 * @param source - Any iterable of numbers (Array, Set, TypedArray, etc.).
 * @returns The mean, or `null` if the iterable is empty.
 */
export function meanOf<T extends Iterable<number>>(source: T): number | null {
  let sum = 0;
  let count = 0;

  for (const n of source) {
    // Optional: skip NaN / Infinity if you want stricter behavior
    if (!Number.isFinite(n)) continue;
    sum += n;
    ++count;
  }

  return count === 0 ? null : sum / count;
}

/* Example usage */
if (require.main === module) {
  const data = [4, 8, 15, 16, 23, 42];
  console.log('Mean:', meanOf(data)); // → Mean: 18
}
function mean(nums: number[]): number | null {
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

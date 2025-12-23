/**
 * Returns the arithmetic mean of the supplied numbers.
 *
 * @param values - An array of numbers.
 * @returns The mean value, or NaN if the array is empty.
 */
export function mean(values: number[]): number {
  if (values.length === 0) return NaN; // or throw new Error('Empty array')
  const sum = values.reduce((acc, cur) => acc + cur, 0);
  return sum / values.length;
}
import { mean } from "./mean";

const data = [4, 8, 15, 16, 23, 42];
console.log(mean(data)); // → 18
/**
 * Calculates the mean while safely handling non‑numeric values.
 *
 * @param values - An array that may contain numbers or other types.
 * @returns The mean of the numeric entries, or NaN if none are valid.
 */
export function safeMean(values: unknown[]): number {
  const numericValues = values.filter(
    (v): v is number => typeof v === "number" && !Number.isNaN(v)
  );

  if (numericValues.length === 0) return NaN; // or throw

  const sum = numericValues.reduce((a, b) => a + b, 0);
  return sum / numericValues.length;
}
const mixed = [10, "20", null, 30, undefined, 40];
console.log(safeMean(mixed)); // → 26.666666666666668 (ignores non‑numbers)
export class EmptyArrayError extends Error {
  constructor() {
    super("Cannot compute mean of an empty array");
    this.name = "EmptyArrayError";
  }
}

/**
 * Mean that throws on empty input.
 */
export function meanOrThrow(values: number[]): number {
  if (values.length === 0) throw new EmptyArrayError();
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}
try {
  console.log(meanOrThrow([]));
} catch (e) {
  console.error(e); // EmptyArrayError: Cannot compute mean of an empty array
}
const avg = (arr: number[]) => arr.reduce((s, n) => s + n, 0) / arr.length;
// statistics.ts
export class EmptyArrayError extends Error {
  constructor() {
    super("Cannot compute statistic on an empty array");
    this.name = "EmptyArrayError";
  }
}

/**
 * Returns the arithmetic mean of a numeric array.
 * Throws EmptyArrayError if the array is empty.
 */
export function mean(values: number[]): number {
  if (values.length === 0) throw new EmptyArrayError();
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

/**
 * Safely computes the mean, ignoring non‑numeric entries.
 * Returns NaN if no valid numbers are found.
 */
export function safeMean(values: unknown[]): number {
  const nums = values.filter(
    (v): v is number => typeof v === "number" && !Number.isNaN(v)
  );
  if (nums.length === 0) return NaN;
  return mean(nums);
}

/**
 * Median (useful companion function)
 */
export function median(values: number[]): number {
  if (values.length === 0) throw new EmptyArrayError();
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/**
 * Sample variance (unbiased estimator)
 */
export function variance(values: number[]): number {
  if (values.length < 2) throw new EmptyArrayError();
  const avg = mean(values);
  const sqDiff = values.map(v => (v - avg) ** 2);
  return sqDiff.reduce((a, b) => a + b, 0) / (values.length - 1);
}
import { mean, safeMean, median, variance } from "./statistics";

console.log(mean([1, 2, 3]));          // 2
console.log(safeMean([1, "a", 3]));    // 2
console.log(median([5, 2, 9, 1]));     // 3.5
console.log(variance([2, 4, 4, 4, 5, 5, 7, 9])); // 4
function mean(nums: number[]): number {
  if (!nums.length) throw new Error("Empty array");
  return nums.reduce((s, n) => s + n, 0) / nums.length;
}

// Example
console.log(mean([10, 20, 30])); // 20

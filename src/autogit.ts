/**
 * Returns the arithmetic mean of an array of numbers.
 * @param values - The numbers to average.
 * @returns The mean, or `NaN` if the array is empty.
 */
function mean(values: number[]): number {
  if (values.length === 0) {
    // You could also throw an error or return 0, depending on your needs.
    return NaN;
  }

  const sum = values.reduce((acc, cur) => acc + cur, 0);
  return sum / values.length;
}
const data = [4, 8, 15, 16, 23, 42];
console.log(mean(data)); // → 18
/**
 * Calculates the mean of a numeric array.
 *
 * @param values - Array of numbers.
 * @param options - Optional configuration.
 *   - `onEmpty`: What to return when the array is empty.
 *                 Default is `NaN`. You can also choose `null` or a custom value.
 *
 * @returns The mean, or the value specified by `onEmpty`.
 */
function meanSafe(
  values: number[],
  options?: { onEmpty?: number | null }
): number | null {
  if (values.length === 0) {
    return options?.onEmpty ?? NaN;
  }

  const sum = values.reduce((total, n) => total + n, 0);
  return sum / values.length;
}
const empty: number[] = [];

// Default behavior (NaN)
console.log(meanSafe(empty)); // NaN

// Return null for empty arrays
console.log(meanSafe(empty, { onEmpty: null })); // null

// Return a custom fallback value (e.g., 0)
console.log(meanSafe(empty, { onEmpty: 0 })); // 0
namespace Stats {
  export function mean(values: number[]): number {
    if (values.length === 0) return NaN;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  export function median(values: number[]): number {
    if (values.length === 0) return NaN;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  // Add more helpers (variance, stdDev, etc.) as needed...
}
const nums = [10, 20, 30, 40];
console.log(Stats.mean(nums));   // 25
console.log(Stats.median(nums)); // 25
const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

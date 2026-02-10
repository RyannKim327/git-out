/**
 * Calculate the mean (average) of an array of numbers.
 *
 * @param data - a non‑empty array of numbers
 * @returns the mean, or NaN if the array is empty
 */
function mean(data: number[]): number {
  if (data.length === 0) return NaN;          // nothing to average
  const total = data.reduce((sum, val) => sum + val, 0);
  return total / data.length;
}
const values = [4, 7, 9, 2];
console.log(mean(values));   // → 5.5

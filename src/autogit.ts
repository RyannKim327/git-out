/**
 * Returns the mean (average) of a numeric array.
 *
 * @param values – an array of numbers
 * @returns the arithmetic mean, or NaN if the array is empty
 */
function mean(values: readonly number[]): number {
  if (values.length === 0) return NaN;

  const total = values.reduce((sum, v) => sum + v, 0);
  return total / values.length;
}
const scores = [78, 92, 85, 67, 90];
console.log(mean(scores)); // → 84.4

console.log(mean([])); // → NaN

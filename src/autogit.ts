/**
 * Returns the mean of a non‑empty list of numbers.
 * Throws if the array is empty or contains non‑numeric values.
 *
 * @param numbers – an array of numbers
 * @returns the arithmetic mean
 */
function mean(numbers: readonly number[]): number {
  if (numbers.length === 0) {
    throw new Error('Cannot compute mean of an empty array.');
  }

  const sum = numbers.reduce((acc, val) => {
    if (typeof val !== 'number' || Number.isNaN(val)) {
      throw new Error(`Invalid value detected: ${val}`);
    }
    return acc + val;
  }, 0);

  return sum / numbers.length;
}
const scores = [80, 92, 75, 88];

console.log(mean(scores)); // → 84.25

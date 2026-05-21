/**
 * Returns the arithmetic mean of a numeric array.
 *
 * @param values – An array of numbers.
 * @throws {Error} If the array is empty.
 */
function mean(values: number[]): number {
  if (values.length === 0) {
    throw new Error("Cannot compute the mean of an empty array");
  }

  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
}
const data = [10, 20, 30, 40, 50];
console.log(mean(data)); // 30

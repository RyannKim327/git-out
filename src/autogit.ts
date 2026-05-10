/**
 * Return the arithmetic mean of an array of numbers.
 * @param values – the numbers to average
 * @returns the mean, or `null` if the array is empty
 */
function mean(values: number[]): number | null {
  if (values.length === 0) return null;

  const total = values.reduce((sum, v) => sum + v, 0);
  return total / values.length;
}
const grades = [88, 92, 76, 81, 95];

console.log(mean(grades)); // 86
console.log(mean([]));     // null

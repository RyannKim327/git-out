/**
 * Returns the mean (average) of an array of numbers.
 * If the array is empty, it throws an error; you can change that behavior if you prefer.
 */
function mean(nums: number[]): number {
  if (nums.length === 0) {
    throw new Error("Cannot compute the mean of an empty array");
  }

  const sum = nums.reduce((acc, v) => acc + v, 0);
  return sum / nums.length;
}
const values = [4, 8, 15, 16, 23, 42];
console.log(mean(values)); // 18.833333333333332
function meanWhenPossible(nums: number[]): number {
  if (nums.length === 0) {
    return NaN;
  }
  return nums.reduce((acc, v) => acc + v, 0) / nums.length;
}
console.assert(mean([2, 4, 6]) === 4, "The mean should be 4");

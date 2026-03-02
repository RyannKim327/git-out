function maxOfArray(nums: number[]): number | undefined {
  if (nums.length === 0) return undefined;   // or throw an error if you prefer
  return Math.max(...nums);
}
function maxOfArray(nums: number[]): number | undefined {
  if (nums.length === 0) return undefined;
  return nums.reduce((max, n) => (n > max ? n : max), nums[0]);
}
function maxOfArray(nums: number[]): number | undefined {
  if (nums.length === 0) return undefined;

  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  return max;
}
const myNumbers = [12, 7, 22, 5, 18];
console.log(maxOfArray(myNumbers)); // 22
function maxWithFallback(nums: number[], fallback = 0): number {
  return nums.length > 0
    ? nums.reduce((a, b) => Math.max(a, b))
    : fallback;
}

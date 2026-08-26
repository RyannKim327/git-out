function mean(nums: number[]): number {
  if (nums.length === 0) return NaN;          // or maybe 0, depending on your preference
  const total = nums.reduce((sum, n) => sum + n, 0);
  return total / nums.length;
}
function mean(nums: number[]): number {
  if (nums.length === 0) return NaN;
  let sum = 0;
  for (const n of nums) {
    sum += n;
  }
  return sum / nums.length;
}
function mean<T extends number>(nums: T[]): number {
  if (nums.length === 0) return NaN;
  return nums.reduce((s, n) => s + n, 0) / nums.length;
}
function meanSafe(nums: Array<number | null | undefined>): number {
  const cleaned = nums.filter((n): n is number => typeof n === "number");
  if (cleaned.length === 0) return NaN;
  return cleaned.reduce((s, n) => s + n, 0) / cleaned.length;
}
const mean = (nums: number[]) => nums.length ? nums.reduce((s, n) => s + n, 0) / nums.length : NaN;
console.log(mean([2, 4, 6]));   // 4
console.log(mean([]));          // NaN
console.log(meanSafe([1, 2, null, 4])); // 2.333...

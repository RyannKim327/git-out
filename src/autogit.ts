function mean(nums: number[]): number {
  if (nums.length === 0) return NaN;          // or throw an Error
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}

// usage
const data = [3, 5, 7, 9];
console.log(mean(data)); // 6

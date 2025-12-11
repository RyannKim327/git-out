function mean(nums: number[]): number | undefined {
  if (nums.length === 0) return undefined;
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}
mean([1, 2, 3, 4]); // 2.5
mean([]);           // undefined
function meanOrThrow(nums: number[]): number {
  if (nums.length === 0) throw new Error("Cannot compute mean of an empty array");
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}
function meanIter(nums: number[]): number | undefined {
  if (nums.length === 0) return undefined;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum / nums.length;
}
function meanFromIterable(iterable: Iterable<number>): number | undefined {
  let sum = 0;
  let count = 0;
  for (const n of iterable) {
    sum += n;
    count++;
  }
  return count === 0 ? undefined : sum / count;
}

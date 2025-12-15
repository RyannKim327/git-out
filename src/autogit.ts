const mean = (nums: number[]): number =>
  nums.length === 0 ? NaN : nums.reduce((a, b) => a + b, 0) / nums.length;

/* ---------- usage ---------- */
console.log(mean([2, 4, 6])); // 4
console.log(mean([]));        // NaN  (or throw if you prefer)
throw new Error("mean of empty list is undefined");

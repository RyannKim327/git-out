function mean(values: number[]): number {
  if (values.length === 0) return NaN;          // or throw, your choice
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

/* ---- usage ---- */
const nums = [3, 7, 8, 10];
console.log(mean(nums)); // 7

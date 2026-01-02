function mean(values: number[]): number {
  if (values.length === 0) return NaN;          // or throw, depending on your needs
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

// usage
const nums = [3, 5, 7, 9];
console.log(mean(nums)); // 6

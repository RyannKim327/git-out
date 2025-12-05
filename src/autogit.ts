function mean(numbers: number[]): number {
  if (numbers.length === 0) throw new Error('mean of empty array is undefined');
  return numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
}

/* ---- usage ---- */
const data = [3, 7, 9, 11];
console.log(mean(data)); // 7.5

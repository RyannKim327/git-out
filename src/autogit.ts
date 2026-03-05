const numbers = [3, 5, 7, 9];
const mean = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
console.log(mean); // 6
function mean(arr: number[]): number {
  if (arr.length === 0) throw new Error('Cannot compute mean of empty array');

  const total = arr.reduce((sum, val) => sum + val, 0);
  return total / arr.length;
}

// Usage
const avg = mean([10, 20, 30]); // 20

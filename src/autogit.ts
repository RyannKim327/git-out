// 1. One-liner
const mean = (arr: number[]): number =>
  arr.reduce((sum, v) => sum + v, 0) / (arr.length || 1); // avoid division by 0

// 2. Usage
const data = [3, 7, 9, 11];
console.log(mean(data)); // 7.5

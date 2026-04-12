const numbers: number[] = [12, 5, 78, 3, 42];

const maxValue = numbers.length
  ? Math.max(...numbers)
  : NaN;   // or throw, or return a sentinel value

console.log(maxValue);   // 78
function maxInArray<T>(arr: T[]): T | undefined {
  if (!arr.length) return undefined; // or throw if you prefer
  return arr.reduce((a, b) => (a > b ? a : b));
}

const max = maxInArray([12, 5, 78, 3, 42]); // 78

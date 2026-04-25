const numbers: number[] = [3, 7, -2, 9, 5];

const max = Math.max(...numbers);
console.log(max); // 9
const max = numbers.length ? Math.max(...numbers) : undefined;
const max = numbers.reduce((a, b) => (a > b ? a : b));
console.log(max); // 9
const {max, index} = numbers.reduce(
  (acc, val, idx) =>
    val > acc.max
      ? {max: val, index: idx}
      : acc,
  {max: Number.NEGATIVE_INFINITY, index: -1}
);

console.log(max, index); // 9 3
function maximum<T>(arr: T[], compare: (a: T, b: T) => boolean): T | undefined {
  if (arr.length === 0) return undefined;
  return arr.reduce((max, cur) => (compare(cur, max) ? cur : max), arr[0]);
}

// Example usage
const maxNum = maximum([3, 7, 9], (a, b) => a > b);           // 9
const maxStr = maximum(['apple', 'banana', 'fig'], (a, b) => a > b); // 'fig'

const numbers = [3, 7, 2, 9, 4];

const max = Math.max(...numbers); // 9
console.log(max);
const numbers = [3, 7, 2, 9, 4];

const max = numbers.reduce((prev, cur) => (cur > prev ? cur : prev));

console.log(max); // 9
function maxNumber<T extends number>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr.reduce((a, b) => (b > a ? b : a));
}

const nums = [1, 5, 3];
console.log(maxNumber(nums)); // 5
const bigNumbers = [10n, 500n, 200n];

const maxBig = bigNumbers.reduce((a, b) => (b > a ? b : a)); // 500n

console.log(maxBig);

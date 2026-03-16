const numbers: number[] = [4, 12, 7, 3];

const max = Math.max(...numbers);

console.log(max); // 12
const max = numbers.reduce((best, cur) => (cur > best ? cur : best), -Infinity);

console.log(max); // 12
let max = -Infinity;
for (const n of numbers) {
  if (n > max) max = n;
}
function findMax(arr: number[]): number | undefined {
  return arr.length ? Math.max(...arr) : undefined;
}

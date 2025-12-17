const numbers: number[] = [3, 7, 2, 9, -4];

const max = Math.max(...numbers);   // 9
console.log(max);
const maxOf = (arr: number[]): number | undefined =>
  arr.length ? Math.max(...arr) : undefined;
const maxOf = (arr: number[]): number | undefined =>
  arr.reduce((m, v) => (v > m ? v : m), -Infinity);

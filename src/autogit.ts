const scores: number[] = [12, 19, 3, 40, 27];

const max = Math.max(...scores);   // 40
const max = scores.reduce((highest, current) => (current > highest ? current : highest), -Infinity);
function findMax(arr: number[]): number | undefined {
  if (arr.length === 0) return undefined;
  return arr.reduce((m, n) => (n > m ? n : m), arr[0]);
}
function maxOfArray(arr: number[]): number {
  if (arr.length === 0) throw new Error('Empty array');

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
const typed: Int32Array = new Int32Array([2, 5, 9, 1]);

const max = Math.max.apply(null, typed as unknown as number[]);
const numbers = [7, 42, -3, 13];
console.log(Math.max(...numbers)); // 42
console.log(findMax(numbers));     // 42
console.log(maxOfArray(numbers));  // 42

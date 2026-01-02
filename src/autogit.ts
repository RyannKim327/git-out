const numbers: number[] = [3, 9, 2, 15, 7];

const max = Math.max(...numbers); // 15
console.log(max);
function arrayMax(arr: number[]): number {
  if (arr.length === 0) throw new Error('Empty array');
  let m = arr[0];
  for (let i = 1; i < arr.length; ++i) if (arr[i] > m) m = arr[i];
  return m;
}

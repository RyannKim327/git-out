function isAscending(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}
console.log(isAscending([1, 2, 3, 4])); // true
console.log(isAscending([1, 3, 2]));   // false
const isAscending = (a: number[]) => a.every((v, i) => i === 0 || v >= a[i - 1]);

/**
 * Returns true if the array is sorted in non‑decreasing order.
 * Works for any type that supports the <= operator.
 */
function isSortedAscending<T>(arr: T[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;                // found a violation
    }
  }
  return true;                     // no violations found
}
console.log(isSortedAscending([1, 2, 3, 4]));   // true
console.log(isSortedAscending([1, 3, 2, 4]));   // false
const isSortedAsc = (arr: number[]) =>
  arr.every((v, i) => i === 0 || arr[i - 1] <= v);

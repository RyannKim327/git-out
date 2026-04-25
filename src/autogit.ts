/**
 * Returns true if the array is in strictly ascending order.
 * For non‑strict (allowing equal elements) change the comparison accordingly.
 */
export function isSortedAscending<T>(arr: Array<T>): boolean {
  for (let i = 1; i < arr.length; ++i) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-compare
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}
export function isSortedAscendingAllowEqual<T>(arr: Array<T>): boolean {
  for (let i = 1; i < arr.length; ++i) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-compare
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}
console.log(isSortedAscending([1, 2, 3]));          // true
console.log(isSortedAscending([1, 2, 2]));          // false (strict)
console.log(isSortedAscending([1, 2, 2], true));    // true if you pass a flag to allow equal
console.log(isSortedAscending(['a', 'b', 'c']));   // true
console.log(isSortedAscending([3, 2, 1]));          // false
export function isSortedAscending<T>(arr: Array<T>, cmp = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0)): boolean {
  for (let i = 1; i < arr.length; ++i) {
    if (cmp(arr[i], arr[i - 1]) < 0) return false;
  }
  return true;
}

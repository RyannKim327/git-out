/**
 * Checks if `arr` is sorted in ascending order.
 *
 * @param arr          the array to test
 * @param compareFn    optional comparison function.  
 *                     Should return <0 if a < b, 0 if equal, >0 if a > b.
 *                     If omitted, the default `a - b` numeric compare is used.
 * @returns true if the array is in ascending order, false otherwise
 */
export function isSortedAscending<T>(
  arr: readonly T[],
  compareFn: ((a: T, b: T) => number) = (a, b) =>
    /* @ts-ignore */ a < b ? -1 : a > b ? 1 : 0
): boolean {
  for (let i = 1; i < arr.length; i++) {
    // If the current element is *before* the previous one, the array is out of order
    if (compareFn(arr[i], arr[i - 1]) < 0) return false;
  }
  return true;
}
const names = ['Alice', 'Bob', 'Charlie'];
console.log(isSortedAscending(names)); // true

const mixed = [1, 3, 2, 4];
console.log(isSortedAscending(mixed)); // false

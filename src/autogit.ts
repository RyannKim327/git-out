/**
 * Return the index of `target` in `arr` or -1 if it isn’t present.
 * `arr` must be sorted in ascending order.
 */
export function fibonacciSearch<T>(arr: T[], target: T, lessThan: (a: T, b: T) => boolean): number {
  const n = arr.length;

  /* Step 1 – build the smallest Fibonacci number >= n */
  let fibMMm2 = 0; // (m-2)th Fibonacci
  let fibMMm1 = 1; // (m-1)th Fibonacci
  let fibM = fibMMm2 + fibMMm1; // mth Fibonacci

  while (fibM < n) {
    fibMMm2 = fibMMm1;
    fibMMm1 = fibM;
    fibM = fibMMm2 + fibMMm1;
  }

  /* Step 2 – this will mark the eliminated range from front */
  let offset = -1;

  /* While there are elements to be inspected */
  while (fibM > 1) {
    // Calculate the index to be checked
    const i = Math.min(offset + fibMMm2, n - 1);

    /* If target is greater than the value at index, cut the subarray from array[0] to i */
    if (lessThan(arr[i], target)) {
      // Move one step further in Fibonacci series
      fibM = fibMMm1;
      fibMMm1 = fibMMm2;
      fibMMm2 = fibM - fibMMm1;

      offset = i;
    }
    /* If target is less than the value at index, cut the subarray after i+1 */
    else if (lessThan(target, arr[i])) {
      fibM = fibMMm2;
      fibMMm1 = fibMMm1 - fibMMm2;
      fibMMm2 = fibM - fibMMm1;
    }
    /* Element found – return index */
    else {
      return i;
    }
  }

  /* Compare the last element with target */
  if (fibMMm1 && arr[offset + 1] === target) {
    return offset + 1;
  }

  /* Not found */
  return -1;
}
const idx = fibonacciSearch(nums, target, (a, b) => a < b);
import { fibonacciSearch } from "./fibonacciSearch";

const numbers = Array.from({ length: 20 }, (_, i) => i * 5); // [0,5,10,...,95]
const index = fibonacciSearch(numbers, 45, (a, b) => a < b);
console.log(index); // 9 – because 45 is at index 9

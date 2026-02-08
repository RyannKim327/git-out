/**
 * Fibonacci Search
 *
 * @param arr   Sorted array to search
 * @param key   Value to locate
 * @returns    Index of key or -1
 */
export function fibonacciSearch<T extends number | string>(
  arr: T[],
  key: T
): number {
  const n = arr.length;

  // 1. Compute the smallest Fibonacci number greater or equal to n
  let fibMinusTwo = 0;   // (n-2)th fibonacci
  let fibMinusOne = 1;   // (n-1)th fibonacci
  let fibN = fibMinusTwo + fibMinusOne; // nth fibonacci

  while (fibN < n) {
    fibMinusTwo = fibMinusOne;
    fibMinusOne = fibN;
    fibN = fibMinusTwo + fibMinusOne;
  }

  // 2. Marks the index beyond the last element
  let offset = -1;

  // 3. while there's more to inspect
  while (fibN > 1) {
    const i = Math.min(offset + fibMinusTwo, n - 1);

    // Compare the current element with the key
    if (arr[i] < key!) {
      // Move three Fibonacci numbers down
      fibN = fibMinusOne;
      fibMinusOne = fibMinusTwo;
      fibMinusTwo = fibN - fibMinusOne;
      offset = i;
    } else if (arr[i] > key!) {
      // Move two Fibonacci numbers down
      fibN = fibMinusTwo;
      fibMinusOne = fibMinusOne - fibMinusTwo;
      fibMinusTwo = fibN - fibMinusOne;
    } else {
      // Element found
      return i;
    }
  }

  // Compare the last element with the key
  if (fibMinusOne && offset + 1 < n && arr[offset + 1] === key) {
    return offset + 1;
  }

  return -1; // Not found
}
const sortedNums = [3, 7, 12, 18, 23, 27, 34, 38, 45, 52];
const target = 23;

const idx = fibonacciSearch(sortedNums, target);
console.log(idx); // 4

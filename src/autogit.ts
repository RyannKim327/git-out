/**
 * Returns the index of `target` inside the sorted array `arr`,
 * or -1 if the target is not present.
 *
 * @param arr     Sorted numerical array (ascending order)
 * @param target  Value to find
 */
export function fibonacciSearch(arr: readonly number[], target: number): number {
  const n = arr.length;

  // (1) Generate the smallest Fibonacci number ≥ n
  let fibMMinus2 = 0; // F(m-2)
  let fibMMinus1 = 1; // F(m-1)
  let fibM = fibMMinus2 + fibMMinus1; // F(m)

  while (fibM < n) {
    fibMMinus2 = fibMMinus1;
    fibMMinus1 = fibM;
    fibM = fibMMinus1 + fibMMinus2;
  }

  // (2) Marks the eliminated range from front
  let offset = -1;

  // (3) While there are elements to inspect
  while (fibM > 1) {
    // Check the index. Do not go beyond the array bounds.
    const i = Math.min(offset + fibMMinus2, n - 1);

    if (arr[i] < target) {
      // Move three Fibonacci variables one step closer to the end
      fibM = fibMMinus1;
      fibMMinus1 = fibMMinus2;
      fibMMinus2 = fibM - fibMMinus1;
      offset = i;
    } else if (arr[i] > target) {
      // Move the Fibonacci window two steps back
      fibM = fibMMinus2;
      fibMMinus1 = fibMMinus1 - fibMMinus2;
      fibMMinus2 = fibM - fibMMinus1;
    } else {
      return i; // Found
    }
  }

  // (4) If the last element is the target
  if (fibMMinus1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  // Not found
  return -1;
}
const sorted = [1, 3, 5, 7, 9, 12, 15, 18, 21, 24, 30];

console.log(fibonacciSearch(sorted, 15)); // → 6
console.log(fibonacciSearch(sorted, 4));  // → -1

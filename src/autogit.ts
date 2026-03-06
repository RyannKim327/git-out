/* --------------------------------------------------------
   Fibonacci Search – TypeScript version
   -------------------------------------------------------- */

type Comparator<T> = (a: T, b: T) => number;

/**
 * Searches a sorted array using the Fibonacci search technique.
 *
 * @param arr       The sorted array to search
 * @param key       The value we’re looking for
 * @param cmp       Optional comparator – defaults to numeric comparison
 * @returns The index of `key` in `arr`, or -1 if not found
 */
export function fibonacciSearch<T>(
  arr: readonly T[],
  key: T,
  cmp: Comparator<T> = (a, b) => a! < b! ? -1 : (a! > b! ? 1 : 0)
): number {
  const n = arr.length;
  if (n === 0) return -1;

  /* ---------- build the smallest Fibonacci number ≥ n ------------- */
  let fibMm2 = 0;            // (m‑2)’th Fibonacci
  let fibMm1 = 1;            // (m‑1)’th Fibonacci
  let fibM   = fibMm2 + fibMm1; // m’th Fibonacci

  while (fibM < n) {
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM   = fibMm2 + fibMm1;
  }

  /* ---------- we now have a Fibonacci number >= array length ---------- */
  let offset = -1; // Marks the eliminated range from front

  while (fibM > 1) {
    // Keep fibMm2 ≥ 0
    // Index to be checked – clamp to array bounds
    const i = Math.min(offset + fibMm2, n - 1);

    const comparison = cmp(arr[i], key);

    if (comparison < 0) {
      /* key is after arr[i] */
      fibM   = fibMm1;
      fibMm1 = fibMm2;
      fibMm2 = fibM - fibMm1;
      offset = i;
    } else if (comparison > 0) {
      /* key is before arr[i] */
      fibM   = fibMm2;
      fibMm1 = fibMm1 - fibMm2;
      fibMm2 = fibM - fibMm1;
    } else {
      return i;                // Found at index i
    }
  }

  /* ---------- check the last element -------------------------------- */
  if (fibMm1 && offset + 1 < n && cmp(arr[offset + 1], key) === 0) {
    return offset + 1;
  }

  return -1; // Not found
}

/* --------------------------------------------------------
   Example usage
   -------------------------------------------------------- */

const nums = [3, 9, 15, 21, 27, 31, 38, 54, 72, 95];

console.log(fibonacciSearch(nums, 54)); // → 7
console.log(fibonacciSearch(nums, 10)); // → -1

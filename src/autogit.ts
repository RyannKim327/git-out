/**
 * Fibonacci search for a sorted array of numbers.
 * @param arr  - The sorted array (ascending).
 * @param target - The value to locate.
 * @returns The index of target in `arr`, or -1 if not found.
 */
function fibSearch(arr: number[], target: number): number {
  const n = arr.length;

  /* ------- 1. Build a Fibonacci sequence long enough ---- */
  // fibMm2 = fib(m‑2), fibMm1 = fib(m‑1), fibM   = fib(m)
  let fibMm2 = 0; // (m-2)'th Fibonacci number
  let fibMm1 = 1; // (m-1)'th Fibonacci number
  let fibM   = fibMm2 + fibMm1; // m'th Fibonacci

  while (fibM < n) {
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM   = fibMm2 + fibMm1;
  }

  /* ------- 2. Mark the boundary of the eliminated range ------- */
  // The offset is the index of the last removed element
  let offset = -1;

  /* ------- 3. While there are elements to investigate ----------- */
  while (fibM > 1) {
    // Check if fibMm2 is a valid index
    const i = Math.min(offset + fibMm2, n - 1);

    if (arr[i] === target) {
      return i; // Found!
    }

    /* ----- Move the three Fibonacci variables down one step ----- */
    if (arr[i] < target) {
      fibM   = fibMm1;
      fibMm1 = fibMm2;
      fibMm2 = fibM - fibMm1;
      offset = i;
    } else {
      fibM   = fibMm2;
      fibMm1 = fibMm1 - fibMm2;
      fibMm2 = fibM - fibMm1;
    }
  }

  /* ------- 4. Compare the last element in the range --------------- */
  if (fibMm1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1; // Not found
}

/* ---- Quick demo ---- */
const sorted = [3, 5, 8, 12, 19, 27, 34, 42, 56, 73, 91];
console.log(fibSearch(sorted, 27)); // → 5
console.log(fibSearch(sorted, 7));  // → -1

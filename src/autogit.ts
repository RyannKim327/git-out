/**
 * Fibonacci Search in a sorted array.
 * Returns the index of `target` or -1 if not found.
 * @param arr    Sorted array of numbers (ascending order).
 * @param target Value to locate.
 */
export function fibonacciSearch(arr: number[], target: number): number {
  const n = arr.length;
  if (n === 0) return -1;

  /* 1. Find the smallest Fibonacci number F(k) >= n */
  let fibKm2 = 0;               // F(k-2)
  let fibKm1 = 1;               // F(k-1)
  let fibK   = fibKm2 + fibKm1; // F(k)

  while (fibK < n) {
    fibKm2 = fibKm1;
    fibKm1 = fibK;
    fibK   = fibKm2 + fibKm1;
  }

  /* 2. Initialize the search range */
  let offset = -1;

  /* 3. Main comparison loop */
  while (fibK > 1) {
    // Index we will inspect
    const i = Math.min(offset + fibKm2, n - 1);

    if (arr[i] < target) {
      // Move one Fibonacci step down
      fibK   = fibKm1;
      fibKm1 = fibKm2;
      fibKm2 = fibK - fibKm1;
      offset = i;
    } else if (arr[i] > target) {
      // Move two Fibonacci steps down
      fibK   = fibKm2;
      fibKm1 = fibKm1 - fibKm2;
      fibKm2 = fibK - fibKm1;
    } else {
      return i; // Found
    }
  }

  /* 4. Check the last remaining element */
  if (fibKm1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1; // Not found
}

/* ---------- Usage demo ---------- */
if (require.main === module) {
  const data = [2, 4, 7, 9, 13, 15, 21, 32, 42];
  console.log(fibonacciSearch(data, 15)); // → 5
  console.log(fibonacciSearch(data, 3));  // → -1
}

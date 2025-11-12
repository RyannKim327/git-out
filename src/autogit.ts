/**
 * Fibonacci Search for a sorted array.
 * @param arr Sorted array of numbers
 * @param target Value to find
 * @returns Index of target or -1 if not found
 */
export function fibonacciSearch(arr: number[], target: number): number {
  const n = arr.length;
  if (n === 0) return -1;

  /* 1. Find the smallest Fibonacci number >= n */
  let fibK  = 0;   // F(k)
  let fibK1 = 1;   // F(k-1)
  let fibK2 = 0;   // F(k-2)

  while (fibK1 < n) {
    fibK2 = fibK1;
    fibK1 = fibK + fibK1;
    fibK  = fibK2;
  }

  /* 2. Initialize the search range */
  let offset = -1;

  /* 3. Main loop */
  while (fibK > 1) {
    const i = Math.min(offset + fibK2, n - 1);

    if (arr[i] < target) {
      // Move right: shrink to upper segment
      fibK  = fibK1 - fibK;
      fibK1 = fibK1 - fibK2;
      fibK2 = fibK2 - fibK1;
      offset = i;
    } else if (arr[i] > target) {
      // Move left: shrink to lower segment
      fibK  = fibK2;
      fibK1 = fibK1 - fibK2;
      fibK2 = fibK - fibK1;
    } else {
      return i; // Found
    }
  }

  /* 4. Check the last candidate */
  if (fibK1 === 1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1; // Not found
}

/* ---------- Usage example ---------- */
if (require.main === module) {
  const data = [2, 4, 7, 13, 23, 37, 48, 59, 61, 73, 89, 101];
  console.log(fibonacciSearch(data, 37)); // → 5
  console.log(fibonacciSearch(data, 36)); // → -1
}

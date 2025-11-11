/**
 * Fibonacci search in a sorted array.
 * Returns the index of `target`, or -1 if not found.
 * Time-complexity:  O(log n)
 * Space-complexity: O(1)
 */
export function fibonacciSearch(
  arr: number[],
  target: number
): number {
  const n = arr.length;
  if (n === 0) return -1;

  /* 1. Find the smallest Fibonacci number >= n */
  let fibMMm2 = 0;          // F(i-2)
  let fibMMm1 = 1;          // F(i-1)
  let fibM = fibMMm2 + fibMMm1; // F(i)

  while (fibM < n) {
    fibMMm2 = fibMMm1;
    fibMMm1 = fibM;
    fibM = fibMMm2 + fibMMm1;
  }

  /* 2. Initialize the search range */
  let offset = -1;

  /* 3. Main loop */
  while (fibM > 1) {
    const i = Math.min(offset + fibMMm2, n - 1);

    if (arr[i] < target) {
      // Move one Fibonacci step down
      fibM = fibMMm1;
      fibMMm1 = fibMMm2;
      fibMMm2 = fibM - fibMMm1;
      offset = i;
    } else if (arr[i] > target) {
      // Move two Fibonacci steps down
      fibM = fibMMm2;
      fibMMm1 = fibMMm1 - fibMMm2;
      fibMMm2 = fibM - fibMMm1;
    } else {
      return i; // found
    }
  }

  /* 4. Check the last element */
  if (fibMMm1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1; // not found
}

/* ---------- Usage example ---------- */
if (require.main === module) {
  const data = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
  console.log(fibonacciSearch(data, 85)); // → 8
  console.log(fibonacciSearch(data, 42)); // → -1
}
tsc fibonacciSearch.ts
node fibonacciSearch.js

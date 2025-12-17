/**
 * Fibonacci search for a sorted array.
 * Returns the index of x in arr, or -1 if not found.
 * If a compare function is provided, it will be used to compare elements.
 */
export function fibSearch<T>(
  arr: T[],
  x: T,
  compare?: (a: T, b: T) => number
): number {
  // Default comparator: numbers, strings, or fall back to string comparison
  const cmp =
    compare ??
    ((a: T, b: T) => {
      const aa = a as unknown as any;
      const bb = b as unknown as any;

      if (typeof aa === 'number' && typeof bb === 'number') return aa - bb;
      if (typeof aa === 'string' && typeof bb === 'string') return aa.localeCompare(bb);
      // Fallback: compare their string representations
      const sa = String(aa);
      const sb = String(bb);
      return sa < sb ? -1 : sa > sb ? 1 : 0;
    });

  const n = arr.length;
  if (n === 0) return -1;

  // fibMMm2 = (m-2)'th Fibonacci number
  // fibMMm1 = (m-1)'th Fibonacci number
  // fibM    = m'th Fibonacci number
  let fibMMm2 = 0;
  let fibMMm1 = 1;
  let fibM = fibMMm2 + fibMMm1;

  // Find the smallest Fibonacci number >= n
  while (fibM < n) {
    fibMMm2 = fibMMm1;
    fibMMm1 = fibM;
    fibM = fibMMm2 + fibMMm1;
  }

  let offset = -1;

  // While there are elements to compare
  while (fibM > 1) {
    const i = Math.min(offset + fibMMm2, n - 1);

    const c = cmp(arr[i], x);
    if (c < 0) {
      // arr[i] < x: move three Fibonacci numbers down
      fibM = fibMMm1;
      fibMMm1 = fibMMm2;
      fibMMm2 = fibM - fibMMm1;
      offset = i;
    } else if (c > 0) {
      // arr[i] > x: move two Fibonacci numbers down
      fibM = fibMMm2;
      fibMMm1 = fibMMm1 - fibMMm2;
      fibMMm2 = fibM - fibMMm1;
    } else {
      // Found
      return i;
    }
  }

  // Check the last possible element
  if (fibMMm1 && offset + 1 < n && cmp(arr[offset + 1], x) === 0) {
    return offset + 1;
  }

  return -1;
}
// Numeric array (sorted)
const nums = [5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(fibSearch(nums, 23)); // 4
console.log(fibSearch(nums, 7));  // -1

// With a custom comparator (e.g., objects)
type Person = { id: number; name: string };
const people: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

// Assuming sorted by id
const idx = fibSearch<Person>(people, { id: 2, name: 'Bob' }, (a, b) => a.id - b.id);
console.log(idx); // 1

/**
 * Bubble‑sort an array.
 *
 * @param arr          The array to sort (does not get mutated).
 * @param compareFn    Optional comparison function.  
 *                     Should return a negative value if a < b, zero if a == b, and positive if a > b.
 *                     If omitted, the default comparator uses the `<` and `>` operators that work
 *                     for numbers, strings and any type that can be compared that way.
 * @returns            A new array containing the elements of `arr` in ascending order.
 */
export function bubbleSort<T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  // Make a shallow copy; we don’t want to touch the caller’s array
  const result = [...arr];

  const compare = compareFn ?? ((a: any, b: any) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  const n = result.length;
  if (n < 2) return result; // already sorted

  let swapped: boolean;
  // Standard bubble‑sort: keep looping while we keep swapping
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (compare(result[i], result[i + 1]) > 0) {
        // swap
        [result[i], result[i + 1]] = [result[i + 1], result[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return result;
}
const unsorted = [5, 3, 8, 4, 2];
const sorted = bubbleSort(unsorted);
console.log(sorted); // [2, 3, 4, 5, 8]
console.log(unsorted); // unchanged: [5, 3, 8, 4, 2]
const words = ["banana", "Apple", "cherry"];
const sortedByCase = bubbleSort(words, (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(sortedByCase); // ["Apple", "banana", "cherry"]

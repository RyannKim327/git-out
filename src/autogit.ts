/**
 * Insertion sort – O(n²) average‑case (stable, in‑place)
 *
 * @param arr       The array to be sorted
 * @param compareFn Optional comparison callback.  If omitted, natural ordering
 *                  (a <= b) is used.  The callback should return
 *                  <0 when a < b, 0 when a === b, >0 when a > b.
 */
export function insertionSort<T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number
): void {
  // fall back to natural ordering for primitives
  if (!compareFn) {
    compareFn = (a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0);
  }

  // start from the second element – the first element is a 1‑item sorted slice
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // move elements that are greater than `key` one position to the right
    while (j >= 0 && compareFn(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    // place `key` after the element just smaller than it
    arr[j + 1] = key;
  }
}
const numbers = [8, 3, 5, 4, 7, 1, 9, 2];
insertionSort(numbers);
console.log(numbers); // [1, 2, 3, 4, 5, 7, 8, 9]

const words = ['banana', 'apple', 'cherry', 'date'];
insertionSort(words, (a, b) => a.localeCompare(b));
console.log(words); // ["apple", "banana", "cherry", "date"]

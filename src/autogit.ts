/**
 * Insertion sort implementation that mutates the original array
 * and returns the sorted array for convenience.
 *
 * @param arr - The array to sort
 * @param compareFn - Optional. If omitted, the default comparison uses < and >.
 * @returns The sorted array (the same instance as you passed in)
 */
export function insertionSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  // If no custom comparer is supplied, fall back to the default
  const cmp = compareFn ?? ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));

  // Walk from the second element to the end
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Shift elements that are greater than the key to the right
    while (j >= 0 && cmp(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Place the key into its correct spot
    arr[j + 1] = key;
  }

  return arr; // handy for chaining, but the original array is already sorted
}
const nums = [4, 3, 5, 2, 1];
console.log(insertionSort(nums)); // [1, 2, 3, 4, 5]
interface Person { age: number; name: string; }

const people: Person[] = [
  { age: 30, name: "Alice" },
  { age: 22, name: "Bob" },
  { age: 25, name: "Carol" }
];

insertionSort(people, (a, b) => a.age - b.age);
// now sorted by age

/**
 * Sorts an array of numbers in ascending order using insertion sort.
 * The algorithm works in place – the input array is mutated.
 *
 * @param arr - The numeric array to be sorted.
 * @returns The same array, now sorted.
 */
export function insertionSort(arr: number[]): number[] {
  // Start from the second element; the first element is “sorted” by definition
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];            // The value we’re going to insert
    let j = i - 1;

    // Shift elements that are greater than the key to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Insert the key into its correct position
    arr[j + 1] = key;
  }

  return arr;
}
export function insertionSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // While j is in range and key is less than arr[j], shift arr[j] right
    while (j >= 0 && compareFn(key, arr[j]) < 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}
// Numbers
const nums = [64, 25, 12, 22, 11];
insertionSort(nums);          // => [11, 12, 22, 25, 64]

// Strings
const words = ['banana', 'apple', 'cherry'];
insertionSort(words);          // => ['apple', 'banana', 'cherry']

// Custom objects
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 24 },
  { name: 'Catherine', age: 27 }
];

insertionSort(people, (a, b) => a.age - b.age);
// => sorted by age

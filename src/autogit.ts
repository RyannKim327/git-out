/**
 * Sorts an array of numbers in ascending order using selection sort.
 * The array is sorted in place.
 *
 * @param arr – the number array to sort
 * @returns the same array reference, now sorted
 */
export function selectionSortNumbers(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Assume the first unsorted element is the minimum
    let minIndex = i;

    // Find the actual minimum among the remaining unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // If a smaller element was found, swap it into place
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}
const nums = [64, 25, 12, 22, 11];
console.log(selectionSortNumbers(nums)); // → [11, 12, 22, 25, 64]
/**
 * Sorts an array in place using selection sort and a custom comparator.
 *
 * @param arr         The array to sort.
 * @param compareFn   Comparator that defines the sort order.
 * @returns The sorted array (same reference as @param arr).
 */
export function selectionSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number
): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (compareFn(arr[j], arr[minIndex]) < 0) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: 'Alice', age: 29 },
  { name: 'Bob', age: 23 },
  { name: 'Charlie', age: 35 }
];

// Sort by age (ascending)
selectionSort(people, (a, b) => a.age - b.age);

console.log(people);
// → [
//      { name: 'Bob', age: 23 },
//      { name: 'Alice', age: 29 },
//      { name: 'Charlie', age: 35 }
//    ]

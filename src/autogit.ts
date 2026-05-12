/**
 * Quick‑sort implementation.
 *
 * @param arr   The array to sort – it will be mutated in place.
 * @param compare Optional comparison function.  
 *                Should return < 0 if a < b, 0 if a == b, > 0 if a > b.
 *                If omitted, the default is a numeric comparison.
 * @returns The same array reference, now sorted.
 */
export function quickSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): T[] {
  // Default to numeric comparison if no comparator is given
  const cmp = compare ?? ((a: any, b: any) => a < b ? -1 : a > b ? 1 : 0);

  // Recursive helper – operates on the portion of the array
  function qs(left: number, right: number): void {
    if (left >= right) return;

    // Partition returns the final index of the pivot
    const pivotIndex = partition(left, right);

    // Recurse on smaller side first to keep stack depth <= log₂(n)
    if (pivotIndex - left < right - pivotIndex) {
      qs(left, pivotIndex - 1);
      qs(pivotIndex + 1, right);
    } else {
      qs(pivotIndex + 1, right);
      qs(left, pivotIndex - 1);
    }
  }

  // Lomuto‑style partition – choose rightmost element as pivot
  function partition(left: number, right: number): number {
    const pivot = arr[right];
    let i = left - 1;          // Place for swapping

    for (let j = left; j < right; j++) {
      if (cmp(arr[j], pivot) <= 0) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    // Move pivot to its final place
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
  }

  qs(0, arr.length - 1);
  return arr;
}
// Numbers – default numeric comparison is fine
const nums = [34, 7, 23, 32, 5, 62];
console.log(quickSort(nums)); // [5, 7, 23, 32, 34, 62]

// Strings – need a string comparator  
const words = ['banana', 'apple', 'cherry'];
console.log(
  quickSort(words, (a, b) => a.localeCompare(b))
); // ['apple', 'banana', 'cherry']

// Custom objects  
interface Person { name: string; age: number; }
const people: Person[] = [
  { name: 'Anna', age: 27 },
  { name: 'Bob', age: 22 },
  { name: 'Clara', age: 35 },
];

quickSort(people, (a, b) => a.age - b.age);
console.log(people);
// [ { name: 'Bob', age: 22 }, { name: 'Anna', age: 27 }, { name: 'Clara', age: 35 } ]

/**
 * Bubble Sort – in‑place, O(n²) time, O(1) space
 *
 * @param arr Array of values that implement `Comparable`
 * @returns the sorted array (same reference as input)
 */
export function bubbleSort<T extends Comparable>(arr: T[]): T[] {
  const n = arr.length;

  // Minor optimization: keep track of whether a swap happened
  // in the current pass. If not, array is already sorted.
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // After each outer loop pass, the largest element of the
    // unsorted portion settles at the end of the array.
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no elements were swapped, the array is already sorted.
    if (!swapped) break;
  }

  return arr;
}

/** Simple comparable interface for primitives */
export interface Comparable {
  /** Return true if this > other */
  > (other: this): boolean;
}
export function bubbleSortWith<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number
): T[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < arr.length - i - 1; j++) {
      // compareFn(a, b) < 0 => a < b
      // compareFn(a, b) > 0 => a > b
      if (compareFn(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return arr;
}
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 34 },
  { name: "Bob", age: 29 },
  { name: "Carol", age: 42 },
];

bubbleSortWith(people, (a, b) => a.age - b.age);
// people is now sorted by age ascending
function test() {
  const nums = [3, 1, 4, 1, 5, 9, 2, 6];
  console.log("Before:", nums);
  bubbleSort(nums); // mutates nums in place
  console.log("After: ", nums);
}

test(); /* → Before: [3,1,4,1,5,9,2,6]
          After:  [1,1,2,3,4,5,6,9] */

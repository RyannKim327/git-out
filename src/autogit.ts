/**
 * In‑place insertion sort.
 *
 * @param arr   The array to sort. It will be mutated.
 * @param compareFn Optional comparator. Should return:
 *                  - a negative number if a < b
 *                  - zero if a === b
 *                  - a positive number if a > b
 *                If omitted, the < and > operators are used (works for numbers & strings).
 * @returns The same array reference, now sorted.
 */
export function insertionSort<T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  // Default comparator works for numbers, strings, and any type that defines < and >.
  const cmp = compareFn ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Shift elements that are greater than `key` to the right.
    while (j >= 0 && cmp(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Insert the key into its correct position.
    arr[j + 1] = key;
  }

  return arr;
}
import { insertionSort } from "./insertionSort";

const nums = [5, 2, 9, 1, 5, 6];
console.log(insertionSort(nums)); // → [1, 2, 5, 5, 6, 9]
const words = ["banana", "apple", "cherry"];
console.log(insertionSort(words)); // → ["apple", "banana", "cherry"]
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 32 },
  { name: "Bob",   age: 24 },
  { name: "Carol", age: 29 },
];

// Sort by age ascending
insertionSort(people, (a, b) => a.age - b.age);

console.log(people);
// → [{name:"Bob",age:24}, {name:"Carol",age:29}, {name:"Alice",age:32}]
function test() {
  const cases: Array<[any[], any[]]> = [
    [[3, 1, 2], [1, 2, 3]],
    [["c", "a", "b"], ["a", "b", "c"]],
    [[5], [5]],
    [[], []],
    [[2, 2, 1], [1, 2, 2]],
  ];

  for (const [input, expected] of cases) {
    const copy = [...input];
    insertionSort(copy);
    console.assert(
      JSON.stringify(copy) === JSON.stringify(expected),
      `Failed on ${JSON.stringify(input)} → got ${JSON.stringify(copy)}`
    );
  }
  console.log("All tests passed!");
}

test();
function insertionSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const cmp = compareFn ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && cmp(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

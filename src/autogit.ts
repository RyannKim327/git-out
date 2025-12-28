/**
 * QuickSort – in‑place, generic implementation.
 *
 * @param arr   The array to sort. It will be mutated.
 * @param compareFn Optional comparator. Should return:
 *                  - a negative number if a < b
 *                  - zero if a === b
 *                  - a positive number if a > b
 *                If omitted, the < and > operators are used (suitable for numbers & strings).
 * @returns The same array instance, now sorted.
 */
export function quickSort<T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  // Default comparator for numbers/strings
  const cmp = compareFn ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));

  // Helper that sorts the sub‑range [low, high] (inclusive)
  function sort(low: number, high: number): void {
    if (low < high) {
      const p = partition(low, high);
      sort(low, p - 1);
      sort(p + 1, high);
    }
  }

  // Lomuto partition scheme (pivot = arr[high])
  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low; // index of the smaller element

    for (let j = low; j < high; j++) {
      if (cmp(arr[j], pivot) <= 0) {
        // swap arr[i] and arr[j]
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    // place pivot after the last smaller element
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i; // pivot's final index
  }

  // Kick‑off the recursion
  sort(0, arr.length - 1);
  return arr;
}
// 1️⃣ Sorting numbers (default comparator)
const nums = [34, 7, 23, 32, 5, 62];
quickSort(nums);
console.log(nums); // [5, 7, 23, 32, 34, 62]

// 2️⃣ Sorting strings
const words = ['banana', 'apple', 'cherry', 'date'];
quickSort(words);
console.log(words); // ['apple', 'banana', 'cherry', 'date']

// 3️⃣ Sorting objects with a custom comparator
type Person = { name: string; age: number };
const people: Person[] = [
  { name: 'Alice', age: 31 },
  { name: 'Bob', age: 24 },
  { name: 'Carol', age: 27 },
];

quickSort(people, (a, b) => a.age - b.age);
console.log(people);
// [
//   { name: 'Bob',   age: 24 },
//   { name: 'Carol', age: 27 },
//   { name: 'Alice', age: 31 }
// ]
// Randomly pick a pivot and move it to the end
const randIdx = low + Math.floor(Math.random() * (high - low + 1));
[arr[randIdx], arr[high]] = [arr[high], arr[randIdx]];
const pivot = arr[high];
const INSERTION_SORT_THRESHOLD = 10;

function sort(low: number, high: number): void {
  if (high - low + 1 <= INSERTION_SORT_THRESHOLD) {
    insertionSort(low, high);
    return;
  }
  if (low < high) {
    const p = partition(low, high);
    sort(low, p - 1);
    sort(p + 1, high);
  }
}

function insertionSort(low: number, high: number): void {
  for (let i = low + 1; i <= high; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= low && cmp(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}
export function quickSortIterative<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const cmp = compareFn ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  const stack: [number, number][] = [[0, arr.length - 1]];

  while (stack.length) {
    const [low, high] = stack.pop()!;
    if (low >= high) continue;

    // partition (same Lomuto code as before)
    const pivot = arr[high];
    let i = low;
    for (let j = low; j < high; j++) {
      if (cmp(arr[j], pivot) <= 0) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    const p = i;

    // push larger sub‑array first to keep stack depth O(log n)
    if (p - 1 - low > high - (p + 1)) {
      stack.push([low, p - 1]);
      stack.push([p + 1, high]);
    } else {
      stack.push([p + 1, high]);
      stack.push([low, p - 1]);
    }
  }
  return arr;
}
import { quickSort } from './quicksort';

function test() {
  const a = [9, -3, 5, 2, 6, 8, -6, 1, 3];
  console.log('original:', a);
  console.log('sorted  :', quickSort([...a])); // copy to keep original intact

  const objs = [
    { id: 1, value: 42 },
    { id: 2, value: 7 },
    { id: 3, value: 19 },
  ];
  quickSort(objs, (x, y) => x.value - y.value);
  console.log('objects sorted by value:', objs);
}

test();

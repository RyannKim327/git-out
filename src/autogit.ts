/**
 * Selection Sort – sorts an array of numbers in‑place.
 * Time   : O(n²)
 * Space  : O(1) (in‑place)
 *
 * @param arr - The array to sort. It will be mutated.
 * @returns The same array reference, now sorted.
 */
function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  // Walk through the array, placing the smallest remaining element at position i
  for (let i = 0; i < n - 1; i++) {
    // Assume the element at i is the smallest
    let minIdx = i;

    // Find the true smallest element in the unsorted suffix [i+1 … n-1]
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // If we found a smaller element, swap it with the element at i
    if (minIdx !== i) {
      const tmp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = tmp;
    }
  }

  return arr;
}

/* ------------------- demo ------------------- */
const numbers = [64, 25, 12, 22, 11];
console.log('Before:', numbers);
selectionSort(numbers);
console.log('After :', numbers);
Before: [ 64, 25, 12, 22, 11 ]
After : [ 11, 12, 22, 25, 64 ]
/**
 * Generic Selection Sort.
 *
 * @param arr - The array to sort (mutated in‑place).
 * @param compare - Comparator function.
 *                  Should return <0 if a < b,
 *                  0 if a == b,
 *                  >0 if a > b.
 * @returns The same array reference, now sorted.
 */
function selectionSortGeneric<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any) // default for numbers
): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      if (compare(arr[j], arr[minIdx]) < 0) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      const tmp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = tmp;
    }
  }

  return arr;
}

/* ------------------- demo ------------------- */

// 1️⃣ Numbers (explicit comparator not needed)
const nums = [5, 3, 8, 1, 2];
selectionSortGeneric(nums);
console.log('Sorted numbers:', nums);

// 2️⃣ Strings (case‑insensitive)
const words = ['Banana', 'apple', 'Cherry', 'date'];
selectionSortGeneric(words, (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
console.log('Sorted words (case‑insensitive):', words);

// 3️⃣ Objects (sort by a property)
type Person = { name: string; age: number };
const people: Person[] = [
  { name: 'Alice', age: 32 },
  { name: 'Bob',   age: 24 },
  { name: 'Carol', age: 29 },
];
selectionSortGeneric(people, (a, b) => a.age - b.age);
console.log('People sorted by age:', people);
Sorted numbers: [ 1, 2, 3, 5, 8 ]
Sorted words (case-insensitive): [ 'apple', 'Banana', 'Cherry', 'date' ]
People sorted by age: [
  { name: 'Bob', age: 24 },
  { name: 'Carol', age: 29 },
  { name: 'Alice', age: 32 }
]
if (compare(arr[j], arr[minIdx]) < 0) { /* strictly smaller */ }
function selectionSort<T>(arr: T[], compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)): T[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (compare(arr[j], arr[minIdx]) < 0) minIdx = j;
    }
    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}
selectionSort([9, 4, 6, 2]);               // numbers
selectionSort(['z', 'a', 'm']);           // strings (lexicographic)
selectionSort(objects, (a, b) => a.id - b.id); // custom objects
